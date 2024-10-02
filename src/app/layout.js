
//import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import StyledComponentsRegistry from './lib/registry';
import Script from 'next/script';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

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


  //trying to add "lazy" load triggered by user interaction without useEffect
  const insertGTM = `
  (function() {
    function loadGTM() {
      var gtmScript = document.createElement('script');
      gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=G-W5ZZY1CWBH';
      gtmScript.async = true;
      gtmScript.defer = true;
      document.head.appendChild(gtmScript);
    }

    // Add event listener for user interaction (click or scroll)
    window.addEventListener('click', loadGTM, { once: true });
    window.addEventListener('scroll', loadGTM, { once: true });
  })();
`;


  return (
    <html lang="en" className={`${archivoNarrowFont.variable} ${poppinsFont.variable}  ${wordGameFont.variable} ${styledText.variable}`}>
      <head>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=G-W5ZZY1CWBH"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
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
