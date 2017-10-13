import { DEST_DIR, sizeReport } from '../../config';
import gulp from 'gulp';
import { join } from 'path';
import sizereport from 'gulp-sizereport';

const paths = {
  src: join(DEST_DIR, sizeReport.src, sizeReport.glob)
};

gulp.task('size-report', () => {
  return gulp
    .src([paths.src, sizeReport.ignoreGlob])
    .pipe(sizereport({ gzip: true }));
});
