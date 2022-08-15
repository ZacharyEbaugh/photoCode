const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
        unique: true
	},
	password: {	
		type: String,
		required: true
	},
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	email_verification: {
		type: Number,
		required: true
	},
	Email_Token: {
		type: String,
		required: true
	},
	FP_Token: {
		type: String,
		required:true
	}
}, {collection: 'Users'});
module.exports = User = mongoose.model("Users", UserSchema);