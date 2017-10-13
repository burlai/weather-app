import { isDev, SRC_DIR, DEST_DIR, fonts } from '../../config';
import cache from 'gulp-cached';
import gulp from 'gulp';
import { join } from 'path';
import gulpIf from 'gulp-if';
import { bs } from './browser-sync';
import flatten from 'gulp-flatten';

const paths = {
  src: join(SRC_DIR, fonts.src, fonts.glob),
  dest: join(DEST_DIR, fonts.dest)
};

gulp.task('fonts', () => {
  return gulp
    .src(paths.src)
    .pipe(gulpIf(isDev, cache(fonts.cacheName, { optimizeMemory: true })))
    .pipe(flatten())
    .pipe(gulp.dest(paths.dest))
    .pipe(gulpIf(isDev, bs.stream()));
});
