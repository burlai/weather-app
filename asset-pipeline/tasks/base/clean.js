import gulp from 'gulp';
import del from 'del';
import { DEST_DIR } from '../../config';

gulp.task('clean', (done) => {
  del([DEST_DIR]).then(() => done());
});
