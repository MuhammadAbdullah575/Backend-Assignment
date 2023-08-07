require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const createCheckoutSession = async (req, res) => {
  console.log("assasas", req.body.items);
  const line_items = req.body.items.map((item) => {
    return {

      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.name,
        
        },
        unit_amount: parseInt(item.product.price)*100
        ,
      },
      quantity: item.quantity,
    }
  });
  console.log({line_items});
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "PK"],
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
          // Delivers between 5-7 business days
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
    line_items,
    mode: "payment",
    success_url:`http://localhost:3001/checkout`,
  });
  console.log({session});

  res.send({url:session.url});

};

module.exports = {
  createCheckoutSession,
};
