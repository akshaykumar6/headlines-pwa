import CopyWebpackPlugin from 'copy-webpack-plugin';
const WorkboxPlugin = require('workbox-webpack-plugin');

export default config => {
  config.plugins.push(
    new WorkboxPlugin.InjectManifest({
      swSrc: './service-worker.js',
      swDest: './service-worker.js',
      include: [/\.html$/, /\.js$/, /\.svg$/, /\.css$/, /\.png$/, /\.ico$/]
    })
  );
  
  config.plugins.push(new CopyWebpackPlugin([{ context: `${__dirname}/src/assets`, from: `*.*` }]) );

  return config;
};