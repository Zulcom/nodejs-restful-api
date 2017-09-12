import passport from 'passport';
import LocalStrategy from 'passport-local';

import User from '../modules/users/user.model';

// Local strategy email replace default username
const localOption = {
  usernameField: 'email'
};

// local user login strategy
const localStrategy = new LocalStrategy(
  localOption,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false);
      } else if (!user.comparePassword(password)) {
        return done(null, false);
      }

      return done(null, true);
    } catch (err) {
      return done(err, false);
    }
  }
);

// passport apply local strategy
passport.use(localStrategy);

export const authLocal = passport.authenticate('local', { session: false });
