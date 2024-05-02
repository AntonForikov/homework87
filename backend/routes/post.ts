import express from 'express';
import mongoose from 'mongoose';
import Post from '../models/post';
import auth, {Auth} from '../middleware/auth';
import {imagesUpload} from '../multer';

const postRouter = express.Router();

postRouter.post('/', auth, imagesUpload.single('image'), async (req: Auth,res, next) => {
  try {
    const {title, description} = req.body;

    const postData = {
      user: req.user?._id,
      title: title.trim(),
      description: description ? description : null,
      image: req.file ? req.file.filename : null,
      date: new Date()
    };

    const post = new Post(postData);
    await post.save();

    return res.send(post);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) return res.status(400).send(e);
    next(e);
  }
});

postRouter.get('/', async (_, res, next) => {
  try {
    const postList = await Post.find();
    return res.send(postList);
  } catch (e) {
    next(e);
  }
});

export default postRouter