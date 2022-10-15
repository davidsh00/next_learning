import path from "path";
import fs from "fs/promises";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Home(props) {
  const { products } = props;
  const [data, setData] = useState(products);
  useEffect(() => {
    fetch("/backend/productsNew.json")
      .then((response) => response.json())
      .then((data) => setData(data.products));
  }, []);
  return (
    <div>
      <ul>
        {data.map((product) => (
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
