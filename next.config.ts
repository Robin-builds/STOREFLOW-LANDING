import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Fija la raíz al proyecto: hay un package-lock.json suelto en una carpeta superior
    // que Next tomaría como raíz y genera un warning en el build.
    root: path.resolve(process.cwd()),
    // Tailwind v4 se procesa con su loader de Turbopack (configurado por create-next-app 16)
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
