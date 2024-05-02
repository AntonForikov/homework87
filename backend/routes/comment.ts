import express from 'express';
import auth, {Auth} from '../middleware/auth';
import Comment from '../models/comment';
import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';

const commentRouter = express.Router();

commentRouter.post('/', auth, async (req: Auth, res,next) => {
  try {
    const {text, post} = req.body;

    let id: ObjectId;
    try {
      id = new ObjectId(post);
    } catch (e) {
      return res.status(400).send({error: 'Post is not and ObjectId '});
    }

    const commentData = {
      text,
      post: id,
      user: req.user?._id
    }

    const comment = new Comment(commentData);
    await comment.save();

    return res.send(comment);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) return res.status(400).send(e);
    next(e);
  }
});

export default commentRouter;