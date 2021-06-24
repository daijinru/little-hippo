module.exports = {
  presets: [
    // '@babel/preset-env',
  ],
  plugins: [
    ['./hippoPluginImportDecorators'],
    ['@babel/plugin-proposal-decorators', {'legacy': true}],
  ],
  ignore: [
    'babel.config.js',
  ]
}
