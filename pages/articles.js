import Head from 'next/head'
import Layout from '../components/layout'
import PageHeader from '../components/PageHeader'
import { getApiUrl, getArticles, getClusters } from '../lib/api';
import { ArticleGrid } from '../components/Articles';
import { Text, Loader, Center } from '@mantine/core';
import { useEffect, useState } from 'react';


// export async function getStaticProps() {
//   const articles = await getArticles();
//   const clusters = await getClusters();
//   return {
//     props: {
//       articles: articles,
//       clusters: clusters
//     }
//   }
// }



export default function Articles() {
  const [articles, setArticles] = useState(null)
  const [isLoaded, setLoaded] = useState(false)

  useEffect(()=> {
    getArticles().then((articles) => {
      setArticles(articles)
      setLoaded(true)
    })
  }, isLoaded)

  return (
    <Layout>
      <div className="container">
        <main>
          {!articles &&
          <Center style={{ width: '100%', height: 400 }}>
            <Loader color="violet" size="xl" variant="bars" />
          </Center>
          }
          {articles && <Text>{JSON.stringify(articles)}</Text>}
        </main>
      </div>
    </Layout>
  )
}
