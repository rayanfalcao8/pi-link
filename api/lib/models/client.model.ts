import { DATE } from 'sequelize/types/data-types';
export{};
const {
  Model
} = require( 'sequelize' );

exports.default = (sequelize, DataTypes) => {
  class Client extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
	  // define association here
	}

	static getClass() {
		const classname = this.toString().split("(" || /s+/)[0].split( " " || /s+/) [1];

		return classname;
	}
  };

  Client.init({
	id: {
	  type: DataTypes.INTEGER,
	  primaryKey: true,
	  autoIncrement: true,
	  allowNull: false
	},
	name: {
	  type: DataTypes.STRING,
	},
	surname:{
	  type: DataTypes.STRING
	},
	id_number:{
	  type: DataTypes.STRING
	},
	issued_at:{
	  type: DataTypes.STRING
	},
	issued_on:{
	  type: DataTypes.DATE
	},
	residence:{
	  type: DataTypes.STRING
	},
	phone_number:{
	  type: DataTypes.STRING
	},
	email:{
	  type: DataTypes.STRING
	},
  }, {
	sequelize,
	modelName: 'Client',
  });
  return Client;
};