import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args';

gulp.task('img',()=>{
  return gulp.src('app/img/*')
    .pipe(gulp.dest('server/public/img'))

})
