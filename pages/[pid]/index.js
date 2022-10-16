import { Fragment } from "react";
import path from "path";
import fs from "fs/promises";

export default function Product({ product }) {
  if(!product){
    return <h4>Loading...</h4>
  }
  return (
    <Fragment>
      <h2>
        {product.id}.&nbsp;
        {product.name}
      </h2>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const pid = context.params.pid;
  const data = await getData();
  const product = data.products.find((item) => item.id == pid);
  if (!product) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      product,
    },
  };
}
async function getData() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "backend",
    "products.json"
  );
  const jsonData = await fs.readFile(filePath);
  return await JSON.parse(jsonData);
}
export async function getStaticPaths() {
  const data = await getData();
  const pathArray = data.products.map((item) => {
    return {
      params: {
        pid: item.id,
      },
    };
  });

  return {
    paths: [{ params: { pid: "p1" } }],
    fallback: true,//true(work like fetch in useEffect,just render static page in first build then pass props in each request for that page that not in paths and ths method not good for seo if important instance great)  false(just show ssg page that bring thats query and params in get static paths , paths),blocking(for fully make and ultimatly send for client)
  };
}
