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
      <Box
        position="absolute"
        inset={0}
        bgImage={`url('https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=beach%20volleyball%20court%20with%20golden%20sand%20at%20sunset%20professional%20aerial%20view%20dark%20moody%20lighting%20premium%20sport&image_size=landscape_16_9')`}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
      />
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-b, rgba(10,10,10,0.85) 0%, rgba(16,16,16,0.78) 45%, rgba(16,16,16,0.95) 100%)"
      />
      <Box
        position="absolute"
        inset={0}
        bgGradient="radial-gradient(ellipse at top right, rgba(184,143,45,0.18) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(184,143,45,0.12) 0%, transparent 55%)"
      />

      <Box position="absolute" left="-40px" top="20%" opacity="0.06" color="gold" pointerEvents="none">
        <Volleyball size={300} strokeWidth={1} />
      </Box>
      <Box position="absolute" right="-20px" bottom="15%" opacity="0.06" color="gold" pointerEvents="none" display={{ base: 'none', md: 'block' }}>
        <Volleyball size={220} strokeWidth={1} />
      </Box>

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
                align="center"
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

          <GridItem display={{ base: 'none', md: 'block' }}>
            <MotionBox
              position="relative"
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.7, ease: 'easeOut' }}
            >
              <Box
                position="absolute"
                inset={-4}
                borderRadius="3xl"
                bgGradient="linear(135deg, rgba(184,143,45,0.25) 0%, transparent 60%)"
                filter="blur(24px)"
                zIndex={0}
              />
              <Box
                position="relative"
                borderRadius="3xl"
                overflow="hidden"
                border="2px solid rgba(184,143,45,0.35)"
                boxShadow="0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05) inset"
                zIndex={1}
              >
                <Image
                  src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=young%20teenagers%20playing%20beach%20soccer%20footvolley%20on%20golden%20sand%20court%20dramatic%20sunset%20professional%20sport%20photography&image_size=portrait_4_3`}
                  alt="Crianças e adolescentes jogando futevôlei na areia"
                  w="full"
                  h="560px"
                  objectFit="cover"
                  fallback={
                    <Box w="full" h="560px" bg="backgroundSecondary" display="flex" alignItems="center" justifyContent="center">
                      <Volleyball size={80} color="#B88F2D" opacity={0.5} />
                    </Box>
                  }
                />
                <Box
                  position="absolute"
                  inset={0}
                  bgGradient="linear(to-t, rgba(16,16,16,0.7) 0%, transparent 50%)"
                />
                <Box
                  position="absolute"
                  bottom={6}
                  left={6}
                  right={6}
                  p={4}
                  borderRadius="2xl"
                  bg="rgba(16,16,16,0.6)"
                  border="1px solid rgba(184,143,45,0.3)"
                  backdropFilter="blur(8px)"
                >
                  <HStack justify="space-between">
                    <VStack align="flex-start" spacing={0.5}>
                      <Text fontSize="xs" color="goldLight" letterSpacing="1.5px" textTransform="uppercase">Local</Text>
                      <Text fontSize="sm" fontWeight={600}>Arena César • Cidade Ocidental-GO</Text>
                    </VStack>
                    <Box
                      w={12}
                      h={12}
                      borderRadius="xl"
                      bg="rgba(184,143,45,0.15)"
                      border="1px solid rgba(184,143,45,0.35)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Volleyball size={20} color="#D4AF55" />
                    </Box>
                  </HStack>
                </Box>
              </Box>
            </MotionBox>
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
