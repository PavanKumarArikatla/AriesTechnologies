## How the solution works

The application is built using Node.js, Express and MongoDB.

The main parts are:

* **Controllers** handle API requests.
* **Task model** stores task information, status, dependencies, attempts and retries.
* **Task runner** simulates task execution using a delay and a random failure.
* **Task scheduler** checks waiting tasks, verifies dependencies and starts tasks while respecting the concurrency limit.

The scheduler is responsible for deciding when a task can run.

A task with no dependencies can run immediately. A task with dependencies waits until all of its dependencies have succeeded.

If a dependency has failed or been blocked, the dependent task is moved to `blocked`.

## Task lifecycle

Tasks start in the `waiting` state.

They can move through states such as:

```text
waiting → running → succeeded → failed→ waiting (retry)
```

A task whose dependency permanently fails becomes `blocked`.

A task can also be `cancelled`.

## Scenario

The current example contains tasks such as:

```text
Planning
Requirements Gathering → Planning
Development → Planning, Requirements Gathering
Testing → Planning, Requirements Gathering
Hiring
Event
```

Planning, Hiring and Event do not have dependencies and are therefore immediately eligible to run.

## Improvement

A `Run All` operation was added.

When `POST /tasks/run-all` is called, existing tasks are reset to `waiting` and their attempts are reset to `0`. The scheduler is then started so the task workflow can run again from the beginning.



1. How do you make sure the concurrency limit is never exceeded?

The scheduler keeps a `taskRunner` counter.

Before starting a task, it checks the available concurrency slots. The counter is incremented when a task starts and decremented when the task finishes.

If not added, more tasks might run at same time, which may use more resources and might effect performance of CPU


2. What happens if the service is killed while tasks are running?

Task information such as status, attempts, and dependencies is stored in MongoDB, so the task state is not lost when the service stops.

Currently, restart recovery is not implemented. On restart, tasks that were running before the service stopped would need to be detected and reset or resumed before execution can continue.


3. Which ready task runs next?

The scheduler processes waiting tasks in creation order and checks whether their dependencies have succeeded.

Among the tasks that are ready, the older task is selected first.



4. What is the one thing that must always be true for your service to be considered correct?

A task must not run until all of its dependencies have succeeded.
In code - for block in taskRunner.js
