const User = require("./User");
const Project = require("./Project");
const Comment = require("./Comment");

// one user can make many Projects
User.hasMany(Project, {
  foreignKey: "project_id",
  onDelete: "CASCADE",
});

// one Project has many comments
Project.hasMany(Comment, {
  foreignKey: "project_id",
  onDelete: "CASCADE",
});

// one user has many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Projects are linked to users
Project.belongsTo(User, {
  foreignKey: "user_id",
});

// comments are linked to users
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// comments are linked to Projects
Comment.belongsTo(Project, {
  foreignKey: "project_id",
});

module.exports = { User, Project };
