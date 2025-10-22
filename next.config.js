/** @type {import('next').NextConfig} */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nextConfig = {
  images: {
    domains: ['api.dicebear.com', 'xsgames.co'],
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Copiar el worker de pdfjs a la carpeta 'public' para servirlo como /pdf.worker.min.js
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.js'),
            to: path.join(__dirname, 'public', 'pdf.worker.min.js'),
          },
        ],
      })
    );

    // Si hay algo más que necesites ajustar en config (ej. rules), hazlo aquí.
    return config;
  },
};

module.exports = nextConfig;
