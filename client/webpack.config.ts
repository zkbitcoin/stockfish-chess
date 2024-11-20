import path from "path";
import * as webpack from "webpack";
// @ts-ignore
import * as webpackDevServer from 'webpack-dev-server';
import {HotModuleReplacementPlugin} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import {ProvidePlugin} from "webpack";
import Dotenv from "dotenv-webpack";

const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const paths = require('paths');

const nodeEnv = process.env['NODE_ENV'] || "development";
const isProduction = nodeEnv === "production";

const basePath = '/games/stockfish-chess/client';

const config: webpack.Configuration = {
    stats: { children: true },
    mode: isProduction ? "production" : "development",
    entry: "./src/index.tsx",
    output: {
        filename: isProduction ? "static/js/bundle.js" : "bundle.js",
        publicPath: isProduction ? "auto" : basePath,
        path: path.resolve(__dirname, "build/"),
        //globalObject: 'typeof self !== "object" ? self : this'
        assetModuleFilename: 'static/assets/[name].[contenthash][ext]',
        clean: true,
    },
    devtool: isProduction ? false : 'inline-source-map',
    optimization: {
        splitChunks: {
            chunks: `async`,
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                use: 'ts-loader',
                exclude: /node_modules\/(?!@personaelabs)/,
            },
            {
                test: /\.(sass|css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                    },
                    'sass-loader',
                ]
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg|png|gif|ico|jpg|mp4)($|\?)/,
                type: 'asset',
            },
            {
                test: /\.(png|jpe?g|gif|jp2|webp)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ],
    },
    resolve: {
        alias: {
            react: path.resolve('./node_modules/react'),
            chakra: path.resolve(__dirname, './node_modules/@chakra-ui/react'),
            "process/browser": require.resolve('process/browser'),
        },
        extensions: [".tsx", ".ts", ".js"],
        fallback: {
            crypto: false,      // require.resolve("crypto-browserify") can be polyfilled here if needed
            stream: false,      // require.resolve("stream-browserify") can be polyfilled here if needed
            assert: false,      // require.resolve("assert") can be polyfilled here if needed
            http: false,        // require.resolve("stream-http") can be polyfilled here if needed
            https: false,       // require.resolve("https-browserify") can be polyfilled here if needed
            os: false,          // require.resolve("os-browserify") can be polyfilled here if needed
            url: false,         // require.resolve("url") can be polyfilled here if needed
            zlib: false,        // require.resolve("browserify-zlib") can be polyfilled here if needed
            fs: false,
            buffer: require.resolve('buffer/'),
            path: require.resolve("path-browserify")
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new Dotenv(),
        new WebpackManifestPlugin({
            fileName: "asset-manifest.json",
            publicPath: paths.publicUrlOrPath,
            generate: (seed: any, files: any[], entrypoints: { main: any[]; }) => {
                const manifestFiles = files.reduce((manifest, file) => {
                    manifest[file.name] = file.path;
                    return manifest;
                }, seed);
                const entrypointFiles = entrypoints.main.filter(
                    (fileName) => !fileName.endsWith(".map")
                );
                return {
                    files: manifestFiles,
                    entrypoints: entrypointFiles,
                };
            },
        }),
        new HtmlWebpackPlugin({
            template: "public/index.html",
            templateParameters: {
                PUBLIC_URL: paths.publicUrlOrPath,
            },
        }),
        new HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        new ESLintPlugin({
            extensions: ["js", "jsx", "ts", "tsx"],
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'public'), to: path.resolve(__dirname, 'build/static') },
            ],
        }),
        new ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
    devServer: {
        headers: [
            { "key": "Cross-Origin-Embedder-Policy", "value": "require-corp" },
            { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" }
        ],
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
        static: {
            directory: path.join(__dirname, "public"),
            publicPath: '/games/stockfish-chess/client',
        },
        historyApiFallback: {
            index: '/games/stockfish-chess/client/index.html', // Ensure correct handling of routes
        },
        port: 4000,
        open: true,
        hot: !isProduction,
        compress: true,
    }

};

export default config;
