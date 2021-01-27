import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-28 flex lg:flex-row items-center justify-center">
          <a
            href="mailto:zach@sneakycrow.dev"
            className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-0"
          >
            Drop me a line.
          </a>
        </div>
      </Container>
    </footer>
  )
}
