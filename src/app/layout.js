
import { Inter, Poppins, Rajdhani, Archivo_Narrow } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import StyledComponentsRegistry from './lib/registry';
import Script from 'next/script';


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
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

const archivoNarrow = Archivo_Narrow({
  weight: ['400', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
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

const poppinsRegular = localFont(
  {
    src: './assets/fonts/Poppins/Poppins-Regular.ttf',
    display: 'swap',
    variable: '--font-poppins'
  }
);

const poppinsSemibold = localFont({
  src: './assets/fonts/Poppins/Poppins-Bold.ttf',
  display: 'swap',
  variable: '--font-poppins-bold'
});





export const metadata = {
  title: 'Anna Webdev',
  description: 'Webdeveloper portfolio',

}



export default function RootLayout({ children }) {


  return (
    <html lang="en" className={`${poppinsSemibold.variable} ${poppinsRegular.variable} ${rajdhani.variable} ${wordGameFont.variable} ${archivoNarrow.variable} ${inter.variable} ${styledText.variable}`}>
      <head>
        <noscript>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
        </noscript>
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
