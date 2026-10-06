import { Box, Container, VStack, HStack, Heading, Text, SimpleGrid, Card, CardBody, GridItem, Grid } from '@chakra-ui/react'
import { Dumbbell, Users, Target, Sparkles, Calendar, MapPin, Volleyball } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

const MotionBox = motion(Box)

const pilares = [
  {
    icon: Dumbbell,
    titulo: 'Esporte',
    descricao: 'Acesso ao futevôlei com metodologia estruturada e profissionais qualificados.',
  },
  {
    icon: Users,
    titulo: 'Convivência',
    descricao: 'Ambiente acolhedor para construção de amizades e trabalho em equipe.',
  },
  {
    icon: Target,
    titulo: 'Disciplina',
    descricao: 'Ensino de valores como compromisso, foco e respeito mútuo.',
  },
  {
    icon: Sparkles,
    titulo: 'Desenvolvimento',
    descricao: 'Formação pessoal, física e emocional através da prática esportiva.',
  },
]

export default function AboutProject() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <Box as="section" id="sobre" py={{ base: 20, md: 28 }} position="relative" overflow="hidden">
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="2px"
        bgGradient="linear(90deg, transparent, rgba(184,143,45,0.5), transparent)"
      />

      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 10 }} ref={ref as any}>
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <VStack spacing={{ base: 4, md: 5 }} align={{ base: 'center', md: 'flex-start' }} mb={{ base: 12, md: 16 }}>
            <Text
              fontSize="xs"
              color="goldLight"
              letterSpacing="3px"
              fontWeight={600}
              textTransform="uppercase"
            >
              Sobre o projeto
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              lineHeight={1.1}
              fontWeight={900}
              color="white"
              textAlign={{ base: 'center', md: 'left' }}
            >
              UM PROJETO PARA{' '}
              <Box
                as="span"
                bgGradient="linear(135deg, #D4AF55, #B88F2D)"
                bgClip="text"
                color="transparent"
              >
                TRANSFORMAR FUTUROS
              </Box>
            </Heading>
          </VStack>
        </MotionBox>

        <Grid templateColumns={{ lg: '1.05fr 1fr' }} gap={{ base: 10, lg: 16 }} alignItems="center">
          <GridItem>
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            >
              <VStack spacing={{ base: 5, md: 7 }} align="flex-start">
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color="textSecondary"
                  lineHeight={1.8}
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  O Projeto Social Arena César nasce com o propósito de levar o futevôlei para crianças e adolescentes, proporcionando acesso ao esporte, incentivando hábitos saudáveis, disciplina, convivência e desenvolvimento pessoal.
                </Text>

                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 3, md: 4 }} w="full" pt={2}>
                  {[
                    { icon: Calendar, label: 'Faixa etária', value: '8 a 14 anos' },
                    { icon: MapPin, label: 'Local', value: 'Arena César – Cidade Ocidental-GO' },
                    { icon: Volleyball, label: 'Modalidade', value: 'Futevôlei' },
                  ].map((item, i) => (
                    <Card key={i} variant="elevated" bg="backgroundSecondary" borderColor="rgba(184,143,45,0.2)">
                      <CardBody py={4} px={4}>
                        <HStack spacing={3} align="flex-start">
                          <Box
                            w={10}
                            h={10}
                            flexShrink={0}
                            borderRadius="lg"
                            bg="rgba(184,143,45,0.12)"
                            border="1px solid rgba(184,143,45,0.25)"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <item.icon size={18} color="#D4AF55" />
                          </Box>
                          <VStack align="flex-start" spacing={0.5} minW={0}>
                            <Text fontSize="xs" color="textSecondary" textTransform="uppercase" letterSpacing="1px">
                              {item.label}
                            </Text>
                            <Text fontSize="sm" fontWeight={600} color="white">
                              {item.value}
                            </Text>
                          </VStack>
                        </HStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </MotionBox>
          </GridItem>

          <GridItem>
            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            >
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 4, md: 5 }}>
                {pilares.map((pilar, i) => (
                  <motion.div
                    key={pilar.titulo}
                    initial={{ opacity: 0, y: 25 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease: 'easeOut' }}
                  >
                    <Card
                      variant="elevated"
                      bg="backgroundSecondary"
                      h="full"
                      _hover={{
                        transform: 'translateY(-6px)',
                        borderColor: 'rgba(184,143,45,0.45)',
                        boxShadow: '0 20px 50px -20px rgba(184,143,45,0.25)',
                      }}
                      transition="all 0.35s ease"
                    >
                      <CardBody p={{ base: 5, md: 6 }}>
                        <VStack spacing={4} align="flex-start">
                          <Box
                            w={12}
                            h={12}
                            borderRadius="2xl"
                            bgGradient="linear(135deg, rgba(184,143,45,0.2), rgba(184,143,45,0.05))"
                            border="1px solid rgba(184,143,45,0.3)"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <pilar.icon size={22} color="#D4AF55" strokeWidth={2} />
                          </Box>
                          <VStack align="flex-start" spacing={2}>
                            <Heading as="h3" fontSize="lg" fontWeight={700} color="white">
                              {pilar.titulo}
                            </Heading>
                            <Text fontSize="sm" color="textSecondary" lineHeight={1.65}>
                              {pilar.descricao}
                            </Text>
                          </VStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </SimpleGrid>
            </MotionBox>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}
