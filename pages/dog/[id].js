import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { harperFetch } from "../../utils/harperdb";

export default function Dog({ dog }) {
  return (
    <div className={styles.container}>
      <header>
        <Link href="/">
          <a>Home</a>
        </Link>
      </header>
      <main className={styles.main}>
        <pre>{JSON.stringify(dog, null, 2)}</pre>
        <h1>{dog.dog_name}</h1>
      </main>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const id = params.id;
  const body = {
    operation: "sql",
    sql: `SELECT * FROM dev.dog where id='${id}'`,
  };
  const dog = await harperFetch(body);

  return {
    props: {
      dog: dog[0] || {},
    },
  };
}

export async function getStaticPaths() {
  const body = {
    operation: "sql",
    sql: "SELECT * FROM dev.dog",
  };
  const dogs = await harperFetch(body);

  return {
    paths: dogs.map((dog) => ({
      params: { id: dog.id.toString() },
    })),
    fallback: false,
  };
}
