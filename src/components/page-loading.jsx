import { Flex, Spinner, Text } from '@chakra-ui/react'

const PageLoading = ({ message = "Loading Page" }) => (
  <Flex align="center" justify="center" padding={300}>
    <Spinner size="lg" />
    <Text ml="3">{message}</Text>
  </Flex>
)

export default PageLoading
