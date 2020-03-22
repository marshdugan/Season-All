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
    Trail.belongsTo(models.Accounts, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Trail;
};
