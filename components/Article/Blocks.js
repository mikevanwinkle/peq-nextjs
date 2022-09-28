import { Image, Button, Table, Title, Divider, Text, Grid, Paper, SimpleGrid } from "@mantine/core"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import { Calendar, ExternalLink, UserCircle, News, Container } from 'tabler-icons-react'
import useStyles from "../../lib/styles"
import { VProgressBar as ProgressBar } from "../vProgress"
import { getApiUrl } from "../../lib/api"
import axios from "axios"



export function Meta({article}) {
  let date = new Date(article.date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
  return (
    <>
    <Image src={article.image} alt={article.title} />
    <Divider my="md" variant="dashed"></Divider>
    <Title order={2}>{article.title}</Title>
    <div className="meta" style={{flex: 6}}>
      <UserCircle size='16px' /> <span style={{margin: '0 1vw 0 0.5vw'}}>{article.author.name}</span>   <Calendar size="16px" /> <span style={{margin: '0 1vw 0 0.5vw'}}>{date}</span>   <News size='16px' /> <span style={{margin: '0 1vw 0 0.5vw '}}>{article.source.name}</span>
    </div>

    <Text>{article.content.split('.').splice(0,5).join('. ')} ... </Text>
    <Button style={{marginTop: '2vh', color: 'rgb(224, 170, 255)', borderColor: 'rgb(224, 170, 255)'}} fullWidth variant="outline" component='a' href={article.link} target="_blank" leftIcon={<ExternalLink size={14} />}>Read Full Aritcle</Button>
    </>
  )
}


export function EntityTable({article}) {
  const { classes } = useStyles()
  return (
    <>
      <h3 className={classes.sectionHeader}>Entities in article</h3>
      <Table className={classes.entityTable}>
        <thead>
          <tr>
            <th></th>
            <th>Count</th>
            <th>Sentiment</th>
          </tr>
        </thead>
        <tbody>
          {article.entities && article.entities.map(e=><tr key={`ent-table-row-`+e.key}><td><Link href={`/entity/${e.key}/`}>{e.name}</Link></td><td>{e.count}</td><td>{e.polarity.toFixed(2)}</td></tr>)}
        </tbody>
      </Table>
    </>
  )
}

export function EmotionBars({article}) {
  const { classes } = useStyles()
  const ref = useRef(null)
  const [ barWidth, setBarWidth ] = useState(null)
  useEffect(() => {
    // console.log('width', ref.current ? ref.current.offsetWidth : 0)
    setBarWidth(ref.current.offsetWidth * .85)
  }, [ref.current])

  return (
    <>
    <Grid ref={ref} cols={2} breakpoints={[{maxWidth: 600, cols: 1, spacing: 'md', margin: '1vh'}]} grow>
      <Grid.Col span={12}><h3 className={classes.sectionHeader}>Sentiments detected</h3></Grid.Col>
      {barWidth && article.labels && article.labels.map((label)=><Grid.Col key={`grid-col-label-`+label.id} span={6}><Text style={{color: 'white', textTransform: 'uppercase'}} size="xs">{label.label}</Text><ProgressBar width={barWidth / 2} height={20} className={label.label} percent={label.confidence} /></Grid.Col>)}
    </Grid>
    </>
  )
}

export function MoralFoundations({article}) {
  const { classes } = useStyles()
  const barref = useRef(null)
  const [ barWidth, setBarWidth ] = useState(null)
  useEffect(() => {
    setBarWidth((barref.current ? barref.current.offsetWidth : 0) * .85)
  }, [barref])

  return (
    <div ref={barref} style={{marginTop: '1vh'}}>
      <h3 style={{width: '100%'}} className={classes.sectionHeader}>Moral Language</h3>
      <SimpleGrid style={{ width: '100%'}} cols={2} >
        {barWidth && article.mfa && article.mfa.map((m)=> {
          return <div key={`grid-col-mfa-`+m.id}>
            <Text style={{color: 'white', textTransform: 'uppercase'}} size="xs">{m.name}</Text>
            <ProgressBar width={barWidth / 2} height={20} className={m.name.replace('.', ' ')} percent={m.pct/100} color={m.color} />
          </div>
        })}
      </SimpleGrid>
    </div>
    // <Grid ref={ref} cols={2} breakpoints={[{maxWidth: 600, cols: 1, spacing: 'md', margin: '1vh'}]} grow>
    //   <Grid.Col span={12}>
    //     <h3 className={classes.sectionHeader}>Moral Language</h3>
    //     {barWidth && article.mfa && article.mfa.map((m)=> {
    //       return <Grid.Col key={`grid-col-mfa-`+m.id} span={6}>
    //               <Text style={{color: 'white', textTransform: 'uppercase'}} size="xs">{m.name}</Text>
    //               <ProgressBar width={barWidth / 2} height={20} className={m.name.replace('.', ' ')} percent={m.pct/100} color={m.color} />
    //              </Grid.Col>
    //     })}
    //   </Grid.Col>
    // </Grid>
  )
}

export function RelatedArticles({article}) {
  const [related, setRelated] = useState([])

  useEffect(async () => {
    let rel = await axios.get(getApiUrl(`article/${article.key}/similar`))
    setRelated(rel.data.data)
  }, [])

  return (
    <>
    {related.map((r)=> <RelatedArticleItem article={r}/>)}
    </>
  )
}

export function RelatedArticleItem({article}) {
 const { classes } = useStyles()
 return (
  <Paper style={{margin: '1vh', padding: '1vh'}} className={classes.related}>
    <Grid breakpoints={[{maxWidth: 600, cols: 1, spacing: 'md', margin: '1vh'}]} grow>
      <Grid.Col span={2}>
        <Link href={`/article/${article.key}`}><Image src={article.image} size={'sm'}></Image></Link>
      </Grid.Col>
      <Grid.Col span={10}>
        <Title order={6}><Link href={`/article/${article.key}`}>{article.title}</Link></Title>
      </Grid.Col>
    </Grid>
  </Paper>
 )
}