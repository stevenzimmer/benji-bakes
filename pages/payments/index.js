import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function Payments() {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState(0);
    const [paymentIntent, setPaymentIntent] = useState();
    const createPaymentIntent = async (e) => {
        e.preventDefault();
        const validAmount = Math.min(Math.max(amount, 50), 9999999);
        setAmount(validAmount);

        const pi = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`, {
            method: "POST",
            body: JSON.stringify({ amount: validAmount }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const { paymentIntent: piRes } = await pi.json();
        console.log({ piRes });

        setPaymentIntent(piRes);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cardElement = elements.getElement(CardElement);

        const { paymentIntent: updatedPaymentIntent, error } =
            await stripe.confirmCardPayment(paymentIntent.client_secret, {
                payment_method: { card: cardElement },
            });

        if (error) {
            console.log({ error });
            error.payment_intent && setPaymentIntent(error.paymentIntent);
        } else {
            console.log("no error");
            console.log({ updatedPaymentIntent });
            setPaymentIntent(updatedPaymentIntent);
        }
    };
    return (
        <div className="container">
            <input
                type="number"
                value={amount}
                disabled={paymentIntent}
                onChange={(e) => setAmount(e.target.value)}
            />
            <br />
            <button
                disabled={amount <= 0}
                onClick={createPaymentIntent}
                hidden={paymentIntent}
            >
                Ready to pay ${(amount / 100).toFixed(2)}
            </button>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit">Pay</button>
            </form>
            {paymentIntent?.status}
        </div>
    );
}
