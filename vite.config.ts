import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
import react from "@vitejs/plugin-react";
import { analyzer } from "vite-bundle-analyzer";
import UnpluginInjectPreload from "unplugin-inject-preload/vite";

const ReactCompilerConfig = {
  /* ... */
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
    UnpluginInjectPreload({
      files: [
        {
          outputMatch: /index-[a-zA-Z0-9-_]*.(css|js)$/,
          attributes: {
            crossorigin: "true",
          },
        },
      ],
    }),
    analyzer({
      analyzerPort: "auto",
    }),
  ],
});
