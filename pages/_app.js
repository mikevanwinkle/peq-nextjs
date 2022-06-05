// pages/_app.js
import { MantineProvider } from '@mantine/core';
import { useRouter } from 'next/router';


export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  return getLayout(
    <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      /** Put your mantine theme override here */
      colorScheme: 'dark',
      colors: {
        dark: [
          '#E0AAFF',
          '#9D4EDD',
          '#7B2CBF',
          '#3C096C',
          '#240046',
          '#10002B',
          '#9D4EDD',
          '#383a59',
          '#282a36',
          '#10002B',
        ],
        "gray": {
          "50": "#EEF1F6",
          "100": "#D0D9E7",
          "200": "#B2C1D7",
          "300": "#94A8C7",
          "400": "#7590B8",
          "500": "#5777A8",
          "600": "#466086",
          "700": "#344865",
          "800": "#233043",
          "900": "#111822"
        },
        "red": {
          "50": "#F7EEEE",
          "100": "#E8CECE",
          "200": "#D9AFAF",
          "300": "#CB9090",
          "400": "#BC7171",
          "500": "#AD5252",
          "600": "#8B4141",
          "700": "#683131",
          "800": "#452121",
          "900": "#231010"
        },
        "purple": {
          "50": "#F1EEF6",
          "100": "#D7D0E7",
          "200": "#BDB2D7",
          "300": "#A393C7",
          "400": "#8975B8",
          "500": "#6F57A8",
          "600": "#594587",
          "700": "#bd93f9",
          "800": "#2C2343",
          "900": "#161122"
        }
      },
    }}
  ><Component {...pageProps} />
  </MantineProvider>)
}
