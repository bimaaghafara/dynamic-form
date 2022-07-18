import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

// styles
import styles from '../styles/Home.module.css';

// 3rd libs
import axios from 'axios';

// components
import DynamicForm from '../src/components/dynamic-form';

const Home: NextPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState();

  useEffect(() => {
    axios.get('https://ulventech-react-exam.netlify.app/api/form')
      .then(res => {
        setData(res.data.data)
      })
      .catch( err => {
        setError(err)
      })
  }, []);

  if (error) return <>Error!</>;
  if (!data) return <>Loading...</>;
  return (
    <div className={styles.container}>
      <Head>
        <title>Dynamic Form</title>
        <meta name="description" content="Created By Bimaa Ghafara" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {data?.map?.((e, i) => (
        <DynamicForm key={i} {...e} />
      ))}
    </div>
  )
}

export default Home
