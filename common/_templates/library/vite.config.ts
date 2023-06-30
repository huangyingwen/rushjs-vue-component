import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import DefineOptions from 'unplugin-vue-define-options/vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'library',
      fileName: 'index',
      formats: ['es', 'umd', 'cjs']
    },
    rollupOptions: {
      //忽略打包vue文件
      output: {
        dir: 'dist'
      }
    },
    sourcemap: true
  },
  plugins: [

    dts({
      entryRoot: './src',
      outputDir: ['./dist'],
      //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
      tsConfigFilePath: 'tsconfig.json'
    }),
    DefineOptions()
  ]
});
