import { useEffect, useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Home from '@/pages/Home'
import Admin from '@/pages/Admin'
import theme from '@/theme'

function useHashRoute(): string {
  const [hash, setHash] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.hash : ''
  )

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return hash
}

export default function App() {
  const hash = useHashRoute()
  const isAdmin = hash.startsWith('#admin')

  return (
    <ChakraProvider theme={theme}>
      {isAdmin ? <Admin /> : <Home />}
    </ChakraProvider>
  )
}
