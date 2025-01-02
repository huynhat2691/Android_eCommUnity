// import path from "path";
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: [
//       {
//         find: '@/',
//         // eslint-disable-next-line no-undef
//         replacement: path.resolve(__dirname, './src')
//       }
//     ]
//   },
// });

//////////////////////////////////////////////////////////

// import path from "path";
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: 'dist',
//   },
//   server: {
//     host: true
//   },
//   resolve: {
//     alias: [
//       {
//         find: '@/',
//         // eslint-disable-next-line no-undef
//         replacement: path.resolve(__dirname, './src')
//       }
//     ]
//   },
// });

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://192.168.1.4:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: path.resolve(__dirname, './src')
      }
    ]
  },
  build: {
    outDir: 'dist', // Thư mục output sau khi build
    emptyOutDir: true, // Xóa thư mục dist cũ trước khi build
    minify: true, // Minify code
    sourcemap: true, // Không tạo sourcemap file
    // Các tùy chọn build khác nếu cần
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
});
