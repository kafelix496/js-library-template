import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const common = (isProd) => ({
  plugins: [
    resolve(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: [
                '> 0.25%',
                'ie 11',
                'not op_mini all',
                'not dead'
              ]
            },
            modules: false
          }
        ]
      ]
    }),
    isProd && terser()
  ]
})

const results = (fileName, umdName, external) => [{
  input: `src/${fileName}/index.js`,
  external,
  output: {
    file: `es/${fileName}.js`,
    format: 'es'
  }
}, {
  input: `src/${fileName}/index.js`,
  external,
  output: {
    file: `es/${fileName}.min.js`,
    format: 'es'
  }
}, {
  input: `src/${fileName}/index.js`,
  external,
  output: {
    file: `cjs/${fileName}.js`,
    format: 'cjs'
  }
}, {
  input: `src/${fileName}/index.js`,
  external,
  output: {
    file: `cjs/${fileName}.min.js`,
    format: 'cjs'
  }
}, {
  input: `src/${fileName}/index.js`,
  external,
  output: {
    file: `dist/${fileName}.js`,
    format: 'umd',
    name: umdName
  }
}, {
  input: `src/${fileName}/index.js`,
  external,
  output: {
    file: `dist/${fileName}.min.js`,
    format: 'umd',
    name: umdName
  }
}]

export default results('customLibraryTemplate', 'CUSTOM_UMD_GLOBAL_VARIABLE', []).map((object) => ({
  ...common(/.+min\.js$/.test(object.output.file)),
  ...object
}))
