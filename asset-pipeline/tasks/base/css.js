import { isDev, isProd, SRC_DIR, DEST_DIR, css, cssLint } from '../../config';
import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import { join } from 'path';
import cssnano from 'cssnano';
import gulpIf from 'gulp-if';
import { bs } from './browser-sync';
import cache from 'gulp-cached';
import progeny from 'gulp-progeny';
import flatten from 'gulp-flatten';
import assets from 'postcss-assets';
import cssnext from 'postcss-cssnext';
import autoprefixer from 'autoprefixer';

const paths = {
  src: join(SRC_DIR, css.src, css.glob),
  dest: join(DEST_DIR, css.dest)
};

const processors = [
  cssnext({
    warnForDuplicates: false
  }),
  autoprefixer({
    browsers: css.autoprefixerBrowsers
  }),
  assets({
    basePath: DEST_DIR,
    loadPaths: css.postCSSAssetsLoadPaths
  })
];

if (isProd) processors.push(cssnano({ discardComments: { removeAll: true } }));

// because there is no ide integration (WebStorm) i have to run the linter before each stylesheets task
// https://github.com/sasstools/sass-lint/issues/460
const preTasks = (isDev && !cssLint.ideSupport) ? ['css-lint'] : [];

gulp.task('css', preTasks, () => {
  return gulp
    .src(paths.src)
    .pipe(gulpIf(isDev, cache(css.cacheName)))
    .pipe(gulpIf(isDev, progeny()))
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: ['./node_modules/'] }).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write(isProd ? '.' : ''))
    .pipe(flatten())
    .pipe(gulp.dest(paths.dest))
    // If you generate source maps to a separate `.map` file you need to add `{match: '**/*.css'}` option to stream.
    // These files end up being sent down stream and when browserSync.stream() receives them, it will attempt
    // a full page reload (as it will not find any .map files in the DOM).
    .pipe(gulpIf(isDev, bs.stream()));
});
