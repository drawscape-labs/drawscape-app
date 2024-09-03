'use client'

import { Box, Container, HStack, Image, Text, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'

const NavBar = () => {
  return (
    <Box as="nav" bg="white" borderBottomWidth="1px">
      <Container py="4" maxWidth="100%">
        <HStack justify="space-between">
          <Link href="/factorio">
            <Image src='/logo.png' boxSize="60px" cursor="pointer" />
          </Link>
          <HStack spacing={4}>
            <Text fontWeight="bold">Follow:</Text>
            <ChakraLink href="https://instagram.com/_draw_scape" isExternal>
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </ChakraLink>
            <ChakraLink href="https://github.com/drawscape-labs" isExternal>
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </ChakraLink>
            <ChakraLink href="https://x.com/russell161803" isExternal>
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </ChakraLink>
            <ChakraLink href="https://www.youtube.com/@draw_scape" isExternal>
              <FontAwesomeIcon icon={faYoutube} size="lg" />
            </ChakraLink>
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}

const LinkButton = ({ href, children }) => {
  const pathname = usePathname()

  return (
    <Box
      as={Link}
      href={href}
      fontSize={16}
      fontWeight="medium"
      color={pathname === href ? 'blue.500' : 'gray.600'}
      _hover={{ color: 'blue.500' }}
    >
      {children}
    </Box>
  )
}

export default NavBar
