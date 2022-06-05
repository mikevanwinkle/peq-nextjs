import { Button, Divider, Loader, Paper, SimpleGrid, Text, Table, Title, ThemeIcon, createStyles, Space, } from "@mantine/core";
import { useState, useEffect } from "react"
import { getTrending } from "../lib/api";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { MultiToggle } from "react-multi-toggle"
import { Chips, Chip } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
  blockHeader: {
    padding: '1vh'
  },

}))

export function TrendingWidget({pageProps, children}) {
  const [loaded, setLoaded] = useState(false)
  const [trending, setTrending] = useState(null)
  const [view, setView] = useState('all')
  const { classes } = useStyles();


  useEffect(()=>{
    getTrending({'leans':view}).then((response)=> {
      setTrending(response.data.data)
      setLoaded(true)
    })
  }, [view])

  return (
    <Paper className={classes.blockHeader} >
      <Title order={4} align="center" style={{fontFamily: 'Montserrat', paddingTop: '.5em'}}>Trending Entities</Title>
      <Chips size="xs" position="center" onChange={setView} defaultValue={view}>
        <Chip value="left">Left</Chip>
        <Chip value="all">All</Chip>
        <Chip value="right">Right</Chip>
      </Chips>

      {console.log(view)}
      {!trending && <Loader></Loader>}
      {trending && trending.length>0 &&
        <Table highlightOnHover verticalSpacing='xs' horizontalSpacing='xs' fontSize='xs'>
          <thead style={{fontFamily: 'Montserrat', textAlign: 'left'}}><tr><th>Entity</th><th>Trend</th></tr></thead>
          <tbody>
          {trending.slice(0,10).map((e)=>{
            return <tr key={`entity-${e.id}`}>
                    <td style={{width: '60%'}}><div style={{paddingTop: '5%', paddingBottom: '4%'}} className="trending-entity" >{e.name}</div></td>
                    <td><div className="trend-stat"><TrendStat value={e.avg} diff={e.diff}></TrendStat></div></td>
                  </tr>
          })}
          </tbody>
        </Table>
      }
    </Paper>
  )
}

export function TrendStat({pageProps, children, value, diff}) {
  return (
    <div>
    <Text align='right' size='xs' style={{verticalAlign: 'middle'}} color='green'>
      {(diff * 100).toFixed(1)}%
      <ThemeIcon variant="light" color="green" size={'xs'} align='right' style={{marginLeft: '5%', verticalAlign: 'middle'}} >
        <ArrowUpIcon size="xs" ></ArrowUpIcon>
      </ThemeIcon>
    </Text>
    </div>
  )
}