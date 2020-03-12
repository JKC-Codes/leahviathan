const
	gulp = require('gulp'),
	destination = "./temp/leahviathan/",
	del = require('del'),
	htmlmin = require('gulp-htmlmin'),
	sass = require('gulp-sass'),
	terser = require('gulp-terser'),
	imagemin = require('gulp-imagemin'),
	shell = require('child_process').exec
;

function temp() {
	return del('./temp/');
}

function eleventy() {
	return shell('eleventy --output="' + destination + '"');
}

function html() {
	return gulp.src(destination + '**/*.html')
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
	.pipe(gulp.dest(destination));
}

sass.compiler = require('dart-sass');
function css() {
	return gulp.src('sass/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest(destination + 'css'));
}

function js() {
	return gulp.src(destination + '**/*.js')
		.pipe(terser())
		.pipe(gulp.dest(destination));
}

function img() {
	return gulp.src(destination + '**/img/**')
	.pipe(imagemin([
		imagemin.gifsicle(),
		imagemin.mozjpeg(),
		imagemin.optipng(),
		imagemin.svgo({plugins: [{removeViewBox: false}]})
	]))
		.pipe(gulp.dest(destination));
}

function netlify() {
	return shell('netlify deploy --dir=temp --prod');
}

function browser() {
	return shell('start firefox.exe -private-window https://jkc-codes.netlify.app/leahviathan');
}

function redirect() {
	return gulp.src('./staging/index.html')
		.pipe(gulp.dest('./temp/'));
}

function delDocs() {
	return del('./docs/**');
}

function createDocs() {
	return gulp.src('./temp/leahviathan/**')
		.pipe(gulp.dest('./docs/'));
}

function git() {
	return shell('git add docs && git commit -m \"Build for publishing\" && git push');
}


exports.stage = gulp.series(
	temp,
	eleventy,
	gulp.parallel(
		html,
		css,
		js,
		img,
		redirect
	),
	netlify,
	gulp.parallel(
		browser,
		temp
	)
);

exports.publish = gulp.series(
	gulp.parallel(
		delDocs,
		gulp.series(
			temp,
			eleventy,
			gulp.parallel(
				html,
				css,
				js,
				img
			)
		)
	),
	createDocs,
	temp,
	git
);