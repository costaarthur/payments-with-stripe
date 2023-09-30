import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import Stripe from "stripe";

const products = [
  {
    id: "1",
    name: "Produto 1",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Produto 2",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Produto 3",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    name: "Produto 4",
    imageUrl: "https://via.placeholder.com/150",
  },
];

export const getStaticPaths: GetStaticPaths = async () => {
  let stripeSecretkey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretkey) {
    throw new Error("Stripe secret key is not defined!");
  }

  const stripe = new Stripe(stripeSecretkey, {
    apiVersion: "2023-08-16",
  });

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

const Product: React.FC = () => {
  const handleBuyClick = (productId: string) => {
    console.log(`Produto com ID ${productId} foi clicado.`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {products.map((product) => (
        <div key={product.id} style={{ flex: "0 0 48%", marginBottom: "20px" }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            width={150}
            height={150}
          />
          <div>{product.name}</div>
          <button onClick={() => handleBuyClick(product.id)}>Buy</button>
        </div>
      ))}
    </div>
  );
};

export default Product;
