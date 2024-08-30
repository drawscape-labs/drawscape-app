'use client'

import { Button, HStack } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  return (
    <HStack as="nav" bg="blue" px={6} py={4}>
      <LinkButton href="/">Home</LinkButton>
      <LinkButton href="/accounts">Accounts</LinkButton>
      <LinkButton href="/factorio">Factorio</LinkButton>
    </HStack>
  )
}

const LinkButton = ({ href, children }) => {
  const pathname = usePathname()

  return (
    <Button
      href={href}
      as={Link}
      fontSize={16}
      bg="blue"
      style={{ background: pathname === href && '#3182ceab' }}
      _hover={{ background: '#3182ceab' }}
    >
      {children}
    </Button>
  )
}

export default NavBar
