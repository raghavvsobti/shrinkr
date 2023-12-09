const { Schema, model, models } = require("mongoose");
const shortid = require("shortid");

const UrlSchema = new Schema({
	code: {
		type: String,
		unique: true,
		default: shortid.generate,
	},
	url: { type: String, require: true },
	clicked: { type: Number, default: 0 },
});

const Urls = models.Urls || model("Urls", UrlSchema);

export default Urls;
