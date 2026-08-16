import { About } from '../components/sections/About'
import { CommunityVideo } from '../components/sections/CommunityVideo'
import { Contact } from '../components/sections/Contact'
import { Gallery } from '../components/sections/Gallery'
import { GetInvolved } from '../components/sections/GetInvolved'
import { Hero } from '../components/sections/Hero'
import { IdentityStrip } from '../components/sections/IdentityStrip'
import { OurWork } from '../components/sections/OurWork'

export function HomePage() {
  return (
    <main>
      <Hero />
      <IdentityStrip />
      <About />
      <OurWork />
      <Gallery />
      <CommunityVideo />
      <GetInvolved />
      <Contact />
    </main>
  )
}
