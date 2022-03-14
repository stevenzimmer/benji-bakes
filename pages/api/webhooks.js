import Stripe from "stripe";
import { stripePromise } from "@/utils/stripe";

import { constructWebhookEvent } from "@/utils/stripe";

const webhookHandlers = {
    "payment_intent.succeeded": async (data) => {
        return data;
    },
    "payment_intent.payment_failed": async (data) => data,
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handleWebhooks(req, res) {
    console.log("new request get raw body");

    const event = await constructWebhookEvent(req);

    try {
        const webhookRes = await webhookHandlers[event.type](event.data.object);
        console.log({ webhookRes });
        res.status(200).json({ webhookRes });
    } catch (err) {
        // console.log({ err });
        res.status(400).json({ err });
    }

    // const data = await webhookPayloadParser(req);
    // req.rawBody = data;

    // let json_string = decodeURIComponent(req.rawBody).split("payload=")[1];
    // let json = JSON.parse(json_string);
    // req.body = json;
}
