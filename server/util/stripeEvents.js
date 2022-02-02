const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET)

module.exports = (app) => {
    app.post('/webhook', async (req, res) => {
        const sig = req.headers['stripe-signature']

        let event = null;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, process.env.endpointSecret);
        } catch (err) {
            // invalid signature
            console.log(err)
            res.status(400).end();
            return;
        }

        let intent = null;
        switch (event['type']) {
            case 'payment_intent.succeeded':
                intent = event.data.object;
                console.log(intent)
            break;
            
            case 'payment_intent.payment_failed':
                intent = event.data.object;
                const message = intent.last_payment_error && intent.last_payment_error.message;
                console.log('Failed:', intent.id, message);
            break;
        }

        res.sendStatus(200);
    })
}