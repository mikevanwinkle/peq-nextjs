import { AppShell, Anchor, Burger, MediaQuery, Header, Navbar, Text, useMantineTheme, UnstyledButton, ThemeIcon, Group, List} from '@mantine/core'
import { useState } from 'react';
import Link from 'next/link'
import { BarChartIcon, ListBulletIcon, GlobeIcon } from '@radix-ui/react-icons'

export default function PeqNavbar({children, pageProps}) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

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
          width={{ sm: 200, lg: 200 }}>{/* Navbar content */}
          <Navbar.Section>
            <UnstyledButton>
              <Group>
                <ThemeIcon variant="light" color="violet">
                  <BarChartIcon ></BarChartIcon>
                </ThemeIcon>
                <Link href="/">
                  <Text>Overview</Text>
                </Link>
              </Group>
            </UnstyledButton>
          </Navbar.Section>
          <Navbar.Section  grow mt="md">
            <UnstyledButton>
              <Group>
                <ThemeIcon variant="light" color="violet">
                  <ListBulletIcon></ListBulletIcon>
                </ThemeIcon>
                <Link href="/articles">
                  <Text>Articles</Text>
                </Link>
              </Group>
            </UnstyledButton>
          </Navbar.Section>
          <Navbar.Section>
            <UnstyledButton>
              <Group>
                <ThemeIcon variant="light" color="violet">
                  <GlobeIcon></GlobeIcon>
                </ThemeIcon>
                <Text>Entities</Text>
              </Group>
            </UnstyledButton>
          </Navbar.Section>
          <Navbar.Section>{/* Footer with user */}</Navbar.Section>
      </Navbar>
  )
}