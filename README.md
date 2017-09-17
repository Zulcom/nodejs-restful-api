## introduce
this project with express and mongodb create back-end Restful API

## install
``` bash
git clone https://github.com/hehehai/nodejs-restful-api
cd nodejs-restful-api

yarn
```
you can run `yarn` or `npm install` install dependencies

``` bash
yarn dev:build
```
run webpack build js files, this use webpack watch file.

open new terminal
``` bash
yarn dev
```
this is run nodemon obserable webpack budil js file.
nodemon open in `http://localhost:3000`

runing default env is `development`

## restfull api
**default base url:** `http://localhost:3000/api/v1`

### user
- `POST /api/v1/sigup`: create user.(request validate)
Sucess Status: 201
Error Status: 400

- `POST /api/v1/login`: login user.(request validate, local strategy)
Sucess Status: 200
Error Status: 400

### post
- `POST /api/v1/posts/`: create post.(jwt, request validate)
Sucess Status: 201
Error Status: 400

- `GET /api/v1/posts/:id`: post info.(jwt)
Sucess Status: 200
Error Status: 400

- `GET /api/v1/posts/`: posts list.(jwt)
Sucess Status: 200
Error Status: 400

- `PATCH /api/v1/posts/:id`: update post.(jwt, request validate)
Sucess Status: 200
Error Status: 400

- `DELETE /api/v1/posts/:id`: delete post.(jwt)
Sucess Status: 200
Error Status: 400

- `POST /api/v1/posts/:id/favorite`: forvite post
Sucess Status: 200
Error Status: 400

## user authentiate
authentiate use passport jwt strategy

## constants
dev: `mongodb://localhost:27017/node-restful-dev`
test: `mongodb://localhost:27017/node-restful-test`
pord: `mongodb://localhost:27017/node-restful-pord`

port: `3000` (default port)
jwt secret: 'jwtsecret'

## file tree
- `dist/`: webpack build files
- `src/index.js`: app entry
- `src/config`: mongoDB url, port, database, apply middlewares
- `src/modules`: API 模块
- `src/services`: passport server
- `utils/`: webpack plugin
- `.babelrc`: babel pllofily
- `.editorconfig`: editor guide
- `.eslintignore`: eslint exclude
- `.eslintrc`: eslint config
- `.gitignore`: git exclude
- `package.json`: npm package
- `webpack.config.js`: webpack config (dev)
- `log.md`: edit log

## dependencies
- `bcrypt-nodejs`: Encrypt user password
- `body-parser`: express middleware request body info formet parser
- `compression`: express middleware comperssion response info
- `cross-env`: same env
- `express`: express
- `express-validation`: express middleware request validate
- `helmet`: secure Express apps by setting various HTTP headers
- `joi`: server request validator
- `jsonwebtoken`: sigup jwt token
- `mongoose`: connect mongoDB
- `mongoose-unique-validator`: mongoose plugin，unique add error message
- `nodemon`: file change restart server
- `passport`: express passport
- `passport-jwt`: jwt token authentication
- `passport-local`: local login authorized
- `slug`: title slug conversions
- `validator`: Provide common validation methods

## devDependencies
- `babel-plugin-transform-object-rest-spread`: support rest spread syntax
- `del`: webpack plugin clean
- `morgan`: server response status number print terminal

## Project reference
- [makeanodejsapi](https://github.com/EQuimper/youtube-makeanodejsapi)

## License
- MIT