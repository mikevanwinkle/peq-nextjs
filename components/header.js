import Head from 'next/head'

export default function Header({children, pageProps}) {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css" />
      <link rel="stylesheet" href="/css/main.css" />
      <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
      {children}
    </Head>
  )
}