import { isDev, SRC_DIR, jsLint } from '../../config';
import gulp from 'gulp';
import { join } from 'path';
import eslint from 'gulp-eslint';
import cache from 'gulp-cached';
import gulpIf from 'gulp-if';

const paths = {
  src: join(SRC_DIR, jsLint.src, jsLint.glob)
};

gulp.task('js-lint', () => {
  return gulp
    // TODO(tsm): Check why on earth this line can't ignore the node_module dir.
    // Ofc dont forget to use ROOT_DIR instead of SRC_DIR.
    // .src([paths.src, jsLint.ignoreGlob])
    .src(paths.src)
    .pipe(gulpIf(isDev, cache(jsLint.cacheName)))
    .pipe(eslint())
    .pipe(eslint.format());
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    // .pipe(eslint.failAfterError());
});
