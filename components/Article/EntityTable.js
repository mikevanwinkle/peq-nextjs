import { Table } from "@mantine/core"
import Link from "next/link"

export default function EntityTable({article}) {
  return (
    <>
      <Table>
        <thead>
          <tr><th>Entity</th><th>Sentiment (*)</th></tr>
        </thead>
        <tbody>
          {article.entities && article.entities.forEach(e=><tr key={`ent-table-row-`+e.id}><td>{e.name}</td><td>{e.sentiment}</td></tr>)}
        </tbody>
      </Table>
    </>
  )
}