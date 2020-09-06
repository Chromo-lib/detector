import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/content.js',
  output:
  {
    name: 'covid',
    file: 'public/content.js',
    format: 'umd',
    plugins: [
      terser()
    ]
  }
};