const router = require("express").Router();
const userRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");
const commentRoutes = require("./comment-routes");

router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
