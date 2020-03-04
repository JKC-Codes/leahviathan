const
	gulp = require('gulp'),
	baseFolder = `./staging/`,
	del = require('del'),
	htmlmin = require('gulp-htmlmin'),
	sass = require('gulp-sass'),
	terser = require('gulp-terser'),
	imagemin = require('gulp-imagemin'),
	shell = require('child_process').exec
;

function resetStaging() {
	return del(baseFolder + '*');
}

function eleventy() {
	return shell('eleventy');
}

function html() {
	return gulp.src(baseFolder + '**/*.html')
	.pipe(htmlmin({
		collapseBooleanAttributes: true,
		collapseInlineTagWhitespace: true,
		collapseWhitespace: true,
		conservativeCollapse: true,
		minifyCSS: true,
		minifyJS: true,
		preserveLineBreaks: true,
		removeComments: true,
		removeEmptyAttributes: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true
	}))
	.pipe(gulp.dest(baseFolder));
}

sass.compiler = require('dart-sass');
function css() {
	return gulp.src('sass/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest(baseFolder + 'css'));
}

function js() {
	return gulp.src(baseFolder + '**/*.js')
		.pipe(terser())
		.pipe(gulp.dest(baseFolder));
}

function img() {
	return gulp.src(baseFolder + '**/img/**')
	.pipe(imagemin([
		imagemin.gifsicle(),
		imagemin.mozjpeg(),
		imagemin.optipng(),
		imagemin.svgo({plugins: [{removeViewBox: false}]})
	]))
		.pipe(gulp.dest(baseFolder));
}

function netlify() {
	return shell('netlify deploy --dir=staging --prod');
}

function browser() {
	return shell('start firefox.exe -private-window https://jkc-codes.netlify.app');
}

function resetDocs() {
	return del('./docs/*');
}

function createDocs() {
	return gulp.src(baseFolder + '**')
		.pipe(gulp.dest('./docs'));
}

function git() {
	return shell('git add docs && git commit -m \"Build for publishing\" && git push');
}

gulp.task('stage', gulp.series(resetStaging, eleventy, gulp.parallel(html, css, js, img), netlify, browser));
gulp.task('publish', gulp.series(resetDocs, createDocs, git));