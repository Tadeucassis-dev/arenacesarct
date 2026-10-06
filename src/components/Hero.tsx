import { Box, Container, VStack, HStack, Heading, Text, Button, Grid, GridItem, Image } from '@chakra-ui/react'
import { ChevronDown, Volleyball, Sparkles, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)
const MotionVStack = motion(VStack)

export default function Hero() {
  return (
    <Box
      as="section"
      id="inicio"
      position="relative"
      minH={{ base: '100svh', md: '100vh' }}
      overflow="hidden"
      display="flex"
      alignItems="center"
    >
    

    
   

      <Container maxW="7xl" position="relative" zIndex={1} px={{ base: 4, md: 6, lg: 10 }} py={{ base: 28, md: 24 }}>
        <Grid templateColumns={{ md: '1fr 1fr' }} gap={{ md: 16 }} alignItems="center">
          <GridItem>
            <MotionVStack
              spacing={{ base: 5, md: 7 }}
              align={{ base: 'center', md: 'flex-start' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <MotionBox
                display="inline-flex"
                alignItems="center"
                gap={2}
                px={{ base: 3, md: 4 }}
                py={{ base: 1.5, md: 2 }}
                borderRadius="full"
                border="1px solid rgba(184,143,45,0.45)"
                bg="rgba(184,143,45,0.08)"
                backdropFilter="blur(6px)"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Sparkles size={14} color="#D4AF55" />
                <Text
                  fontSize={{ base: 'xs', md: 'sm' }}
                  color="goldLight"
                  letterSpacing="2px"
                  fontWeight={600}
                  textTransform="uppercase"
                >
                  Projeto Social • Em Breve
                </Text>
              </MotionBox>

              <Heading
                as="h1"
                fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
                lineHeight={1.05}
                fontWeight={900}
                color="white"
                textAlign={{ base: 'center', md: 'left' }}
                letterSpacing="-0.5px"
              >
                FUTEVÔLEI QUE{' '}
                <Box
                  as="span"
                  position="relative"
                  display="inline-block"
                  bgGradient="linear(135deg, #D4AF55 0%, #B88F2D 50%, #D4AF55 100%)"
                  bgClip="text"
                  color="transparent"
                  whiteSpace="nowrap"
                >
                  TRANSFORMA VIDAS
                </Box>
              </Heading>

              <Text
                fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
                color="textSecondary"
                maxW={{ md: '480px', lg: '540px' }}
                textAlign={{ base: 'center', md: 'left' }}
                lineHeight={1.65}
              >
                Em breve, a Arena César dará início a um projeto social de futevôlei para crianças e adolescentes de Cidade Ocidental-GO.
              </Text>

              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                color="whiteAlpha.800"
                textAlign={{ base: 'center', md: 'left' }}
                fontStyle="italic"
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Box as="span" w={8} h="1px" bg="gold" opacity="0.6" />
                Esporte, disciplina, amizade e novas oportunidades através do esporte.
              </Text>

              <HStack
                spacing={{ base: 3, md: 4 }}
                w="full"
                justify={{ base: 'center', md: 'flex-start' }}
                flexWrap="wrap"
                pt={{ base: 2, md: 3 }}
              >
                <Button
                  as="a"
                  href="#inscricao"
                  size="lg"
                  px={{ base: 6, md: 8 }}
                  py={{ base: 6, md: 7 }}
                  fontSize={{ base: 'sm', md: 'md' }}
                  textTransform="uppercase"
                  letterSpacing="1.2px"
                  fontWeight={800}
                >
                  Quero Me Inscrever
                </Button>
                <Button
                  as="a"
                  href="#sobre"
                  variant="outline"
                  size="lg"
                  px={{ base: 6, md: 8 }}
                  py={{ base: 6, md: 7 }}
                  fontSize={{ base: 'sm', md: 'md' }}
                  textTransform="uppercase"
                  letterSpacing="1.2px"
                  fontWeight={700}
                >
                  Conheça o Projeto
                </Button>
              </HStack>

              <HStack
                spacing={8}
                pt={{ base: 6, md: 10 }}
                justify={{ base: 'center', md: 'flex-start' }}
                opacity={0.9}
              >
                <HStack spacing={2}>
                  <Users size={18} color="#D4AF55" />
                  <Text fontSize="sm" color="textSecondary">8 a 14 anos</Text>
                </HStack>
                <HStack spacing={2}>
                  <Volleyball size={18} color="#D4AF55" />
                  <Text fontSize="sm" color="textSecondary">Futevôlei</Text>
                </HStack>
              </HStack>
            </MotionVStack>
          </GridItem>
        </Grid>
      </Container>

      <MotionBox
        position="absolute"
        bottom={{ base: 4, md: 6 }}
        left="50%"
        transform="translateX(-50%)"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <Box as="a" href="#sobre" aria-label="Rolar para a próxima seção">
          <ChevronDown size={28} color="#D4AF55" />
        </Box>
      </MotionBox>
    </Box>
  )
}
