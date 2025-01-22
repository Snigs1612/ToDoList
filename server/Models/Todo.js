const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true  // Ensure task is required
    },
    done: {
        type: Boolean,
        default: false  // Set a default value for the 'done' field
    }
});

const TodoModel = mongoose.model('Todo', TodoSchema);
module.exports = TodoModel;
