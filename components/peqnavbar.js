import { AppShell, Anchor, Burger, MediaQuery, Header, Navbar, Text, useMantineTheme, UnstyledButton, ThemeIcon, Group, List} from '@mantine/core'
import { useState } from 'react';
import Link from 'next/link'
import { BarChartIcon, ListBulletIcon, GlobeIcon } from '@radix-ui/react-icons'

export default function PeqNavbar({children, pageProps}) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const sxz = (theme) => ({
    display: 'block',
    width: '100%',
    padding: "1vh 0",
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  })
  return (
    <Navbar
        p="md"
          // Breakpoint at which navbar will be hidden if hidden prop is true
          hiddenBreakpoint="sm"
          // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
          hidden={!opened}
          // when viewport size is less than theme.breakpoints.sm navbar width is 100%
          // viewport size > theme.breakpoints.sm – width is 300px
          // viewport size > theme.breakpoints.lg – width is 400px
          width={{ sm: 200, lg: 200 }}>
          <Navbar.Section mt="md">
            <UnstyledButton sx={sxz}>
              <Link href="/articles">
                <Group>
                  <ThemeIcon variant="light" color="violet">
                    <ListBulletIcon></ListBulletIcon>
                  </ThemeIcon>
                  <Text>Articles</Text>
                </Group>
              </Link>
            </UnstyledButton>
          </Navbar.Section>

          <Navbar.Section mt="md">
            <UnstyledButton sx={sxz}>
              <Group>
                <ThemeIcon variant="light" color="violet">
                  <BarChartIcon ></BarChartIcon>
                </ThemeIcon>
                <Link href="/clusters">
                  <Text>Clusters</Text>
                </Link>
              </Group>
            </UnstyledButton>
          </Navbar.Section>

          <Navbar.Section mt="md" >
            <UnstyledButton sx={sxz}>
              <Link href={'/entities'}>
                <Group>
                  <ThemeIcon variant="light" color="violet">
                    <GlobeIcon></GlobeIcon>
                  </ThemeIcon>
                  <Text>Entities</Text>
                </Group>
              </Link>
            </UnstyledButton>
          </Navbar.Section>
          <Navbar.Section>{/* Footer with user */}</Navbar.Section>
      </Navbar>
  )
}