import { retrieveProductPrices } from "@/utils/stripe";

export default async function prices(req, res) {
    // console.log(req.body.products.data);
    const prices = await retrieveProductPrices(req.body.products.data);
    // console.log({ prices });

    res.status(200).json({ prices });
}
