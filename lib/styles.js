
import { createStyles } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

const useStyles = createStyles((theme, _params, getRef) => (
  {
    'drop': {
      float: 'right',
      display: 'block !important',
      // width: '1vh',
      textAlign: 'right',
      background: 'transparent',
      cursor: 'pointer',
      '&:hover': {
        color: "#eee"
      }
    },
    'popover': {
      // backgroundColor: theme.colors.grape[1],
    },
    'articleCard': {
      marginRight: '2vh',
      display: 'block',
      backgroundColor: theme.colors.dark[7],
      fontSize: '1rem',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
      width: '20vw',
    },
    'articleCardInner': {
      padding: '.2vw',
      'h5': {
        margin: '1vh',
        fontWeight: '600',
        a: {
          color: '#bd93f9',
          textDecoration: 'none'
        }
      }
    },
    'sideScroll': {
      scrollDirection: 'horizontal'
    },
    'clusterHeader': {
      font: theme.fontFamily,
      fontStyle: 'italic',
      marginBottom: '2vh'
    },
    'sliderow': {
      margin: 0,
      padding: 0,
    },
    'article': {
      'meta': {
        float: "right",
      }
    },
    'sectionHeader': {
      backgroundColor: theme.colors.dark[7],
      borderColor: theme.colors.dark[9],
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      display: "block",
      padding: '1vh',
      marginTop: 0,
      fontWeight: 400,
      fontSize: '1em'
    },
    'entityTable': {
      th: {
        textAlign: 'left',
      },
      a: {
        color: '#bd93f9',
        textDecoration: 'none'
      },
      margin: '2vh',
      width: '95%'
    },
    'related': {
      a: {
        color: '#bd93f9',
        fontWeight: '400',
        textDecoration: 'none',
        hover: {
          fontWeight: '600'
        }
      }
    },
    'control': {
      root:
      {
        background: '#303440',
      },
      active: {
        background:  '#3B8C4F'
      }
    }
  })
);

function dynamicSize(dimension) {
  const { height, width } = useViewportSize()
  const aspectRatio = 4/3
  switch (dimension) {
    case 'width':
      return (width / 4) * aspectRatio
      break;
    case 'height':
      return height / 2
      break;
  }
}

export default useStyles