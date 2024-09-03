'use client'

import { Box, Container, HStack, Image } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  return (
    <Box as="nav" bg="white" borderBottomWidth="1px">
      <Container py="4" maxWidth="100%">
        <HStack justify="space-between">
          <Link href="/factorio">
            <Image src='/logo.png' boxSize="60px" cursor="pointer" />
          </Link>
          {/* <LinkButton href="/factorio">Factorio</LinkButton> */}
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
