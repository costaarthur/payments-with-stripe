import Stripe from "stripe";

let stripeSecretkey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretkey) {
  throw new Error("Stripe secret key is not defined!");
}

const stripe = new Stripe(stripeSecretkey, {
  apiVersion: "2020-08-27",
});

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { amount, token } = req.body;

      const charge = await stripe.charges.create({
        amount: amount, // em centavos
        currency: "usd",
        description: "Compra de Chinelo",
        source: token,
      });

      res.status(200).json({ success: true, data: charge });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
