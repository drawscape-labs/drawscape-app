'use client'

import { useState } from 'react'
import { Box, Container, HStack } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import StandardButton from '@/components/buttons/standard-button'
import OutlinedButton from '@/components/buttons/outlined-button'
import { faDownload, faUpload, faShare } from '@fortawesome/pro-solid-svg-icons'
import { useFactorioProject } from '@/app/factorio/context/factorio-project'
import Api from '@/util/api'
import ShareModal from './share-modal'
import { fireBasicConfetti } from '@/components/confetti'


const FactorioProjectNavbar = () => {
  const router = useRouter()
  const { projectId } = useFactorioProject()
  const [isDownloading, setIsDownloading] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const handleNewUpload = () => {
    router.push('/factorio')
  }

  const handleDownloadClick = async () => {
    setIsDownloading(true)
    try {
      const response = await Api.get(`/factorio/render-project/${projectId}`)
      const svgData = response.svg_string
      if (svgData) {
        console.log(svgData)
        const blob = new Blob([svgData], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'factorio_base.svg'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        
        fireBasicConfetti()
      } else {
        console.error('No SVG data received from API')
      }
    } catch (error) {
      console.error('Error during download:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleShareClick = () => {
    setIsShareModalOpen(true)
  }

  return (
    <Box as="nav" bg="white" borderBottomWidth="1px">
      <Container py="4" maxWidth="100%">
        <HStack justify="space-between">
          <HStack spacing={4}>
            <OutlinedButton icon={faUpload} onClick={handleNewUpload}>New Upload</OutlinedButton>
          </HStack>
          <HStack spacing={4}>
            <OutlinedButton
              icon={faShare}
              onClick={handleShareClick}
            >
              Share
            </OutlinedButton>
            <StandardButton
              variant="primary"
              icon={faDownload}
              onClick={handleDownloadClick}
              isDisabled={isDownloading}
            >
              {isDownloading ? 'Downloading...' : 'Download (.SVG)'}
            </StandardButton>
          </HStack>
        </HStack>
      </Container>
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
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

export default FactorioProjectNavbar