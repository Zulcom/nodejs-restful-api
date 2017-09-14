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
- `/api/v1/sigup`: create user.
  Sucess Status: 201
  Error Status: 400

- `/api/v1/login`: login user.
  Sucess Status: 200
  Error Status: 400

### post
- create post
- post info
- posts list
- update post
- delete post
- forvite post

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
- `src/config`:
- `src/modules`:
- `src/services`:
- `utils/`:
- `.babelrc`:
- `.editorconfig`:
- `.eslintignore`:
- `.eslintrc`:
- `.gitignore`:
- `package.json`:
- `webpack.config.js`:
- `log.md`:

## dependencies
- `bcrypt-nodejs`: 使用bcrypt用来加密解密用户密码
- `body-parser`: 
- `compression`: 
- `cross-env`: 
- `express`: 
- `express-validation`: 
- `helmet`: 
- `joi`: 
- `jsonwebtoken`: 
- `mongoose`: 
- `mongoose-unique-validator`: 
- `nodemon`: 
- `passport`: 
- `passport-jwt`: 
- `passport-local`: 
- `slug`: 
- `validator`: 

## devDependencies
- `babel-core`: 
- `babel-eslint`: 
- `babel-loader`: 
- `babel-plugin-transform-object-rest-spread`: 
- `babel-preset-env`: 
- `del`: 
- `eslint`: 
- `eslint-config-standard`: 
- `eslint-plugin-babel`: 
- `eslint-plugin-import`: 
- `eslint-plugin-node`: 
- `eslint-plugin-promise`: 
- `eslint-plugin-standard`: 
- `morgan`: 
- `webpack`: 
- `webpack-node-externals`: 

## Project reference
- [makeanodejsapi](https://github.com/EQuimper/youtube-makeanodejsapi)

## License
- MIT