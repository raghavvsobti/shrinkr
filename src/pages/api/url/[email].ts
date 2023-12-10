import Urls from "../../../models/url";
import connectMongo from "../../../utils/connectMongo";

export default async function handler(req: any, res: any) {
	if (req.method === "GET") {
		await connectMongo();
		const urlList = await Urls.find({ email: req.query.email }).sort({ _id: -1 });
		return res.status(200).json(urlList);
	} else {
		return res.status(404);
	}
}