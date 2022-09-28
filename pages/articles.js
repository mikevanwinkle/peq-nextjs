import Head from 'next/head'
import Layout from '../components/layout'
import { getArticles } from '../lib/api';
import Link from 'next/link'
// import { ArticleGrid } from '../components/Articles';
import { VProgressBar as ProgressBar } from '../components/vProgress';
import { Paper, Loader, Center, Image, Title, SimpleGrid, SegmentedControl, Divider } from '@mantine/core';
import { useEffect, useState, useRef, useCallback } from 'react';
import useStyles from '../lib/styles';

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [order, setOrder] = useState('DESC')
  const [orderBy, setOrderBy] = useState('composite_sort')
  const [leans, setLeans] = useState(null)
  const [isLoaded, setLoaded] = useState(false)
  const {classes} = useStyles()

  const sortOptions = [
    { label: 'Date', value: 'date'},
    { label: 'Opinion', value: 'opinion'},
    { label: 'Newsy', value: 'newsy'},
    { label: 'Smart Sort', value: 'composite_sort'},
    { label: "Grade Level", value: 'smog_index'}
  ]

  const slantOptions = [
  { label: 'Liberal', value: 'left' },
  { label: 'Neutral', value: 'neutral'},
  { label: 'Conservative',	value: 'right'},
  { label: 'None', value: ''}
  ]

  useEffect(()=> {
    setLoaded(false)
    let params = {
      leans: leans,
      order_by: orderBy,
      order: order
    }
    getArticles(params).then((articles) => {
      console.log("ARTICLES",articles)
      if (articles && articles.length) {
        setArticles(articles)
      }
      setLoaded(true)
    })
  }, [leans, order, orderBy])

  const updateParams = (idx, e) => {
    const funcs = {
      'leans': setLeans,
      'order_by': setOrderBy,
      'order': setOrder
    }
    if (idx == 'order_by' && ['opinion', 'newsy'].includes(e)) {
      setOrder(e == 'opinion' ? 'desc' : 'asc')
      setOrderBy('subjectivity')
    } else {
      funcs[idx](e)
    }
  }

  return (
    <Layout>
      <div className="container">
        <span className="control-label">Sort:</span> <SegmentedControl onChange={(e)=>updateParams('order_by', e)} name="Sort" key={'sort'} data={sortOptions} />

        <span className="control-label">Slant:</span> <SegmentedControl onChange={(e)=>updateParams('leans', e)} name="Slant" key={'slant'} size="sm" data={slantOptions} />
        <Divider  my="sm" variant="dashed" style={{margin: '1.5vh 0'}}></Divider>
        <main>
          {!articles &&
          <Center style={{ width: '100%', height: 400 }}>
            <Loader color="violet" size="xl" variant="bars" />
          </Center>
          }
          {articles &&
            <SimpleGrid
            cols={4}
            spacing="lg"
            breakpoints={[
              { maxWidth: 980, cols: 3, spacing: 'md' },
              { maxWidth: 755, cols: 2, spacing: 'sm' },
              { maxWidth: 600, cols: 1, spacing: 'sm' },
            ]}>
              {articles.map(a=><ArticleCard key={a.key} article={a}></ArticleCard>)}
            </SimpleGrid>
          }
        </main>
      </div>
    </Layout>
  )
}

export const ArticleCard = ({article}) => {
  const { classes } = useStyles()
  const [ barWidth, setBarWidth ] = useState(null)
  const ref = useRef(null);
  useEffect(() => {
    console.log('width', ref.current ? ref.current.offsetWidth : 0);
    setBarWidth(ref.current.offsetWidth * .85)
  }, [ref.current]);

  return (
    <Paper className={classes.articleCard} >
      <Image
        width={'100%'}
        height={150}
        src={article.image}
        fit="cover"
        withPlaceholder={false}
        radius={'sm'}
        style={{borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}
      />
      <div className="meta"><div class="source">{article.source_name}  </div><div class="date">{new Date(Date.parse(article.date)).toDateString()}</div></div>
      <div className={classes.articleCardInner}>
        <Title order={5}><Link href={`/article/${article.key}`}>{article.title}</Link></Title>
        <SimpleGrid ref={ref} cols={2} style={{margin: '.3vw'}}>
          <div key="progress">
            <div className="score-label">Subjective Language</div>
            <ProgressBar width={barWidth / 2} height={10} percent={article.subjectivity} />
            <div className="score-label">Moral Language</div>
            <ProgressBar width={barWidth / 2} height={10} percent={article.moral_percentile/100} />
          </div>
          <div key="links">
            <div className="score-label">Grade Level</div>
            <ProgressBar width={barWidth / 2} height={10} percent={(article.smog_index / 20)} />
          </div>
        </SimpleGrid>
      </div>
    </Paper>
  )
}
