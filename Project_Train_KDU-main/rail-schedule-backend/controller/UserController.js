const Post = require("../model/user");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "ally.sipes@ethereal.email",
    pass: "dYRYRfdbPwcBMXTVwC",
  },
});

exports.resetPasswordEmail = (req, res) => {
  console.log(req)
  Post.findOne({email:req.query.email}, (err, doc) => {
    if (doc) {
      transporter
        .sendMail({
          from: "RTTS Sri Lanka", // sender address
          to: req.query.email, // list of receivers
          subject: "Reset Password", // Subject line
          text:
            "Click the link: http://localhost:3000/reset-password?email=" +
            req.query.email, // plain text body
        })
        .then((info) => {
          console.log(info);
          res.json({ err: err, data: "Done" });
        });
    }else {
      res.json({ err: err, data: "Done" });
    }
  });
}; 

exports.resetPassword = (req, res) => {
  Post.findOneAndUpdate(req.query.email, req.body, (doc, err) => {
    if (err) {
      res.json({ err: err, data: {} });
    } else {
      res.json({ err: {}, data: doc });
    }
  });
};

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

exports.login = (req, res) => {
  Post.findOne(req.body, (err, doc) => {
    res.json({ err: err, data: doc });
  });
};

exports.edit = (req, res) => {
  Post.findByIdAndUpdate(req.query.id, req.body, (doc, err) => {
    if (err) {
      res.json({ err: err, data: {} });
    } else {
      res.json({ err: {}, data: doc });
    }
  });
};

exports.delete = (req, res) => {
  Post.findByIdAndDelete(req.query.id, (err, doc) => {
    if (err) {
      res.json({ err: err, data: {} });
    } else {
      res.json({ err: {}, data: doc });
    }
  });
};

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
  Post.find({ email: req.query.email }, (err, doc) => {
    if (err) {
      res.json({ err: err, data: {} });
    } else {
      res.json({ err: {}, data: doc });
    }
  });
};
