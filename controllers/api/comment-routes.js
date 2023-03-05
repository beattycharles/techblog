const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//returns all comments from db
router.get("/", (req, res) => {
  Comment.findAll({})
    .then((commentData) => res.json(commentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//enters comment into db
router.post("/", withAuth, (req, res) => {
  Comment.create({
    comment: req.body.comment,
    user_id: req.session.user_id,
    project_id: req.body.project_id,
  })
    .then((commentData) => res.json(commentData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//delete comment from db
router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((commentData) => {
      if (!commentData) {
        res.status(404).json({ message: "No comment found with this id!" });
        return;
      }
      res.json(commentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
