import * as config from '../../config';
import gulp from 'gulp';
import { join } from 'path';
import watch from 'gulp-watch';

gulp.task('watch', ['browser-sync'], () => {
  config.watch.watchableTasks.forEach((taskName) => {
    const task = config[taskName];
    if (!task) return;

    const source = join(config.SRC_DIR, task.src, task.glob);

    watch(source, () => gulp.start(taskName));
  });
});
