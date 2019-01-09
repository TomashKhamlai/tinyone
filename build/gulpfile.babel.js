;'use strict';

import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import browser from 'browser-sync';
import rimraf from 'rimraf';
import fs from 'fs';

const $ = plugins();

gulp.task(
    'default', gulp.series(
        gulp.parallel(
            clean,
            fixpug
        ),
        gulp.parallel(
            assets,
            copyFixed
        ),
        gulp.parallel(
            assets,
            copyJS,
            sass,
            template
        ),
        gulp.parallel(
            server,
            watcher
        )
    )
);

gulp.task('rebuild', gulp.series(
    clean,
    gulp.parallel(
        assets,
        copyJS,
        sass,
        template
    )
));

function clean(done) {
    return rimraf('../dist', done);
}

function fixpug() {
    return gulp.src('../src/pug-src/*.pug')
        .pipe($.pugBeautify({ omit_empty: true }))
        .pipe(gulp.dest('../src/pug'));
}

function copyFixed() {
    return gulp.src('../src/pug/*.pug')
        .pipe(gulp.dest('../src/pug-src'));
}

function copyJS() {
    return gulp.src('../src/js/*.js')
        .pipe(gulp.dest('../dist/js'))
}

function sass(done) {
    return gulp.src('../src/scss/style.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe(gulp.dest('../dist/css'));
};

function template() {
    return gulp.src('../src/pug-src/index.pug')
        .pipe($.pug({
            pretty: true,
            data: JSON.parse(fs.readFileSync('../src/pug-src/index.json', { encoding: 'utf8' }))
        }))
        .pipe(gulp.dest('../dist'));
};

function assets() {
    return gulp.src('../src/img/*')
        .pipe(gulp.dest('../dist/content/img'));

}

function watcher() {
    gulp.watch(
        ['../src/scss/*.scss', '../src/pug-src/*.pug']
    ).on('change', gulp.series(
        'rebuild', browser.reload
        )
    );
};

// Start a server with LiveReload to preview the site in
function server(done) {
    browser.exit();
    browser.init({
        server: 'dist'
    });
    done();
}