import { useState, useMemo, useRef } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Button,
  Card,
  CardBody,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Flex,
  IconButton,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Tooltip,
} from '@chakra-ui/react'
import {
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  LogOut,
  Check,
  X,
  Trash2,
  Phone,
  Mail,
  MapPin,
  School,
  Calendar,
  UserCircle,
  ClipboardList,
} from 'lucide-react'
import type { RegistrationEntry, RegistrationStatus } from '@/types/registration'
import {
  getAllRegistrations,
  updateRegistrationStatus,
  deleteRegistration,
  getRegistrationStats,
} from '@/services/storage'
import { logout } from '@/services/adminAuth'

interface AdminDashboardProps {
  onLogout: () => void
}

const statusConfig: Record<RegistrationStatus, { label: string; color: string; bg: string }> = {
  pendente: { label: 'Pendente', color: 'orange.300', bg: 'rgba(255,165,0,0.12)' },
  aprovado: { label: 'Aprovado', color: 'green.300', bg: 'rgba(72,187,120,0.12)' },
  rejeitado: { label: 'Rejeitado', color: 'red.300', bg: 'rgba(245,101,101,0.12)' },
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [registrations, setRegistrations] = useState<RegistrationEntry[]>(() => getAllRegistrations())
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('todos')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)
  const toast = useToast()

  const stats = useMemo(() => getRegistrationStats(), [registrations])

  const filtered = useMemo(() => {
    return registrations.filter((r) => {
      const matchesStatus = statusFilter === 'todos' || r.status === statusFilter
      const q = search.trim().toLowerCase()
      const matchesSearch =
        !q ||
        r.nomeCompleto.toLowerCase().includes(q) ||
        r.nomeResponsavel.toLowerCase().includes(q) ||
        r.escola.toLowerCase().includes(q) ||
        r.whatsapp.includes(q) ||
        r.cidade.toLowerCase().includes(q) ||
        r.bairro.toLowerCase().includes(q)
      return matchesStatus && matchesSearch
    })
  }, [registrations, search, statusFilter])

  const refresh = () => setRegistrations(getAllRegistrations())

  const handleStatusChange = (id: string, status: RegistrationStatus) => {
    updateRegistrationStatus(id, status)
    refresh()
    const label = statusConfig[status].label.toLowerCase()
    toast({
      title: `Cadastro ${label}`,
      status: status === 'aprovado' ? 'success' : status === 'rejeitado' ? 'error' : 'info',
      duration: 2500,
      isClosable: true,
      position: 'top-right',
    })
  }

  const handleDelete = () => {
    if (deleteId) {
      deleteRegistration(deleteId)
      refresh()
      toast({
        title: 'Cadastro excluído',
        status: 'info',
        duration: 2500,
        isClosable: true,
        position: 'top-right',
      })
    }
    setDeleteId(null)
    onClose()
  }

  const handleLogout = () => {
    logout()
    onLogout()
  }

  return (
    <Box as="section" minH="100vh" bg="background" color="white">
      <Box
        position="sticky"
        top={0}
        zIndex={10}
        bg="backgroundSecondary"
        borderBottom="1px solid rgba(184,143,45,0.25)"
        backdropFilter="blur(8px)"
      >
        <Container maxW="7xl" px={{ base: 4, md: 6 }} py={4}>
          <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
            <HStack spacing={3}>
              <Box
                w={10}
                h={10}
                borderRadius="lg"
                bg="rgba(184,143,45,0.15)"
                border="1px solid rgba(184,143,45,0.4)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <ClipboardList size={20} color="#D4AF55" />
              </Box>
              <VStack spacing={0} align="flex-start">
                <Heading as="h1" size="md" color="white" fontWeight={800}>
                  Painel do Administrador
                </Heading>
                <Text color="textSecondary" fontSize="xs">
                  Gerenciamento de inscrições
                </Text>
              </VStack>
            </HStack>
            <Button
              variant="ghost"
              leftIcon={<LogOut size={18} />}
              onClick={handleLogout}
              color="textSecondary"
              _hover={{ color: 'red.300', bg: 'whiteAlpha.50' }}
            >
              Sair
            </Button>
          </Flex>
        </Container>
      </Box>

      <Container maxW="7xl" px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }}>
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: 3, md: 4 }} mb={8}>
          <Card bg="backgroundSecondary" borderColor="whiteAlpha.100" borderWidth="1px">
            <CardBody p={{ base: 4, md: 5 }}>
              <VStack align="flex-start" spacing={1}>
                <Users size={22} color="#D4AF55" />
                <Text color="textSecondary" fontSize="xs" textTransform="uppercase" letterSpacing="1px">
                  Total
                </Text>
                <Text fontSize="3xl" fontWeight={800} color="white">
                  {stats.total}
                </Text>
              </VStack>
            </CardBody>
          </Card>
          <Card bg="backgroundSecondary" borderColor="whiteAlpha.100" borderWidth="1px">
            <CardBody p={{ base: 4, md: 5 }}>
              <VStack align="flex-start" spacing={1}>
                <Clock size={22} color="#F6AD55" />
                <Text color="textSecondary" fontSize="xs" textTransform="uppercase" letterSpacing="1px">
                  Pendentes
                </Text>
                <Text fontSize="3xl" fontWeight={800} color="orange.300">
                  {stats.pendentes}
                </Text>
              </VStack>
            </CardBody>
          </Card>
          <Card bg="backgroundSecondary" borderColor="whiteAlpha.100" borderWidth="1px">
            <CardBody p={{ base: 4, md: 5 }}>
              <VStack align="flex-start" spacing={1}>
                <CheckCircle2 size={22} color="#68D391" />
                <Text color="textSecondary" fontSize="xs" textTransform="uppercase" letterSpacing="1px">
                  Aprovados
                </Text>
                <Text fontSize="3xl" fontWeight={800} color="green.300">
                  {stats.aprovados}
                </Text>
              </VStack>
            </CardBody>
          </Card>
          <Card bg="backgroundSecondary" borderColor="whiteAlpha.100" borderWidth="1px">
            <CardBody p={{ base: 4, md: 5 }}>
              <VStack align="flex-start" spacing={1}>
                <XCircle size={22} color="#FC8181" />
                <Text color="textSecondary" fontSize="xs" textTransform="uppercase" letterSpacing="1px">
                  Rejeitados
                </Text>
                <Text fontSize="3xl" fontWeight={800} color="red.300">
                  {stats.rejeitados}
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search size={18} color="#BDBDBD" />
            </InputLeftElement>
            <Input
              placeholder="Buscar por nome, escola, WhatsApp..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg="backgroundSecondary"
              borderColor="whiteAlpha.200"
              size="lg"
            />
          </InputGroup>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            bg="backgroundSecondary"
            borderColor="whiteAlpha.200"
            size="lg"
          >
            <option value="todos">Todos os status</option>
            <option value="pendente">Pendentes</option>
            <option value="aprovado">Aprovados</option>
            <option value="rejeitado">Rejeitados</option>
          </Select>
          <Button onClick={refresh} variant="outline" size="lg" borderColor="rgba(184,143,45,0.4)" color="goldLight">
            Atualizar
          </Button>
        </SimpleGrid>

        {filtered.length === 0 ? (
          <Card bg="backgroundSecondary" borderColor="whiteAlpha.100" borderWidth="1px">
            <CardBody py={16}>
              <VStack spacing={4} textAlign="center">
                <Users size={48} color="#555" />
                <Text color="textSecondary" fontSize="lg">
                  {registrations.length === 0
                    ? 'Nenhum cadastro recebido ainda.'
                    : 'Nenhum cadastro encontrado com os filtros selecionados.'}
                </Text>
              </VStack>
            </CardBody>
          </Card>
        ) : (
          <Accordion allowMultiple variant="unstyled">
            {filtered.map((r) => {
              const cfg = statusConfig[r.status]
              return (
                <AccordionItem
                  key={r.id}
                  bg="backgroundSecondary"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  borderRadius="xl"
                  overflow="hidden"
                  mb={3}
                >
                  <AccordionButton _expanded={{ bg: 'rgba(184,143,45,0.05)' }} px={{ base: 4, md: 5 }} py={4}>
                    <Flex flex="1" align="center" justify="space-between" wrap="wrap" gap={3} textAlign="left">
                      <HStack spacing={3} flex={1} minW={0}>
                        <Box
                          w={10}
                          h={10}
                          borderRadius="full"
                          bg="rgba(184,143,45,0.15)"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          flexShrink={0}
                        >
                          <UserCircle size={20} color="#D4AF55" />
                        </Box>
                        <Box minW={0}>
                          <Text fontWeight={700} color="white" isTruncated>
                            {r.nomeCompleto}
                          </Text>
                          <Text color="textSecondary" fontSize="xs" isTruncated>
                            {r.escola} • {r.cidade}
                          </Text>
                        </Box>
                      </HStack>
                      <HStack spacing={2} flexShrink={0}>
                        <Badge
                          bg={cfg.bg}
                          color={cfg.color}
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight={600}
                        >
                          {cfg.label}
                        </Badge>
                        <AccordionIcon color="textSecondary" />
                      </HStack>
                    </Flex>
                  </AccordionButton>
                  <AccordionPanel px={{ base: 4, md: 5 }} pb={5}>
                    <Divider borderColor="whiteAlpha.100" mb={4} />

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                      <Box>
                        <Text color="goldLight" fontSize="xs" fontWeight={700} textTransform="uppercase" letterSpacing="1px" mb={2}>
                          Dados do Aluno
                        </Text>
                        <VStack spacing={2} align="flex-start" fontSize="sm">
                          <HStack spacing={2}>
                            <UserCircle size={15} color="#BDBDBD" />
                            <Text color="white"><Text as="span" color="textSecondary">Nome:</Text> {r.nomeCompleto}</Text>
                          </HStack>
                          <HStack spacing={2}>
                            <Calendar size={15} color="#BDBDBD" />
                            <Text color="white">
                              <Text as="span" color="textSecondary">Nascimento:</Text> {r.dataNascimento}
                              {r.idade ? ` (${r.idade} anos)` : ''}
                            </Text>
                          </HStack>
                          <HStack spacing={2}>
                            <School size={15} color="#BDBDBD" />
                            <Text color="white"><Text as="span" color="textSecondary">Escola:</Text> {r.escola}</Text>
                          </HStack>
                          {r.serieAno && (
                            <HStack spacing={2}>
                              <ClipboardList size={15} color="#BDBDBD" />
                              <Text color="white"><Text as="span" color="textSecondary">Série/Ano:</Text> {r.serieAno}</Text>
                            </HStack>
                          )}
                          {r.bairro && (
                            <HStack spacing={2}>
                              <MapPin size={15} color="#BDBDBD" />
                              <Text color="white"><Text as="span" color="textSecondary">Bairro:</Text> {r.bairro}</Text>
                            </HStack>
                          )}
                          <HStack spacing={2}>
                            <MapPin size={15} color="#BDBDBD" />
                            <Text color="white"><Text as="span" color="textSecondary">Cidade:</Text> {r.cidade}</Text>
                          </HStack>
                        </VStack>
                      </Box>

                      <Box>
                        <Text color="goldLight" fontSize="xs" fontWeight={700} textTransform="uppercase" letterSpacing="1px" mb={2}>
                          Dados do Responsável
                        </Text>
                        <VStack spacing={2} align="flex-start" fontSize="sm">
                          <HStack spacing={2}>
                            <UserCircle size={15} color="#BDBDBD" />
                            <Text color="white"><Text as="span" color="textSecondary">Responsável:</Text> {r.nomeResponsavel}</Text>
                          </HStack>
                          <HStack spacing={2}>
                            <Users size={15} color="#BDBDBD" />
                            <Text color="white"><Text as="span" color="textSecondary">Parentesco:</Text> {r.grauParentesco}</Text>
                          </HStack>
                          <HStack spacing={2}>
                            <Phone size={15} color="#BDBDBD" />
                            <Text color="white">
                              <Text as="span" color="textSecondary">WhatsApp:</Text>{' '}
                              <Text as="a" href={`https://wa.me/55${r.whatsapp}`} target="_blank" rel="noopener noreferrer" color="goldLight" textDecoration="underline">
                                {r.whatsapp}
                              </Text>
                            </Text>
                          </HStack>
                          {r.email && (
                            <HStack spacing={2}>
                              <Mail size={15} color="#BDBDBD" />
                              <Text color="white">
                                <Text as="span" color="textSecondary">E-mail:</Text>{' '}
                                <Text as="a" href={`mailto:${r.email}`} color="goldLight" textDecoration="underline">
                                  {r.email}
                                </Text>
                              </Text>
                            </HStack>
                          )}
                        </VStack>
                      </Box>
                    </SimpleGrid>

                    {(r.outroEsporte || r.observacoes || r.praticaFutevolei) && (
                      <Box mt={4}>
                        <Text color="goldLight" fontSize="xs" fontWeight={700} textTransform="uppercase" letterSpacing="1px" mb={2}>
                          Informações Adicionais
                        </Text>
                        <VStack spacing={2} align="flex-start" fontSize="sm">
                          <Text color="white">
                            <Text as="span" color="textSecondary">Pratica futevôlei:</Text>{' '}
                            {r.praticaFutevolei === 'sim' ? 'Sim' : 'Não'}
                          </Text>
                          {r.outroEsporte && (
                            <Text color="white">
                              <Text as="span" color="textSecondary">Outro esporte:</Text> {r.outroEsporte}
                            </Text>
                          )}
                          {r.observacoes && (
                            <Text color="white">
                              <Text as="span" color="textSecondary">Observações:</Text> {r.observacoes}
                            </Text>
                          )}
                        </VStack>
                      </Box>
                    )}

                    <Flex mt={4} pt={4} borderTop="1px solid" borderColor="whiteAlpha.100" justify="space-between" align="center" wrap="wrap" gap={3}>
                      <Text color="textSecondary" fontSize="xs">
                        Cadastrado em {formatDate(r.timestamp)}
                        {r.statusUpdatedAt && ` • Atualizado em ${formatDate(r.statusUpdatedAt)}`}
                      </Text>
                      <HStack spacing={2}>
                        {r.status !== 'aprovado' && (
                          <Tooltip label="Aprovar cadastro" hasArrow>
                            <Button
                              size="sm"
                              leftIcon={<Check size={16} />}
                              bg="green.500"
                              color="white"
                              _hover={{ bg: 'green.400' }}
                              onClick={() => handleStatusChange(r.id, 'aprovado')}
                            >
                              Aprovar
                            </Button>
                          </Tooltip>
                        )}
                        {r.status !== 'rejeitado' && (
                          <Tooltip label="Rejeitar cadastro" hasArrow>
                            <Button
                              size="sm"
                              leftIcon={<X size={16} />}
                              bg="red.500"
                              color="white"
                              _hover={{ bg: 'red.400' }}
                              onClick={() => handleStatusChange(r.id, 'rejeitado')}
                            >
                              Rejeitar
                            </Button>
                          </Tooltip>
                        )}
                        {r.status !== 'pendente' && (
                          <Tooltip label="Marcar como pendente" hasArrow>
                            <Button
                              size="sm"
                              leftIcon={<Clock size={16} />}
                              bg="orange.500"
                              color="white"
                              _hover={{ bg: 'orange.400' }}
                              onClick={() => handleStatusChange(r.id, 'pendente')}
                            >
                              Pendente
                            </Button>
                          </Tooltip>
                        )}
                        <Tooltip label="Excluir cadastro" hasArrow>
                          <IconButton
                            aria-label="Excluir cadastro"
                            icon={<Trash2 size={16} />}
                            size="sm"
                            variant="ghost"
                            color="red.300"
                            _hover={{ bg: 'red.500', color: 'white' }}
                            onClick={() => {
                              setDeleteId(r.id)
                              onOpen()
                            }}
                          />
                        </Tooltip>
                      </HStack>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              )
            })}
          </Accordion>
        )}
      </Container>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent bg="backgroundSecondary" borderColor="rgba(184,143,45,0.3)" color="white">
            <AlertDialogHeader fontSize="lg" fontWeight={700} color="white">
              Excluir cadastro
            </AlertDialogHeader>
            <AlertDialogBody color="textSecondary">
              Tem certeza que deseja excluir este cadastro? Esta ação não pode ser desfeita.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} variant="ghost" onClick={onClose} mr={3} color="textSecondary">
                Cancelar
              </Button>
              <Button bg="red.500" color="white" _hover={{ bg: 'red.400' }} onClick={handleDelete}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}
