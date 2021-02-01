const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    surname: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "email",
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    number: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [8,10]
      }
    }
  }, 
  {
    sequelize,
    tableName: 'User',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "HASH",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });


  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10).then(hash => {
      user.password = hash;
      user.email = user.email.toLowerCase();
    });
  });

  User.prototype.isValidPassword = function (password){
    return bcrypt.compare(password, this.password);
  }

  return User;

};
