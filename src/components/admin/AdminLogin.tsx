import { useState } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Card,
  CardBody,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react'
import { Lock, Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react'
import { verifyPassword, setAuthenticated } from '@/services/adminAuth'

interface AdminLoginProps {
  onSuccess: () => void
}

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) {
      toast({
        title: 'Senha obrigatória',
        status: 'warning',
        duration: 2500,
        isClosable: true,
        position: 'top-right',
      })
      return
    }

    setIsLoading(true)
    const valid = await verifyPassword(password)
    setIsLoading(false)

    if (valid) {
      setAuthenticated(true)
      toast({
        title: 'Acesso liberado',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      })
      onSuccess()
    } else {
      toast({
        title: 'Senha incorreta',
        description: 'Verifique a senha e tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  const handleBack = () => {
    window.location.hash = '#inicio'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Box as="section" minH="100vh" bg="background" display="flex" alignItems="center" justifyContent="center" py={10}>
      <Container maxW="md" px={4}>
        <VStack spacing={6} align="stretch">
          <Button
            variant="ghost"
            leftIcon={<ArrowLeft size={18} />}
            onClick={handleBack}
            alignSelf="flex-start"
            color="textSecondary"
            _hover={{ color: 'goldLight', bg: 'whiteAlpha.50' }}
            px={2}
          >
            Voltar ao site
          </Button>

          <Card bg="backgroundSecondary" borderColor="rgba(184,143,45,0.3)" borderWidth="1px">
            <CardBody p={{ base: 6, md: 10 }}>
              <VStack spacing={6} align="center" textAlign="center">
                <Box
                  w={16}
                  h={16}
                  borderRadius="2xl"
                  bg="rgba(184,143,45,0.15)"
                  border="1px solid rgba(184,143,45,0.4)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ShieldCheck size={32} color="#D4AF55" />
                </Box>

                <VStack spacing={1}>
                  <Heading as="h1" size="lg" color="white" fontWeight={800}>
                    Área do Administrador
                  </Heading>
                  <Text color="textSecondary" fontSize="sm">
                    Insira a senha para acessar o painel de cadastros
                  </Text>
                </VStack>

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel color="white" fontSize="sm" fontWeight={500} mb={2}>
                        Senha
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Digite a senha de acesso"
                          size="lg"
                          py={{ base: 6, md: 7 }}
                          autoFocus
                        />
                        <InputRightElement h="full" pr={2}>
                          <IconButton
                            variant="ghost"
                            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                            icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            onClick={() => setShowPassword((s) => !s)}
                            color="textSecondary"
                            _hover={{ color: 'goldLight' }}
                          />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    <Button
                      type="submit"
                      size="lg"
                      py={{ base: 7, md: 8 }}
                      fontSize="md"
                      textTransform="uppercase"
                      letterSpacing="1.3px"
                      fontWeight={800}
                      w="full"
                      leftIcon={<Lock size={18} />}
                      isLoading={isLoading}
                      loadingText="Verificando..."
                    >
                      Acessar Painel
                    </Button>
                  </VStack>
                </form>
              </VStack>
            </CardBody>
          </Card>

          <Text textAlign="center" color="textSecondary" fontSize="xs">
            Acesso restrito apenas a administradores autorizados.
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}
