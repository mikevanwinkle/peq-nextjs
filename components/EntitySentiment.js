import { useState, useEffect } from "react";
import { ThemeIcon, ActionIcon, Table, Title, Button, Divider, Loader, Paper, Popover, Chips, Chip } from "@mantine/core"
import { DropdownMenuIcon } from "@radix-ui/react-icons"
import axios from "axios";
import { getApiUrl, API_HOST } from "../lib/api";
import useStyles from "../lib/styles";

export default function EntitySentiment({pageProps}) {
  const [view, setView] = useState('neutral')
  const [data, setData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [popOpened, setPopOpened] = useState(false)
  const {classes, theme} = useStyles()

  function setViewAndCloseToggle(view) {
    console.log(view)
    setView(view)
    setPopOpened(false)
  }

  useEffect(()=> {
    let params = new URLSearchParams({leans: view})
    axios.get(`${API_HOST}/api/entities/sentiment/?${params.toString()}`, {headers: {
			"Cache-Control": "max-age=1000",
			"Content-Type": "application/json"
	  }}).then((resp) => {
      setData(resp.data.data)
      setLoaded(true)
    })
  }, [])

  return (
    <Paper className={classes.blockHeader} >
      <Popover
        position="bottom"
        opened={popOpened}
        className={classes.popover}
        target={<DropdownMenuIcon onClick={() => setPopOpened((o) => !o)} className={classes.drop} size={'sm'} />}
        styles={{
          popover: {
            backgroundColor: theme.colors.dark[7]
          },
          root: {
            backgroundColor: 'transparent',
            float: 'right',
            display: 'block',
            position: 'unset',
            marginRight: '2vh',
            marginTop: '2vh'
          }
        }}
        >
        <Chips size="xs" position="center" onChange={setViewAndCloseToggle} defaultValue={view} >
          <Chip value="left">Left</Chip>
          <Chip value="all">All</Chip>
          <Chip value="right">Right</Chip>
        </Chips>
      </Popover>
      <Title order={4} align="center" style={{fontFamily: 'Montserrat', paddingTop: '.5em', height: '40%'}}>Entity Sentiment</Title>
      <Table highlightOnHover verticalSpacing='xs' horizontalSpacing='xs' fontSize='xs'>
        <thead style={{fontFamily: 'Montserrat'}}><tr><th>Entity</th><th>Sentiment</th></tr></thead>
        <tbody>
        {data && data.slice(0,10).map((e)=><tr key={`${e.id}-sentiment`}><td key="name">{e.name}</td><td key="polarity">{e.polarity}</td></tr>)}
        </tbody>
      </Table>
    </Paper>
  )
}