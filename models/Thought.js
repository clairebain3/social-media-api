const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment');

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    username: {
        type: String,
        required: true
    }
    // assignments: [assignmentSchema],
  ,
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;