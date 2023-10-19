import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { buffer } from "micro";

const stripe = require('stripe')(process.env.STRIPE_SK);
const endpointSecret = "whsec_3d7f4373dfce01e0bf6e2387e855dc44fa689d2235a188aac09522f08e87d0e6";


export default async function handler(req, res) {
    await mongooseConnect();
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const data = event.data.object;
            const orderId = data.metadata.orderId;
            const paid = data.payment_status == 'paid';
            if (orderId && paid) {
                await Order.findByIdAndUpdate(orderId, {
                    paid: true,
                })
            }
            console.log(data);
            // Then define and call a function to handle the event payment_intent.succeeded
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).send('ok')
}

export const config = {
    api: { bodyParser: false, }
}

//  bright-thrift-cajole-lean
// whsec_3d7f4373dfce01e0bf6e2387e855dc44fa689d2235a188aac09522f08e87d0e6