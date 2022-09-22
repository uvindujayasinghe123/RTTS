const Train = require("../model/train");

exports.locationUpdate = (req, res) => {
  Train.findByIdAndUpdate(
    req.params.id,
    { lat: req.body.lat, lng: req.body.lng },
    { new: true },
    (err, doc) => {
      if (err) {
        res.json({ err: err, data: {} });
      } else {
        res.json({ err: {}, data: doc });
      }
    }
  );
};

exports.changeState = (req, res) => {
  Train.findByIdAndUpdate(
    req.params.id,
    { isActive: req.query.isActive },
    { new: true },
    (err, doc) => {
      if (err) {
        res.json({ err: err, data: {} });
      } else {
        res.json({ err: {}, data: doc });
      }
    }
  );
};

exports.search = (req, res) => {
  Train.find(
    {
      from: req.body.from,
      to: req.body.to,
      isActive: true,
    },
    (err, doc) => {
      if (err) {
        res.json({ err: err, data: {} });
      } else {
        res.json({ err: {}, data: doc });
      }
    }
  );
};

exports.timeTable = (req, res) => {
  Train.find(
    {
      from: req.body.from,
      to: req.body.to,
    },
    (err, doc) => {
      if (err) {
        res.json({ err: err, data: {} });
      } else {
        res.json({ err: {}, data: doc });
      }
    }
  ).sort([["time", -1]]);
};

exports.addTrain = (req, res) => {
  var train = new Train(req.body);

  train.save((err, doc) => {
    if (err) {
      res.json({ err: err, data: {} });
    } else {
      res.json({ err: {}, data: doc });
    }
  });
};

exports.getAll = (req, res) => {
  Train.find({}, (err, doc) => {
    if (err) {
      res.json({ err: err, data: {} });
    } else {
      res.json({ err: {}, data: doc });
    }
  });
};


