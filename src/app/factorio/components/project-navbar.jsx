'use client'

import { useState, useEffect } from 'react'
import { Box, Container, HStack, Menu, MenuButton, MenuList, MenuItem, Button, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import StandardButton from '@/components/buttons/standard-button'
import OutlinedButton from '@/components/buttons/outlined-button'
import { faDownload, faUpload, faShare, faPalette, faFillDrip } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFactorioProject } from '@/app/factorio/context/factorio-project'
import Api from '@/util/api'
import ShareModal from './share-modal'
import { fireBasicConfetti } from '@/components/confetti'


const FactorioProjectNavbar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { projectId, themeName, setThemeName, colorScheme, setColorScheme } = useFactorioProject()
  
  const [isDownloading, setIsDownloading] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [availableThemes, setAvailableThemes] = useState([])
  const [availableColorSchemes, setAvailableColorSchemes] = useState({})

  useEffect(() => {
    const fetchAvailableThemes = async () => {
      try {
        const response = await Api.get('/factorio/available-themes')
        console.log('response', response)
        setAvailableThemes(response.themes || [])
      } catch (error) {
        console.error('Error fetching available themes:', error)
        setAvailableThemes([])
      }
    }

    fetchAvailableThemes()
  }, [])

  useEffect(() => {
    const fetchAvailableColorSchemes = async () => {
      try {
        const response = await Api.get(`/factorio/available-colors?theme=${themeName}`)
        console.log('response', response)

        setAvailableColorSchemes(response.colors || {})
      } catch (error) {
        console.error('Error fetching available color schemes:', error)
        setAvailableColorSchemes({})
      }
    }

    fetchAvailableColorSchemes()
  }, [themeName])

  const handleNewUpload = () => {
    router.push('/factorio')
  }

  const handleDownloadClick = async () => {
    setIsDownloading(true)
    try {
      const response = await Api.get(`/factorio/render-project/${projectId}?theme_name=${themeName}&color_scheme=${colorScheme}`)
      const svgData = response.svg_string
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

  const handleThemeChange = (newTheme) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('theme_name', newTheme)
    router.push(`/factorio/project/${projectId}?${newSearchParams.toString()}`)
    setThemeName(newTheme)
  }

  const handleColorSchemeChange = (newColorScheme) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('color_scheme', newColorScheme)
    router.push(`/factorio/project/${projectId}?${newSearchParams.toString()}`)
    setColorScheme(newColorScheme)
  }

  return (
    <Box as="nav" bg="white" borderBottomWidth="1px">
      <Container py="4" maxWidth="100%">
        <HStack justify="space-between">
          <HStack spacing={4}>
            <OutlinedButton icon={faUpload} onClick={handleNewUpload}>New Project</OutlinedButton>
            <Menu>
              <MenuButton as={Button} variant="outline" leftIcon={<FontAwesomeIcon icon={faPalette} />}>
                Change Theme
              </MenuButton>
              <MenuList>
                {availableThemes.length > 0 ? (
                  availableThemes.map((availableTheme, index) => (
                    <MenuItem 
                      key={index} 
                      fontWeight={themeName === availableTheme.slug ? 'bold' : 'normal'}
                      onClick={() => handleThemeChange(availableTheme.slug)}
                    >
                      {availableTheme.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>No themes available</MenuItem>
                )}
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton as={Button} variant="outline" leftIcon={<FontAwesomeIcon icon={faFillDrip} />}>
                Change Color
              </MenuButton>
              <MenuList>
                {Object.keys(availableColorSchemes).length > 0 ? (
                  Object.entries(availableColorSchemes).map(([schemeName, schemeData]) => (
                    <MenuItem 
                      key={schemeName} 
                      fontWeight={colorScheme === schemeName ? 'bold' : 'normal'}
                      onClick={() => handleColorSchemeChange(schemeName)}
                    >
                      <HStack spacing={2} alignItems="center" justifyContent="space-between" width="100%">
                        <Text>{schemeName}</Text>
                        <HStack spacing={1} justifyContent="flex-end">
                          {Object.entries(schemeData).map(([key, color], index) => (
                            key !== 'bg' ? (
                              <Box key={index} width="10px" height="20px" borderRadius="sm" bg={color} border="1px solid #e0e0e0" />
                            ) : null
                          ))}
                          <Box 
                            width="10px" 
                            height="20px" 
                            borderRadius="sm" 
                            bg={schemeData.bg || 'white'} 
                            border="1px solid #e0e0e0" 
                          />
                        </HStack>
                      </HStack>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>No color schemes available</MenuItem>
                )}
              </MenuList>
            </Menu>
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

export default FactorioProjectNavbar