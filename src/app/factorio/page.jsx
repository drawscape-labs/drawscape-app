'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Api from '@/util/api'
import { Button, VStack, Text, Box, Input, Heading, Container, SimpleGrid, Image, Flex, Link, OrderedList, ListItem, Code, Spinner, HStack, UnorderedList } from '@chakra-ui/react'

const Factorio = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)
  const router = useRouter()

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const exampleImages = [
    '/factorio_examples/penplot_blue.png',
    '/factorio_examples/penplot_redrails.png',
    '/factorio_examples/penplot_megagreen.png',
    '/factorio_examples/penplot_blueprint.png',
  ]

  const digitalExamples = [
    '/factorio_examples/digital_rails.png',
    '/factorio_examples/digital_blueprint.png',
    '/factorio_examples/digital_blue.png',
    '/factorio_examples/digital_black.png'
  ]

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const uuid = await Api.post('factorio/upload-fue5', formData)
      console.log('results', uuid)
      router.push(`/factorio/project/${uuid}?theme_name=squares&color_scheme=black`)

    } catch (error) {
      console.error(error)
      setError('Error uploading file')
    } finally {
      setLoading(false)
    }
  }

  const handleShowRandomProject = () => {
    let projects = [
      '/factorio/project/3b6c52d5-5fc4-4c6e-af31-0a204632b352?color_scheme=belts&theme_name=squares',
      '/factorio/project/00f07047-ea41-4b5c-957f-6ea5e6cb50a7?theme_name=squares&color_scheme=rails'
    ]
    router.push(projects[Math.floor(Math.random() * projects.length)])
  }

  return (
    <Container as="main" maxW="100%" display="flex" flexDir="column" p={{ base: 4, md: 8 }}>
    <VStack spacing={4} align="stretch">
      <Heading as="h1" display="flex" alignItems="center">
        <Image
          src="/factorio_logo.png"
          alt="Factorio Logo"
          height={65}
          style={{ marginRight: '10px' }}
        />
        Factorio Base Visualizer
      </Heading>
      <Text fontSize="lg" mb={4}>
        Upload your Factorio base to see it come to life!
      </Text>
      <Flex direction={{ base: 'column', md: 'row' }} gap={8} mb={100}>
        <Box flex="1">
          <Box bg="white" boxShadow="lg" borderRadius="md" p={6}>
            <div
              onClick={handleClick}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              style={{
                border: '2px dashed #ccc',
                padding: '150px',
                textAlign: 'center',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              {file ? <Text>Selected file: {file.name}</Text> : <Text>Drag & drop your .json export file here, or click to select</Text>}
              <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
            <HStack spacing={4} mt={4}>
              <Button 
                onClick={handleUpload} 
                isDisabled={loading || !file}
                leftIcon={loading ? <Spinner size="sm" /> : null}
                flex="1"
              >
                {loading ? 'Uploading...' : 'Upload'}
              </Button>
              <Button
                onClick={handleShowRandomProject}
                flex="1"
                variant="outline"
              >
                Show Example Project
              </Button>
            </HStack>
            {error && <Text color="red.500" mt={2}>{error}</Text>}
          </Box>
        </Box>
        <Box flex="1">
          <Heading size="sm" textTransform="uppercase" color="gray.700" mb={2}>INSTRUCTIONS</Heading>
          <OrderedList fontSize="lg" mb={10} spacing={2}>
            <ListItem>Use the <Link href="https://mods.factorio.com/mod/FUE5Exporter" isExternal>FUE5Exporter</Link> mod to select and export the part of your base you want to draw.</ListItem>
            <ListItem>The mod will create a <Code>exported-entities.json</Code> file in your game data folder.</ListItem>
            <ListItem>Upload that JSON file to the interface on the left.</ListItem>
            <ListItem><Link href="https://www.youtube.com/watch?v=ysL4II1P6FE" isExternal>Video Walkthrough</Link> if you get stuck.</ListItem>
          </OrderedList>
          <Heading size="sm" textTransform="uppercase" color="gray.700" mb={2}>Notes</Heading>
          <UnorderedList fontSize="lg" mb={10} spacing={2}>
            <ListItem>Your "Mega Base" might not perform well due to file size limits</ListItem>
            <ListItem>Most of testing has been done with files less than 20MB</ListItem>
          </UnorderedList>
        </Box>
      </Flex>
      <Heading size="lg">Examples</Heading>
      <Heading size="sm">Pen Plotting</Heading>
      <Text fontSize="lg">Using the SVG files and a pen plotter to draw with pen and paper.</Text>
      <SimpleGrid columns={4} spacing={4}>
        {exampleImages.map((src, index) => (
          <Flex key={index} justifyContent="center" alignItems="center" overflow="hidden">
            <Box width="100%" height="100%" position="relative">
              <Image
                src={src}
                alt={`Example ${index + 1}`}
                objectFit="contain"
                layout="fill"
              />
            </Box>
          </Flex>
        ))}
      </SimpleGrid>
      <Heading size="sm" mt={4}>Digital (.SVG)</Heading>
      <SimpleGrid columns={2} spacing={4}>
        {digitalExamples.map((src, index) => (
          <Flex key={index} justifyContent="center" alignItems="center" overflow="hidden">
            <Box width="100%" height="100%" position="relative">
              <Image
                src={src}
                alt={`Example ${index + 1}`}
                objectFit="contain"
                layout="fill"
              />
            </Box>
          </Flex>
        ))}
      </SimpleGrid>

      </VStack>
    </Container>
  )
}

export default Factorio