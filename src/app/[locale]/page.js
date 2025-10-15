'use client'
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const DynamicTopMenu = dynamic(() => import('../../components/TopMenu'));
const DynamicHero = dynamic(() => import('../../components/Hero'));
const DynamicService = dynamic(() => import('../../components/Service'));
const DynamicPortfolio = dynamic(() => import('../../components/Portfolio'));
const DynamicContact = dynamic(() => import('../../components/Contacts'), { ssr: false });
const DynamicFooter = dynamic(() => import('../../components/Footer'));

const StyledMainContainer = styled.main`
  display: flex;
  flex-direction: column;
`;

export default function Home() {
  const t = useTranslations('Homepage');
  const searchParams = useSearchParams();
  const sectionParam = searchParams?.get('section');

  useEffect(() => {
    if (!sectionParam || typeof window === 'undefined') {
      return;
    }

    let attemptsRemaining = 16;

    const removeSectionParam = () => {
      const url = new URL(window.location.href);
      if (!url.searchParams.has('section')) {
        return;
      }
      url.searchParams.delete('section');
      window.history.replaceState(null, '', url.toString());
    };

    const tryScroll = () => {
      const target = document.getElementById(sectionParam);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        removeSectionParam();
        return;
      }

      attemptsRemaining -= 1;

      if (attemptsRemaining <= 0) {
        removeSectionParam();
        return;
      }

      window.requestAnimationFrame(tryScroll);
    };

    window.requestAnimationFrame(tryScroll);

    return () => {
      attemptsRemaining = 0;
    };
  }, [sectionParam]);


  const words = ['CODE', 'CODE', 'CODE', 'CODE', 'CODE'];
  const colors = ['rgba(var(--clr-white), 0.2)', 'rgba(var(--clr-gold), .7);',
    'rgba(var(--clr-pink), 0.7);', 'rgba(var(--clr-white), 0.2)', 'rgba(var(--clr-white), 0.2)'];


  return (
    <>
      <DynamicTopMenu />
      <StyledMainContainer>
        <DynamicHero title={t('hero.title')} subtitle={t('hero.subtitle')} p1={t('hero.p1')} />
        <DynamicService id="services" />
        <DynamicPortfolio id="projects" />
        <DynamicContact id="contact-anna" />
        <DynamicFooter />
      </StyledMainContainer>

    </>
  )
}
