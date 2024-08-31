import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'

const ModalLayout = ({ isOpen, onClose, header, children, width, isCentered = true, ...props }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered={isCentered} {...props}>
      <ModalOverlay />
      <ModalContent maxW={width} containerProps={{ padding: '24px 0' }}>
        <ModalHeader fontSize={18} fontWeight={700} minH={12}>
          {header}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p="8px 24px 24px 24px" color="gray.700">
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalLayout