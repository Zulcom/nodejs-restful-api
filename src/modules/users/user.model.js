import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { passwordRegExp } from './user.validator';
import { hashSync } from 'bcrypt-nodejs';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Email is not empty!'],
    validate: {
      validator (email) {
        return validator.isEmail(email);
      },
      massage: '{VALUE} is not valid!'
    }
  },
  userName: {
    type: String,
    trim: true,
    maxlength: [25, 'User Name is max length 25'],
    required: [true, 'User Name is not empty!']
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Password is not empty!'],
    minlength: [6, 'Password is min length 6'],
    validate: {
      validator (password) {
        return passwordRegExp.test(password);
      },
      message: '{VALUE} is not valid!'
    }
  }
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
  }
};

export default mongoose.model('User', userSchema);
