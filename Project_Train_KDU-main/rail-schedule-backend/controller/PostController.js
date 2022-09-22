const Post = require("../model/post");

exports.add = (req, res) => {
  var post = new Post(req.body);

  post.save((err, doc) => {
    if (err) {
      res.json({ err: err, data: {} });
    } else {
      res.json({ err: {}, data: doc });
    }
  });
};

exports.edit = (req,res)=>{
  Post.findByIdAndUpdate(req.query.id, req.body, (doc,err)=>{
    if (err) {
      res.json({ err: err, data: {} });
    } else {
      res.json({ err: {}, data: doc });
    }
  })
}

exports.delete = (req,res)=>{
  Post.findByIdAndDelete(req.query.id, (err,doc)=>{
    if (err) {
      res.json({ err: err, data: {} });
    } else {
      res.json({ err: {}, data: doc });
    }
  })
}

exports.getAll = (req, res) => {
  Post.find({}, (err, doc) => {
    if (err) {
      res.json({ err: err, data: {} });
    } else {
      res.json({ err: {}, data: doc });
    }
  });
};

exports.getByUser = (req, res) => {
  Post.find({email: req.query.email}, (err, doc) => {
    if (err) {
      res.json({ err: err, data: {} });
    } else {
      res.json({ err: {}, data: doc });
    }
  });
};

