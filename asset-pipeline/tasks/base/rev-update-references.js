import { DEST_DIR, rev } from '../../config';
import gulp from 'gulp';
import { join } from 'path';
import revReplace from 'gulp-rev-replace';

const paths = {
  src: join(DEST_DIR, rev.updateReferences.glob),
  dest: DEST_DIR,
  manifest: join(DEST_DIR, rev.manifestFile)
};

gulp.task('rev-update-references', () => {
  return gulp
    .src(paths.src)
    .pipe(revReplace({ manifest: gulp.src(paths.manifest) }))
    .pipe(gulp.dest(paths.dest));
});
