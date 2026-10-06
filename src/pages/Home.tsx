import { Box } from '@chakra-ui/react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import AboutProject from '@/components/AboutProject'
import HowItWorks from '@/components/HowItWorks'
import Schedule from '@/components/Schedule'
import WhoCanParticipate from '@/components/WhoCanParticipate'
import RegistrationForm from '@/components/RegistrationForm'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <Box minH="100vh" bg="background" color="white" overflowX="hidden">
      <Header />
      <Box as="main">
        <Hero />
        <AboutProject />
        <HowItWorks />
        <Schedule />
        <WhoCanParticipate />
        <RegistrationForm />
        <FinalCTA />
      </Box>
      <Footer />
    </Box>
  )
}
