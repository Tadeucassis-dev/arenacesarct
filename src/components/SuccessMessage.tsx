import { VStack, Heading, Text, Box, Button, HStack, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { CheckCircle2, MessageCircle, ArrowUp, Sparkles } from 'lucide-react'

const MotionBox = motion(Box)

interface SuccessMessageProps {
  onVoltar: () => void
}

export default function SuccessMessage({ onVoltar }: SuccessMessageProps) {
  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      position="relative"
    >
      <Box
        position="absolute"
        inset="-20px"
        bg="radial-gradient(ellipse at center, rgba(184,143,45,0.2) 0%, transparent 65%)"
        pointerEvents="none"
      />
      <Box
        position="relative"
        p={{ base: 8, md: 12, lg: 16 }}
        borderRadius={{ base: '2xl', md: '3xl' }}
        bg="backgroundSecondary"
        border="1px solid rgba(184,143,45,0.4)"
        overflow="hidden"
        textAlign="center"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          h="4px"
          bgGradient="linear(90deg, transparent, #B88F2D, #D4AF55, #B88F2D, transparent)"
        />

        <VStack spacing={{ base: 6, md: 8 }} align="center" py={{ md: 4 }}>
          <MotionBox
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
            position="relative"
          >
            <Box
              position="absolute"
              inset="0"
              bg="radial-gradient(circle, rgba(184,143,45,0.35) 0%, transparent 70%)"
              filter="blur(12px)"
            />
            <Box
              position="relative"
              w={{ base: 84, md: 110 }}
              h={{ base: 84, md: 110 }}
              borderRadius="full"
              bgGradient="linear(135deg, rgba(184,143,45,0.25), rgba(184,143,45,0.05))"
              border="2px solid rgba(184,143,45,0.55)"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <CheckCircle2
                size={{ base: 48, md: 62 }}
                color="#D4AF55"
                strokeWidth={1.5}
              />
            </Box>
          </MotionBox>

          <VStack spacing={{ base: 3, md: 4 }} align="center">
            <Flex align="center" gap={2}>
              <Sparkles size={18} color="#D4AF55" />
              <Text
                fontSize="xs"
                color="goldLight"
                letterSpacing="3px"
                fontWeight={600}
                textTransform="uppercase"
              >
                Sucesso
              </Text>
              <Sparkles size={18} color="#D4AF55" />
            </Flex>
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
              fontWeight={900}
              color="white"
              lineHeight={1.1}
              textAlign="center"
            >
              CADASTRO{' '}
              <Box
                as="span"
                bgGradient="linear(135deg, #D4AF55, #B88F2D)"
                bgClip="text"
                color="transparent"
                whiteSpace={{ base: 'normal', sm: 'nowrap' }}
              >
                REALIZADO!
              </Box>
            </Heading>
            <Text
              fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
              color="textSecondary"
              maxW="2xl"
              textAlign="center"
              lineHeight={1.75}
              px={{ base: 0, md: 4 }}
            >
              Recebemos o cadastro do aluno. A equipe Arena César entrará em contato pelo WhatsApp informado para passar as próximas informações sobre o projeto.
            </Text>
          </VStack>

          <Box
            w="full"
            maxW="md"
            p={{ base: 4, md: 5 }}
            borderRadius="2xl"
            bg="rgba(184,143,45,0.06)"
            border="1px solid rgba(184,143,45,0.25)"
          >
            <HStack align="flex-start" spacing={3}>
              <Box
                w={10}
                h={10}
                flexShrink={0}
                borderRadius="xl"
                bg="rgba(184,143,45,0.15)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <MessageCircle size={18} color="#D4AF55" />
              </Box>
              <VStack align="flex-start" spacing={0.5} flex={1} minW={0}>
                <Text fontSize="xs" color="goldLight" letterSpacing="1px" textTransform="uppercase" fontWeight={700}>
                  Próximo passo
                </Text>
                <Text fontSize="sm" color="whiteAlpha.90" lineHeight={1.6}>
                  Fique de olho no seu WhatsApp nas próximas semanas. Nossa equipe entrará em contato!
                </Text>
              </VStack>
            </HStack>
          </Box>

          <HStack
            spacing={{ base: 3, md: 4 }}
            pt={{ base: 2, md: 3 }}
            flexWrap="wrap"
            justify="center"
            w="full"
          >
            <Button
              onClick={onVoltar}
              size="lg"
              px={{ base: 6, md: 8 }}
              py={{ base: 6, md: 7 }}
              fontSize={{ base: 'sm', md: 'md' }}
              textTransform="uppercase"
              letterSpacing="1.2px"
              fontWeight={800}
              leftIcon={<ArrowUp size={18} strokeWidth={2} />}
            >
              Voltar para o Início
            </Button>
          </HStack>
        </VStack>
      </Box>
    </MotionBox>
  )
}
