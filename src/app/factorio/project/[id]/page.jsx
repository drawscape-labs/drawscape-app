'use client'

import { useState, useEffect } from 'react'
import { VStack, Box } from '@chakra-ui/react'
import FactorioProjectNavbar from '@/app/factorio/components/project-navbar'
import Api from '@/util/api'
import { FactorioProjectProvider, useFactorioProject } from '@/app/factorio/context/factorio-project'
import PageLoading from '@/components/page-loading'

const FactorioProjectContent = () => {
  const [svgData, setSvgData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { projectId } = useFactorioProject()

  useEffect(() => {
    const fetchSvgData = async () => {
      try {
        const response = await Api.get(`/factorio/render-project/${projectId}`)
        console.log('response', response)
        setSvgData(response.svg)
      } catch (error) {
        console.error('Error fetching SVG data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSvgData()
  }, [projectId])

  if (loading) {
    return <PageLoading />
  }

  return (
    <>
      <FactorioProjectNavbar />
      <VStack spacing={4} align="stretch" p={4}>
        {svgData && (
          <Box
            dangerouslySetInnerHTML={{ __html: svgData }}
            width="100%"
            height="auto"
          />
        )}
      </VStack>
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