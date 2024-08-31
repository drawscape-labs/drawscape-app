'use client'

import { Box, Container, HStack } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import StandardButton from './buttons/standard-button'
import OutlinedButton from './buttons/outlined-button'
import { faDownload, faUpload } from '@fortawesome/free-solid-svg-icons'
import Storage from '@/util/storage'

const FactorioNavbar = () => {
  const router = useRouter()

  const handleNewUpload = () => {
    router.push('/factorio')
  }

  const handleDownloadClick = async () => {
    try {
      const svgData = Storage.get('factorioSvgData')
      if (svgData) {
        const blob = new Blob([svgData], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'factorio_base.svg'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      } else {
        console.error('No SVG data found in local storage')
      }
    } catch (error) {
      console.error('Error during download:', error)
    }
  }

  return (
    <Box as="nav" bg="white" borderBottomWidth="1px">
      <Container py="4" maxWidth="100%">
        <HStack justify="space-between">
          <HStack spacing={4}>
            <OutlinedButton icon={faUpload} onClick={handleNewUpload}>New Upload</OutlinedButton>
          </HStack>
          <HStack spacing={4}>
            <StandardButton
              variant="primary"
              icon={faDownload}
              onClick={handleDownloadClick}
            >
              Download (.SVG)
            </StandardButton>
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

export default FactorioNavbar