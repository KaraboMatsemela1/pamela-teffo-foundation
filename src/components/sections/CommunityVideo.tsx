import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function CommunityVideo() {
  return (
    <section className="section community-video">
      <Container className="community-video__grid">
        <div>
          <SectionHeading
            eyebrow="See the work"
            title="Practical support, up close."
            description="A short clip from the supplied outreach footage documents footwear support for a learner."
          />
          <p className="community-video__note">
            The clip does not autoplay and has been prepared for efficient mobile playback.
          </p>
        </div>
        <div className="video-frame">
          <video
            controls
            preload="metadata"
            poster="/media/video-poster.webp"
            playsInline
            aria-label="Footwear support during a school outreach visit"
          >
            <source src="/media/learner-footwear-support.mp4" type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </div>
      </Container>
    </section>
  )
}
