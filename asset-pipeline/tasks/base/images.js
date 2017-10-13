import { isDev, SRC_DIR, DEST_DIR, images } from '../../config';
import cache from 'gulp-cached';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import { join } from 'path';
import gulpIf from 'gulp-if';
import { bs } from './browser-sync';
import flatten from 'gulp-flatten';

const paths = {
  src: join(SRC_DIR, images.src, images.glob),
  dest: join(DEST_DIR, images.dest)
};

gulp.task('images', () => {
  return gulp
    .src(paths.src)
    .pipe(gulpIf(isDev, cache(images.cacheName, { optimizeMemory: true })))
    .pipe(imagemin())
    .pipe(flatten())
    .pipe(gulp.dest(paths.dest))
    .pipe(gulpIf(isDev, bs.stream()));
});
