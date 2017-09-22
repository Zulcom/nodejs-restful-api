module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// MongoDB URL and app env

const devConfig = {
  MONGO_URL: 'mongodb://localhost:27017/node-restful-dev',
  JWT_SECRET: 'jwtsecret'
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost:27017/node-restful-test'
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost:27017/node-restful-prod'
};

const defaultConfig = {
  PORT: process.env.PORT || 3000
};

function switchConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

exports.default = Object.assign({}, defaultConfig, switchConfig(process.env.NODE_env));

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(22);

var _validator2 = _interopRequireDefault(_validator);

var _jsonwebtoken = __webpack_require__(23);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _mongooseUniqueValidator = __webpack_require__(6);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _bcryptNodejs = __webpack_require__(24);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _user = __webpack_require__(7);

var _post = __webpack_require__(9);

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Email must not be empty!'],
    validate: {
      validator(email) {
        return _validator2.default.isEmail(email);
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
      validator(password) {
        return _user.passwordRegExp.test(password);
      },
      message: '{VALUE} format error！'
    }
  },
  favorites: {
    posts: [{
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }]
  }
}, { timestamps: true });

userSchema.plugin(_mongooseUniqueValidator2.default, {
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
  _hashPassword(password) {
    return (0, _bcryptNodejs.hashSync)(password);
  },

  // compare passsword authenticate user info
  comparePassword(password) {
    return (0, _bcryptNodejs.compareSync)(password, this.password);
  },

  // sign jwt web token for user id
  createToken() {
    return _jsonwebtoken2.default.sign({
      _id: this.id
    }, _constants2.default.JWT_SECRET);
  },

  // login response json data
  toAuthJSON() {
    return {
      _id: this.id,
      userName: this.userName,
      token: `JWT ${this.createToken()}`
    };
  },

  // default return info
  toJSON() {
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
    async posts(postID) {
      if (!this.favorites.posts.indexOf(postID)) {
        this.favorites.posts.remove(postID);
        await _post2.default.decFavoriteCount(postID);
      } else {
        this.favorites.posts.push(postID);
        await _post2.default.incFavoriteCount(postID);
      }
      return this.save();
    },

    /**
     * getpsot and getposts user is favorited
     * @param {String} postID 
     * @return {Boolean}
     */
    isFavorited(postID) {
      if (!this.favorites.posts.indexOf(postID)) {
        return true;
      }
      return false;
    }
  }
};

exports.default = _mongoose2.default.model('User', userSchema);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authJwt = exports.authLocal = undefined;

var _passport = __webpack_require__(4);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(20);

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportJwt = __webpack_require__(21);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Local strategy
const localOptions = {
  usernameField: 'email'
};

const localStrategy = new _passportLocal2.default(localOptions, async (email, password, done) => {
  try {
    const user = await _user2.default.findOne({ email });
    if (!user) {
      return done(null, false);
    } else if (!user.comparePassword(password)) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

// jwt strategy
const jwtOptions = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: _constants2.default.JWT_SECRET
};

const jwtStrategy = new _passportJwt.Strategy(jwtOptions, async (payload, done) => {
  try {
    const user = await _user2.default.findById(payload._id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

// passport apply local strategy
_passport2.default.use(localStrategy);
_passport2.default.use(jwtStrategy);

const authLocal = exports.authLocal = _passport2.default.authenticate('local', { session: false });
const authJwt = exports.authJwt = _passport2.default.authenticate('jwt', { session: false });

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("mongoose-unique-validator");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.sigup = exports.passwordRegExp = undefined;

var _joi = __webpack_require__(8);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordRegExp = exports.passwordRegExp = /^(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

const sigup = exports.sigup = {
  body: {
    email: _joi2.default.string().email().required(),
    userName: _joi2.default.string().max(25).required(),
    password: _joi2.default.string().min(6).regex(passwordRegExp).required()
  }
};

const login = exports.login = {
  body: {
    email: _joi2.default.string().email().required(),
    password: _joi2.default.string().min(6).required()
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = __webpack_require__(6);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slug = __webpack_require__(25);

var _slug2 = _interopRequireDefault(_slug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PostSchema = new _mongoose.Schema({
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
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  favoriteCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// set schema unique validator message
PostSchema.plugin(_mongooseUniqueValidator2.default, {
  message: '{VALUE} already taken!'
});

// validate pre callback set post slug
PostSchema.pre('validate', function (next) {
  this.slug = this._slugify(this.title);

  next();
});

PostSchema.methods = {
  // post title transform slug
  _slugify(title) {
    return (0, _slug2.default)(title);
  },

  // return json data
  toJSON() {
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
  createPost(post, user) {
    return this.create(Object.assign({}, post, {
      user
    }));
  },

  // fetch post list query set
  getPostsList({ skip = 0, limit = 5 } = {}) {
    return this.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('user');
  },

  // favorite inc
  incFavoriteCount(postID) {
    return this.findByIdAndUpdate(postID, { $inc: { favoriteCount: 1 } });
  },

  // favorite dec
  decFavoriteCount(postID) {
    return this.findByIdAndUpdate(postID, { $inc: { favoriteCount: -1 } });
  }
};

exports.default = _mongoose2.default.model('Post', PostSchema);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("http-status");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _middlewares = __webpack_require__(13);

var _middlewares2 = _interopRequireDefault(_middlewares);

var _modules = __webpack_require__(18);

var _modules2 = _interopRequireDefault(_modules);

__webpack_require__(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create app
const app = (0, _express2.default)();

// middlewares apply
(0, _middlewares2.default)(app);

// app home test routes
app.get('/', (req, res) => {
  res.send('Hello Guys!');
});

// routes apply
(0, _modules2.default)(app);

// server runing
app.listen(_constants2.default.PORT, err => {
  if (err) throw err;
  console.log(`
    ---
    Server runing in port: ${_constants2.default.PORT}
    ---
    Runing on ${process.env.NODE_ENV}
    ---
  `);
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compression = __webpack_require__(14);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(15);

var _helmet2 = _interopRequireDefault(_helmet);

var _bodyParser = __webpack_require__(16);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = __webpack_require__(4);

var _passport2 = _interopRequireDefault(_passport);

var _morgan = __webpack_require__(17);

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

// apply middlewares

exports.default = app => {
  if (isProd) {
    app.use((0, _compression2.default)());
    app.use((0, _helmet2.default)());
  }

  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: false }));
  app.use(_passport2.default.initialize());

  if (isDev) {
    app.use((0, _morgan2.default)('dev'));
  }
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = __webpack_require__(19);

var _user2 = _interopRequireDefault(_user);

var _post = __webpack_require__(27);

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
  app.use('/api/v1/users', _user2.default);
  app.use('/api/v1/posts', _post2.default);
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _auth = __webpack_require__(5);

var _expressValidation = __webpack_require__(10);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _user = __webpack_require__(26);

var userControllers = _interopRequireWildcard(_user);

var _user2 = __webpack_require__(7);

var validator = _interopRequireWildcard(_user2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router();

routes.post('/sigup', (0, _expressValidation2.default)(validator.sigup), userControllers.sigup);
routes.post('/login', (0, _expressValidation2.default)(validator.login), _auth.authLocal, userControllers.login);

exports.default = routes;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("slug");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sigup = sigup;
exports.login = login;

var _httpStatus = __webpack_require__(11);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * sigup user
 * method: POST /api/v1/users/sigup
 * req: body user info
 * res: 201 or 400
 */
async function sigup(req, res) {
  try {
    const user = await _user2.default.create(req.body);

    return res.status(_httpStatus2.default.CREATED).json(user.toAuthJSON());
  } catch (err) {
    console.log(err);
    return res.status(_httpStatus2.default.BAD_REQUEST).json(err);
  }
};

/**
 * login user
 * method: POST /api/v1/users/login
 * req: body user info
 * res: 201 or 400
 */
function login(req, res, next) {
  res.status(_httpStatus2.default.OK).json(req.user.toAuthJSON());

  return next();
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _auth = __webpack_require__(5);

var _expressValidation = __webpack_require__(10);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _post = __webpack_require__(28);

var postControllers = _interopRequireWildcard(_post);

var _post2 = __webpack_require__(29);

var validatior = _interopRequireWildcard(_post2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router();

routes.post('/', _auth.authJwt, (0, _expressValidation2.default)(validatior.createPost), postControllers.createPost);
routes.get('/:id', _auth.authJwt, postControllers.getPost);
routes.get('/', _auth.authJwt, postControllers.getPosts);
routes.patch('/:id', _auth.authJwt, (0, _expressValidation2.default)(validatior.updatePost), postControllers.updatePost);
routes.delete('/:id', _auth.authJwt, postControllers.deletePost);
routes.post('/:id/favorite', _auth.authJwt, postControllers.favoritePost);

exports.default = routes;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPost = createPost;
exports.getPost = getPost;
exports.getPosts = getPosts;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.favoritePost = favoritePost;

var _httpStatus = __webpack_require__(11);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _post = __webpack_require__(9);

var _post2 = _interopRequireDefault(_post);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * create post
 * method: POST /api/v1/posts
 * req: body and user id
 * res: 201 or 400
 */
async function createPost(req, res) {
  try {
    const post = await _post2.default.createPost(req.body, req.user._id);

    return res.status(_httpStatus2.default.CREATED).json(post);
  } catch (err) {
    console.log(err);
    return res.status(_httpStatus2.default.BAD_REQUEST).json(err);
  }
};

/**
 * fetch post
 * method: GET /api/v1/post/:id
 * req: user id
 * res: 200 or 400
 */
async function getPost(req, res) {
  try {
    const promise = await Promise.all([_user2.default.findById(req.user._id), _post2.default.findById(req.params.id).populate('user')]);

    const isFavorited = promise[0].changeFavorites.isFavorited(req.params.id);
    const post = promise[1].toJSON();

    const sendInfo = Object.assign({}, post, {
      isFavorited
    });

    return res.status(_httpStatus2.default.OK).json(sendInfo);
  } catch (err) {
    console.log(err);
    return res.status(_httpStatus2.default.BAD_REQUEST).json(err);
  }
};

/**
 * fetch posts
 * method: GET /api/v1/posts
 * req: [req query params] and user id
 * res: 200 or 400
 */
async function getPosts(req, res) {
  try {
    const limit = parseInt(req.query.limit, 0);
    const skip = parseInt(req.query.skip, 0);

    const promise = await Promise.all([_user2.default.findById(req.user._id), _post2.default.getPostsList({ skip, limit })]);

    const posts = promise[1].reduce((arr, post) => {
      const isFavorited = promise[0].changeFavorites.isFavorited(post._id);
      arr.push(Object.assign({}, post.toJSON(), {
        isFavorited
      }));

      return arr;
    }, []);

    return res.status(_httpStatus2.default.OK).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(_httpStatus2.default.BAD_REQUEST).json(err);
  }
};

/**
 * update post
 * method: PATCH /api/v1/posts/:id
 * req: req params post id and user id
 * res: 200 or 400
 */
async function updatePost(req, res) {
  try {
    const post = await _post2.default.findById(req.params.id);

    if (!post.user.equals(req.user._id)) {
      return res.sendStatus(_httpStatus2.default.UNAUTHORIZED);
    }

    Object.keys(req.body).forEach(key => {
      post[key] = req.body[key];
    });

    const newPost = await post.save();

    return res.status(_httpStatus2.default.OK).json(newPost);
  } catch (err) {
    console.log(err);
    return res.status(_httpStatus2.default.BAD_REQUEST).json(err);
  }
};

/**
 * delete post
 * method: DELETE /api/v1/posts/:id
 * req: req params post id and user id
 * res: 200 or 400
 */
async function deletePost(req, res) {
  try {
    const post = await _post2.default.findById(req.params.id);

    if (!post.user.equals(req.user._id)) {
      return res.sendStatus(_httpStatus2.default.UNAUTHORIZED);
    }

    await post.remove();

    return res.sendStatus(_httpStatus2.default.OK);
  } catch (err) {
    console.log(err);
    return res.status(_httpStatus2.default.BAD_REQUEST).json(err);
  }
};

/**
 * favorite post
 * method: POST /api/v1/posts/:id/favorite
 * req: req params post id and user id
 * res: 200 or 400
 */
async function favoritePost(req, res) {
  try {
    const user = await _user2.default.findById(req.user._id);
    await user.changeFavorites.posts(req.params.id);

    return res.sendStatus(_httpStatus2.default.OK);
  } catch (err) {
    console.log(err);
    return res.status(_httpStatus2.default.BAD_REQUEST).json(err);
  }
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePost = exports.createPost = undefined;

var _joi = __webpack_require__(8);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createPost = exports.createPost = {
  body: {
    title: _joi2.default.string().min(3).required(),
    text: _joi2.default.string().min(10).required()
  }
};

const updatePost = exports.updatePost = {
  body: {
    title: _joi2.default.string().min(3),
    text: _joi2.default.string().min(10)
  }
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// remove mongoose promise warn
_mongoose2.default.Promise = global.Promise;

const connectOptions = {
  useMongoClient: true
};

// connect or createConnection for MongoDB URL
try {
  _mongoose2.default.connect(_constants2.default.MONGO_URL, connectOptions);
} catch (err) {
  if (err) console.log(err);
  _mongoose2.default.createConnection(_constants2.default.MONGO_URL, connectOptions);
}

_mongoose2.default.connection.on('error', err => {
  console.log(err);
}).once('open', () => {
  console.log('mongoDB runing.');
});

/***/ })
/******/ ]);