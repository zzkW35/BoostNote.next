import React from 'react'
import GlobalStyle from './GlobalStyle'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../themes/default'
import { useDb } from '../lib/db'
import '../lib/i18n'
import '../lib/analytics'
import { useUsers } from '../lib/accounts'
import styled from '../lib/styled'
import { useEffectOnce } from 'react-use'
import CodeMirrorStyle from './CodeMirrorStyle'
import Navigator from './organisms/Navigator'

const AppContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
`

const LoadingText = styled.div`
  margin: 30px;
`

const App = () => {
  const { initialize, initialized } = useDb()
  const [users, { removeUser }] = useUsers()
  useEffectOnce(() => {
    initialize(users[0]).catch((error: any) => {
      console.error(error)
      if (error.message === 'InvalidUser') {
        if (users[0] != null) {
          removeUser(users[0])
        }
      }
    })
  })

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppContainer
        onDrop={(event: React.DragEvent) => {
          event.preventDefault()
        }}
      >
        {initialized ? (
          <>
            <Navigator />
            <div>Test...</div>
          </>
        ) : (
          <LoadingText>Loading Data...</LoadingText>
        )}
        <GlobalStyle />
        <CodeMirrorStyle />
      </AppContainer>
    </ThemeProvider>
  )
}

export default App
