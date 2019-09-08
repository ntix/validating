import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';

const pkg = require('./package.json');

export default {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    },
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    }
  ],
  watch: {
    include: 'src/**'
  },
  plugins: [
    typescript({
      tsconfig: 'tsconfig.build.json'
    }),
    json()
  ]
};
