import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const common = {
  input: 'src/index.js',
  external: [],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    process.env.BUILD === 'production' && terser(),
  ],
};

export default {
  ...common,
};
