const express = require('express');
const router = express.Router();
const { Subscriber } = require('../models/Subscriber');

//=================================
//             Subscribe
//=================================

router.post('/subscribeNumber', (req, res) => {
  // 비디오 정보들을 저장한다.
  Subscriber.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, subscriberNumber: subscribe.length });
  });
});

router.post('/subscribed', (req, res) => {
  // 비디오 정보들을 저장한다.
  Subscriber.find({ userTo: req.body.userTo, userFrom: req.body.userFrom }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);
    let result = false;
    if (subscribe.length) {
      result = true;
    }
    res.status(200).json({ success: true, subscribed: result });
  });
});

router.post('/unSubscribe', (req, res) => {
  Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});

router.post('/subscribe', (req, res) => {
  const subscribe = new Subscriber(req.body);
  console.log(subscribe);
  subscribe.save((err, doc) => {
    if (err) return res.status({ success: false, err });
    res.status(200).json({ success: true });
  });
});
module.exports = router;
