import { Stack, Text } from '@chakra-ui/react'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import StandardButton from '@/components/buttons/standard-button'
import ModalLayout from '@/components/modal-layout'

const DownloadModal = ({ isOpen, onClose }) => {
  const handleDownload = () => {
    // Implement download logic here
    console.log('Downloading...')
  }

  return (
    <ModalLayout header="Download" isOpen={isOpen} onClose={onClose} size="sm">
      <Stack align="center" spacing={6} mb={4}>
        <Text textAlign="center">
          Click the button below to download the file.
        </Text>

        <StandardButton
          onClick={handleDownload}
          icon={faDownload}
        >
          Download
        </StandardButton>
      </Stack>
    </ModalLayout>
  )
}

export default DownloadModal
