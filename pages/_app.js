import Script from "next/script";
import "../styles/globals.css";

import AuthContextProvider from "@/context/AuthContext";
import { Elements } from "@stripe/react-stripe-js";

import { stripePromise } from "@/utils/stripe";

import { FirebaseAppProvider } from "reactfire";

import { firebaseConfig } from "@/lib/firebase-app";
import { ChakraProvider } from "@chakra-ui/react";
const GmapApi = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function BBApp({ Component, pageProps }) {
    return (
        <AuthContextProvider>
            <Elements stripe={stripePromise}>
                <ChakraProvider resetCSS={true}>
                    <Script
                        src={`https://maps.googleapis.com/maps/api/js?key=${GmapApi}&libraries=places&v=weekly`}
                        strategy="beforeInteractive"
                    />
                    <Component {...pageProps} />
                </ChakraProvider>
            </Elements>
        </AuthContextProvider>
    );
}

export default BBApp;
