import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/main.jsx',
      name: 'FeedbackWidget',
    },
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: null, // Disable code-splitting
        entryFileNames: 'assets/js/feedback-widget.js',
        assetFileNames: 'assets/[ext]/feedback-widget.[ext]',
      },
    },
  },
  define: {
    // https://github.com/vitejs/vite/issues/1973#issuecomment-787571499
    'process.env': {},
  },
})
