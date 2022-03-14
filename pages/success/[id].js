import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { retrieveCheckoutSession, retrieveCustomer } from "@/utils/stripe";
import { useAuth } from "@/context/AuthContext";
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
import { Box, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
export default function Success({ session, customer, order }) {
    const { cart, setCart, currentUser, address, setAddress } = useAuth();
    console.log({ session });
    console.log({ order });

    console.log({ customer });
    useEffect(() => {
        setCart([]);
        localStorage.setItem("cart", JSON.stringify([]));
    }, []);
    return (
        <>
            <Box textAlign="center" py={10} px={6}>
                <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
                <Heading as="h2" size="xl" mt={6} mb={2}>
                    Checkout Success!
                </Heading>
                <Text color={"gray.500"}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua.
                </Text>
            </Box>
            <div>
                <h2>Checkout session data</h2>
                <div>Total: {session.amount_total}</div>
                <div>{session.currency}</div>
                <div>{session.customer}</div>
                <div>{session.status}</div>
                <div>{session.payment_status}</div>
                <div>{session.customer_email}</div>
            </div>
            <div>
                <h2>Shipping to</h2>
                <div>{customer.name}</div>
                <div>Email: {session.customer_details.email}</div>
                <div>Address</div>
                <div>{session.shipping?.address?.city}</div>
                <div>{session.shipping?.address?.line1}</div>
                <div>{session.shipping?.address?.line2}</div>
                <div>{session.shipping?.address?.postal_code}</div>
                <div>{session.shipping?.address?.state}</div>
            </div>
            <div>
                {session.display_items.map((item, i) => {
                    return (
                        <div key={i}>
                            <div>{item.amount}</div>
                            <div>{item.currency}</div>
                            <div>{item.custom.description}</div>
                            <div>{item.custom.name}</div>
                            <div>{item.quantity}</div>
                        </div>
                    );
                })}
            </div>
            <Link href="/">
                <a>Back to home</a>
            </Link>
        </>
    );
}

export async function getServerSideProps(context) {
    // const router = useRouter();
    console.log(context.params.id);
    const checkoutSession = await retrieveCheckoutSession(context.params.id);
    // if (!checkoutSession) {
    //     router.push("/");
    // }
    console.log({ checkoutSession });

    const orderData = JSON.parse(checkoutSession.metadata.orderInfo);
    console.log({ orderData });

    const customer = await retrieveCustomer(checkoutSession.customer);

    await addDoc(collection(db, "orders"), {
        uid: customer.metadata.firebase_id,
        ...orderData,
    });

    return {
        props: {
            session: checkoutSession,
            customer,
            // order,
        }, // will be passed to the page component as props
    };
}
