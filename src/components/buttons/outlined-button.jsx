import { Button, Icon } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const OutlinedButton = ({ variant = 'outline', h = 10, icon, onClick, children, ...props }) => (
  <Button
    variant={variant}
    onClick={onClick}
    h={h}
    color="#4A5568"
    lineHeight="24px"
    leftIcon={
      icon ? (
        <Icon icon={icon} as={FontAwesomeIcon} style={{ width: 18, height: 18 }} color="#828282" />
      ) : null
    }
    _hover={{ textDecoration: 'none', bg: 'gray.100' }}
    transition="all 0.3s"
    {...props}
  >
    {children}
  </Button>
)

export default OutlinedButton
