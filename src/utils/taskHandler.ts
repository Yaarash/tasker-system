import { TASK_NAME } from '../utils/consts'
import { sum } from '../tasks/sumTask';
import { wordCounter } from '../tasks/wordCountTask';
import { queryAI } from '../tasks/queryAI';

const TASKS = {
    [TASK_NAME.sum] : sum,
    [TASK_NAME.wordCounter] : wordCounter,
    [TASK_NAME.queryAI]: queryAI,
};

interface TaskOutput {
  result: any;
}

export const runTaskFromHandler = async (taskName: string, parameters: any): Promise<TaskOutput> => {
  const task = TASKS[taskName];
  if (!task) {
    throw new Error('Task not found');
  }

  try {
    const result = await task(parameters);
    return { result };
  } catch (error) {
    throw error;
  }
}
