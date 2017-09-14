import HTTPStatus from 'http-status';
import Post from './post.model';

export async function createPost (req, res) {
  try {
    // this is user Schema There might be better ways to get it
    const userID = req.user._conditions._id;

    const post = await Post.createPost(req.body, userID);

    return res.status(HTTPStatus.CREATED).json(post);
  } catch (err) {
    return res.status(HTTPStatus.BAD_REQUEST).json(err);
  }
}

export async function getPost (req, res) {
  try {
    const post = await Post.findById(req.params.id).populate('user');

    return res.status(HTTPStatus.OK).json(post);
  } catch (err) {
    return res.status(HTTPStatus.NOT_FOUND).json(err);
  }
}
