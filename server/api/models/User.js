/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	name : {
		type:"string",
		required:true
	},
	password: {
		type:"string",
		required:true
	},
	age	: {
		type:"string",
		required:false
	},
	sex	: {
		type:"string",
		enum: ["Male","Female","Other"],
		required:true
	},
	phone : {
		type:"string",
		required:true
	},
	favouriteColor : {
		type:"string",
		required:false
	},
	email: {
		type:"string",
		required:true
	},
	associates: {
		type:"array",
		required:false
	}
  }
};

