const webpack = require("webpack");

const buildWebpack = (outDir, inDir) => {
  webpack(
    {
      entry: `${inDir}index.js`,
      output: {
        filename: "bundle.js",
        path: outDir
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  require("babel-preset-env"),
                  require("babel-preset-react")
                ],
                plugins: [require("babel-plugin-transform-object-rest-spread")]
              }
            }
          }
        ]
      }
    },
    (err, stats) => {
      if (err || stats.hasErrors()) {
        console.log(stats.toString());
        // Handle errors here
      }
      // Done processing
    }
  );
};

module.exports = buildWebpack;