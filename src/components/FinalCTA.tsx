import { Box, Container, VStack, Heading, Text, Button, Grid, GridItem } from '@chakra-ui/react'
import { Sparkles, Volleyball } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

const MotionBox = motion(Box)

export default function FinalCTA() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <Box as="section" py={{ base: 20, md: 28 }} position="relative" overflow="hidden">
      <Box
        position="absolute"
        inset={0}
        bgImage={`url('https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20beach%20footvolley%20court%20at%20sunset%20aerial%20view%20golden%20sand%20dramatic%20lighting%20cinematic&image_size=landscape_16_9')`}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
      />
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(180deg, rgba(16,16,16,0.92) 0%, rgba(16,16,16,0.88) 40%, rgba(16,16,16,0.97) 100%)"
      />
      <Box
        position="absolute"
        inset={0}
        bgGradient="radial-gradient(ellipse at 50% 30%, rgba(184,143,45,0.22) 0%, transparent 60%)"
      />

      <Box position="absolute" left="5%" top="15%" opacity="0.08" color="gold" pointerEvents="none">
        <Volleyball size={180} strokeWidth={1} />
      </Box>
      <Box position="absolute" right="8%" bottom="10%" opacity="0.08" color="gold" pointerEvents="none" display={{ base: 'none', sm: 'block' }}>
        <Volleyball size={140} strokeWidth={1} />
      </Box>

      <Container maxW="5xl" px={{ base: 4, md: 6, lg: 10 }} position="relative" zIndex={1} ref={ref as any}>
        <Grid templateColumns={{ md: '1fr' }}>
          <GridItem>
            <MotionBox
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <VStack spacing={{ base: 5, md: 7 }} align="center" textAlign="center" py={{ md: 6 }}>
                <MotionBox
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  display="inline-flex"
                  align="center"
                  gap={2}
                  px={{ base: 3, md: 4 }}
                  py={{ base: 1.5, md: 2 }}
                  borderRadius="full"
                  border="1px solid rgba(184,143,45,0.45)"
                  bg="rgba(184,143,45,0.1)"
                  backdropFilter="blur(6px)"
                >
                  <Sparkles size={14} color="#D4AF55" />
                  <Text
                    fontSize={{ base: 'xs', md: 'sm' }}
                    color="goldLight"
                    letterSpacing="2px"
                    fontWeight={600}
                    textTransform="uppercase"
                  >
                    Sua vez de fazer parte
                  </Text>
                </MotionBox>

                <Heading
                  as="h2"
                  fontSize={{ base: '4xl', sm: '5xl', md: '6xl', lg: '7xl' }}
                  lineHeight={1}
                  fontWeight={900}
                  color="white"
                  textAlign="center"
                  letterSpacing="-1px"
                >
                  FAÇA PARTE{' '}
                  <Box
                    as="span"
                    display={{ base: 'block', sm: 'inline' }}
                    bgGradient="linear(135deg, #D4AF55 0%, #B88F2D 50%, #D4AF55 100%)"
                    bgClip="text"
                    color="transparent"
                  >
                    DESSA HISTÓRIA
                  </Box>
                </Heading>

                <Text
                  fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
                  color="textSecondary"
                  maxW="3xl"
                  lineHeight={1.75}
                  textAlign="center"
                  px={{ base: 2, md: 0 }}
                >
                  O esporte pode abrir portas, criar amizades e transformar futuros.
                </Text>

                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  pt={{ base: 3, md: 4 }}
                  w="full"
                  display="flex"
                  justifyContent="center"
                >
                  <Button
                    as="a"
                    href="#inscricao"
                    size="lg"
                    px={{ base: 10, md: 14 }}
                    py={{ base: 7, md: 8 }}
                    fontSize={{ base: 'md', md: 'lg' }}
                    textTransform="uppercase"
                    letterSpacing="1.5px"
                    fontWeight={800}
                    borderRadius="lg"
                    boxShadow="0 20px 50px -15px rgba(184,143,45,0.5)"
                    _hover={{
                      boxShadow: '0 25px 60px -15px rgba(184,143,45,0.7)',
                    }}
                  >
                    Quero Participar
                  </Button>
                </MotionBox>
              </VStack>
            </MotionBox>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}
