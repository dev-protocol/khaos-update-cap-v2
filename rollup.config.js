import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import inject from '@rollup/plugin-inject'

export default [
	{
		input: 'dist/index.js',
		output: [
			{
				file: 'bundled/index.js',
				format: 'cjs',
			},
		],
		plugins: [
			nodeResolve({ preferBuiltins: true }),
			commonjs(),
			terser(),
			json(),
			inject({
				fetch: ['cross-fetch', 'fetch'],
			}),
		],
	},
]
