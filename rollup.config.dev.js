import serve from 'rollup-plugin-serve';
import resolve from '@rollup/plugin-node-resolve';
import commonJs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postCss from 'rollup-plugin-postcss';
import terser from "@rollup/plugin-terser";
import dts from 'rollup-plugin-dts';
import json from '@rollup/plugin-json';
import pkg from './package.json' assert { type: 'json' };
const { name, homepage, version, dependencies } = pkg;

const umdConf = {
  format: 'umd',
  name: 'Globe',
  banner: `// Version ${version} ${name} - ${homepage}`
};

export default [
  {
    input: 'src/index.js',
    output: [
      {
        ...umdConf,
        file: `dist/${name}.js`,
        sourcemap: true
      }
    ],
    plugins: [
      json(),
      resolve(),
      commonJs(),
      postCss(),
      babel({ exclude: 'node_modules/**', babelHelpers: 'bundled' })
    ]
  },
  {
    input: 'src/main.js',
    output: [
      {
        ...umdConf,
        file: `dist/main.js`,
        sourcemap: true
      }
    ],
    plugins: [
      json(),
      resolve(),
      commonJs(),
      postCss(),
      terser(),
      babel({ exclude: 'node_modules/**', babelHelpers: 'bundled' })
    ]
  },
  {
    input: 'src/main_u.js',
    output: [
      {
        ...umdConf,
        file: `dist/main_u.js`,
        sourcemap: true
      }
    ],
    plugins: [
      json(),
      resolve(),
      commonJs(),
      postCss(),
      terser(),
      babel({ exclude: 'node_modules/**', babelHelpers: 'bundled' })
    ]
  }
];