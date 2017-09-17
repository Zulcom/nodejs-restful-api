import HTTPStatus from 'http-status';

import Post from './post.model';
import User from '../users/user.model';

/**
 * create post
 * method: POST /api/v1/posts
 * req: body and user id
 * res: 201 or 400
 */
export async function createPost (req, res) {
  try {
    // this is user Schema There might be better ways to get it
    const userID = req.user._conditions._id;

    const post = await Post.createPost(req.body, userID);

    return res.status(HTTPStatus.CREATED).json(post);
  } catch (err) {
    console.log(err);
    return res.status(HTTPStatus.BAD_REQUEST).json(err);
  }
};

/**
 * fetch post
 * method: GET /api/v1/post/:id
 * req: user id
 * res: 200 or 400
 */
export async function getPost (req, res) {
  try {
    const promise = await Promise.all([
      User.findById(req.user._conditions._id),
      Post.findById(req.params.id).populate('user')
    ]);

    const isFavorited = promise[0].changeFavorites.isFavorited(req.params.id);
    const post = promise[1].toJSON();

    const sendInfo = {
      ...post,
      isFavorited
    };

    return res.status(HTTPStatus.OK).json(sendInfo);
  } catch (err) {
    console.log(err);
    return res.status(HTTPStatus.BAD_REQUEST).json(err);
  }
};

/**
 * fetch posts
 * method: GET /api/v1/posts
 * req: [req query params] and user id
 * res: 200 or 400
 */
export async function getPosts (req, res) {
  try {
    const limit = parseInt(req.query.limit, 0);
    const skip = parseInt(req.query.skip, 0);

    const promise = await Promise.all([
      User.findById(req.user._conditions._id),
      Post.getPostsList({ skip, limit })
    ]);

    const posts = promise[1].reduce((arr, post) => {
      const isFavorited = promise[0].changeFavorites.isFavorited(post._id);
      arr.push({
        ...post.toJSON(),
        isFavorited
      });

      return arr;
    }, []);

    return res.status(HTTPStatus.OK).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(HTTPStatus.BAD_REQUEST).json(err);
  }
};

/**
 * update post
 * method: PATCH /api/v1/posts/:id
 * req: req params post id and user id
 * res: 200 or 400
 */
export async function updatePost (req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.user.equals(req.user._conditions._id)) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }

    Object.keys(req.body).forEach(key => {
      post[key] = req.body[key];
    });

    const newPost = await post.save();

    return res.status(HTTPStatus.OK).json(newPost);
  } catch (err) {
    console.log(err);
    return res.status(HTTPStatus.BAD_REQUEST).json(err);
  }
};

/**
 * delete post
 * method: DELETE /api/v1/posts/:id
 * req: req params post id and user id
 * res: 200 or 400
 */
export async function deletePost (req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.user.equals(req.user._conditions._id)) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }

    await post.remove();

    return res.sendStatus(HTTPStatus.OK);
  } catch (err) {
    console.log(err);
    return res.status(HTTPStatus.BAD_REQUEST).json(err);
  }
};

/**
 * favorite post
 * method: POST /api/v1/posts/:id/favorite
 * req: req params post id and user id
 * res: 200 or 400
 */
export async function favoritePost (req, res) {
  try {
    const user = await User.findById(req.user._conditions._id);
    await user.changeFavorites.posts(req.params.id);

    return res.sendStatus(HTTPStatus.OK);
  } catch (err) {
    console.log(err);
    return res.status(HTTPStatus.BAD_REQUEST).json(err);
  }
}
