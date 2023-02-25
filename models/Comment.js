const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      alloNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allownull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allownull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "project",
        key: "id",
      },
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
