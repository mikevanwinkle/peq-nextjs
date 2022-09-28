// components/layout.js
// import Header from './header'
// import Navbar from './navbar'
// import Footer from './footer'
import { useState } from 'react';
import { AppShell, Burger, MediaQuery, Navbar, SimpleGrid, Text, useMantineTheme} from '@mantine/core'
import Header from './header'
import PeqNavbar from './peqnavbar'
import PeqHeader from './peqheader'


export default function Layout({ children,   header }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <>
    <Header>{header}</Header>

    <AppShell
      padding="md"
        navbarOffsetBreakpoint="sm"
        navbar={<PeqNavbar></PeqNavbar>}
        header={<PeqHeader></PeqHeader>}
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}>
        {/* <Header /> */}
        {/* <Navbar /> */}
        <main>{children}</main>

        {/* <Footer /> */}
    </AppShell>
    </>
  )
}