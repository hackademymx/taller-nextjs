import Head from "next/head";
import React from "react";
import styles from "./styles.module.css";
export default function ProductsScreen({ product, error }) {
  if (!error) {
    return (
      <div className={styles.product__screen}>
        <Head>
          <title>{product.attributes.name}</title>
        </Head>
        <div className={styles.product__image}>
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${product.attributes?.image?.data.attributes.formats.thumbnail.url}`}
            width="200"
            height="200"
          />
        </div>
        <div className={styles.product__info}>
          <h2>{product.attributes.name}</h2>
          <span>{product.attributes.description}</span>
        </div>
      </div>
    );
  } else {
    return <h1>Este producto no existe</h1>;
  }
}
export async function getServerSideProps({ params }) {
  const data = await fetch(
    `${process.env.API_URL}/products?populate=image,categories&filters[slug][$eq]=${params.slug}`
  );
  const productData = await data.json();
  return {
    props: {
      product: productData.data[0],
      error: productData.error ? productData.error : false,
    },
  };
}
