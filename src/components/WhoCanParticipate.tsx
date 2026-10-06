import { Box, Container, VStack, Heading, Text, SimpleGrid, Card, CardBody, HStack, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { Baby, School, MapPin, HeartHandshake, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

const MotionBox = motion(Box)

const requisitos = [
  {
    icone: Baby,
    titulo: 'Idade',
    descricao: 'Crianças e adolescentes de 8 a 14 anos.',
    destaque: '8 - 14 anos',
  },
  {
    icone: School,
    titulo: 'Escola',
    descricao: 'Prioridade para alunos da rede pública de ensino.',
    destaque: 'Rede Pública',
  },
  {
    icone: MapPin,
    titulo: 'Local',
    descricao: 'Moradores de Cidade Ocidental e região.',
    destaque: 'Cidade Ocidental-GO',
  },
  {
    icone: HeartHandshake,
    titulo: 'Interesse',
    descricao: 'Alunos interessados em aprender e praticar futevôlei.',
    destaque: 'Vontade de Aprender',
  },
]

export default function WhoCanParticipate() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <Box as="section" id="quem-pode-participar" py={{ base: 20, md: 28 }} position="relative" overflow="hidden" bg="backgroundSecondary">
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 10 }} ref={ref as any}>
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <VStack spacing={{ base: 4, md: 5 }} align="center" mb={{ base: 12, md: 16 }}>
            <Text
              fontSize="xs"
              color="goldLight"
              letterSpacing="3px"
              fontWeight={600}
              textTransform="uppercase"
            >
              Público-Alvo
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              lineHeight={1.1}
              fontWeight={900}
              color="white"
              textAlign="center"
            >
              QUEM PODE{' '}
              <Box
                as="span"
                bgGradient="linear(135deg, #D4AF55, #B88F2D)"
                bgClip="text"
                color="transparent"
              >
                PARTICIPAR?
              </Box>
            </Heading>
          </VStack>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={{ base: 4, md: 6 }} mb={{ base: 10, md: 12 }}>
          {requisitos.map((req, i) => (
            <motion.div
              key={req.titulo}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
              style={{ height: '100%' }}
            >
              <Card
                variant="elevated"
                bg="background"
                h="full"
                _hover={{
                  transform: 'translateY(-6px)',
                  boxShadow: '0 20px 60px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(184,143,45,0.25)',
                }}
                transition="all 0.35s ease"
                overflow="hidden"
              >
                <Box
                  position="relative"
                  w="full"
                  h="6px"
                  bgGradient="linear(90deg, rgba(184,143,45,0.8), rgba(212,175,85,0.6))"
                />
                <CardBody p={{ base: 6, md: 7 }}>
                  <VStack spacing={5} align="flex-start" h="full" justify="space-between">
                    <VStack spacing={4} align="flex-start" w="full">
                      <HStack justify="space-between" w="full">
                        <Box
                          w={14}
                          h={14}
                          borderRadius="2xl"
                          bgGradient="linear(135deg, rgba(184,143,45,0.2), rgba(184,143,45,0.05))"
                          border="1px solid rgba(184,143,45,0.3)"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <req.icone size={26} color="#D4AF55" strokeWidth={1.8} />
                        </Box>
                      </HStack>

                      <Box
                        alignSelf="flex-start"
                        px={3}
                        py={1}
                        borderRadius="full"
                        bg="rgba(184,143,45,0.1)"
                        border="1px solid rgba(184,143,45,0.25)"
                      >
                        <Text
                          fontSize="xs"
                          color="goldLight"
                          fontWeight={700}
                          letterSpacing="0.5px"
                          lineHeight={1.5}
                        >
                          {req.destaque}
                        </Text>
                      </Box>

                      <VStack align="flex-start" spacing={2}>
                        <Heading as="h3" fontSize="xl" fontWeight={700} color="white">
                          {req.titulo}
                        </Heading>
                        <Text fontSize="sm" color="textSecondary" lineHeight={1.7}>
                          {req.descricao}
                        </Text>
                      </VStack>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>

        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
        >
          <Alert
            status="info"
            borderRadius="2xl"
            bg="rgba(184,143,45,0.08)"
            border="1px solid rgba(184,143,45,0.35)"
            py={{ base: 5, md: 6 }}
            px={{ base: 4, md: 7 }}
            alignItems="flex-start"
            colorScheme="none"
          >
            <AlertIcon
              as={AlertTriangle}
              color="goldLight"
              boxSize={6}
              mr={4}
              mt={0.5}
              flexShrink={0}
            />
            <Box flex={1}>
              <AlertTitle
                color="white"
                fontSize={{ base: 'md', md: 'lg' }}
                fontWeight={700}
                mb={{ base: 1, md: 2 }}
              >
                Importante
              </AlertTitle>
              <AlertDescription
                color="textSecondary"
                fontSize={{ base: 'sm', md: 'md' }}
                lineHeight={1.7}
              >
                As vagas serão limitadas e a participação estará sujeita à disponibilidade do projeto. O cadastro de interesse é o primeiro passo para garantir sua vaga.
              </AlertDescription>
            </Box>
          </Alert>
        </MotionBox>
      </Container>
    </Box>
  )
}
