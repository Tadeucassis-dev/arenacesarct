import { Box, Container, VStack, HStack, Heading, Text, Divider, Flex, Image, Link } from '@chakra-ui/react'
import { Instagram, MessageCircle, MapPin, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <Box
      as="footer"
      bg="#0a0a0a"
      borderTop="1px solid rgba(184,143,45,0.22)"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left="50%"
        transform="translateX(-50%)"
        w="60%"
        h="2px"
        bgGradient="linear(90deg, transparent, rgba(184,143,45,0.7), transparent)"
      />

      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 10 }} py={{ base: 12, md: 16 }} position="relative" zIndex={1}>
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'flex-start', md: 'flex-start' }} gap={{ base: 10, md: 12 }}>
          <VStack align="flex-start" spacing={4} maxW={{ md: '340px' }}>
            <Flex align="center" gap={3}>
              <Image
                src="/arenacesar.jpg"
                alt="Logo Arena César"
                boxSize="52px"
                borderRadius="full"
                border="2px solid"
                borderColor="gold"
                objectFit="cover"
                fallback={
                  <Box boxSize="52px" borderRadius="full" bg="gold" />
                }
              />
              <VStack align="flex-start" spacing={0.5} lineHeight={1.1}>
                <HStack spacing={1.5}>
                  <Sparkles size={15} color="#B88F2D" />
                  <Heading as="h3" fontSize="xl" fontWeight={800} color="white" letterSpacing="0.3px">
                    ARENA CÉSAR
                  </Heading>
                </HStack>
                <Text fontSize="xs" color="textSecondary" letterSpacing="1.5px" textTransform="uppercase">
                  Centro de Treinamento e Lazer
                </Text>
              </VStack>
            </Flex>

            <VStack align="flex-start" spacing={2} mt={4}>
              <Flex align="flex-start" gap={2.5}>
                <Box flexShrink={0} mt={0.5}>
                  <MapPin size={16} color="#D4AF55" />
                </Box>
                <Text fontSize="sm" color="textSecondary" lineHeight={1.6}>
                  Cidade Ocidental – GO
                </Text>
              </Flex>
              <Text fontSize="sm" color="textSecondary" lineHeight={1.6}>
                Projeto Social de Futevôlei
              </Text>
            </VStack>
          </VStack>

          <VStack align={{ base: 'flex-start', md: 'flex-end' }} spacing={5}>
            <Text
              fontSize="xs"
              color="goldLight"
              letterSpacing="2px"
              fontWeight={600}
              textTransform="uppercase"
            >
              Fale Conosco
            </Text>

            <HStack spacing={{ base: 3, md: 4 }} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
              <Link
                href="#"
                isExternal
                aria-label="Instagram Arena César"
                _hover={{ textDecoration: 'none' }}
              >
                <Flex
                  align="center"
                  gap={3}
                  px={4}
                  py={3}
                  borderRadius="xl"
                  bg="rgba(184,143,45,0.06)"
                  border="1px solid rgba(184,143,45,0.25)"
                  transition="all 0.3s ease"
                  _hover={{
                    bg: 'rgba(184,143,45,0.14)',
                    borderColor: 'rgba(184,143,45,0.5)',
                    transform: 'translateY(-2px)',
                  }}
                >
                  <Instagram size={18} color="#D4AF55" />
                  <Text fontSize="sm" color="whiteAlpha.90" fontWeight={500}>
                    Instagram
                  </Text>
                </Flex>
              </Link>

              <Link
                href="#"
                isExternal
                aria-label="WhatsApp Arena César"
                _hover={{ textDecoration: 'none' }}
              >
                <Flex
                  align="center"
                  gap={3}
                  px={4}
                  py={3}
                  borderRadius="xl"
                  bg="rgba(184,143,45,0.06)"
                  border="1px solid rgba(184,143,45,0.25)"
                  transition="all 0.3s ease"
                  _hover={{
                    bg: 'rgba(184,143,45,0.14)',
                    borderColor: 'rgba(184,143,45,0.5)',
                    transform: 'translateY(-2px)',
                  }}
                >
                  <MessageCircle size={18} color="#D4AF55" />
                  <Text fontSize="sm" color="whiteAlpha.90" fontWeight={500}>
                    WhatsApp
                  </Text>
                </Flex>
              </Link>
            </HStack>
          </VStack>
        </Flex>

        <Divider my={{ base: 8, md: 10 }} borderColor="whiteAlpha.100" />

        <VStack align="center" spacing={2} textAlign="center">
          <Text fontSize="xs" color="textSecondary" lineHeight={1.6}>
            © {new Date().getFullYear()} Arena César. Todos os direitos reservados.
          </Text>
          <Text fontSize="xs" color="whiteAlpha.50" lineHeight={1.6}>
            Projeto Social de Futevôlei • Transformando vidas através do esporte
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}
