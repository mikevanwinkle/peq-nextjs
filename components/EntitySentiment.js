import { useState, useEffect } from "react";
import { Title, Button, Divider, Loader, Paper, Chips, Chip } from "@mantine/core"
import axios from "axios";
import { getApiUrl, API_HOST } from "../lib/api";

export default function EntitySentiment({pageProps}) {
  const [view, setView] = useState('neutral')
  const [data, setData] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(()=> {
    let params = new URLSearchParams({leans: view})
    axios.get(`${API_HOST}/api/entities/sentiment/}`, {headers: {
			"Cache-Control": "max-age=1000",
			"Content-Type": "application/json"
	  }}).then((resp) => {
      console.log(resp)

    })
  }, [])

  return (
    <Paper>
      <Title order={4} align="center" style={{fontFamily: 'Montserrat', paddingTop: '.5em'}}>Entity Sentiment</Title>
      <Chips size="xs" position="center" onChange={setView} defaultValue={view}>
        <Chip value="left">Left</Chip>
        <Chip value="all">All</Chip>
        <Chip value="right">Right</Chip>
      </Chips>
      {data}
    </Paper>
  )
}