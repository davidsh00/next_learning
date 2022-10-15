import { Fragment } from "react";
import path from "path";
import fs from "fs/promises";

export default function Product({ product }) {
  console.log(product);
  return (
    <Fragment>
      <h2>
        {product.id}
        {product.name}
      </h2>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const pid = context.params.pid;
  const filePath = path.join(
    process.cwd(),
    "public",
    "backend",
    "products.json"
  );
  const jsonData = await fs.readFile(filePath);
  const data = await JSON.parse(jsonData);
  const product = data.products.find((item) => item.id == pid);
  return {
    props: {
      product,
    },
  };
}
export async function getStaticPaths() {
  return {
    paths: [{ params: { pid: "1" } }],
    fallback: false,
  };
}
