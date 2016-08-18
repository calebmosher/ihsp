var gulp = require("gulp"),
	browserify = require("browserify"),
	source = require("vinyl-source-stream"),
	rename = require("gulp-rename"),
	notify = require("gulp-notify"),
	sass = require("gulp-sass"),
	connect = require('gulp-connect-php');



// Local Server
gulp.task("server", function() {
	connect.server({
		port: "9000"
	});
});



// CSS
gulp.task("sass", function() {
	return gulp.src("src/scss/*.scss")
		.pipe(sass())
		.pipe(rename("main.built.css"))
		.pipe(gulp.dest("dist/built"))
		.pipe(notify("Finished Sass"));
});

gulp.task("scss", ["sass"]);
gulp.task("css", ["sass"]);



// Javascript
gulp.task("browserify", function() {
    return browserify("src/js/index.js")
		.bundle()
		.pipe(source("main.built.js"))
		.pipe(gulp.dest("dist/built"))
		.pipe(notify("Finished Browserify"));
});

gulp.task("js", ["browserify"]);


// Default
gulp.task("default", ["browserify", "sass"]);

gulp.task("watch", ["default"], function() {
    gulp.watch("src/js/*.js", ["browserify"]);
    gulp.watch("src/scss/*.scss", ["sass"]);
});
