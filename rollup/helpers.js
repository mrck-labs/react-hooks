export const ignoreWarn = {
    onwarn(warning, warn) {
        // Ignore this is undefined error because of inlinesvg package
        if (
            warning.code === 'THIS_IS_UNDEFINED' ||
            warning.code === 'MODULE_LEVEL_DIRECTIVE'
        )
            return;
        warn(warning);
    },
};
