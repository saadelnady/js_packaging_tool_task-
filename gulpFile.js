const { src, dest, series } = require("gulp");
const replace = require("gulp-replace");

const gulbs = {
  html: "./*.html",
  css: "./css/**/*.css",
  js: "./js/**/*.js",
  imgs: "./pics/**/*.jpg",
};
const htmlminify = require("gulp-html-minifier-terser");
function html() {
  return src(gulbs.html)
    .pipe(replace("./css/style.css", "./styles.min.css"))
    .pipe(replace("./css/layout/grids.css", "./styles.min.css"))
    .pipe(replace("./css/layout/hero01.css", "./styles.min.css"))
    .pipe(replace("./css/layout/header.css", "./styles.min.css"))

    .pipe(replace("./pics/gulp.jpg", "./images/gulp.jpg"))
    .pipe(replace("./pics/cover.jpg", "./images/cover.jpg"))

    .pipe(replace("./js/script.js", "./scripts.min.js"))
    .pipe(replace("./js/section.js", "./scripts.min.js"))

    .pipe(htmlminify({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest("./dist"));
}

const concat = require("gulp-concat");
const cleanCss = require("gulp-clean-css");
function css() {
  return src(gulbs.css)
    .pipe(concat("styles.min.css"))
    .pipe(cleanCss())
    .pipe(dest("./dist"));
}
const jsMini = require("gulp-terser");
function js() {
  return src(gulbs.js)
    .pipe(concat("./scripts.min.js"))
    .pipe(jsMini())
    .pipe(dest("./dist"));
}
const imgOptmise = require("gulp-optimize-images");
function img() {
  return src(gulbs.imgs)
    .pipe(imgOptmise({ compressOptions: { jpeg: { quality: 75 } } }))
    .pipe(dest("dist/images"));
}
// exports.htmlTask = html;
// exports.cssTask = css;
// exports.jsTask = js;
// exports.imgsTask = img;

exports.default = series(html, css, js, img);
