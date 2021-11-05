import Head from 'next/head'

import Layout from "../components/layout/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="with=device-width, initial-scale=1"/>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
