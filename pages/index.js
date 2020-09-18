import Dropzone from "components/Dropzone";
import UploadForm from "components/UploadForm";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <UploadForm />
      </div>
    </>
  );
}
