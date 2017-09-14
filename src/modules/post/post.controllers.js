import Post from './post.model';

export async function createPost (req, res) {
  try {
    const post = await Post.create(req.body);

    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).json(err);
  }
}
