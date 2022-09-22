const Post = require('../model/post')
const Feedback = require("../model/feedback");
const User = require("../model/user");
const Train = require("../model/train");
const async = require('async')

exports.adminDashboard = (req, res) => {
    async.parallel(
      {
        userCount: function (callback) {
            User.countDocuments({}, (err, res) => {
              callback(err, res);
            });
        },
        trainCount: function (callback) {
            Train.countDocuments((err, res) => {
              callback(err, res);
            });
        },
        postCount: function (callback) {
            Post.countDocuments((err, res) => {
              callback(err, res);
            });
        },
        feedbackCount: function (callback) {
            Feedback.countDocuments((err, res) => {
              callback(err, res);
            });
        },
      },
      function (err, results) {
        res.json({err: {}, data:results})
      }
    );
};
