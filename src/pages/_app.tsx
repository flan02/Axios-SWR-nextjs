import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'
import { Anton } from 'next/font/google'
import type { AppProps } from 'next/app'
import { Container } from 'react-bootstrap'
import Head from 'next/head'
const anton = Anton({ subsets: ['latin'], weight: ["400"] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nextjs Pokedex Axios+SWR</title>
        <meta name="description" content="Nextjs Pokedex app by @flan02" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={anton.className}>
        <main>
          <Container className='py-4'>

            <Component {...pageProps} />
          </Container>
        </main>
      </div>
    </>
  )
}
