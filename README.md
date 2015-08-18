# grunt-blueprint-validator

> Validates Blueprint files by running Dredd against Drakov..

## Getting Started
This plugin requires Grunt `~0.4.5`

```shell
npm install grunt-blueprint-validator --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-blueprint-validator');
```

## The "blueprint-validator" task

### Overview
In your project's Gruntfile, add a section named `blueprint-validator` to the data object passed into `grunt.initConfig()`.

```js
'blueprint-validator': {
    'contract-test':{
        mdFiles: './path/**/*.md',
        serverPort: 3000
    }
}
```
### Custom Options
To override Drakov or Dredd options:
  
```js
'blueprint-validator': {
  'contract-test':{
      mdFiles: './path/**/*.md',
      serverPort: 3000,
      drakovOptions: {
            sourceFiles: './path/**/*.md',
            serverPort: 3000,
            stealthmode: true
      },
      dreddOptions: {
          'blueprintPath': 'path/*.md',
          'server': 'http://localhost:3000',
          'options': {
              'reporter': 'junit',
              'output': './target/dreddOutput.xml'
          }
      }
  }
}
```

#### Drakov
For more information about Drakov options refer to https://github.com/Aconex/drakov


#### Dredd
For more information about Dredd options refer to http://dredd.readthedocs.org/en/latest/usage/


