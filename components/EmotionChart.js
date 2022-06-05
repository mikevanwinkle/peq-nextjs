import { Loader, Paper, SimpleGrid } from "@mantine/core";
import { useState, useEffect } from "react"
import { getLabels } from "../lib/api"
import ChartistGraph from "react-chartist"

export function EmotionChart({pageProps, children}) {
  const [emotions, setEmotions] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getLabels().then((data) => {
      console.log(setEmotions)
      setEmotions(data.data.data)
      setLoaded(true)
    })
  }, [])

  const chartOptions = () => {
    return {
      high: .7,
      low: .4,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 2 === 0 ? value : null;
        }
      }
    }
  }

  const chartData = (emotions) => {
    let series = []
    let labels = []
    Object.keys(emotions).map((e)=>{
      labels = emotions[e].dates
      series.push({'classNamew': 'ct-series-'+e, 'value': emotions[e].values})
    })
    return {labels: labels, series: series}
  }

  return (
    <Paper p={20} shadow="sm">
      {!emotions && <Loader></Loader>}
      {emotions && <ChartistGraph style={{height: 400}} className={"ct-chart ct-line"} type="Line" options={chartOptions()} data={chartData(emotions)}></ChartistGraph>}
    </Paper>
  )
}