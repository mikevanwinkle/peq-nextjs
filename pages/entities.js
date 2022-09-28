import Layout from '../components/layout'
import { getArticles, getEntities } from '../lib/api';
import EntitiesChart from '../components/EntitiesCharts'
import { SimpleGrid } from '@mantine/core';
import { TrendingWidget } from '../components/Trending';
import EntitySentiment from '../components/EntitySentiment';
import ArticleClusters from '../components/AritcleClusters';


export async function getStaticProps() {
  const entities = await getEntities();
  return {
    props: {
      entities: entities.data.data
    }
  }
}


export default function Entities({entities}) {
  return (
    <Layout header={
      <title>PoliticsEQ | Todays Top Entities </title>
    }>
      <div className="container">
        <main>
        <SimpleGrid
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: 'md' },
            { maxWidth: 755, cols: 2, spacing: 'sm' },
            { maxWidth: 600, cols: 1, spacing: 'sm' },
          ]}
          >
          <div><EntitiesChart entities={entities}></EntitiesChart></div>
          <div><TrendingWidget></TrendingWidget></div>
          <div><EntitySentiment></EntitySentiment></div>
          </SimpleGrid>
        </main>
      </div>
    </Layout>
  )
}


