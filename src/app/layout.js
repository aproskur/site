import { Inter, Poppins, Rajdhani } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import StyledComponentsRegistry from './lib/registry'
import { GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

const poppins = Poppins({
  weight: ['400', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins'
});

const rajdhani = Rajdhani({
  weight: ['400', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rajdhani'
});

const wordGameFont = localFont({
  src: './assets/fonts/MouseMemoirs-Regular.ttf',
  display: 'swap',
  variable: '--font-wordGameFont'
})


export const metadata = {
  title: 'Anna Webdev',
  description: 'Webdeveloper portfolio',
}



export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${rajdhani.variable} ${wordGameFont.variable}`}>
      <head>
        <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
          rel="stylesheet"
        />
        <meta name="google-site-verification" content="gjXFbI9AM_fLYLQx1-wpbQb13sn77x9OcM7234uy_Gw" />

      </head>
      <body className={inter.className}><StyledComponentsRegistry>{children}</StyledComponentsRegistry></body>
      <GoogleTagManager gtmId="G-W5ZZY1CWBH" />
    </html>
  )
}
