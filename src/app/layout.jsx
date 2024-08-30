import Providers from '@/app/providers'
import NavBar from '@/components/navbar'
import { Container } from '@chakra-ui/react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hello Outbound',
  description: 'Hello Outbound',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          <Container as="main" maxW="100%" display="flex" flexDir="column" p={{ base: 4, md: 8 }}>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
