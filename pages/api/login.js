// const { connect } = require("getstream");
import { createCustomer } from "@/utils/stripe";

export default async function login(req, res) {
    const { email, uid } = req.body;

    try {
        const customerRes = await createCustomer(
            email,
            "Customer created via Google",
            uid
        );

        // Initialize a Server Client
        // const serverClient = await connect(
        //     process.env.NEXT_PUBLIC_STREAM_API_KEY,
        //     process.env.NEXT_PUBLIC_STREAM_API_SECRET,
        //     process.env.NEXT_PUBLIC_STREAM_APP_ID
        // );

        // const chatToken = await serverClient.createUserToken(customerRes.id);

        // console.log({ chatToken });

        res.status(200).json({
            // chatToken,
            customerRes,
        });
    } catch (err) {
        res.status(500).json({ err });
    }
}
