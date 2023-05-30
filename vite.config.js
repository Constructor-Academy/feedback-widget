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
      external: (id) => {
        // Bundle react and react-dom in the build, and leave all other dependencies as external.
        if (id === 'react' || id === 'react-dom') {
          return false
        }

        // Default behavior: All dependencies in node_modules are treated as externals.
        return id.includes('node_modules')
      },
    },
  },
  define: {
    // https://github.com/vitejs/vite/issues/1973#issuecomment-787571499
    'process.env': {},
  },
})
