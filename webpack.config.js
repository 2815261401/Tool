// 引入一个包,拼接路径
const path = require("path");
// webpack中所有的配置信息都应该写在module.exports中
module.exports = {
	mode: "production",
	// 指定入口文件
	entry: {
		index: "./src/index",
	},
	// 指定打包文件所在的目录
	output: {
		// 打包后文件的名字
		filename: "[name].js",
		// 指定打包文件的目录
		path: path.resolve(__dirname, "./lib"),
		library: {
			type: "commonjs-static",
		},
		clean: true,
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	// 指定webpack打包时要使用的模块
	module: {
		// 指定要加载的规则
		rules: [
			{
				// test指定的是规则生效的文件, 以ts结尾的文件
				test: /\.ts$/,
				// 要使用的loader
				use: "ts-loader",
				// 要排除的文件
				exclude: /node_modules/,
			},
		],
	},
};
