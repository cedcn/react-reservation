import React from 'react'
import Head from 'next/head'
import Reservation from '../../dist/reservation'
import { NextPage } from 'next'

const IndexPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Reservation</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <div className="container">
          <Reservation />
        </div>
      </div>
    </div>
  )
}

export default IndexPage
