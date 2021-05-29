import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'

const Index = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>sneakycrow.dev | artist and engineer</title>
        </Head>
        <Container>
            <Intro />
                <img src="/assets/images/logo.svg" alt="Line art of a crow with a green baseball cap" style={{
                    maxHeight: "50vh"
                }}/>
        </Container>
      </Layout>
    </>
  )
}

export default Index
