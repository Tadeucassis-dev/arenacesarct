import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors = {
  background: '#101010',
  backgroundSecondary: '#181818',
  backgroundTertiary: '#1f1f1f',
  gold: '#B88F2D',
  goldLight: '#D4AF55',
  goldDark: '#8a6a1e',
  textSecondary: '#BDBDBD',
  whiteGold: '#FFF9EC',
}

const fonts = {
  heading: "'Inter', 'Segoe UI', sans-serif",
  body: "'Inter', 'Segoe UI', sans-serif",
}

const styles = {
  global: () => ({
    html: {
      scrollBehavior: 'smooth',
    },
    body: {
      bg: 'background',
      color: 'white',
      fontFamily: fonts.body,
      overflowX: 'hidden',
      maxW: '100vw',
    },
    '#root': {
      overflowX: 'hidden',
    },
    '::-webkit-scrollbar': {
      width: '10px',
    },
    '::-webkit-scrollbar-track': {
      bg: 'backgroundSecondary',
    },
    '::-webkit-scrollbar-thumb': {
      bg: 'gold',
      borderRadius: 'md',
    },
    '::-webkit-scrollbar-thumb:hover': {
      bg: 'goldLight',
    },
  }),
}

const components = {
  Button: {
    baseStyle: {
      fontWeight: 700,
      borderRadius: 'md',
      transition: 'all 0.3s ease',
      letterSpacing: '0.5px',
    },
    variants: {
      solid: {
        bg: 'gold',
        color: 'background',
        _hover: {
          bg: 'goldLight',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(184, 143, 45, 0.35)',
          _disabled: {
            bg: 'goldDark',
            transform: 'none',
            boxShadow: 'none',
          },
        },
        _active: {
          transform: 'translateY(0)',
        },
        _focusVisible: {
          boxShadow: '0 0 0 3px rgba(212, 175, 85, 0.5)',
          outline: 'none',
        },
      },
      outline: {
        border: '2px solid',
        borderColor: 'gold',
        color: 'gold',
        bg: 'transparent',
        _hover: {
          bg: 'gold',
          color: 'background',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(184, 143, 45, 0.25)',
        },
        _focusVisible: {
          boxShadow: '0 0 0 3px rgba(212, 175, 85, 0.5)',
          outline: 'none',
        },
      },
      ghost: {
        color: 'white',
        bg: 'transparent',
        _hover: {
          bg: 'whiteAlpha.100',
          color: 'goldLight',
        },
      },
    },
    defaultProps: {
      variant: 'solid',
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: 'backgroundSecondary',
        borderRadius: 'lg',
        border: '1px solid rgba(184, 143, 45, 0.2)',
        transition: 'all 0.3s ease',
      },
    },
  },
  Input: {
    baseStyle: {
      field: {
        bg: 'backgroundTertiary',
        borderColor: 'whiteAlpha.200',
        color: 'white',
        _placeholder: {
          color: 'textSecondary',
        },
        _hover: {
          borderColor: 'whiteAlpha.300',
        },
        _focusVisible: {
          borderColor: 'gold',
          boxShadow: '0 0 0 1px var(--chakra-colors-gold)',
          bg: 'backgroundTertiary',
        },
      },
    },
    defaultProps: {
      variant: 'flushed',
    },
  },
  Select: {
    baseStyle: {
      field: {
        bg: 'backgroundTertiary',
        borderColor: 'whiteAlpha.200',
        color: 'white',
        _placeholder: {
          color: 'textSecondary',
        },
        _hover: {
          borderColor: 'whiteAlpha.300',
        },
        _focusVisible: {
          borderColor: 'gold',
          boxShadow: '0 0 0 1px var(--chakra-colors-gold)',
          bg: 'backgroundTertiary',
        },
      },
    },
    defaultProps: {
      variant: 'flushed',
    },
  },
  Textarea: {
    baseStyle: {
      bg: 'backgroundTertiary',
      borderColor: 'whiteAlpha.200',
      color: 'white',
      _placeholder: {
        color: 'textSecondary',
      },
      _hover: {
        borderColor: 'whiteAlpha.300',
      },
      _focusVisible: {
        borderColor: 'gold',
        boxShadow: '0 0 0 1px var(--chakra-colors-gold)',
        bg: 'backgroundTertiary',
      },
    },
    defaultProps: {
      variant: 'flushed',
    },
  },
  Checkbox: {
    baseStyle: {
      control: {
        bg: 'backgroundTertiary',
        borderColor: 'whiteAlpha.300',
        _checked: {
          bg: 'gold',
          borderColor: 'gold',
          color: 'background',
        },
        _hover: {
          borderColor: 'gold',
        },
        _focusVisible: {
          boxShadow: '0 0 0 3px rgba(212, 175, 85, 0.45)',
          outline: 'none',
        },
      },
    },
  },
}

const theme = extendTheme({
  config,
  colors,
  fonts,
  styles,
  components,
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '992px',
    xl: '1280px',
    '2xl': '1536px',
  },
})

export default theme
