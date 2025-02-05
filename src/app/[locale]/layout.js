
//import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import StyledComponentsRegistry from '../../lib/registry';
import Script from 'next/script';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

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
  display: 'block',
  variable: '--font-archivo-narrow'
});

//for cyrilic in HEro instead of Rajdhani
const exo2Font = localFont(
  {
    src: [
      {
        path: './assets/fonts/exo_2/Exo2-Light.ttf',
        weight: '400',
        style: 'normal'
      },


    ],
    display: 'block',
    variable: '--font-exo2'
  }
);


const wordGameFont = localFont({
  src: './assets/fonts/MouseMemoirs-Regular.ttf',
  display: 'block',
  variable: '--font-wordGameFont'
});

const styledText = localFont({
  src: './assets/fonts/Rajdhani/Rajdhani-Regular.ttf',
  display: 'block',
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
  display: 'block',
  variable: '--font-poppins'
});


export const metadata = {
  title: 'Anna Webdev',
  description: 'Webdeveloper portfolio',

}

export default async function RootLayout({ children, params }) {

  const { locale } = params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }


  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  /*
  try {
    messages = require(`../../i18n/messages/${params.locale}.json`);
  } catch (error) {
    console.error(`Could not load translations for locale: ${params.locale}`);
    messages = require('../../i18n/messages/en.json');
  } */
  return (
    <html lang={locale} className={`${exo2Font.variable} ${archivoNarrowFont.variable} ${poppinsFont.variable}  ${wordGameFont.variable} ${styledText.variable}`}>
      <head>
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
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}