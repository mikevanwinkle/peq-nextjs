import HorizontalScroll from "react-scroll-horizontal"
import { Container, Divider, Paper,Image, SimpleGrid } from "@mantine/core"
import Link from 'next/link'
import { useEffect, useState } from "react"
import { getClusters } from "../lib/api"
import useStyles from "../lib/styles"
import { useViewportSize } from '@mantine/hooks';
import { VProgressBar as ProgressBar } from "./vProgress"
import { CircleIcon, DotFilledIcon } from "@radix-ui/react-icons"
import PeqIcon from "./PeqIcon"

export default function ArticleClusters() {
  const child   = { width: `30em`, height: `100%`}
  const { height, width } = useViewportSize()
  const parent  = { width: `95em`, height: '60vh', margin: '1vh 0vh'}
  const [clusters, setClusters] = useState([])
  const { classes } = useStyles()

  useEffect(() => {
    getClusters().then((resp) => {
      let cls = orderClusters(resp.data)
      setClusters(resp.data)
    })
  }, [])

  const orderClusters = (data) => {
    let streams = [
      {
        title: "The War in Ukraine",
        match: ["russia", "ukraine", "putin"]
      },
      {
        title: "Politics / Elections",
        match: ["elections", "president", "trump", "biden"]
      },
      {
        title: "Inflation / Economy",
        match: ["inflation", "economy", "stock"]
      }
    ]

    let sortedClusters = []

    for(var i=0; i < data.length; i++) {
      let terms = data[i].terms
      let matches = terms.forEach((t)=>{
        let matches = streams.filter(k=> {
          if (k.match.includes(t)) {
            return k.title
          } else {
            return false
          }
        })
      })

      console.log("MATCHED", data[i].terms, matches)

    }
    return data
  }

  return (
    <>
          {clusters && clusters.filter(c=>c.articles.length > 4).map((cluster)=>{
            return  <Container className={classes.sliderow}>
                      <Divider my="sm" variant="dotted" />
                      <div className={classes.clusterHeader}><b>Key terms:</b> {cluster.terms.join(', ')}</div>
                      <HorizontalScroll style={parent} key={cluster.id} reverseScroll={true}>
                        <ArticleCluster cluster={cluster} style={{scroll: false}}></ArticleCluster>
                      </HorizontalScroll>
                    </Container>
          })}
    </>
  )
}

export function ArticleCluster(cluster) {
  const { classes } = useStyles()

  return (
    <>
      {cluster.cluster.articles && cluster.cluster.articles.slice(0,20).map((a)=>{
        return <Paper className={classes.articleCard} >
                <Image
                  width={'100%'}
                  height={100}
                  src={a.image}
                  fit="cover"
                  withPlaceholder={false}
                  radius={'sm'}
                  // style={{borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}
                />
                <div class="meta"><div class="source">{a.source.name}  </div><div class="date">07.01.2022</div></div>
                <div className={classes.articleCardInner}>

                  <h5><Link href={`/article/${a.key}`}>{a.title}</Link></h5>

                  <SimpleGrid cols={2} style={{margin: '.3vw'}}>
                    <div key="progress">
                      <div className="score-label">Subjective Language</div>
                      <ProgressBar width={'150px'} percent={a.subjectivity} />
                      <div className="score-label">Moral Language</div>
                      <ProgressBar width={'150px'} percent={a.moral_percentile/100} />
                    </div>
                    <div key="links">
                      <div className="score-label">Grade Level</div>
                        <ProgressBar width={'150px'} percent={(a.smog_index / 20)} />
                    </div>
                </SimpleGrid>
              </div>
              </Paper>
      })}
    </>
  )
}