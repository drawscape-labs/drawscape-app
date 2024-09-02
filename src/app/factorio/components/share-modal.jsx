import { useState, useEffect } from 'react'
import { VStack, Input, Button, Text, HStack, Link } from '@chakra-ui/react'
import ModalLayout from '@/components/modal-layout'
import { useFactorioProject } from '@/app/factorio/context/factorio-project'
import { faGithub, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ShareModal = ({ isOpen, onClose }) => {
  const { projectId, themeName, colorScheme } = useFactorioProject()
  const [copied, setCopied] = useState(false)
  const shareUrl = `${window.location.origin}/factorio/project/${projectId}?theme_name=${themeName}&color_scheme=${colorScheme}`

  useEffect(() => {
    if (isOpen) {
      setCopied(false)
    }
  }, [isOpen])

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
  }

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} header="Share Project">
      <VStack spacing={4} align="stretch">
        <Text>Share this link to show others your Factorio project:</Text>
        <Input value={shareUrl} readOnly />
        <Button onClick={handleCopy} isDisabled={copied}> 
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
        <VStack spacing={2} align="center" mt={4}>
          <Text fontWeight="bold" textAlign="center">Follow us:</Text>
          <HStack spacing={4} justify="center">
            <Link href="https://instagram.com/_draw_scape" isExternal>
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </Link>
            <Link href="https://github.com/drawscape-labs" isExternal>
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </Link>
            <Link href="https://x.com/russell161803" isExternal>
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </Link>
            <Link href="https://www.youtube.com/@draw_scape" isExternal>
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </Link>
          </HStack>
        </VStack>
      </VStack>
    </ModalLayout>
  )
}

export default ShareModal