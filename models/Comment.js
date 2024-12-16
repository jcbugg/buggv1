const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  item: { type: String, required: true }, // The product or item associated with the video
  video_id: { type: String, required: true },
  title: { type: String, required: true },
  comment: { type: String, required: true },
  sentiment: {
    type: String,
    enum: ['POSITIVE', 'NEGATIVE', 'NEUTRAL', null],
    default: null,
  },
  sentiment_score: { type: Number, default: null },
  Sentiment: {
    type: String,
    enum: ['POSITIVE', 'NEGATIVE', 'NEUTRAL', null],
    default: null,
  },
  Sentiment_Score: { type: Number, default: null },
});

commentSchema.index({ item: 1, title: 1 }); // Index for efficient search

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
