const Sequelize = require('sequelize');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');
const sequelize = new Sequelize( {
  dialect: 'sqlite',
  storage: '/home/annie/Documents/nodepractice/LoginSecurity.db'
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

var ls_players = sequelize.define("ls_players",{
    id: {type:Sequelize.INTEGER, primaryKey: true, autoIncrement: true, notNull:true},
    unique_user_id:{type:Sequelize.STRING(128)},
    last_name:{type:Sequelize.STRING(16)},
    ip_address:{type:Sequelize.STRING(64)},
    password:{type:Sequelize.STRING(512)},
    hashing_algorithm:{type:Sequelize.INTEGER},
    location_id:{type:Sequelize.INTEGER},
    inventory_id:{type:Sequelize.INTEGER},
    last_login:{type:Sequelize.DATE},
    registration_date:{type:Sequelize.DATE},
    optlock:{type:Sequelize.BIGINT(20),notNull:true},
    uuid_mode:{type:Sequelize.STRING(1)}
    }, 
    {
      sequelize,
      modelName: 'ls_players',
      timestamps: false,
    }
)

module.exports = {
  search : function(data1){
    return ls_players.findOne({
    attributes: ['password'],
    where:{
      last_name:data1,
      }
    })   
  },
}