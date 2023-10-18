import path from 'path';
import { fileURLToPath } from 'url';
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "production",
  entry: "./src/index.ts",
  resolve: {
    extensions: [".ts"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
  },
  target: "node",
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "cache-loader",
            options: {
              cacheDirectory: path.resolve(".webpackCache"),
            },
          },
          "babel-loader",
        ],
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};