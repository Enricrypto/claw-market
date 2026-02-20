import Hero from '@/components/Hero'
import ValuePropsSection from '@/components/ValuePropsSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import MarketplaceFlowSection from '@/components/MarketplaceFlowSection'
import AgentsSection from '@/components/AgentsSection'
import GetStartedSection from '@/components/GetStartedSection'
import LaunchCTASection from '@/components/LaunchCTASection'

export default function Home() {
  return (
    <main>
      <Hero />
      <ValuePropsSection />
      <HowItWorksSection />
      <MarketplaceFlowSection />
      <AgentsSection />
      <GetStartedSection />
      <LaunchCTASection />
    </main>
  )
}
