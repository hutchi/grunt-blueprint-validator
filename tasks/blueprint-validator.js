/*
 * grunt-blueprint-validator
 * https://github.com/Aconex/grunt-blueprint-validator
 *
 * Copyright (c) 2015 moliveira
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');
var drakov = require('drakov');
var Dredd = require('dredd');

var defaultDrakovOptions = {
  sourceFiles: null,
  serverPort: 3000,
  stealthmode: true
};

var defaultDreddOptions = {
  'blueprintPath': null,
  'server': 'http://localhost:3000',
  'options': {
  'reporter': 'junit',
    'output': './target/dreddOutput.xml'
  }
};

var applyConfig = function(baseConfig, additionalConfig){
  _.forEach(additionalConfig, function(y){
    _.assign(baseConfig, y);
  });
  return baseConfig;
};

var getDrakovOptions = function(){
  return applyConfig(defaultDrakovOptions, arguments);
};

var getDreddOptions = function(){
  return applyConfig(defaultDreddOptions, arguments);
};

module.exports = function(grunt) {

  grunt.registerMultiTask('blueprint-validator', 'Validates Blueprint files by running Dredd against Drakov.', function() {
    var mdFiles = this.data.mdFiles;
    var serverPort = this.data.serverPort;
    var drakovOptions = getDrakovOptions({sourceFiles: mdFiles, serverPort: serverPort}, this.data.drakovOptions ? this.data.drakovOptions : {});
    var dreddOptions = getDreddOptions({blueprintPath: mdFiles, server: 'http://localhost:' + serverPort }, this.data.dreddOptions ? this.data.dreddOptions : {});

    var done = grunt.task.current.async();

    var runDredd = function(){
      new Dredd(dreddOptions).run(function(error, stats){
        if (error) {
          if (error.message) {
            grunt.log.error(error.message);
          }
          if (error.stack) {
            grunt.log.error(error.stack);
          }
          done(false);
        }
        if (stats.failures + stats.errors > 0) {
          done(false);
        } else {
          done(true);
        }
      });
    };

    var runDrakov = function(cb) {
      drakov.run(drakovOptions, function(err){
        if (err) {
          throw err;
        }
        cb();
      });
    };

    runDrakov(runDredd);
  });

};