import {
  Box,
  Heading,
  Text,
  Container,
  Button,
  VStack,
  HStack,
  Flex,
  SimpleGrid,
  Card,
  CardBody,
  Tag,
  Link,
  UnorderedList,
  ListItem,
  Icon,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Image,
  ChakraProvider,
  extendTheme,
} from '@chakra-ui/react'
import {
  FaHeart,
  FaHandshake,
  FaVolleyballBall,
  FaGamepad,
  FaDumbbell,
  FaUsers,
  FaTrophy,
  FaBuilding,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaFutbol,
  FaWhatsapp,
} from 'react-icons/fa'
import { motion } from 'framer-motion'

// Define custom theme with gold, black, white, and dark colors
const colors = {
  brand: {
    900: '#1a1a1a', // Black/dark
    800: '#262626',
    700: '#333333',
    gold: '#FFD700', // Gold
    goldLight: '#FFC107',
    white: '#FFFFFF'
  }
}
const theme = extendTheme({ colors })

const MotionBox = motion(Box)

function App() {
  const bgColor = '#0f0f0f' // Very dark
  const cardBg = '#1a1a1a'
  const accent = '#FFD700'
  const accentLight = '#FFC107'
  const textColor = '#FFFFFF'

  const values = [
    'Respeito',
    'Disciplina',
    'Ética',
    'Inclusão',
    'Compromisso',
    'Transparência',
    'Responsabilidade Social',
    'Trabalho em Equipe',
    'Excelência',
    'Superação'
  ]

  const modalities = [
    { name: 'Futevôlei', icon: FaFutbol },
    { name: 'Beach Tennis', icon: FaGamepad },
    { name: 'Treinamento Funcional', icon: FaDumbbell },
    { name: 'Festivais e Torneios Sociais', icon: FaTrophy }
  ]

  const sponsorships = [
    { level: 'Bronze', color: '#cd7f32', description: 'Benefícios de exposição da marca' },
    { level: 'Prata', color: '#c0c0c0', description: 'Benefícios progressivos de exposição' },
    { level: 'Ouro', color: '#FFD700', description: 'Benefícios amplos de visibilidade' },
    { level: 'Master', color: '#FFC107', description: 'Máxima exposição da marca' }
  ]

  const contrapartidas = [
    'Logomarca em uniformes',
    'Banners',
    'Redes sociais',
    'Eventos',
    'Certificados',
    'Relatórios de impacto'
  ]

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg={bgColor}>
        {/* Navigation */}
        <Box
          as="nav"
          position="fixed"
          top="0"
          width="100%"
          bg="rgba(15,15,15,0.98)"
          backdropFilter="blur(10px)"
          boxShadow="lg"
          zIndex="1000"
        >
          <Container maxW="container.xl">
            <Flex h="16" alignItems="center" justifyContent="space-between">
              <Heading size="lg" color={accent}>
                Arena César CT
              </Heading>
              <HStack spacing="8" display={{ base: 'none', md: 'flex' }}>
                <Link href="#home" color={textColor} fontWeight="medium" _hover={{ color: accent }}>
                  Início
                </Link>
                <Link href="#quem-somos" color={textColor} fontWeight="medium" _hover={{ color: accent }}>
                  Quem Somos
                </Link>
                <Link href="#modalidades" color={textColor} fontWeight="medium" _hover={{ color: accent }}>
                  Modalidades
                </Link>
                <Link href="#patrocinio" color={textColor} fontWeight="medium" _hover={{ color: accent }}>
                  Patrocínio
                </Link>
                <Link href="#contato" color={textColor} fontWeight="medium" _hover={{ color: accent }}>
                  Contato
                </Link>
              </HStack>
              <Button
                as="a"
                href="https://wa.me/5561985785880?text=Olá! Quero ser um parceiro da Arena César CT!"
                target="_blank"
                rel="noopener noreferrer"
                bg={accent}
                color="#000"
                _hover={{ bg: accentLight }}
                leftIcon={<Icon as={FaWhatsapp} />}
              >
                Seja Parceiro via WhatsApp
              </Button>
            </Flex>
          </Container>
        </Box>

        {/* Hero Section */}
        <Box
          id="home"
          minH="100vh"
          bgGradient="linear(to-br, #0f0f0f, #1a1a1a)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={textColor}
          pt="16"
        >
          <Container maxW="container.xl">
            <VStack spacing="8" textAlign="center">
              <MotionBox
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Placeholder for logo */}
                <Box mb="8">
                  <Heading size="3xl" mb="4" color={accent}>
                    Arena César CT
                  </Heading>
                </Box>
                <Heading size="xl" fontWeight="medium" mb="6" color={textColor}>
                  Transformando vidas através do esporte
                </Heading>
                <Text fontSize="xl" maxW="2xl" mx="auto" mb="8" color="gray.300">
                  Promovendo inclusão social, saúde e formação cidadã para crianças, jovens e adultos
                </Text>
                <Button
                  bg={accent}
                  color="#000"
                  size="lg"
                  as="a"
                  href="#contato"
                  mt="4"
                  _hover={{ bg: accentLight }}
                >
                  Saiba Mais
                </Button>
              </MotionBox>
            </VStack>
          </Container>
        </Box>

        {/* Quem Somos Section */}
        <Box id="quem-somos" py="20" bg="#0f0f0f">
          <Container maxW="container.xl">
            <VStack spacing="12">
              <Heading size="2xl" color={accent} textAlign="center">
                Quem Somos
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing="8" w="full">
                <Card p="8" bg={cardBg} boxShadow="md" borderRadius="xl">
                  <CardBody>
                    <VStack spacing="4" align="start">
                      <Icon as={FaBuilding} w="12" h="12" color={accent} />
                      <Heading size="md" color={textColor}>Centro de Treinamento</Heading>
                      <Text color="gray.300">
                        Especializado em esportes de areia, oferecendo estrutura de qualidade para
                        treinamento, lazer e eventos.
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
                <Card p="8" bg={cardBg} boxShadow="md" borderRadius="xl">
                  <CardBody>
                    <VStack spacing="4" align="start">
                      <Icon as={FaHeart} w="12" h="12" color={accent} />
                      <Heading size="md" color={textColor}>Missão</Heading>
                      <Text color="gray.300">
                        Transformar vidas por meio do esporte.
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
                <Card p="8" bg={cardBg} boxShadow="md" borderRadius="xl">
                  <CardBody>
                    <VStack spacing="4" align="start">
                      <Icon as={FaTrophy} w="12" h="12" color={accent} />
                      <Heading size="md" color={textColor}>Visão</Heading>
                      <Text color="gray.300">
                        Ser referência em projetos esportivos e sociais no Goiás e Entorno.
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              </SimpleGrid>

              <Box w="full">
                <Heading size="xl" mb="8" textAlign="center" color={accent}>
                  Nossos Valores
                </Heading>
                <Flex wrap="wrap" gap="3" justifyContent="center">
                  {values.map((value, index) => (
                    <Tag
                      key={index}
                      size="lg"
                      bg={accent}
                      color="#000"
                      variant="solid"
                      py="2"
                      px="4"
                    >
                      {value}
                    </Tag>
                  ))}
                </Flex>
              </Box>
            </VStack>
          </Container>
        </Box>

        {/* Justificativa e Objetivos */}
        <Box py="20" bg="#1a1a1a">
          <Container maxW="container.xl">
            <VStack spacing="12">
              <Heading size="2xl" color={accent} textAlign="center">
                O Esporte como Transformação
              </Heading>
              <Box maxW="3xl">
                <Text fontSize="lg" mb="8" textAlign="center" color="gray.300">
                  O esporte é uma ferramenta de transformação social, promovendo saúde, disciplina e
                  oportunidades para crianças, jovens e adultos.
                </Text>
                <VStack spacing="8" align="start">
                  <Box>
                    <Heading size="lg" mb="4" color={accent}>
                      Objetivo Geral
                    </Heading>
                    <Text fontSize="lg" color="gray.300">
                      Promover inclusão social através do esporte, formando cidadãos e atletas.
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="lg" mb="4" color={accent}>
                      Objetivos Específicos
                    </Heading>
                    <UnorderedList spacing="2">
                      <ListItem fontSize="lg" color="gray.300">Atender crianças e adolescentes</ListItem>
                      <ListItem fontSize="lg" color="gray.300">Incentivar mulheres</ListItem>
                      <ListItem fontSize="lg" color="gray.300">Promover saúde</ListItem>
                      <ListItem fontSize="lg" color="gray.300">Descobrir talentos</ListItem>
                      <ListItem fontSize="lg" color="gray.300">Fortalecer a convivência comunitária</ListItem>
                    </UnorderedList>
                  </Box>
                </VStack>
              </Box>
            </VStack>
          </Container>
        </Box>

        {/* Modalidades */}
        <Box id="modalidades" py="20" bg="#0f0f0f">
          <Container maxW="container.xl">
            <VStack spacing="12">
              <Heading size="2xl" color={accent} textAlign="center">
                Modalidades
              </Heading>
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing="8" w="full">
                {modalities.map((modality, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      p="8"
                      bg={cardBg}
                      boxShadow="md"
                      borderRadius="xl"
                      textAlign="center"
                      _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
                      transition="all 0.3s"
                    >
                      <CardBody>
                        <VStack spacing="4">
                          <Icon as={modality.icon} w="16" h="16" color={accent} />
                          <Heading size="md" color={textColor}>{modality.name}</Heading>
                        </VStack>
                      </CardBody>
                    </Card>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>

        {/* Público-Alvo e Metodologia */}
        <Box py="20" bg="#1a1a1a">
          <Container maxW="container.xl">
            <VStack spacing="12">
              <Heading size="2xl" color={accent} textAlign="center">
                Público-Alvo
              </Heading>
              <Text fontSize="xl" maxW="2xl" textAlign="center" color="gray.300">
                Crianças, adolescentes, jovens, mulheres e adultos, prioritariamente em situação de vulnerabilidade.
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing="10" w="full">
                <Card p="8" bg={cardBg} borderRadius="xl">
                  <CardBody>
                    <Heading size="lg" mb="4" color={accent}>
                      Metodologia
                    </Heading>
                    <Text fontSize="lg" color="gray.300">
                      Aulas planejadas por profissionais qualificados, turmas por idade e nível, com atividades
                      técnicas, físicas e educativas.
                    </Text>
                  </CardBody>
                </Card>
                <Card p="8" bg={cardBg} borderRadius="xl">
                  <CardBody>
                    <Heading size="lg" mb="4" color={accent}>
                      Funcionamento
                    </Heading>
                    <Text fontSize="lg" color="gray.300">
                      Aulas durante todo o ano, de segunda a sexta, além de eventos e ações sociais.
                    </Text>
                  </CardBody>
                </Card>
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>

        {/* Patrocínio */}
        <Box id="patrocinio" py="20" bg="#0f0f0f">
          <Container maxW="container.xl">
            <VStack spacing="12">
              <Heading size="2xl" color={accent} textAlign="center">
                Cotas de Patrocínio
              </Heading>
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing="8" w="full">
                {sponsorships.map((sponsor, index) => (
                  <Card
                    key={index}
                    p="8"
                    bg={cardBg}
                    boxShadow="md"
                    borderRadius="xl"
                    borderTop="4px"
                    borderTopColor={sponsor.color}
                  >
                    <CardBody>
                      <VStack spacing="4">
                        <Badge
                          bg={sponsor.color}
                          color="#000"
                          fontSize="md"
                          px="4"
                          py="2"
                        >
                          {sponsor.level}
                        </Badge>
                        <Heading size="md" color={textColor}>{sponsor.level}</Heading>
                        <Text color="gray.300">{sponsor.description}</Text>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>

              <Box w="full" maxW="2xl">
                <Heading size="xl" mb="8" textAlign="center" color={accent}>
                  Contrapartidas
                </Heading>
                <UnorderedList spacing="2" fontSize="lg" pl="4" color="gray.300">
                  {contrapartidas.map((item, index) => (
                    <ListItem key={index}>{item}</ListItem>
                  ))}
                </UnorderedList>
              </Box>
            </VStack>
          </Container>
        </Box>

        {/* Impacto Esperado */}
        <Box py="20" bg="#1a1a1a">
          <Container maxW="container.xl">
            <VStack spacing="12">
              <Heading size="2xl" color={accent} textAlign="center">
                Impacto Esperado
              </Heading>
              <StatGroup w="full">
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing="8" w="full">
                  <Stat textAlign="center">
                    <StatNumber fontSize="5xl" color={accent}>
                      200+
                    </StatNumber>
                    <StatLabel fontSize="xl" color="gray.300">Alunos por ano</StatLabel>
                  </Stat>
                  <Stat textAlign="center">
                    <Icon as={FaUsers} w="16" h="16" color={accent} mx="auto" mb="4" />
                    <StatLabel fontSize="xl" color="gray.300">Ampliar participação feminina</StatLabel>
                  </Stat>
                  <Stat textAlign="center">
                    <Icon as={FaBuilding} w="16" h="16" color={accent} mx="auto" mb="4" />
                    <StatLabel fontSize="xl" color="gray.300">Fortalecer a comunidade</StatLabel>
                  </Stat>
                </SimpleGrid>
              </StatGroup>
            </VStack>
          </Container>
        </Box>

        {/* Contato */}
        <Box id="contato" py="20" bg="#0f0f0f">
          <Container maxW="container.xl">
            <VStack spacing="12">
              <Heading size="2xl" color={accent} textAlign="center">
                Entre em Contato
              </Heading>
              <Text fontSize="lg" maxW="2xl" textAlign="center" color="gray.300">
                A Arena César CT acredita que o esporte transforma vidas. Convida empresas e
                instituições a investir neste projeto social.
              </Text>
              <Button
                as="a"
                href="https://wa.me/5561985785880?text=Olá! Quero entrar em contato com a Arena César CT!"
                target="_blank"
                rel="noopener noreferrer"
                bg={accent}
                color="#000"
                size="xl"
                w="full"
                maxW="lg"
                leftIcon={<Icon as={FaWhatsapp} />}
                _hover={{ bg: accentLight }}
              >
                Entrar em Contato Clique Aqui
              </Button>
            </VStack>
          </Container>
        </Box>

        {/* Footer */}
        <Box bg="#1a1a1a" color={textColor} py="10">
          <Container maxW="container.xl">
            <VStack spacing="6">
              <Heading size="lg" color={accent}>Arena César CT</Heading>
              <Text textAlign="center" color="gray.400">
                Transformando vidas através do esporte
              </Text>
              <HStack spacing="6">
                <Icon as={FaFacebook} w="6" h="6" cursor="pointer" _hover={{ color: accent }} />
                <Icon as={FaInstagram} w="6" h="6" cursor="pointer" _hover={{ color: accent }} />
                <Icon as={FaLinkedin} w="6" h="6" cursor="pointer" _hover={{ color: accent }} />
                <Icon as={FaTwitter} w="6" h="6" cursor="pointer" _hover={{ color: accent }} />
              </HStack>
              <Text fontSize="sm" opacity="0.8" color="gray.500">
                © 2024 Arena César CT. Todos os direitos reservados.
              </Text>
            </VStack>
          </Container>
        </Box>
      </Box>
    </ChakraProvider>
  )
}

export default App
