import { Inter } from 'next/font/google'
import './globals.css'
import StyledComponentsRegistry from './lib/registry'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Anna Webdev',
  description: 'Webdeveloper portfolio',
}



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
          rel="stylesheet"
        />

      </head>
      <body className={inter.className}><StyledComponentsRegistry>{children}</StyledComponentsRegistry></body>
    </html>
  )
}
