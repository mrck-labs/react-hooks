import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import ts from 'rollup-plugin-ts';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import preserveDirectives from 'rollup-plugin-preserve-directives';

export const generalPlugins = () =>
    [
        peerDepsExternal(),
        resolve({
            preferBuiltins: true,
        }),
        postcss({
            config: {
                path: '../src/scss/postcss.config.js',
            },
            plugins: [],
            minimize: true,
            use: ['sass'],
            inject: {
                insertAt: 'top',
            },
        }),
        commonjs(),
        json(),
        ts({
            transpiler: 'swc',
            transpileOnly: true,
        }),
        preserveDirectives({ supressPreserveModulesWarning: true }),
        terser({
            compress: {
                directives: false,
            },
            output: {
                comments: 'all',
            },
        }),
        process.env.CI || process.env.COMPONENT_TO_BUILD ? null : filesize(),
    ].filter(Boolean);
