const
	gulp = require('gulp'),
	path = require('./html/_data/path'),
	destination = `./temp${path.site}/`,
	del = require('del'),
	htmlmin = require('gulp-htmlmin'),
	sass = require('gulp-sass'),
	terser = require('gulp-terser'),
	imagemin = require('gulp-imagemin'),
	shell = require('child_process').exec
;

function removeTemp() {
	return del('./temp/');
}

function eleventy() {
	return shell(`npx @11ty/eleventy --output="${destination}"`);
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
	return shell(`start firefox.exe -private-window https://jkc-codes.netlify.app${path.site}`);
}

function redirect() {
	return gulp.src('./staging/index.html')
		.pipe(gulp.dest('./temp/'));
}

function removeDocs() {
	return del('./docs/**');
}

function createDocs() {
	return gulp.src(destination + '**')
		.pipe(gulp.dest('./docs/'));
}

function git() {
	return shell('git add docs && git commit -m \"Build for publishing\" && git push');
}


exports.stage = gulp.series(
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
		removeTemp
	)
);

exports.publish = gulp.series(
	gulp.parallel(
		removeDocs,
		gulp.series(
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
	removeTemp,
	git
);