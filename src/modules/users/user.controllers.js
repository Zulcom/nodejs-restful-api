import User from './user.model';

export async function sigup (req, res) {
  console.log(req.body);
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
};
