# Tasker: A Node.js Task Runner Service
This project implements a simple task runner service called "Tasker" that allows users to submit tasks via a REST API. Tasker executes the tasks in the background and provides retrieval of the output later.

## Features
Run various tasks through a REST API.
Supported tasks (out of the box):
Sum: Accepts two numbers as parameters and returns their sum.
Define and integrate your custom tasks.
### Installation
#### Prerequisites:

Node.js and npm (or yarn) package manager installed on your system.
1. Clone the repository:

```
git clone https://github.com/your-username/tasker-system.git
```
2. Install dependencies:
```
cd tasker-system
npm install
```
#### Usage
1. Running the Service:
Start the service in production mode:
```
npm start
```

This will start the Tasker service and listen for requests on port 5000 by default (you can adjust this in the code).



2. Using the API:
#### Running a Task:

Use a tool like Postman or curl to send a POST request to the following endpoint:
```
http://localhost:5000/run_task

{
  "task_name": "sum",
  "parameters": {
    "num1": 10,
    "num2": 20
  }
}
```
Replace "sum" with the desired task name and provide the task-specific parameters in the parameters object.

#### Response:

The response will be a JSON object containing the task's unique identifier (UUID):
```
{
  "uuid": "your_task_uuid"
}
```

#### Getting Task Output:

Use a GET request to retrieve the output of a completed task:
```
http://localhost:5000/get_task_output/<task_uuid>
Replace <task_uuid> with the UUID received from the Run Task response.
```
Response:

The response will be a JSON object containing the task's output (if available):

```
{
  "result": 30  // In this case, the sum of 10 and 20
}
```

Adding Custom Tasks:

You can define your own tasks by creating a new TypeScript file in the src/tasks directory. The file name should represent the task name (e.g., custom_task.js).

The file should export a function that accepts the task parameters and performs the desired operation. The function should return the result of the task.

For example:
```
JavaScript
// src/tasks/custom_task.js
module.exports = async (parameters) => {
  const { text } = parameters;
  return text.split(' ').length;
};
```

This custom task takes a string as input and returns the number of words.

Once you've defined your custom task, you can use it in the same way as the built-in tasks by specifying its name in the task_name field of the Run Task request.

Development
The source code for the tasks and core logic resides in the src directory. 