import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import jwtToken from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';

import constants from '../../config/constants';
import { passwordRegExp } from './user.validator';

import Post from '../post/post.model';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Email must not be empty!'],
    validate: {
      validator (email) {
        return validator.isEmail(email);
      },
      massage: '{VALUE} format error！'
    }
  },
  userName: {
    type: String,
    trim: true,
    maxlength: [25, 'User Name is max length 25'],
    required: [true, 'User Name must not be empty!']
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Password must not be empty!'],
    minlength: [6, 'Password is min length 6'],
    validate: {
      validator (password) {
        return passwordRegExp.test(password);
      },
      message: '{VALUE} format error！'
    }
  },
  favorites: {
    posts: [{
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }]
  }
}, { timestamps: true });

userSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!'
});

// Schema save modified password
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }
  next();
});

userSchema.methods = {
  // password bcrypt hash password
  _hashPassword (password) {
    return hashSync(password);
  },

  // compare passsword authenticate user info
  comparePassword (password) {
    return compareSync(password, this.password);
  },

  // sign jwt web token for user id
  createToken () {
    return jwtToken.sign(
      {
        _id: this.id
      },
      constants.JWT_SECRET
    );
  },

  // login response json data
  toAuthJSON () {
    return {
      _id: this.id,
      userName: this.userName,
      token: `JWT ${this.createToken()}`
    };
  },

  // default return info
  toJSON () {
    return {
      _id: this.id,
      userName: this.userName
    };
  },

  changeFavorites: {
    /**
     * favorite event
     * @param {String} postID 
     */
    async posts (postID) {
      if (!this.favorites.posts.indexOf(postID)) {
        this.favorites.posts.remove(postID);
        await Post.decFavoriteCount(postID);
      } else {
        this.favorites.posts.push(postID);
        await Post.incFavoriteCount(postID);
      }
      return this.save();
    },

    /**
     * getpsot and getposts user is favorited
     * @param {String} postID 
     * @return {Boolean}
     */
    isFavorited (postID) {
      if (!this.favorites.posts.indexOf(postID)) {
        return true;
      }
      return false;
    }
  }
};

export default mongoose.model('User', userSchema);
