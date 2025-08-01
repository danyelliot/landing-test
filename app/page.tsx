import Hero from "./components/Hero"
import WhatYouWillLearn from "./components/WhatYouWillLearn"
import PortfolioGrid from "./components/PortfolioGrid"
import Timeline from "./components/Timeline" // Timeline now contains Roadmap content
import Marquee from "./components/Marquee"
import Testimonials from "./components/Testimonials"
// Removed import for ProductShowcase

export default function Home() {
  return (
    <>
      <Hero />
      <WhatYouWillLearn />
      <PortfolioGrid />
      <Timeline /> {/* This section now displays the Roadmap content */}
      <Testimonials />
      {/* Removed <ProductShowcase /> */}
      <Marquee />
    </>
  )
}
