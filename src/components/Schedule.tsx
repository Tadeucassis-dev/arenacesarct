import { Box, Container, VStack, Heading, Text, Button, Grid, GridItem, HStack } from '@chakra-ui/react'
import { Clock, Bell, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

const MotionBox = motion(Box)

export default function Schedule() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <Box as="section" id="horarios" py={{ base: 20, md: 28 }} position="relative" overflow="hidden">
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 10 }} ref={ref as any}>
        <Grid templateColumns={{ md: '1.1fr 1fr' }} gap={{ md: 14 }} alignItems="center">
          <GridItem order={{ md: 2 }}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <Box position="relative">
                <Box
                  position="absolute"
                  inset="0"
                  bg="radial-gradient(ellipse at center, rgba(184,143,45,0.25) 0%, transparent 70%)"
                  filter="blur(40px)"
                  pointerEvents="none"
                />
                <Box
                  position="relative"
                  p={{ base: 8, md: 12, lg: 16 }}
                  borderRadius={{ base: '2xl', md: '3xl' }}
                  bg="backgroundSecondary"
                  border="1px solid rgba(184,143,45,0.35)"
                  overflow="hidden"
                >
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    h="4px"
                    bgGradient="linear(90deg, transparent, #B88F2D, #D4AF55, #B88F2D, transparent)"
                  />
                  <VStack spacing={{ base: 6, md: 8 }} align="center" textAlign="center" py={{ base: 4, md: 6 }}>
                    <Box position="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
                      >
                        <Box
                          w={{ base: 100, md: 130 }}
                          h={{ base: 100, md: 130 }}
                          borderRadius="full"
                          border="2px dashed rgba(184,143,45,0.35)"
                          position="absolute"
                          inset="50%"
                          transform="translate(-50%, -50%)"
                        />
                      </motion.div>
                      <Box
                        w={{ base: 80, md: 100 }}
                        h={{ base: 80, md: 100 }}
                        borderRadius="full"
                        bgGradient="radial-gradient(circle at 30% 30%, rgba(212,175,85,0.25), rgba(184,143,45,0.05))"
                        border="2px solid rgba(184,143,45,0.45)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Clock size={{ base: 32, md: 40 }} color="#D4AF55" strokeWidth={1.8} />
                      </Box>
                    </Box>

                    <VStack spacing={3} align="center">
                      <Text
                        fontSize="xs"
                        color="goldLight"
                        letterSpacing="3px"
                        fontWeight={600}
                        textTransform="uppercase"
                      >
                        Em breve
                      </Text>
                      <Heading
                        as="h3"
                        fontSize={{ base: '5xl', md: '7xl', lg: '8xl' }}
                        lineHeight={0.9}
                        fontWeight={900}
                        bgGradient="linear(180deg, #FFFFFF 0%, #D4AF55 100%)"
                        bgClip="text"
                        color="transparent"
                        letterSpacing="-2px"
                      >
                        EM BREVE
                      </Heading>
                    </VStack>
                  </VStack>
                </Box>
              </Box>
            </MotionBox>
          </GridItem>

          <GridItem order={{ md: 1 }}>
            <MotionBox
              initial={{ opacity: 0, x: -30, y: 20 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -30, y: 20 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            >
              <VStack spacing={{ base: 5, md: 7 }} align={{ base: 'center', md: 'flex-start' }}>
                <Text
                  fontSize="xs"
                  color="goldLight"
                  letterSpacing="3px"
                  fontWeight={600}
                  textTransform="uppercase"
                >
                  Cronograma
                </Text>
                <Heading
                  as="h2"
                  fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                  lineHeight={1.08}
                  fontWeight={900}
                  color="white"
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  DIAS E{' '}
                  <Box
                    as="span"
                    bgGradient="linear(135deg, #D4AF55, #B88F2D)"
                    bgClip="text"
                    color="transparent"
                  >
                    HORÁRIOS
                  </Box>
                </Heading>

                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color="textSecondary"
                  lineHeight={1.8}
                  maxW="xl"
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  Estamos preparando as turmas e horários do Projeto Social Arena César. Faça seu cadastro e receba as informações assim que forem divulgadas.
                </Text>

                <HStack
                  spacing={4}
                  pt={2}
                  w="full"
                  justify={{ base: 'center', md: 'flex-start' }}
                  flexWrap="wrap"
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
                    leftIcon={<Bell size={18} strokeWidth={2} />}
                  >
                    Quero Receber Informações
                  </Button>
                </HStack>

                <HStack
                  pt={{ base: 4, md: 6 }}
                  opacity={0.8}
                  color="textSecondary"
                  fontSize="sm"
                  spacing={2}
                  align="flex-start"
                >
                  <Sparkles size={16} color="#D4AF55" flexShrink={0} mt={0.5} />
                  <Text lineHeight={1.6}>
                    Garanta seu lugar agora mesmo — as vagas serão limitadas e distribuídas conforme critérios do projeto.
                  </Text>
                </HStack>
              </VStack>
            </MotionBox>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}
