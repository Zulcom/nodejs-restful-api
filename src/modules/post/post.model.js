import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import slug from 'slug';

const PostSchema = new Schema({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'title must not be empty!'],
    minlength: [3, 'title min length is 3!']
  },
  text: {
    type: String,
    trim: true,
    required: [true, 'text must not be empty!'],
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

// set schema unique validator message
PostSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!'
});

// validate pre callback set post slug
PostSchema.pre('validate', function (next) {
  this.slug = this._slugify(this.title);

  next();
});

PostSchema.methods = {
  // post title transform slug
  _slugify (title) {
    return slug(title);
  },

  // return json data
  toJSON () {
    return {
      _id: this._id,
      createdAt: this.createdAt,
      title: this.title,
      slug: this.slug,
      text: this.text,
      user: this.user,
      favoriteCount: this.favoriteCount
    };
  }
};

PostSchema.statics = {
  // use static call Schema methods
  createPost (post, user) {
    return this.create({
      ...post,
      user
    });
  },

  // fetch post list query set
  getPostsList ({ skip = 0, limit = 5 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user');
  },

  // favorite inc
  incFavoriteCount (postID) {
    return this.findByIdAndUpdate(postID, { $inc: { favoriteCount: 1 } });
  },

  // favorite dec
  decFavoriteCount (postID) {
    return this.findByIdAndUpdate(postID, { $inc: { favoriteCount: -1 } });
  }
};

export default mongoose.model('Post', PostSchema);
