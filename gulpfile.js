const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

// Função para comprimir imagens
function comprimeImagens() {
return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}

// Função para comprimir JavaScript
function comprimeJavaScript() {
return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'));
}

// Função para compilar Sass
function compilaSass() {
return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
    outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/styles'));
}

// Funções adicionais
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

// Função para assistir mudanças nos arquivos Sass
function watchFiles() {
gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
}

// Registro de tarefas
gulp.task('images', comprimeImagens);
gulp.task('javascript', comprimeJavaScript);
gulp.task('sass', compilaSass);
gulp.task('watch', watchFiles);
gulp.task('default', gulp.series('javascript', 'images'));

// Exportação de funções para CLI
exports.default = gulp.parallel(funcaoPadrao, dizOi);
exports.dizOi = dizOi;
exports.sass = compilaSass;
exports.watch = watchFiles;
exports.javascript = comprimeJavaScript;
