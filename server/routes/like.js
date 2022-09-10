const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { Dislike } = require('../models/Dislike');

//=================================
//             Subscribe
//=================================

router.post('/getLikes', (req, res) => {
  let variabe = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { videoId: req.body.commentId };
  }
  Like.find(variabe).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, likes });
  });
});

router.post('/getDislikes', (req, res) => {
  let variabe = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { videoId: req.body.commentId };
  }
  Dislike.find(variabe).exec((err, dislikes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, dislikes });
  });
});

router.post('/upLike', (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }
  // Like collection에 클릭 정보 넣어줌.
  const like = new Like(variable);

  like.save((err, likeResult) => {
    if (err) return res.json({ success: false, err });

    // 만약 Dislike가 이미 출력이 되었다면, Dislike를 1 줄여줌
    Dislike.findOneAndDelete(variable).exec((err, dislikeResult) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

router.post('/unLike', (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }
  Like.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post('/upDislike', (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }
  // Like collection에 클릭 정보 넣어줌.
  const dislike = new Dislike(variable);

  dislike.save((err, likeResult) => {
    if (err) return res.json({ success: false, err });

    // 만약 Like가 이미 출력이 되었다면, Like를 1 줄여줌
    Like.findOneAndDelete(variable).exec((err, likeResult) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

router.post('/unDislike', (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }
  Dislike.findOneAndDelete(variable).exec((err, dislikeResult) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});
module.exports = router;
