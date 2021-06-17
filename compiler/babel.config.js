module.exports = {
  presets: [
    '@babel/preset-env',
  ],
  plugins: [
    ['./babel-hippo-plugin.js'],
    ['@babel/plugin-proposal-decorators', {'legacy': true}],
  ],
  ignore: [
    'babel.config.js',
  ]
}
