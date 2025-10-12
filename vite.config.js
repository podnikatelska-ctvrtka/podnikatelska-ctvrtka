import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Šetří místo
    minify: 'esbuild', // Rychlejší než terser
    cssCodeSplit: true, // Rozdělí CSS
    chunkSizeWarningLimit: 600, // Warning při velkých chuncích
    
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React (nejdůležitější)
          'vendor-react': ['react', 'react-dom'],
          
          // UI knihovny
          'vendor-ui': [
            'lucide-react',
            'sonner',
            'motion/react'
          ],
          
          // Radix UI komponenty (hodně balíčků!)
          'vendor-radix': [
            '@radix-ui/react-slot',
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-select',
            '@radix-ui/react-switch'
          ],
          
          // Supabase
          'vendor-supabase': ['@supabase/supabase-js'],
          
          // Charts (pokud se používají)
          'vendor-charts': ['recharts']
        }
      }
    }
  },
  
  // Optimalizace dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react',
      '@supabase/supabase-js'
    ]
  }
})
