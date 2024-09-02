'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Api from '@/util/api'
import { Button, VStack, Text, Box, Input, Heading, Container, SimpleGrid, Image, Flex, Link, OrderedList, ListItem, Code, Spinner } from '@chakra-ui/react'

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
      router.push(`/factorio/project/${uuid}?theme_name=default&color_scheme=main`)

    } catch (error) {
      console.error(error)
      setError('Error uploading file')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container as="main" maxW="100%" display="flex" flexDir="column" p={{ base: 4, md: 8 }}>
    <VStack spacing={4} align="stretch">
      <Heading as="h1">Factorio Base Visualizer</Heading>
      <Text fontSize="lg" mb={4}>
        Upload your Factorio base to see it come to life!
      </Text>
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: '2px dashed #ccc',
          padding: '100px',
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
      <Button 
        onClick={handleUpload} 
        isDisabled={loading || !file}
        leftIcon={loading ? <Spinner size="sm" /> : null}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </Button>
      {error && <Text color="red.500">{error}</Text>}
      
      <Heading size="lg">Instructions</Heading>
      <OrderedList fontSize="lg" mb={4} spacing={2}>
        <ListItem>Use the <Link href="https://mods.factorio.com/mod/FUE5Exporter" isExternal>FUE5Exporter</Link> mod to select and export the part of your base you want to draw.</ListItem>
        <ListItem>The mod will create a <Code>exported-entities.json</Code> file in your game data folder.</ListItem>
        <ListItem>Upload that JSON file to the interface above.</ListItem>
      </OrderedList>
      <Heading size="lg">Examples</Heading>
      <Text fontSize="lg" mb={4}>Using the SVG files and a pen plotter to draw Factorio bases with pen and paper.</Text>
      <SimpleGrid columns={4} spacing={4}>
        {exampleImages.map((src, index) => (
          <Flex key={index} justifyContent="center" alignItems="center" height="500px" overflow="hidden">
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