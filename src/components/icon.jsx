'use client'

import { Icon } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CustomIcon = ({ icon, ...props }) => {
  return <Icon icon={icon} as={FontAwesomeIcon} {...props} />
}

export default CustomIcon
