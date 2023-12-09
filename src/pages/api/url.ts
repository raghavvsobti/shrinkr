import Urls from "../../models/url";
import connectMongo from "../../utils/connectMongo";

export default async function handler(req: any, res: any) {
	if (req.method === "GET") {
		await connectMongo();
		const urlList = await Urls.find();
		return res.status(200).json(urlList);
	} else if (req.method === "POST") {
		if (!req.body.url) {
			return res.status(400).json("Please provide url");
		}
		await connectMongo();
		const newUrl = await Urls.create({
			url: req.body.url,
		});

		return res.status(201).json(newUrl);
	} else {
		return res.status(404);
	}
}
