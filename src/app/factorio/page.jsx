'use client'

import { useState } from 'react'
import Api from '@/util/api'
import { Button, Input, VStack, Text, Box } from '@chakra-ui/react'

const Factorio = () => {
  const [svgData, setSvgData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

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

      const result = await Api.post('factorio/upload-fue5', formData)
      setSvgData(result)
    } catch (error) {
      setError('Error uploading file')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <VStack spacing={4} align="stretch">
      <h1>Factorio</h1>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload} isDisabled={loading}>
        Upload
      </Button>
      {error && <Text color="red.500">{error}</Text>}
      {file && <Text>Selected file: {file.name}</Text>}
      {svgData && (
        <Box
          dangerouslySetInnerHTML={{ __html: svgData }}
          width="100%"
          height="auto"
        />
      )}
    </VStack>
  )
}

export default Factorio