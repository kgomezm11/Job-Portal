/** @type {import('next').NextConfig} */
const path = require('path');

let CopyWebpackPlugin;
try {
  // intenta cargar el plugin (debe estar en dependencies o devDependencies)
  CopyWebpackPlugin = require('copy-webpack-plugin');
} catch (e) {
  // si no está disponible, no fallamos aquí — el build después fallará si el worker es necesario,
  // pero evitamos romper la evaluación del archivo de config.
  CopyWebpackPlugin = null;
}

function findPdfWorkerPath() {
  const candidates = [
    // rutas comunes según versiones de pdfjs-dist
    'pdfjs-dist/build/pdf.worker.min.js',
    'pdfjs-dist/legacy/build/pdf.worker.min.js',
    'pdfjs-dist/es5/build/pdf.worker.min.js',
    'pdfjs-dist/web/pdf.worker.js',
    'pdfjs-dist/build/pdf.worker.js',
  ];

  for (const candidate of candidates) {
    try {
      // require.resolve lanzará si no existe el archivo dentro del paquete
      const resolved = require.resolve(candidate);
      return resolved;
    } catch (err) {
      // no encontrado, probar siguiente
    }
  }
  return null;
}

const nextConfig = {
  images: {
    domains: ['api.dicebear.com', 'xsgames.co'],
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // localizamos el worker
    const workerPath = findPdfWorkerPath();

    if (CopyWebpackPlugin && workerPath) {
      // Copiamos el worker a public/pdf.worker.min.js para servirlo estático
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: workerPath,
              to: path.join(__dirname, 'public', path.basename(workerPath)),
            },
          ],
        })
      );
    } else if (!workerPath) {
      // Aviso en consola (aparecerá en logs)
      // eslint-disable-next-line no-console
      console.warn(
        '[next.config.js] pdf.worker not found in known pdfjs-dist paths. ' +
          'Check the installed pdfjs-dist version and its worker location.'
      );
    } else {
      // CopyWebpackPlugin no disponible
      // eslint-disable-next-line no-console
      console.warn(
        '[next.config.js] copy-webpack-plugin is not installed or not accessible during build.'
      );
    }

    // no tocar entry/output — Next los maneja
    return config;
  },
};

module.exports = nextConfig;
