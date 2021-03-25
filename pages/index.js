import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import { harperFetch } from "../utils/harperdb";

export default function Home({ dogs }) {
  const addDog = async () => {
    try {
      const body = {
        operation: "insert",
        schema: "dev",
        table: "dog",
        records: [
          {
            dog_name: "Max",
            owner_name: "Anne",
            breed_id: 154,
            age: 15,
            weight_lbs: 35,
            adorable: true,
          },
        ],
      };

      await harperFetch(body);
    } catch (e) {
      console.log(error.message);
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Harper DB!</a>
        </h1>

        <button onClick={addDog}>Add dog</button>

        <div className={styles.grid}>
          {dogs.map((dog) => (
            <Link href={`/dog/${dog.id}`} key={dog.id}>
              <a className={styles.card}>{dog.dog_name}</a>
            </Link>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const body = {
    operation: "sql",
    sql: "SELECT * FROM dev.dog",
  };
  const dogs = await harperFetch(body);

  return {
    props: {
      dogs,
    },
  };
}
