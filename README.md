# Task Runner

A small Node.js service for creating and running tasks with dependencies, concurrency control, retries, cancellation, and task status tracking.

Task data is stored in MongoDB. Tasks are executed by a scheduler that checks dependencies before starting them.

## Requirements

* Node.js
* MongoDB

## Setup

Clone the repository and install dependencies:

```bash
cd backend
npm install
cd frontend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=4000
CONCURRENCY_LIMIT=2
```

Start the service:
open 2 terminals

1st terminal
cd frontend
npm run dev

2nd terminal
cd backend
npm run dev

```

The API runs on:

```text
http://localhost:4000
```

## API

### Create a task
http://localhost:4000/api/submit

Body
{
  "taskName": "Planning",
  "dependencies" : [],
  "retries": 3
}

### Get task status
http://localhost:4000/api/status/:id


### Patch cancel
http://localhost:4000/api/cancel/:id


### Get statistics
http://localhost:4000/api/stats


### Run all tasks
http://localhost:4000/api/allStats