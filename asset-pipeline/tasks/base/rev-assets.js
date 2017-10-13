import { DEST_DIR, rev as _rev } from '../../config';
import gulp from 'gulp';
import { join } from 'path';
import rev from 'gulp-rev';
import revNapkin from 'gulp-rev-napkin';

const paths = {
  src: join(DEST_DIR, _rev.assets.glob),
  dest: DEST_DIR,
  manifest: join(DEST_DIR, _rev.manifestFile)
};

gulp.task('rev-assets', () => {
  // Ignore files that may reference assets. We'll rev them in another task.
  const ignoreThese = `!${join(paths.dest, _rev.assets.ignoreGlob)}`;

  return gulp
    .src([paths.src, ignoreThese])
    .pipe(rev())
    .pipe(gulp.dest(paths.dest))
    .pipe(revNapkin({ verbose: false }))
    .pipe(rev.manifest(paths.manifest))
    .pipe(gulp.dest(''));
});
