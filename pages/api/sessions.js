import { retrieveCheckoutSessionLineItems } from "@/utils/stripe";

export default async function sessions(req, res) {
    try {
        const lineItems = await retrieveCheckoutSessionLineItems(
            req.body.pi_id
        );
        console.log({ lineItems });
        res.status(200).json({
            lineItems,
        });
    } catch (err) {
        res.status(500).json({ err });
    }
}
