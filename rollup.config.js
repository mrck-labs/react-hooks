import { extname, relative } from 'path';
import log from 'npmlog';
import dotenv from 'dotenv';
import { glob } from 'glob';
import { fileURLToPath } from 'url';
import { generalPlugins } from './rollup/plugins.js';
import { ignoreWarn } from './rollup/helpers.js';

dotenv.config();

const buildCore = async () => {
    if (!process.env.CI) log.info('ROLLUP:Core', 'Building Core...');

    return {
        ...ignoreWarn,
        input: Object.fromEntries(
            glob.sync('./src/**/!(*.spec).{tsx,ts}').map((file) => [
                // This remove `src/` as well as the file extension from each
                // file, so e.g. src/nested/foo.js becomes nested/foo
                relative(
                    'src',
                    file.slice(0, file.length - extname(file).length)
                ),
                // This expands the relative paths to absolute paths, so e.g.
                // src/nested/foo becomes /project/src/nested/foo.js
                fileURLToPath(new URL(file, import.meta.url)),
            ])
        ),
        output: [
            {
                sourcemap: true,
                preserveModules: true,
                format: 'es',
                dir: 'dist',
                preserveModulesRoot: 'src',
                entryFileNames: (chunkInfo) => {
                    if (chunkInfo.name.includes('node_modules')) {
                        return (
                            chunkInfo.name.replaceAll(
                                'node_modules',
                                'external'
                            ) + '.mjs'
                        );
                    }

                    return '[name].mjs';
                },
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
            {
                preserveModules: true,
                format: 'cjs',
                dir: 'dist',
                preserveModulesRoot: 'src',
                entryFileNames: (chunkInfo) => {
                    if (chunkInfo.name.includes('node_modules')) {
                        return (
                            chunkInfo.name.replaceAll(
                                'node_modules',
                                'external'
                            ) + '.cjs'
                        );
                    }

                    return '[name].cjs';
                },
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        ],
        plugins: [...generalPlugins()],
    };
};

const buildAll = () => {
    return Promise.all([buildCore()]).then((d) => d.flat());
};

export default buildAll();
