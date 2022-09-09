const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	Username: {
		type: String,
		required: true
	},
	Password: {	
		type: String,
		required: true
	},
	First_Name: {
		type: String,
		required: true
	},
	Last_Name: {
		type: String,
		required: true
	},
	Email: {
		type: String,
		required: true,
		unique: true
	},
	History: [{
		type: Schema.Types.ObjectId, 
		ref: "Diary"
	}],
	Meals: [{
		type: Schema.Types.ObjectId,
		ref: "Meals"
	}],
	First_Time_Login: {
		type: Number,
		required: true
	},
	Email_Verify: {
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
