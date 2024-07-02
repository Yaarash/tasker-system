import { TASK_NAME } from './consts'

export const validateTaskRequest = (taskName: string, parameters: any): string | undefined => {
  if (!taskName) {
    return 'Missing task name';
  }
  if (!parameters) {
    return 'Missing task parameters';
  }

  switch (taskName) {
    case TASK_NAME.sum:
      if (!parameters.num1 || !parameters.num2) {
        return 'Missing numbers for sum task';
      }
      break;
    case TASK_NAME.wordCounter:
      if (!parameters.text) {
        return 'Missing text for word counter task';
      }
      break;
    case TASK_NAME.queryAI:
      if (!parameters.prompt) {
        return 'Missing prompt for query AI task';
      }
      break;
  }
  return undefined;
};
  