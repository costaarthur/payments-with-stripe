import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import Stripe from "stripe";

const Product: React.FC = () => {
  return <h1>Product</h1>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  let stripeSecretkey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretkey) {
    throw new Error("Stripe secret key is not defined!");
  }

  const stripe = new Stripe(stripeSecretkey, {
    apiVersion: "2023-08-16",
  });

  console.log("aquii");
  console.log(process.env.STRIPE_PUBLIC_KEY);
  const products = await stripe.products.list();

  console.log(products.data);

  return {
    paths: [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default Product;
