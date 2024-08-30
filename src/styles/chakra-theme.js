import { theme as proTheme } from '@chakra-ui/pro-theme'
import { theme as baseTheme, extendTheme } from '@chakra-ui/react'

export const theme = extendTheme(
  {
    colors: { ...baseTheme.colors, brand: baseTheme.colors.blue, blue: '#2b6cb0' },
    components: {
      Button: {
        baseStyle: {
          color: 'gray.700',
        },
      },
      Input: {
        baseStyle: {
          field: {
            _placeholder: {
              color: 'gray.400',
            },
          },
        },
      },
      Textarea: {
        baseStyle: {
          '::placeholder': {
            color: 'gray.400',
          },
        },
      },
      Checkbox: {
        sizes: {
          lg: {
            control: {
              w: 6,
              h: 6,
              _disabled: {
                cursor: 'pointer',
                bg: 'white',
                borderColor: 'gray.200',
                iconColor: 'red.500',
                _checked: {
                  bg: 'blue.500',
                  borderColor: 'blue.500',
                  iconColor: 'red.500',
                },
              },
            },
          },
        },
      },
    },
  },
  proTheme,
)
