// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
/* import { readFileSync } from 'node:fs'

const PATH = './src/certs/' */

export default defineConfig({
  plugins: [react()]
  /* server: {
    host: 'notebook.net',
    https: {
      key: readFileSync(`${PATH}notebook.net.key`),
      cert: readFileSync(`${PATH}notebook.net.crt`)
    }
  } */
})
