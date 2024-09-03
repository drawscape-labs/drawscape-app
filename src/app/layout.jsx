import Providers from '@/app/providers'
import NavBar from '@/components/navbar'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Factorio Visualizer - Drawscape",
  description: "Visualize your Factorio projects in a new way.",
}

const RootLayout = ({ children }) => { // Add title prop with default value
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
export default RootLayout
