import { createStripeCheckoutSession } from "@/utils/stripe";
import { auth, db, provider } from "@/lib/firebase-app";
import {
    doc,
    getDoc,
    collection,
    getDocs,
    addDoc,
    setDoc,
    onSnapshot,
} from "firebase/firestore";
export default async function checkout(req, res) {
    // console.log(req.body.line_items);
    // console.log(req.body.customer);
    const session = await createStripeCheckoutSession(
        req.body.line_items,
        req.body.customer,
        req.body.orderInfo
    );

    // req.body.orderInfo.session = session.id;

    try {
        // console.log(req.body.orderInfo);
        // console.log("getting order...");

        // const order = await addDoc(
        //     collection(db, "orders"),
        //     req.body.orderInfo
        // );

        // console.log("found order...");

        // console.log({ order });

        await res.status(200).json({
            session,
        });
    } catch (err) {
        res.status(500).json({ err });
    }
}
