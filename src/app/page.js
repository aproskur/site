'use client'
import styles from './page.module.css'
import Watermark from './components/Watermark'
import dynamic from 'next/dynamic';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const DynamicTopMenu = dynamic(() => import('./components/TopMenu'));
const DynamicHero = dynamic(() => import('./components/Hero'));
const DynamicService = dynamic(() => import('./components/Service'));
const DynamicPortfolio = dynamic(() => import('./components/Portfolio'));
const DynamicContact = dynamic(() => import('./components/Contacts'), { ssr: false });
const DynamicFooter = dynamic(() => import('./components/Footer'));



export default function Home() {


  //const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const words = ['CODE', 'CODE', 'CODE', 'CODE', 'CODE'];
  const colors = ['rgba(var(--clr-white), 0.2)', 'rgba(var(--clr-gold), .7);',
    'rgba(var(--clr-pink), 0.7);', 'rgba(var(--clr-white), 0.2)', 'rgba(var(--clr-white), 0.2)'];


  return (
    <>
      <DynamicTopMenu />
      <main className={styles.main}>
        <DynamicHero />
        <DynamicService id="services" />
        <DynamicPortfolio id="projects" />
        <DynamicContact id="contact-anna" />
        <DynamicFooter />
      </main >

    </>
  )
}