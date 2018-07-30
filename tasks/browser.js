/**
 * @fileOverview
 * @author wb-lyn227583
 */
import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import args from './util/args';

gulp.task('browser',(cd)=>{
  if(!args.watch)return cd();

  gulp.watch(['app/**/*.js'],['scripts']);
  gulp.watch(['app/**/*.ejs'],['pages']);
  gulp.watch(['app/**/*.css'],['css']);

});









