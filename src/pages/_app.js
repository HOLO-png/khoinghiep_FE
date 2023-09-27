// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'
import { useSession } from 'next-auth/react'

// ** Component Imports
import ThemeComponent from 'src/@core/theme/ThemeComponent'

const UserLayout = dynamic(() => import('src/layouts/UserLayout'), { ssr: false })
// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import { NotificationProvider } from 'src/@core/components/notification'
import { Loading } from 'src/@core/components/loading'
import { useLoadingStore } from 'src/@core/store/loading-store'
import { useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'
import { io } from 'socket.io-client'
import { useSocketStore } from 'src/@core/store/socket-store'

import SocketClient from 'src/@core/components/socket/SocketClient'
import dynamic from 'next/dynamic'
import { API_URL } from 'src/@core/constant/APIEndpoint'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = (props) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps
  } = props
  const { loading } = useLoadingStore()
  const setSocketApi = useSocketStore((s) => s.setSocketApi)

  // Variables
  const getLayout = Component.getLayout ?? ((page) => <UserLayout>{page}</UserLayout>)

  useEffect(() => {
    const socket = io(API_URL, {
      withCredentials: true,
      transports: ['websocket']
    })
    setSocketApi(socket)

    return () => {
      socket.close()
    }
  }, [setSocketApi])

  return (
    <SessionProvider session={pageProps.session}>
      <SocketClient />
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
          <meta
            name='description'
            content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
          />
          <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        {loading && <Loading />}
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => {
              return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
            }}
          </SettingsConsumer>
        </SettingsProvider>
        <NotificationProvider />
      </CacheProvider>
    </SessionProvider>
  )
}

export default App
