import Post from './post.model';

export async function createPost (req, res) {
  try {
    // this is user Schema There might be better ways to get it
    const userID = req.user._conditions._id;

    const post = await Post.createPost(req.body, userID);

    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).json(err);
  }
}
