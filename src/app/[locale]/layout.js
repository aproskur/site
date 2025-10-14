
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

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-W5ZZY1CWBH';

export const metadata = {
  title: 'Anna Webdev',
  description: 'Webdeveloper portfolio',

}

export default async function RootLayout({ children, params }) {

  const { locale } = await params;
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
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
