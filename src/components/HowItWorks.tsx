import { Box, Container, VStack, Heading, Text, HStack, SimpleGrid, Card, CardBody, Badge } from '@chakra-ui/react'
import { ClipboardList, Users2, GraduationCap, Volleyball, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

const MotionBox = motion(Box)

const etapas = [
  {
    numero: '01',
    icone: ClipboardList,
    titulo: 'Cadastro',
    descricao: 'O responsável realiza o cadastro do aluno através da nossa página de inscrição.',
  },
  {
    numero: '02',
    icone: Users2,
    titulo: 'Avaliação',
    descricao: 'A equipe Arena César entrará em contato para confirmar os dados e orientar sobre o projeto.',
  },
  {
    numero: '03',
    icone: GraduationCap,
    titulo: 'Turmas',
    descricao: 'Os alunos serão organizados de acordo com faixa etária e disponibilidade de vagas.',
  },
  {
    numero: '04',
    icone: Volleyball,
    titulo: 'Treinos',
    descricao: 'Os participantes terão acesso às atividades de futevôlei na Arena César.',
  },
]

export default function HowItWorks() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <Box as="section" id="como-funciona" py={{ base: 20, md: 28 }} position="relative" overflow="hidden" bg="backgroundSecondary">
      <Box
        position="absolute"
        top="30%"
        left="50%"
        transform="translateX(-50%)"
        w={{ base: '140%', md: '80%' }}
        h="400px"
        bg="radial-gradient(ellipse at center, rgba(184,143,45,0.08) 0%, transparent 60%)"
        pointerEvents="none"
      />

      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 10 }} position="relative" zIndex={1} ref={ref as any}>
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
              Processo
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              lineHeight={1.1}
              fontWeight={900}
              color="white"
              textAlign="center"
            >
              COMO VAI{' '}
              <Box
                as="span"
                bgGradient="linear(135deg, #D4AF55, #B88F2D)"
                bgClip="text"
                color="transparent"
              >
                FUNCIONAR
              </Box>
            </Heading>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="textSecondary"
              textAlign="center"
              maxW="3xl"
              lineHeight={1.7}
            >
              Um processo simples e transparente para garantir que cada aluno tenha a melhor experiência possível.
            </Text>
          </VStack>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={{ base: 4, md: 6 }} mb={{ base: 10, md: 14 }}>
          {etapas.map((etapa, i) => (
            <motion.div
              key={etapa.numero}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: 'easeOut' }}
              style={{ height: '100%' }}
            >
              <Card
                variant="elevated"
                bg="background"
                h="full"
                position="relative"
                _hover={{
                  transform: 'translateY(-6px)',
                  boxShadow: '0 20px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(184,143,45,0.25)',
                }}
                transition="all 0.35s ease"
              >
                <CardBody p={{ base: 6, md: 7 }}>
                  <VStack align="flex-start" spacing={5} h="full" justify="space-between">
                    <VStack align="flex-start" spacing={4} w="full">
                      <HStack justify="space-between" w="full">
                        <Text
                          fontSize={{ base: '3xl', md: '4xl' }}
                          fontWeight={900}
                          bgGradient="linear(135deg, #D4AF55, #B88F2D)"
                          bgClip="text"
                          color="transparent"
                          lineHeight={1}
                        >
                          {etapa.numero}
                        </Text>
                        <Box
                          w={11}
                          h={11}
                          borderRadius="2xl"
                          bg="rgba(184,143,45,0.1)"
                          border="1px solid rgba(184,143,45,0.25)"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <etapa.icone size={20} color="#D4AF55" strokeWidth={2} />
                        </Box>
                      </HStack>

                      <Heading as="h3" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={700} color="white">
                        {etapa.titulo}
                      </Heading>

                      <Text fontSize="sm" color="textSecondary" lineHeight={1.75}>
                        {etapa.descricao}
                      </Text>
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
          transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
        >
          <Box
            position="relative"
            p={{ base: 5, md: 7 }}
            borderRadius="2xl"
            bgGradient="linear(135deg, rgba(184,143,45,0.12) 0%, rgba(184,143,45,0.03) 60%)"
            border="1px solid rgba(184,143,45,0.3)"
            backdropFilter="blur(8px)"
          >
            <HStack align="flex-start" spacing={{ base: 3, md: 5 }}>
              <Box
                w={12}
                h={12}
                flexShrink={0}
                borderRadius="2xl"
                bg="rgba(184,143,45,0.18)"
                border="1px solid rgba(184,143,45,0.4)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Info size={22} color="#D4AF55" />
              </Box>
              <VStack align="flex-start" spacing={2} minW={0}>
                <Badge
                  bg="transparent"
                  color="goldLight"
                  p={0}
                  fontSize="xs"
                  letterSpacing="2px"
                  textTransform="uppercase"
                  fontWeight={700}
                >
                  Atenção
                </Badge>
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color="white"
                  fontWeight={500}
                  lineHeight={1.6}
                  textAlign={{ base: 'left' }}
                >
                  Os dias e horários das atividades serão divulgados em breve. Fique atento ao WhatsApp e e-mail informados no cadastro.
                </Text>
              </VStack>
            </HStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  )
}
