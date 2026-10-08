1. Task dependencies: String vs ObjectId
Initially considered

I initially considered storing dependencies as strings:

dependencies: [{
  type: String,
  ref: "Task"
}]
Chosen

I changed this to MongoDB ObjectIds:

dependencies: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Task"
}]

2. Scheduling order: Creation time vs Priority
Implemented

The current scheduler processes eligible tasks in creation order (FIFO).

Better approach

I would prefer scheduling based on task priority rather than creation time.