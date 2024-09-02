'use client'

import { useState, useEffect } from 'react'
import { VStack } from '@chakra-ui/react'
import FactorioProjectNavbar from '@/app/factorio/components/project-navbar'
import Api from '@/util/api'
import { FactorioProjectProvider, useFactorioProject } from '@/app/factorio/context/factorio-project'
import PageLoading from '@/components/page-loading'

const FactorioProjectContent = () => {
  const [imageData, setImageData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { projectId, themeName, colorScheme } = useFactorioProject()

  useEffect(() => {
    const fetchImageData = async () => {
      setLoading(true)
      try {
        const response = await Api.get(`/factorio/render-project/${projectId}?theme_name=${themeName}&color_scheme=${colorScheme}`)
        setImageData(response.svg_string)
      } catch (error) {
        console.error('Error fetching image data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchImageData()
  }, [projectId, themeName, colorScheme])

  return (
    <>
      <FactorioProjectNavbar />
      {loading ? (
        <PageLoading message="Rendering Factorio Project" />
      ) : (
        <VStack spacing={4} align="stretch" p={4}>
          {imageData && (
            <div
              dangerouslySetInnerHTML={{ __html: imageData }}
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </VStack>
      )}
    </>
  )
}

const FactorioProject = () => {
  return (
    <FactorioProjectProvider>
      <FactorioProjectContent />
    </FactorioProjectProvider>
  )
}

export default FactorioProject