import { Loader,Select, Paper, Header, SimpleGrid, Table, Title } from "@mantine/core";
import { Sparklines, SparklinesBars } from "react-sparklines";
import { useEffect, useState } from "react";
import { getEntities, getEntityMentions } from "../lib/api";

export default function EntitiesChart() {
  const [entities, setEntities] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const mentions = {}

  useEffect(() => {
    getEntities().then((data)=>{
      setEntities(data.data.data)
      setLoaded(true)
      console.log('all entities')
    })
  }, [])

  const updateList = () => {
    getEntities({label}).then((data)=>{
      setEntities(data.data.data)
      setLoaded(true)
      console.log('all entities')
    })
  }

  return (
    <Paper>
      <Title order={4} align="center" style={{fontFamily: 'Montserrat', paddingTop: '.5em'}}>Top Entities Today</Title>
      {/* <Select value={value} onChange={setValue} data={[]} />; */}

      <Table highlightOnHover verticalSpacing='xs' horizontalSpacing='xs' fontSize='xs'>
        <thead style={{fontFamily: 'Montserrat'}}><tr><th>Entity</th><th>Mentions</th></tr></thead>
        <tbody>
        {entities && entities.slice(0,10).map((e)=><EntityMentionsBars entity={e} />)}
        </tbody>
      </Table>
    </Paper>
  )
}

function EntityMentionsBars({entity}) {
  const [mentions, setMentions] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(()=>{
    getEntityMentions(entity.key).then((d)=>{
      setMentions(d.data.data)
      setLoaded(true)
    })
  }, [mentions.length])

  return (
    <>
      {mentions.length < 1 && <tr><td>{entity.name}</td><td><Loader></Loader></td></tr>}
      {mentions.length > 0 &&
      <tr style={{width: '100%'}} key={entity.key}>
        <td >{entity.name}</td>
        <td >
          <Sparklines data={mentions.map((i)=>i.count)} key={mentions[0].polarity} >
            <SparklinesBars style={{ strokeWidth: 3, stroke: "rgb(189,147,249)", fill: "rgb(189,147,249)", margin: '1vh'}} />
          </Sparklines>
        </td>
      </tr>
      }
    </>
  )
}

