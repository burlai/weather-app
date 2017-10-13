import { isDev, isProd, SRC_DIR, DEST_DIR, ROOT_DIR, js, jsLint } from '../../config';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import { join } from 'path';
// import hmr from 'browserify-hmr';
import { bs } from './browser-sync';
import gulpIf from 'gulp-if';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';

const paths = {
  src: join(SRC_DIR, js.src, js.fileName),
  dest: join(DEST_DIR, js.dest)
};

const preTasks = (isDev && !jsLint.ideSupport) ? ['js-lint'] : [];

const options = {
  debug: true,
  noParse: js.noParse,
  entries: [paths.src],
  paths: [
    join(ROOT_DIR, 'node_modules'),
    join(ROOT_DIR, 'src')
  ],
  extensions: js.extensions
};

if (isDev) Object.assign({}, options, watchify.args);

function bundle(bundler) {
  return bundler
    .bundle()
    .pipe(plumber())
    .pipe(source(js.bundleName))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpIf(isProd, uglify()))
    .pipe(sourcemaps.write(isProd ? '.' : ''))
    .pipe(gulp.dest(paths.dest))
    .pipe(gulpIf(isDev, bs.stream({ once: true })));
}

function jsDevTask() {
  const b = browserify(options)
    .transform(babelify);
  // .transform(hmr);

  const w = watchify(b)
    .on('update', () => bundle(w))
    .on('log', gutil.log);

  return bundle(w);
}

function jsProdTask() {
  const b = browserify(options)
    .transform(babelify);
  // .transform(hmr);

  return bundle(b);
}

gulp.task('js', preTasks, () => isDev ? jsDevTask() : jsProdTask());
