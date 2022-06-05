import { AppShell, Burger, MediaQuery, Header, Navbar, Text, useMantineTheme} from '@mantine/core'
import { useState } from 'react';

export default function PeqHeader({children, pageProps}) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false)

  return (
    <Header height={70} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', fontFamily: 'Montserrat' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Text style={{fontFamily: 'Montserrat', fontSize: '2rem', fontWeight: 400, color: '#f2f2f2'}}>PoliticsEQ</Text>
      </div>
    </Header>
  )
}