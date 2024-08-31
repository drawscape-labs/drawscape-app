'use client'

import { useState, useEffect } from 'react'
import { VStack, Heading, Box, Button } from '@chakra-ui/react'
import Storage from '@/util/storage'
import { useRouter } from 'next/navigation'
import FactorioNavbar from '@/components/FactorioNavbar'

const FactorioRender = () => {
  const [svgData, setSvgData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const storedSvgData = Storage.get('factorioSvgData')
    if (storedSvgData) {
      setSvgData(storedSvgData)
    } else {
      router.push('/factorio')
    }
  }, [router])

  return (
    <>
      <FactorioNavbar />
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

export default FactorioRender