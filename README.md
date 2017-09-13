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
**default base url:** `http://localhost:3000/api/v1`()

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

## datebase

## file tree

## dependencies

## Project reference
- [makeanodejsapi](https://github.com/EQuimper/youtube-makeanodejsapi)

## License
- MIT