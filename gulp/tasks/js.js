module.exports = (gulp, plugins, config) => {
    return done => {

        const jsCompiler = (path, merge, minify, cb) =>
            gulp.src(path)
                .pipe(plugins.changed(config.paths.output.js))
                .pipe(plugins.plumber())
                .pipe(plugins.fileInclude({
                    prefix: `@@`,
                    basepath: config.paths.src.js.partials,
                    context: {
                        config
                    }
                }))
                .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.init()))
                .pipe(plugins.if(merge, plugins.if(path === config.paths.src.js.polyfills, plugins.concat(config.files.polyfills), plugins.concat(config.files.js))))
                .pipe(plugins.if(minify || config.minify.js, plugins.terser({
                    output: {
                        comments: false
                    }
                }), plugins.beautify.js({
                    indent_size: 4,
                    max_preserve_newlines: 2
                })))
                .pipe(plugins.if(config.minify.js, plugins.rename(path => {
                    path.basename += `.min`;
                })))
                .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write()))
                .pipe(gulp.dest(config.paths.output.js))
                .on(`end`, cb);

        const compileJsAll = cb => jsCompiler([config.paths.src.js.base, config.paths.src.js.components], true, false, cb);
        const compileJsBase = cb => jsCompiler(config.paths.src.js.base, true, false, cb);
        const compileJsComponents = cb => jsCompiler(config.paths.src.js.components, false, false, cb);
        const compileJsPolyfills = cb => jsCompiler(config.paths.src.js.polyfills, true, true, cb);

        const tasks = config.merge ? [compileJsPolyfills, compileJsAll] : [compileJsPolyfills, compileJsBase, compileJsComponents];

        gulp.parallel(...tasks)(done);
    };
};