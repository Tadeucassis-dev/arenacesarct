import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  VStack,
  useBreakpointValue,
  Image,
} from '@chakra-ui/react'
import { Menu, Sparkles } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const MotionBox = motion(Box)
const MotionFlex = motion(Flex)

const navItems = [
  { label: 'O Projeto', href: '#sobre' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Inscrição', href: '#inscricao' },
]

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null)
  const isMobile = useBreakpointValue({ base: true, md: false })

  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.96])
  const backdropBlur = useTransform(scrollY, [0, 80], [0, 12])
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.35])
  const py = useTransform(scrollY, [0, 80], [18, 10])

  return (
    <MotionBox
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      style={{
        backgroundColor: 'rgba(16, 16, 16, var(--bg-opacity, 0))',
        backdropFilter: `blur(var(--backdrop-blur, 0)px)`,
        borderBottom: '1px solid rgba(184, 143, 45, var(--border-opacity, 0))',
      }}
    >
      <style>{`
        [data-header-style] {
          --bg-opacity: ${bgOpacity.get()};
          --backdrop-blur: ${backdropBlur.get()};
          --border-opacity: ${borderOpacity.get()};
        }
      `}</style>
      <MotionFlex
        data-header-style
        as="div"
        mx="auto"
        maxW="7xl"
        px={{ base: 4, md: 6, lg: 10 }}
        align="center"
        justify="space-between"
        style={{ paddingTop: py, paddingBottom: py }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Flex as="a" href="#inicio" align="center" gap={3} aria-label="Arena César - Início">
          {isMobile ? null : (
            <Image
              src="/arenacesar.jpg"
              alt="Logo Arena César"
              boxSize="44px"
              borderRadius="full"
              border="2px solid"
              borderColor="gold"
              objectFit="cover"
              fallback={<Box boxSize="44px" borderRadius="full" bg="gold" />}
            />
          )}
          <Flex direction="column" lineHeight={1.1}>
            <HStack spacing={1.5}>
              <Sparkles size={18} color="#B88F2D" />
              <Text
                as="span"
                fontSize={{ base: 'lg', md: 'xl' }}
                fontWeight={800}
                color="white"
                letterSpacing="0.3px"
              >
                ARENA CÉSAR
              </Text>
            </HStack>
            <Text
              as="span"
              fontSize={{ base: '10px', md: 'xs' }}
              color="textSecondary"
              letterSpacing="1.5px"
              textTransform="uppercase"
            >
              Futevôlei Social
            </Text>
          </Flex>
        </Flex>

        {!isMobile && (
          <HStack as="nav" spacing={8} align="center">
            {navItems.map((item) => (
              <Box
                as="a"
                key={item.href}
                href={item.href}
                color="white"
                fontWeight={500}
                fontSize="sm"
                position="relative"
                py={2}
                transition="color 0.25s ease"
                _hover={{ color: 'goldLight' }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  h: '2px',
                  bg: 'gold',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.3s ease',
                }}
                _hoverAfter={{ transform: 'scaleX(1)' }}
              >
                {item.label}
              </Box>
            ))}
            <Button
              as="a"
              href="#inscricao"
              size="md"
              px={6}
              fontSize="sm"
              letterSpacing="1px"
              textTransform="uppercase"
            >
              Quero Participar
            </Button>
          </HStack>
        )}

        {isMobile && (
          <IconButton
            ref={btnRef as any}
            onClick={onOpen}
            aria-label="Abrir menu"
            variant="ghost"
            color="white"
            icon={<Menu size={24} />}
            _hover={{ color: 'goldLight' }}
          />
        )}
      </MotionFlex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef as any} size="xs">
        <DrawerOverlay />
        <DrawerContent bg="backgroundSecondary" borderLeft="1px solid" borderColor="rgba(184,143,45,0.3)">
          <DrawerCloseButton color="white" size="lg" top={4} right={4} />
          <DrawerBody pt={20} pb={10}>
            <VStack as="nav" spacing={2} align="stretch">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  as="a"
                  href={item.href}
                  onClick={onClose}
                  variant="ghost"
                  justifyContent="flex-start"
                  fontSize="md"
                  py={6}
                  px={4}
                  borderRadius="md"
                  color="white"
                  _hover={{ bg: 'whiteAlpha.50', color: 'goldLight' }}
                >
                  {item.label}
                </Button>
              ))}
              <Box pt={4}>
                <Button
                  as="a"
                  href="#inscricao"
                  onClick={onClose}
                  size="lg"
                  w="full"
                  textTransform="uppercase"
                  letterSpacing="1px"
                >
                  Quero Participar
                </Button>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </MotionBox>
  )
}
