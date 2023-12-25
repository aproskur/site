'use client'
import styles from './page.module.css'
import TopMenu from './components/TopMenu'
import Hero from './components/Hero'
import Watermark from './components/Watermark'
import Service from './components/Service'
import Tools from './components/Tools'
import Portfolio from './components/Portfolio'
import Contact from './components/Contacts'

export default function Home() {

  const words = ['CODE', 'CODE', 'CODE', 'CODE', 'CODE'];
  const colors = ['rgba(var(--clr-white), 0.2)', 'rgba(var(--clr-gold), .7);',
    'rgba(var(--clr-pink), 0.7);', 'rgba(var(--clr-white), 0.2)', 'rgba(var(--clr-white), 0.2)'];


  return (
    <>
      <Watermark words={words} colors={colors} />
      <TopMenu />
      <main className={styles.main}>
        <Hero />
        <Service id="services" />
        <Portfolio id="projects" />
        <Contact id="contact-anna" />
      </main >
    </>
  )
}
