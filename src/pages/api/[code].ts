import Urls from "../../models/url";
import connectMongo from "../../utils/connectMongo";

export default async function handler(req: any, res: any) {
	if (req.method === "GET") {
		const { code } = req.query;
		await connectMongo();
		const data = await Urls.findOne({ code });
		if (data) {
			data.clicked += 1;
			data.save();
			res.redirect(data.url);
		} else {
			return res.status(404);
		}
	} else {
		return res.status(400);
	}
}
