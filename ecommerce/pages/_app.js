import React from 'react';
import { Layout } from '../components';

import '../styles/globals.css'
import { StateContext } from '../context/StateContext';//allows you to receive data anywhere in the app
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
    )
}

export default MyApp
