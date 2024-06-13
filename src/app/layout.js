import { Inter, Poppins, Rajdhani } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import StyledComponentsRegistry from './lib/registry'
import Script from 'next/script'

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
        <link rel="preload" href="/path/to/local/devicon.min.css" as="style" />
        <link rel="stylesheet" href="/path/to/local/devicon.min.css" onload="this.onload=null;this.rel='stylesheet'" media="print" />
        <noscript><link rel="stylesheet" href="/path/to/local/devicon.min.css" /></noscript>

        <link rel="preload" href="/path/to/local/font-awesome.min.css" as="style" />
        <link rel="stylesheet" href="/path/to/local/font-awesome.min.css" onload="this.onload=null;this.rel='stylesheet'" media="print" />
        <noscript><link rel="stylesheet" href="/path/to/local/font-awesome.min.css" /></noscript>
        <meta name="google-site-verification" content="gjXFbI9AM_fLYLQx1-wpbQb13sn77x9OcM7234uy_Gw" />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','G-W5ZZY1CWBH');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=G-W5ZZY1CWBH"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
