const allowedE2EModules = [
  'window',
  'hyperformula*',
  'jasmine-co',
  'jest-matcher-utils',
  'html-parse-stringify',
  'core-js/*',
  'regenerator-runtime/runtime*',
  '@babel/runtime/*',
  './htmlNormalize',
  './common',
  './jasmine-helpers',
  './mouseEvents',
  './keyboardEvents',
  './../bootstrap',
  './helpers/custom-matchers',
  './helpers/jasmine-helpers',
  './asciiTable',
  './MemoryLeakTest',
  '../MemoryLeakTest',
];

const babelPresetConfig = () => ({
  targets: {
    chrome: '110',
    firefox: '110',
    safari: '14.1',
    node: '11', // support for Webpack 4 and similar oldish bundlers
  },
  modules: false,
  debug: false,
  useBuiltIns: 'usage',
  corejs: {
    version: '3.31'
  }
});

module.exports = {
  presets: [
    ['@babel/preset-env', babelPresetConfig()]
  ],
  plugins: [
    ['transform-inline-environment-variables']
  ],
  extends: './base-babel.config.js',
  assumptions: {
    // save 21 kB (July 12, 2023) https://babeljs.io/docs/assumptions#noincompletensimportdetection
    noIncompleteNsImportDetection: true,
  },
  env: {
    // Environment for unit testing, source code and languages building via webpack (UMD).
    commonjs: {
      plugins: [
        ['@babel/plugin-transform-runtime', {
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: false,
        }],
        ['@babel/plugin-transform-modules-commonjs', { loose: true }]
      ]
    },
    // Environment for transpiling files to be compatible with CommonJS.
    commonjs_dist: {
      plugins: [
        ['@babel/plugin-transform-modules-commonjs', { loose: true }],
        ['babel-plugin-transform-require-ignore', { extensions: ['.css','.scss'] }]
      ],
      ignore: [
        '**/__tests__/**',
        '**/test/**',
        '**/dist/**',
      ]
    },
    // Environment for transpiling files to be compatible with ES Modules.
    es: {
      plugins: [
        ['babel-plugin-transform-require-ignore', { extensions: ['.css','.scss'] }],
        ['./.config/plugin/babel/add-import-extension.js', { extension: 'mjs' }]
      ],
      ignore: [
        '**/__tests__/**',
        '**/test/**',
        '**/dist/**',
      ],
    },
    // Environment for transpiling only legacy language files (e.q. import `languages/pl-PL`)
    // which need to be compatible with ES Modules. That format, by default, automatically
    // registers the language pack. It's not suitable to use with the modularized version of
    // the Handsontable.
    es_languages: {
      plugins: [
        ['babel-plugin-transform-require-ignore', { extensions: ['.css','.scss'] }],
        ['./.config/plugin/babel/add-import-extension.js', { extension: 'mjs' }],
        ['./.config/plugin/babel/add-language-registration.js'],
      ],
    },
    // Environment for building E2E tests (UMD).
    commonjs_e2e: {
      plugins: [
        ['@babel/plugin-transform-runtime', {
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: false,
        }],
        ['@babel/plugin-transform-modules-commonjs', { loose: true }],
        ['babel-plugin-forbidden-imports', {
          allowedModules: allowedE2EModules
        }]
      ],
    },
  },
  ignore: [
    'src/3rdparty/walkontable/dist/',
    'src/3rdparty/walkontable/test/dist/',
  ],
};
