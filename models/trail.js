module.exports = function(sequelize, DataTypes) {
  const Trail = sequelize.define("Trail", {
    trailId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    summary: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    stars: DataTypes.INTEGER
  });
  Trail.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Trail.belongsTo(models.Accounts, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Trail;
};
