const gulp = require('gulp')
const sass = require('gulp-saa')
const browserSync = require('browser-sync').create()
const postcss = require('gulp-postcss') // Load the postcss library
const autoprefixer = require('autoprefixer') // Load the autoprefixer plugin
const cssnano = require('cssnano') // Load the cssnano pluging
//Define a task to complie Sass and run autoprefixer and cssnano
gulp.task('sass', function (){
const plugins = [
  autoprefixer({browsers: ['last 2 version']}),
  cssnano()
]
return gulp
.src('scss/**/*.scss') // source of any saa files
.pipe(sass()) // run the saa compiler on the source file
.pipe(gulp.dest('css'))// destination for the compiled css files
.pipe(postcss(plugins)) // apply the postcss plugins
.pipe(gulp.dest('./css/min')) // path to output the minified css file
.pipe(browserSynce.stream()) // run the browsersync stream
})

//Define the default task
gulp.task('defult', function(){
  // initialize browserSync on the current folder
  browserSynce.init({ server: './'})
  // watch for change to any files in scss folder and its sub folder and with .scc extension,runn the sass task when a change is found
  gulp.watch('scss/**/*.scss', gulp.series('sass'))
  // watch for changes on any .html file and reload the browser on change
  gulp.watch('*.html').on('change', browserSynce.reload)
})
