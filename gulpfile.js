const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/styles'));
}

function funcaoPadrao(callback) {
    setTimeout(function() {
        console.log("executando via Gulp");
        callback();
    }, 2000);
}

function dizOi(callback) {
    setTimeout(function() {
        console.log("ola gulp");
        dizTchau();
        callback();
    }, 1000);
}

function dizTchau() {
    console.log("tchau gulp");
}

function watchFiles() {
    gulp.watch('./source/styles/*.scss',{ignoreInitial:false}, gulp.series(compilaSass));
}

exports.default = gulp.parallel(funcaoPadrao, dizOi);
exports.dizOi = dizOi;
exports.sass = compilaSass;
exports.watch = watchFiles;