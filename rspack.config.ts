import { defineConfig } from "@rspack/cli"
import { rspack } from "@rspack/core"
import * as RefreshPlugin from "@rspack/plugin-react-refresh"
import { join } from "path"

const isDev = process.env.NODE_ENV === "development"

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"]

export default defineConfig({
	context: __dirname,
	entry: {
		resume: "./src/resume/index.tsx"
	},
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"],
		alias: {
			"@api": join(__dirname, "src", "api"),
			"@resume": join(__dirname, "src", "resume"),
			"@util": join(__dirname, "src", "util"),
		},
	},
	devServer: {
		port: 8080,
		proxy: [{
			context: ['/api/0/'],
			target: 'http://localhost:12233'
		}]
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset"
			},
			{
				test: /\.(jsx?|tsx?)$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "typescript",
									tsx: true
								},
								transform: {
									react: {
										runtime: "automatic",
										development: isDev,
										refresh: isDev
									}
								}
							},
							env: { targets }
						}
					}
				]
			}
		]
	},
	plugins: [
		new rspack.HtmlRspackPlugin({
			template: "./public/resume.html",
			chunks: ["resume"],
		}),
		isDev ? new RefreshPlugin() : null
	].filter(Boolean),
	optimization: {
		minimizer: [
			new rspack.SwcJsMinimizerRspackPlugin(),
			new rspack.LightningCssMinimizerRspackPlugin({
				minimizerOptions: { targets },
			}),
		],
	},
	experiments: {
		css: true
	}
})
