import type { NextPage } from 'next';
import Head from 'next/head';

// styles
import styles from '../styles/Home.module.css';

// components
import Home from 'src/pages/home';

const HomePage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dynamic Form</title>
        <meta name="description" content="Created By Bimaa Ghafara" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </div>
  )
}

export default HomePage;
