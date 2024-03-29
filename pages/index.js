import Layout from '../components/layout'
import { getArticles, getEntities } from '../lib/api';
import Articles from './articles';
import EntitiesChart from '../components/EntitiesCharts'
import { SimpleGrid } from '@mantine/core';
import { TrendingWidget } from '../components/Trending';
import EntitySentiment from '../components/EntitySentiment';
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


export default function Home({articles, clusters, entities}) {
  return (
    <Articles></Articles>
  )
}
