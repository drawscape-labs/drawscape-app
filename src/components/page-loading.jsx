import { Flex, Spinner, Text } from '@chakra-ui/react'

const PageLoading = () => (
  <Flex align="center" justify="center" padding={300}>
    <Spinner size="lg" />
    <Text ml="3">Loading Page</Text>
  </Flex>
)

export default PageLoading
