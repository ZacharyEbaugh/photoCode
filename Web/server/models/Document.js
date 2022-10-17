const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
	doc_title: {
		type: String,
		required: true,
        unique: true
	},
	doc_id: {	
		type: String,
		required: true
	},
	time_created: {
		type: Timestamp,
		required: true
	},
	time_last_modified: {
		type: Timestamp,
		required: true
	},
    date_created: {
        type: Timestamp,
        required: true
	},
	date_last_modified: {
		type: Timestamp,
		required: true
	},
    // GridFS seems best
	// file_link: {
	// 	type: String,
	// 	required: true,
	// 	unique: true
	// },
}, {collection: 'Documents'});
module.exports = Document = mongoose.model("Documents", UserSchema);