import os from 'os';
import {Config, WebpackOverrideFn} from 'remotion';
import { replaceLoadersWithBabel } from "@remotion/babel-loader";

// Config.Rendering.setConcurrency(os.cpus().length);
Config.Output.setOverwriteOutput(true);

type Bundler = 'webpack' | 'esbuild';

const WEBPACK_OR_ESBUILD = 'esbuild' as Bundler;

export const webpackOverride: WebpackOverrideFn = (currentConfiguration) => {
	const replaced = (() => {
		if (WEBPACK_OR_ESBUILD === 'webpack') return replaceLoadersWithBabel(currentConfiguration);
		return currentConfiguration;
	})();
	return {
		...replaced,
		module: {
			...replaced.module,
			rules: [
				...(replaced.module?.rules ?? []),
        {
          test: /\.(glsl|frag|vert)$/,
					exclude: [/node_modules/],
					use: ['glslify-import-loader','raw-loader','glslify-loader']
        },
			],
		},
	};
};

Config.Bundling.overrideWebpackConfig(webpackOverride);

Config.Rendering.setImageFormat('jpeg');
