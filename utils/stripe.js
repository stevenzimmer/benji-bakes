import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";
import getRawBody from "raw-body";
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY);
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRECT_KEY, {
    apiVersion: "2020-03-02",
});

export async function createStripeCheckoutSession(
    line_items,
    customer,
    orderInfo
) {
    console.log({ orderInfo });
    const URL = process.env.NEXT_PUBLIC_URL;
    const session = await stripe.checkout.sessions.create({
        customer,
        payment_method_types: ["card"],
        line_items,
        success_url: `${URL}/success/{CHECKOUT_SESSION_ID}`,
        // success_url: `${URL}/`,
        cancel_url: `${URL}/`,
        shipping_address_collection: {
            allowed_countries: ["US"],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 0,
                        currency: "usd",
                    },
                    display_name: "Free shipping",
                    delivery_estimate: {
                        minimum: {
                            unit: "business_day",
                            value: 5,
                        },
                        maximum: {
                            unit: "business_day",
                            value: 7,
                        },
                    },
                },
            },
        ],
        metadata: {
            orderInfo: JSON.stringify(orderInfo),
        },
        mode: "payment",
    });

    return session;
}

export async function constructWebhookEvent(req) {
    const sig = req.headers["stripe-signature"];
    // console.log({ sig });
    const rawBody = await getRawBody(req);
    // console.log({ rawBody });

    const event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        process.env.NEXT_PUBLIC_STRIPE_SIGNING_SECRET
    );

    // console.log({ event });

    return event;
}

export async function createPaymentIntent(amount) {
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
    });

    return paymentIntent;
}

export async function retrieveCheckoutSession(cs_id) {
    const checkoutSession = await stripe.checkout.sessions.retrieve(cs_id);

    return checkoutSession;
}

export async function retrieveCustomer(customer_id) {
    const customer = await stripe.customers.retrieve(customer_id);
    return customer;
}

export async function getCustomerByEmail(email) {
    const customers = await stripe.customers.list();
    // console.log("get customer by email customers", customers);
    const customer = customers.data.filter(
        (customer) => customer.email === email
    );
    // console.log("get customer filterd", customer);
    if (!customer.length) {
        // console.log("no customer");
        return {};
    }
    // console.log({ customer[0] });
    // console.log("customer exists");
    return customer[0];
}

export async function retrieveProducts() {
    const products = await stripe.products.list({
        active: true,
    });
    return products;
}

export async function retrievePriceByProductId(product_id) {
    const price = await stripe.prices.list({
        product: product_id,
    });
    // const priceJson = await price.json();
    // console.log({ priceJson });
    return price;
}

export async function retrieveProductPrices(products) {
    const prices = await products.data?.map(async (product) => {
        // console.log({ product });
        const price = await stripe.prices.list({
            product: product.id,
        });

        return price;
    });

    const resolve = await Promise.all(prices);

    // const pricesThen = prices.then((result) => console.log(result));

    // console.log("retrieve product prices", resolve);
    // prices.then((result) => console.log(result));

    return resolve;
}

export async function createCustomer(email, description, uid) {
    // Check if customer exists
    const customerExists = await getCustomerByEmail(email);

    // If Customer does not exist then create
    if (!Object.entries(customerExists).length) {
        const createCustomer = await stripe.customers.create({
            email,
            description,
            metadata: {
                firebase_id: uid,
            },
        });
        // console.log("create customer", createCustomer);
        return createCustomer;
    } else {
        // console.log("customer exists", customerExists);
        return customerExists;
    }
}

export async function retrievePaymentIntents(customer_id) {
    const paymentIntents = await stripe.paymentIntents.list({
        customer: customer_id,
    });
    return paymentIntents;
}

export async function retrieveCharges(customer_id) {
    const charges = await stripe.charges.list({
        customer: customer_id,
    });

    return charges;
}

export async function retrieveCheckoutSessionLineItems(pi_id) {
    console.log({ pi_id });
    const checkoutSessionListLineItems =
        await stripe.checkout.sessions.listLineItems(pi_id);
    console.log({ checkoutSessionListLineItems });

    return checkoutSessionListLineItems;
}
