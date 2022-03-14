import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import {
    doc,
    getDoc,
    collection,
    getDocs,
    addDoc,
    setDoc,
    onSnapshot,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
export default function Products() {
    return (
        <div>
            <div>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    console.log(context.req.cookies);
    // const router = useRouter();
    // console.log(context.params.id);
    // const checkoutSession = await retrieveCheckoutSession(context.params.id);
    // if (!checkoutSession) {
    //     router.push("/");
    // }
    // const id = cookies.get("customer");
    // const serverCookies = new Cookies(context.req.cookies);
    // const customerCookies = await serverCookies.get("customer");
    // console.log({ customerCookies });

    // const customer = await retrieveCustomer(customerCookies.id);
    // const paymentIntents = await retrievePaymentIntents(customerCookies.id);
    // const charges = await retrieveCharges(customerCookies.id);

    return {
        props: {
            // customer,
            // paymentIntents,
            // charges,
        }, // will be passed to the page component as props
    };
}
