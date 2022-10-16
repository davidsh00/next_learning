import path from "path";
import fs from "fs/promises";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Home(props) {
  const { products } = props;

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link
              href={{
                pathname: `/[pid]`,
                query: { pid: product.id },
              }}
            >
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export async function getStaticProps(context) {
  const filePath = path.join(
    process.cwd(),
    "public",
    "backend",
    "products.json"
  );
  const jsonData = await fs.readFile(filePath);
  const data = await JSON.parse(jsonData);
  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }
  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }
  return {
    revalidate: 10,
    props: {
      products: data.products,
    },
  };
}
