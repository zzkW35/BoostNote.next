import { createGlobalStyle } from 'styled-components'
import { backgroundColor, textColor } from '../lib/styled'
import { defaultTheme } from '../themes/default'

export default createGlobalStyle<typeof defaultTheme>`
  body {
    margin: 0;
    ${backgroundColor}
    ${textColor}
    font-family: ${({ theme }) => theme.fontFamily};
    font-size: ${({ theme }) => theme.fontSize}px;
  }

  * {
    box-sizing: border-box;
  }
  *:focus {
    outline: none;
  }

  input {
    font-size: ${({ theme }) => theme.fontSize}px;
  }

  button,
  input {
    outline: none;
  }

  a {
    color: inherit;
  }
`
