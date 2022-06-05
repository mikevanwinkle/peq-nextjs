
import { Navbar } from '@mantine/core';

export default function PageHeader({title}) {
  return (
    <div>
    <h1 className="title">
      {title}
    </h1>
    </div>
  )
}