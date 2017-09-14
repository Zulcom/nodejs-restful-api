import mongoose, { Schema } from 'mongoose';
import slug from 'node-slug';

const PostSchema = new Schema({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'title info not empty!'],
    minlength: [3, 'title min length is 3!']
  },
  text: {
    type: String,
    trim: true,
    required: [true, 'text info not empty!'],
    minlength: [10, 'text min length is 10!']
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  favoriteCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

PostSchema.pre('validator', function (next) {
  this.title = this._slugify(this.title);

  next();
});

PostSchema.methods = {
  _slugify (title) {
    return slug(title);
  }
};

export default mongoose.model('Post', PostSchema);
