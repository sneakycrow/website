import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <Alert>
        Website migration in progress. Contact me directly here: <a href="mailto:zach@sneakycrow.dev">zach@sneakycrow.dev</a>
      </Alert>
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
