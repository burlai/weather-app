import { isDev, SRC_DIR, DEST_DIR, assets } from '../../config';
import cache from 'gulp-cached';
import gulp from 'gulp';
import { join } from 'path';
import gulpIf from 'gulp-if';
import { bs } from './browser-sync';

const paths = {
  src: join(SRC_DIR, assets.src, assets.glob),
  dest: join(DEST_DIR, assets.dest)
};

gulp.task('assets', () => {
  return gulp
    .src(paths.src)
    .pipe(gulpIf(isDev, cache(assets.cacheName, { optimizeMemory: true })))
    .pipe(gulp.dest(paths.dest))
    .pipe(gulpIf(isDev, bs.stream()));
});
