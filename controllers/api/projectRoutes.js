const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Project, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get post from user
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "user_id",
      "description",
      "date_created"[
        sequelize.literal(
          "(SELECT COUNT(*) FROM project WHERE user.id = project.user_id)"
        )
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment", "project_id", "user_id", "date_created"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Save created post to db
router.post("/", withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    user_id: req.session.user_id,
    description: req.body.description,
  })
    .then((postData) => res.json(postData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Edit post in db by user id
router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((postInfo) => {
      if (!postInfo) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(postInfo);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete post from db
router.delete("/:id", withAuth, (req, res) => {
  console.log("id", req.params.id);
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((postInfo) => {
      if (!postInfo) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(postInfo);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
