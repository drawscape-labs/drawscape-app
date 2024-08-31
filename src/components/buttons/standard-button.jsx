import { Button, Icon } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StandardButton = ({ variant = 'primary', h = '40px', onClick, icon, children, ...props }) => (
  <Button
    variant={variant}
    h={h}
    onClick={onClick}
    lineHeight="24px"
    leftIcon={icon ? <Icon icon={icon} as={FontAwesomeIcon} style={{ width: 18, height: 18 }} /> : null}
    {...props}
  >
    {children}
  </Button>
)

export default StandardButton