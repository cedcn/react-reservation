import React from 'react'
import Reservation from 'react-reservation'
import Head from 'next/head'
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
        <style jsx>{`
          .container {
            width: 500px;
            margin-left: auto;
            margin-right: auto;
          }

          h1 {
            text-align: center;
          }
        `}</style>
        <div className="container">
          <h1>Reservation</h1>
          <Reservation />
        </div>
      </div>
    </div>
  )
}

export default IndexPage
