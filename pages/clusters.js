import Layout from '../components/layout'
import { getArticles, getEntities } from '../lib/api';
import { SimpleGrid } from '@mantine/core';
import ArticleClusters from '../components/AritcleClusters';


export async function getStaticProps() {
  const articles = await getArticles();
  const entities = await getEntities();
  return {
    props: {
      articles: articles,
      entities: entities.data.data
    }
  }
}


export default function Clusters({articles, clusters, entities}) {
  return (
    <Layout header={
      <title>PoliticsEQ</title>
    }>
      <div className="container">
        <main>
        <SimpleGrid cols={1} spacing="lg">
          <ArticleClusters ></ArticleClusters>
        </SimpleGrid>
        </main>
      </div>
    </Layout>
  )
}
