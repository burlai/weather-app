import { isDev, SRC_DIR, DEST_DIR, html } from '../../config';
import cache from 'gulp-cached';
import gulp from 'gulp';
import { join } from 'path';
import gulpIf from 'gulp-if';
import { bs } from './browser-sync';

const paths = {
  src: join(SRC_DIR, html.src, html.glob),
  dest: join(DEST_DIR, html.dest)
};

gulp.task('html', () => {
  return gulp
    .src(paths.src)
    .pipe(gulpIf(isDev, cache(html.cacheName, { optimizeMemory: true })))
    .pipe(gulp.dest(paths.dest))
    .pipe(gulpIf(isDev, bs.stream()));
});
