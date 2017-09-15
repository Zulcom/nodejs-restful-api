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
Error Status: 404

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
- `src/config`: 应用常量，更具当前环境设置
- `src/modules`: API 模块
- `src/services`: passport 服务
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
- `bcrypt-nodejs`: 使用bcrypt用来加密解密用户密码
- `body-parser`: express 中间件 解析请求的body
- `compression`: express 中间件 压缩响应信息
- `cross-env`: 在不同环境下统一环境变量操作
- `express`: nodejs快速搭建框架
- `express-validation`: express 中间件 请求验证
- `helmet`: 
- `joi`: 快速验证
- `jsonwebtoken`: jwt token 生成
- `mongoose`: 链接 mongoDB
- `mongoose-unique-validator`: mongoose 插件，为 unique 添加错误 message
- `nodemon`: 自动重启服务器
- `passport`: express 中间件 代理服务
- `passport-jwt`: jwt 认证
- `passport-local`: 本地登陆认证
- `slug`: 将文本 slug 化
- `validator`: 快速验证，使用在 Schema 验证中快速验证

## devDependencies
- `babel-plugin-transform-object-rest-spread`: 支持 rest spread 语法
- `del`: webpack plugin clean
- `morgan`: 将服务器响应信息打印

## Project reference
- [makeanodejsapi](https://github.com/EQuimper/youtube-makeanodejsapi)

## License
- MIT