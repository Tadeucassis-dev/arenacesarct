import { useMemo, useEffect } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Textarea,
  Radio,
  RadioGroup,
  HStack,
  Checkbox,
  Button,
  Grid,
  GridItem,
  Divider,
  useToast,
  Flex,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Center,
} from '@chakra-ui/react'
import { useForm, Controller, SubmitHandler, watch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { UserRound, FileCheck, Send, AlertTriangle } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import type { RegistrationFormData } from '@/types/registration'
import { submitRegistration } from '@/services/api'
import { calcularIdade, formatarWhatsApp } from '@/utils/format'
import SuccessMessage from './SuccessMessage'

const MotionBox = motion(Box)

const IDADES_VALIDAS = {
  min: 8,
  max: 14,
}

const parentescoOptions = [
  'Mãe',
  'Pai',
  'Avó/Avô',
  'Tia/Tio',
  'Irmã/Irmão maior de idade',
  'Outro responsável legal',
]

const schema = z
  .object({
    nomeCompleto: z.string().min(5, 'Informe o nome completo do aluno'),
    dataNascimento: z.string().min(1, 'Informe a data de nascimento'),
    escola: z.string().min(2, 'Informe o nome da escola'),
    serieAno: z.string().optional(),
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    nomeResponsavel: z.string().min(5, 'Informe o nome completo do responsável'),
    grauParentesco: z.string().min(3, 'Selecione o grau de parentesco'),
    whatsapp: z.string().min(14, 'Informe um WhatsApp válido'),
    email: z.string().optional().refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), {
      message: 'Informe um e-mail válido',
    }),
    praticaFutevolei: z.enum(['sim', 'nao'], { message: 'Selecione uma opção' }),
    outroEsporte: z.string().optional(),
    observacoes: z.string().optional(),
    termoResponsavel: z.literal(true, {
      errorMap: () => ({ message: 'É necessário marcar o termo do responsável legal' }),
    }),
  })
  .refine(
    (d) => {
      const idade = calcularIdade(d.dataNascimento)
      return idade >= IDADES_VALIDAS.min && idade <= IDADES_VALIDAS.max
    },
    {
      message: `Este projeto é destinado inicialmente para alunos de ${IDADES_VALIDAS.min} a ${IDADES_VALIDAS.max} anos.`,
      path: ['dataNascimento'],
    }
  )

type FormValues = z.infer<typeof schema>

function transformarParaSubmissao(values: FormValues): RegistrationFormData {
  const idade = calcularIdade(values.dataNascimento)
  return {
    nomeCompleto: values.nomeCompleto.trim(),
    dataNascimento: values.dataNascimento,
    idade,
    escola: values.escola.trim(),
    serieAno: values.serieAno?.trim() || '',
    bairro: values.bairro?.trim() || '',
    cidade: values.cidade?.trim() || '',
    nomeResponsavel: values.nomeResponsavel.trim(),
    grauParentesco: values.grauParentesco,
    whatsapp: values.whatsapp.replace(/\D/g, ''),
    email: values.email?.trim() || undefined,
    praticaFutevolei: values.praticaFutevolei,
    outroEsporte: values.outroEsporte?.trim() || undefined,
    observacoes: values.observacoes?.trim() || undefined,
    termoResponsavel: values.termoResponsavel,
  }
}

export default function RegistrationForm() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.08 })
  const toast = useToast()

  const defaultValues: Partial<FormValues> = {
    cidade: 'Cidade Ocidental',
    serieAno: '',
    bairro: '',
    email: '',
    outroEsporte: '',
    observacoes: '',
    praticaFutevolei: 'nao',
    termoResponsavel: false,
  }

  const {
    register,
    handleSubmit,
    control,
    watch: watchField,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onTouched',
    reValidateMode: 'onChange',
  })

  const dataNascimento = watchField('dataNascimento', '')
  const idade = useMemo(() => calcularIdade(dataNascimento), [dataNascimento])
  const idadeForaFaixa = idade > 0 && (idade < IDADES_VALIDAS.min || idade > IDADES_VALIDAS.max)

  const whatsappWatcher = watchField('whatsapp', '')
  useEffect(() => {
    if (whatsappWatcher) {
      const formatado = formatarWhatsApp(whatsappWatcher)
      if (formatado !== whatsappWatcher) {
        setValue('whatsapp', formatado, { shouldValidate: true, shouldDirty: true })
      }
    }
  }, [whatsappWatcher, setValue])

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const payload = transformarParaSubmissao(values)
      const response = await submitRegistration(payload)
      if (response.success) {
        toast({
          title: 'Inscrição enviada!',
          description: 'Em breve entraremos em contato pelo WhatsApp.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
          variant: 'subtle',
          containerStyle: {
            border: '1px solid rgba(184,143,45,0.35)',
            background: '#181818',
          },
        })
      } else {
        throw new Error(response.message || 'Erro desconhecido')
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao enviar inscrição. Tente novamente.'
      toast({
        title: 'Erro no envio',
        description: msg,
        status: 'error',
        duration: 6000,
        isClosable: true,
        position: 'top-right',
        variant: 'subtle',
        containerStyle: {
          border: '1px solid rgba(255,100,100,0.35)',
          background: '#181818',
        },
      })
    }
  }

  const handleVoltarInicio = () => {
    reset()
    window.location.hash = '#inicio'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isSubmitSuccessful) {
    return (
      <Box as="section" id="inscricao" py={{ base: 20, md: 28 }} position="relative" overflow="hidden" bg="background">
        <Container maxW="4xl" px={{ base: 4, md: 6 }} ref={ref as any}>
          <SuccessMessage onVoltar={handleVoltarInicio} />
        </Container>
      </Box>
    )
  }

  return (
    <Box as="section" id="inscricao" py={{ base: 20, md: 28 }} position="relative" overflow="hidden" bg="background">
      <Box
        position="absolute"
        inset={0}
        bg="radial-gradient(ellipse at 50% 0%, rgba(184,143,45,0.08) 0%, transparent 55%)"
        pointerEvents="none"
      />

      <Container maxW="6xl" px={{ base: 4, md: 6, lg: 10 }} position="relative" zIndex={1} ref={ref as any}>
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <VStack spacing={{ base: 4, md: 5 }} align="center" mb={{ base: 10, md: 14 }} textAlign="center">
            <Badge
              bg="transparent"
              px={4}
              py={1.5}
              borderRadius="full"
              border="1px solid rgba(184,143,45,0.35)"
              color="goldLight"
              fontSize="xs"
              letterSpacing="2px"
              fontWeight={700}
              textTransform="uppercase"
            >
              Faça sua inscrição
            </Badge>
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              lineHeight={1.1}
              fontWeight={900}
              color="white"
            >
              FAÇA O CADASTRO DO{' '}
              <Box
                as="span"
                bgGradient="linear(135deg, #D4AF55, #B88F2D)"
                bgClip="text"
                color="transparent"
              >
                ALUNO
              </Box>
            </Heading>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="textSecondary"
              maxW="3xl"
              lineHeight={1.7}
            >
              Preencha os dados abaixo para demonstrar interesse em participar do Projeto Social Arena César.
            </Text>

            <Alert
              status="warning"
              borderRadius="2xl"
              bg="rgba(184,143,45,0.07)"
              border="1px solid rgba(184,143,45,0.35)"
              py={4}
              px={{ base: 4, md: 6 }}
              mt={2}
              colorScheme="none"
              alignItems="flex-start"
            >
              <Box
                flexShrink={0}
                mr={3}
                mt={0.5}
                w={5}
                h={5}
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="goldLight"
              >
                <FileCheck size="100%" color="currentColor" className="chakra-alert__icon" />
              </Box>
              <Box flex={1} textAlign="left">
                <AlertTitle color="white" fontSize="sm" fontWeight={700} mb={0.5}>
                  Cadastro realizado pelo responsável legal
                </AlertTitle>
                <AlertDescription color="textSecondary" fontSize="sm" lineHeight={1.6}>
                  Como o projeto envolve menores de idade, este formulário deve ser preenchido pelo pai, mãe ou responsável legal do aluno.
                </AlertDescription>
              </Box>
            </Alert>
          </VStack>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          <Card
            variant="elevated"
            bg="backgroundSecondary"
            borderColor="rgba(184,143,45,0.22)"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              h="3px"
              bgGradient="linear(90deg, transparent, #B88F2D, #D4AF55, #B88F2D, transparent)"
            />
            <CardBody p={{ base: 5, sm: 7, md: 10 }}>
              {isSubmitting && (
                <Box
                  position="absolute"
                  inset={0}
                  bg="rgba(16,16,16,0.85)"
                  backdropFilter="blur(4px)"
                  zIndex={5}
                  borderRadius="inherit"
                >
                  <Center h="full" w="full">
                    <VStack spacing={4} textAlign="center" px={6}>
                      <Spinner
                        size="xl"
                        thickness="4px"
                        color="gold"
                        emptyColor="rgba(184,143,45,0.15)"
                      />
                      <VStack spacing={1}>
                        <Text color="white" fontWeight={600} fontSize="md">
                          Enviando sua inscrição...
                        </Text>
                        <Text color="textSecondary" fontSize="sm">
                          Aguarde um momento
                        </Text>
                      </VStack>
                    </VStack>
                  </Center>
                </Box>
              )}

              <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ position: 'relative' }}>
                <VStack spacing={{ base: 8, md: 10 }} align="stretch">
                  <Box>
                    <Flex align="center" gap={3} mb={{ base: 5, md: 6 }}>
                      <Box
                        w={9}
                        h={9}
                        borderRadius="lg"
                        bg="rgba(184,143,45,0.15)"
                        border="1px solid rgba(184,143,45,0.3)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <UserRound size={18} color="#D4AF55" strokeWidth={2} />
                      </Box>
                      <Heading as="h3" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={700} color="white">
                        Dados do Aluno
                      </Heading>
                    </Flex>

                    <Grid templateColumns={{ md: '1fr 1fr' }} gap={{ base: 4, md: 5 }}>
                      <GridItem colSpan={{ md: 2 }}>
                        <FormControl isRequired isInvalid={!!errors.nomeCompleto}>
                          <FormLabel fontSize="sm" color="whiteAlpha.90" fontWeight={500} mb={1.5}>
                            Nome completo
                          </FormLabel>
                          <Input
                            {...register('nomeCompleto')}
                            placeholder="Nome completo do aluno"
                            autoComplete="name"
                            size="lg"
                            py={{ base: 6, md: 7 }}
                          />
                          <FormErrorMessage fontSize="xs">{errors.nomeCompleto?.message}</FormErrorMessage>
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl isRequired isInvalid={!!errors.dataNascimento}>
                          <FormLabel fontSize="sm" color="whiteAlpha.90" fontWeight={500} mb={1.5}>
                            Data de nascimento
                          </FormLabel>
                          <Input
                            {...register('dataNascimento')}
                            type="date"
                            size="lg"
                            py={{ base: 6, md: 7 }}
                            max={new Date().toISOString().split('T')[0]}
                          />
                          <FormErrorMessage fontSize="xs">{errors.dataNascimento?.message}</FormErrorMessage>
                          {dataNascimento && idade > 0 && (
                            <FormHelperText
                              fontSize="xs"
                              color={idadeForaFaixa ? 'orange.300' : 'goldLight'}
                              mt={1.5}
                              fontWeight={500}
                              display="flex"
                              alignItems="center"
                              gap={1.5}
                            >
                              {idadeForaFaixa && <AlertTriangle size={14} />}
                              Idade calculada:{' '}
                              <Box as="strong" fontWeight={700}>
                                {idade} anos
                              </Box>
                            </FormHelperText>
                          )}
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl isRequired isInvalid={!!errors.escola}>
                          <FormLabel fontSize="sm" color="whiteAlpha.90" fontWeight={500} mb={1.5}>
                            Nome da escola
                          </FormLabel>
                          <Input
                            {...register('escola')}
                            placeholder="Ex.: Escola Municipal..."
                            size="lg"
                            py={{ base: 6, md: 7 }}
                          />
                          <FormErrorMessage fontSize="xs">{errors.escola?.message}</FormErrorMessage>
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl isInvalid={!!errors.serieAno}>
                          <FormLabel fontSize="sm" color="whiteAlpha.90" fontWeight={500} mb={1.5}>
                            Série/Ano escolar
                          </FormLabel>
                          <Select
                            {...register('serieAno')}
                            size="lg"
                            py={{ base: 6, md: 7 }}
                            placeholder="Selecione (opcional)"
                          >
                            <option value="1º ano EF">1º ano Ensino Fundamental</option>
                            <option value="2º ano EF">2º ano Ensino Fundamental</option>
                            <option value="3º ano EF">3º ano Ensino Fundamental</option>
                            <option value="4º ano EF">4º ano Ensino Fundamental</option>
                            <option value="5º ano EF">5º ano Ensino Fundamental</option>
                            <option value="6º ano EF">6º ano Ensino Fundamental</option>
                            <option value="7º ano EF">7º ano Ensino Fundamental</option>
                            <option value="8º ano EF">8º ano Ensino Fundamental</option>
                            <option value="9º ano EF">9º ano Ensino Fundamental</option>
                            <option value="1º ano EM">1º ano Ensino Médio</option>
                          </Select>
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl isInvalid={!!errors.bairro}>
                          <FormLabel fontSize="sm" color="whiteAlpha.90" fontWeight={500} mb={1.5}>
                            Bairro
                          </FormLabel>
                          <Input
                            {...register('bairro')}
                            placeholder="Bairro do aluno"
                            size="lg"
                            py={{ base: 6, md: 7 }}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={{ md: 2 }}>
                        <FormControl isInvalid={!!errors.cidade}>
                          <FormLabel fontSize="sm" color="whiteAlpha.90" fontWeight={500} mb={1.5}>
                            Cidade
                          </FormLabel>
                          <Input
                            {...register('cidade')}
                            placeholder="Cidade"
                            size="lg"
                            py={{ base: 6, md: 7 }}
                          />
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </Box>

                  <Divider borderColor="whiteAlpha.100" />

                  <Box>
                    <Flex align="center" gap={3} mb={{ base: 5, md: 6 }}>
                      <Box
                        w={9}
                        h={9}
                        borderRadius="lg"
                        bg="rgba(184,143,45,0.15)"
                        border="1px solid rgba(184,143,45,0.3)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <FileCheck size={18} color="#D4AF55" strokeWidth={2} />
                      </Box>
                      <Heading as="h3" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={700} color="white">
                        Dados do Responsável
                      </Heading>
                    </Flex>

                    <Grid templateColumns={{ md: '1fr 1fr' }} gap={{ base: 4, md: 5 }}>
                      <GridItem colSpan={{ md: 2 }}>
                        <FormControl isRequired isInvalid={!!errors.nomeResponsavel}>
                          <FormLabel fontSize="sm" color="whiteAlpha.90" fontWeight={500} mb={1.5}>
                            Nome completo do responsável
                          </FormLabel>
                          <Input
                            {...register('nomeResponsavel')}
                            placeholder="Nome completo do responsável legal"
                            size="lg"
                            py={{ base: 6, md: 7 }}
                            autoComplete="name"
                          />
                          <FormErrorMessage fontSize="xs">{errors.nomeResponsavel?.message}</FormErrorMessage>
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl isRequired isInvalid={!!errors.grauParentesco}>
                          <FormLabel fontSize="sm" color="whiteAlpha.90" fontWeight={500} mb={1.5}>
                            Grau de parentesco
                          </FormLabel>
                          <Select
                            {...register('grauParentesco')}
                            size="lg"
                            py={{ base: 6, md: 7 }}
                            placeholder="Selecione"
                          >
                            {parentescoOptions.map((op) => (
                              <option key={op} value={op}>
                                {op}
                              </option>
                            ))}
                          </Select>
                          <FormErrorMessage fontSize="xs">{errors.grauParentesco?.message}</FormErrorMessage>
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl isRequired isInvalid={!!errors.whatsapp}>
                          <FormLabel fontSize="sm" color="whiteAlpha.90" fontWeight={500} mb={1.5}>
                            WhatsApp
                          </FormLabel>
                          <Input
                            {...register('whatsapp')}
                            placeholder="(61) 00000-0000"
                            size="lg"
                            py={{ base: 6, md: 7 }}
                            inputMode="tel"
                          />
                          <FormErrorMessage fontSize="xs">{errors.whatsapp?.message}</FormErrorMessage>
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={{ md: 2 }}>
                        <FormControl isInvalid={!!errors.email}>
                          <FormLabel fontSize="sm" color="whiteAlpha.90" fontWeight={500} mb={1.5}>
                            E-mail <Box as="span" color="textSecondary" fontWeight={400}>(opcional)</Box>
                          </FormLabel>
                          <Input
                            {...register('email')}
                            type="email"
                            placeholder="seu@email.com"
                            size="lg"
                            py={{ base: 6, md: 7 }}
                            autoComplete="email"
                          />
                          <FormErrorMessage fontSize="xs">{errors.email?.message}</FormErrorMessage>
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </Box>

                  <Divider borderColor="whiteAlpha.100" />

                  <Box>
                    <Flex align="center" gap={3} mb={{ base: 5, md: 6 }}>
                      <Box
                        w={9}
                        h={9}
                        borderRadius="lg"
                        bg="rgba(184,143,45,0.15)"
                        border="1px solid rgba(184,143,45,0.3)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <AlertTriangle size={18} color="#D4AF55" strokeWidth={2} />
                      </Box>
                      <Heading as="h3" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={700} color="white">
                        Informações Adicionais
                      </Heading>
                    </Flex>

                    <VStack spacing={{ base: 4, md: 5 }} align="stretch">
                      <FormControl isInvalid={!!errors.praticaFutevolei}>
                        <FormLabel fontSize="sm" color="whiteAlpha.90" fontWeight={500} mb={2}>
                          O aluno já pratica futevôlei?
                        </FormLabel>
                        <Controller
                          control={control}
                          name="praticaFutevolei"
                          render={({ field }) => (
                            <RadioGroup
                              onChange={field.onChange}
                              value={field.value}
                              defaultValue="nao"
                            >
                              <HStack spacing={8} flexWrap="wrap">
                                <Radio value="sim" colorScheme="orange" size="lg">
                                  Sim
                                </Radio>
                                <Radio value="nao" colorScheme="orange" size="lg">
                                  Não
                                </Radio>
                              </HStack>
                            </RadioGroup>
                          )}
                        />
                        <FormErrorMessage fontSize="xs">{errors.praticaFutevolei?.message}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={!!errors.outroEsporte}>
                        <FormLabel fontSize="sm" color="whiteAlpha.90" fontWeight={500} mb={1.5}>
                          Já praticou outro esporte?{' '}
                          <Box as="span" color="textSecondary" fontWeight={400}>(opcional)</Box>
                        </FormLabel>
                        <Input
                          {...register('outroEsporte')}
                          placeholder="Ex.: futebol, natação, basquete..."
                          size="lg"
                          py={{ base: 6, md: 7 }}
                        />
                      </FormControl>

                      <FormControl isInvalid={!!errors.observacoes}>
                        <FormLabel fontSize="sm" color="whiteAlpha.90" fontWeight={500} mb={1.5}>
                          Observações{' '}
                          <Box as="span" color="textSecondary" fontWeight={400}>(opcional)</Box>
                        </FormLabel>
                        <Textarea
                          {...register('observacoes')}
                          placeholder="Algo que você gostaria de informar?"
                          size="lg"
                          minH={{ base: '120px', md: '100px' }}
                          resize="vertical"
                          rows={4}
                        />
                      </FormControl>
                    </VStack>
                  </Box>

                  <Divider borderColor="whiteAlpha.100" />

                  <Box>
                    <FormControl isRequired isInvalid={!!errors.termoResponsavel}>
                      <Checkbox
                        {...register('termoResponsavel')}
                        size="md"
                        colorScheme="orange"
                        p={3}
                        borderRadius="lg"
                        border="1px solid"
                        borderColor={errors.termoResponsavel ? 'red.400' : 'rgba(184,143,45,0.25)'}
                        bg="rgba(184,143,45,0.04)"
                        transition="all 0.2s ease"
                        _checked={{
                          bg: 'rgba(184,143,45,0.1)',
                          borderColor: 'rgba(184,143,45,0.4)',
                        }}
                        _hover={{
                          borderColor: 'rgba(184,143,45,0.4)',
                        }}
                      >
                        <Text
                          fontSize={{ base: 'sm', md: 'md' }}
                          color={errors.termoResponsavel ? 'red.300' : 'whiteAlpha.90'}
                          lineHeight={1.65}
                        >
                          Declaro que sou responsável legal pelo aluno informado e autorizo a Arena César a entrar em contato comigo para tratar da participação no Projeto Social de Futevôlei.
                        </Text>
                      </Checkbox>
                      <FormErrorMessage fontSize="xs" mt={1.5} px={3}>
                        {errors.termoResponsavel?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>

                  <Box pt={{ base: 2, md: 4 }}>
                    <SimpleGrid columns={{ sm: 1 }} spacing={4}>
                      <Button
                        type="submit"
                        size="lg"
                        py={{ base: 7, md: 8 }}
                        fontSize={{ base: 'md', md: 'lg' }}
                        textTransform="uppercase"
                        letterSpacing="1.3px"
                        fontWeight={800}
                        w="full"
                        leftIcon={<Send size={18} strokeWidth={2} />}
                        isLoading={isSubmitting}
                        loadingText="Enviando..."
                        spinnerPlacement="start"
                      >
                        Enviar Inscrição
                      </Button>
                    </SimpleGrid>
                  </Box>
                </VStack>
              </form>
            </CardBody>
          </Card>
        </MotionBox>
      </Container>
    </Box>
  )
}
