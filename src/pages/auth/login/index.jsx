import dynamic from 'next/dynamic'
import Head from 'next/head'

const BlankLayout = dynamic(() => import('src/@core/layouts/BlankLayout'), { ssr: false })
const LoginClient = dynamic(() => import('src/fragments/login'), { ssr: false })

const Page = () => {
  return (
    <>
      <Head>
        <title>Smart Home - Login</title>
      </Head>
      <LoginClient />
    </>
  )
}

Page.getLayout = (page) => <BlankLayout>{page}</BlankLayout>

export default Page
