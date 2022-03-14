import { createPaymentIntent } from "@/utils/stripe";

export default async function payments(req, res) {
    const paymentIntent = await createPaymentIntent(req.body.amount);

    res.status(200).json({ paymentIntent });
}
