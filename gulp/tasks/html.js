const chalk = require('chalk');

const log = add('@gulp/core/log');

module.exports = (gulp, plugins, config) => {
    const {
        paths: {
            src: {
                html: {
                    root: srcRoot,
                    main: src,
                    partials
                }
            },
            output: {
                html: dest
            }
        },
        plugins: params,
        args: {
            mode
        },
        title,
        description,
        icomoon,
        now
    } = config;

    const {
        plumber,
        fileInclude
    } = plugins;

    const context = {
        title,
        description,
        mode,
        icomoon,
        now
    };

    return done => {
        log(`${chalk.bold('Сборка HTML файлов...')}`);

        return gulp.src(src)
            .pipe(plumber())
            .pipe(fileInclude({
                ...params.fileInclude,
                basepath: partials,
                context
            }))
            .pipe(gulp.dest(dest))
            .on('end', done);
    };
};