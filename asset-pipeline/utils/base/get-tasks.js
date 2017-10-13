import { isProd, devTasks, prodTasks } from '../../config';

const taskList = isProd ? prodTasks : devTasks;

export default taskList;
