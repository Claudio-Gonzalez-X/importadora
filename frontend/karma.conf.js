// karma.conf.js
module.exports = function(config) {
  config.set({
    
    // 1. Frameworks a utilizar
    frameworks: ['jasmine'], // [cite: 139]

    // 2. Archivos a testear
    // Busca en src todos los archivos que terminen en .spec.js
    files: [
      'src/**/*.spec.js' // [cite: 142-145]
    ],

    // 3. Preprocesadores
    // Usamos Webpack para procesar los archivos antes de correr el test
    preprocessors: {
      'src/**/*.spec.js': ['webpack'] // [cite: 150-153]
    },

    // 4. Configuración de Webpack embebida
    webpack: { // [cite: 156]
      mode: 'development', // [cite: 159]
      module: {
        rules: [
          {
            // Regla para JS y JSX (React)
            test: /\.(js|jsx)$/, // [cite: 173]
            exclude: /node_modules/, // [cite: 180]
            loader: 'babel-loader' // [cite: 182]
          },
          {
            // Regla para CSS (Necesario para Tailwind)
            test: /\.css$/, // [cite: 186]
            use: ['style-loader', 'css-loader'] // [cite: 188]
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx'] // [cite: 195, 196]
      }
    },

    // 5. Reportes
    // Agregamos 'coverage' para obtener las métricas del PDF
    reporters: ['progress', 'kjhtml', 'coverage'], // [cite: 200]

    // 6. Configuración del reporte de Cobertura (NUEVO)
    coverageReporter: {
      dir: 'coverage/', // Carpeta donde se guardará el reporte
      reporters: [
        { type: 'html', subdir: 'report-html' }, // Genera una web con gráficos
        { type: 'text-summary' } // Muestra la tabla en la consola
      ]
    },

    // 7. Navegador
    browsers: ['Chrome'], // [cite: 205]
    
    // 8. Ejecución
    // false = El navegador se queda abierto (útil para desarrollar)
    // true = Se cierra al terminar (útil para CI/CD o reporte final)
    singleRun: false // [cite: 215, 216]
  });
};