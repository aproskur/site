
//import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import StyledComponentsRegistry from './lib/registry';
import Script from 'next/script';

/*
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
}); */

const archivoNarrowFont = localFont({
  src: [
    {
      path: './assets/fonts/archivo-narrow/static/ArchivoNarrow-Regular.ttf',
      weight: '400', // Normal weight
      style: 'normal'
    },
    {
      path: './assets/fonts/archivo-narrow/static/ArchivoNarrow-Medium.ttf',
      weight: '500', // Medium weight
      style: 'normal'
    },
    {
      path: './assets/fonts/archivo-narrow/static/ArchivoNarrow-SemiBold.ttf',
      weight: '600', // SemiBold weight
      style: 'normal'
    },
    {
      path: './assets/fonts/archivo-narrow/static/ArchivoNarrow-Bold.ttf',
      weight: '700', // Bold weight
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-archivo-narrow'
});


const wordGameFont = localFont({
  src: './assets/fonts/MouseMemoirs-Regular.ttf',
  display: 'swap',
  variable: '--font-wordGameFont'
});

const styledText = localFont({
  src: './assets/fonts/Rajdhani/Rajdhani-Regular.ttf',
  display: 'swap',
  variable: '--font-rajdhani'
});




const poppinsFont = localFont({
  src: [
    {
      path: './assets/fonts/Poppins/Poppins-Regular.ttf',
      weight: '400', // Regular weight
      style: 'normal'
    },
    {
      path: './assets/fonts/Poppins/Poppins-SemiBold.ttf',
      weight: '600', // SemiBold weight
      style: 'normal'
    },
    {
      path: './assets/fonts/Poppins/Poppins-Bold.ttf',
      weight: '700', // Bold weight
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-poppins'
});


export const metadata = {
  title: 'Anna Webdev',
  description: 'Webdeveloper portfolio',

}



export default function RootLayout({ children }) {


  return (
    <html lang="en" className={`${archivoNarrowFont.variable} ${poppinsFont.variable}  ${wordGameFont.variable} ${styledText.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" media="print" onload="this.media='all'" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" media="print" onload="this.media='all'" />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true; j.defer=true; j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','G-W5ZZY1CWBH');
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=G-W5ZZY1CWBH"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
