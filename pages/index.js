import Head from 'next/head'
import Layout from '../components/layout'
import PageHeader from '../components/PageHeader'
import { getApiUrl, getArticles, getClusters } from '../lib/api';
import { ArticleGrid } from '../components/Articles';
import { EmotionChart } from '../components/EmotionChart'
import EntitiesChart from '../components/EntitiesCharts'
import { Paper, SimpleGrid, Table } from '@mantine/core';
import { TrendingWidget } from '../components/Trending';
import EntitySentiment from '../components/EntitySentiment';


export async function getStaticProps() {
  const articles = await getArticles();
  const clusters = await getClusters();
  return {
    props: {
      articles: articles,
      clusters: clusters
    }
  }
}

export default function Home({articles, clusters}) {
  return (
    <Layout>
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
          <div><EntitiesChart></EntitiesChart></div>
          <div><TrendingWidget></TrendingWidget></div>
          <div><EntitySentiment></EntitySentiment></div>
          </SimpleGrid>
        </main>
      </div>
    </Layout>
  )
}
