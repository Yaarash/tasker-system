import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuid } from 'uuid';
import 'dotenv/config';
import { runTaskFromHandler } from './utils/taskHandler';
import { validateTaskRequest } from './utils/validation';

const app = express();
const port = process.env.PORT || 5000;

// In-memory map to store tasks, can be replaced with redis db for persistence
const tasks = new Map<string, { uuid: string; parameters: any, result: number }>();

const generateUUID = () => uuid();

app.use(bodyParser.json());

app.post('/run_task', async (req, res) => {
  const { task_name, parameters } = req.body;
  const validationError = validateTaskRequest(task_name, parameters);
  if (validationError) {
    return res.status(400).send(validationError);
  }

  const uuid = generateUUID();
  res.json({ uuid});

  runTaskFromHandler(task_name, parameters)
    .then((output) => {
      tasks.set(uuid, { uuid, parameters, result: output.result });   
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get('/get_task_output/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  const task = tasks.get(uuid);

  if (!task) {
    return res.status(404).send('Task not found');
  }

  res.json({ uuid: task.uuid, result: task.result });
});

app.listen(port, () => console.log(`Tasker listening on port ${port}`));

export default app;
