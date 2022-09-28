import Head from 'next/head'
import Layout from '../../components/layout'
import { getApiUrl, getArticles, getClusters } from '../../lib/api';
import { Image, Title, Text, Button, SimpleGrid, Skeleton, Divider } from '@mantine/core';
import { Meta, EntityTable, EmotionBars, MoralFoundations, RelatedArticles } from "../../components/Article/Blocks"
import useStyles from "../../lib/styles"


export async function getStaticProps({params}) {
  const res = await fetch('https://api.politicseq.com/api/article/'+params.key)
  const article = await res.json()
  return {
    props: {
      article: article.data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 1, // In seconds
  }
}

export const getStaticPaths = async () => {

  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}

export default function Article({article}) {
  const { classes, theme } = useStyles()

  return (
    <Layout
      header={
        <>
        <title>{article.title} - PoliticsEQ</title>
        <meta name="description" content={article.summary.slice(0,155)}></meta>
        <link rel="canonical" href={`https://politicseq/article/${article.key}/`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary.slice(0,155)} />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://politicseq/article/${article.key}/`} />
        <meta property="twitter:title" content={article.title} />
        <meta property="twitter:description" content={article.summary.slice(0,155)} />
        <meta property="twitter:image" content={article.image} />
        <meta property="og:image" content={article.image} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@politicseq" />
        <meta property="twitter:creator" content="@politicseq" />
        </>
      }>
      <SimpleGrid cols={2}
        breakpoints={[
            { maxWidth: 980, cols: 2, spacing: 'md' },
            { maxWidth: 755, cols: 1, spacing: 'md' },
            { maxWidth: 600, cols: 1, spacing: 'sm' },
          ]}
      >
        <div className={classes.article}>
          <Meta article={article}></Meta>
          <Divider  my="sm" variant="dashed" style={{margin: '3vh 0'}}></Divider>
          <EmotionBars article={article}></EmotionBars>
          <MoralFoundations article={article}></MoralFoundations>
        </div>
        <div>
          <EntityTable article={article}></EntityTable>
          <RelatedArticles article={article}></RelatedArticles>
        </div>
        <div>

        </div>
      </SimpleGrid>
    </Layout>
  )
}