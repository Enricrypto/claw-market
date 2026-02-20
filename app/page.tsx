import Hero from '@/components/Hero'
import HowItWorksSection from '@/components/HowItWorksSection'
import MarketplaceFlowSection from '@/components/MarketplaceFlowSection'
import AgentsSection from '@/components/AgentsSection'
import LaunchCTASection from '@/components/LaunchCTASection'

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorksSection />
      <MarketplaceFlowSection />
      <AgentsSection />
      <LaunchCTASection />
    </main>
  )
}
