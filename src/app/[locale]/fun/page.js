'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

const DynamicTopMenu = dynamic(() => import('../../../components/TopMenu'));
const DynamicFooter = dynamic(() => import('../../../components/Footer'));

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgb(var(--clr-gray));
  color: rgb(var(--clr-white));
`;

const PageContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 1.5rem 4rem;
`;

const HeaderSection = styled.section`
  max-width: 880px;
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: clamp(2.25rem, 4vw, 3.5rem);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.75rem;
  }

  p {
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    color: rgba(var(--clr-white), 0.85);
    line-height: 1.6;
  }
`;

const GamesGrid = styled.section`
  width: min(1100px, 100%);
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const Card = styled.article`
  background: rgba(var(--clr-subtle-gray), 0.08);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(var(--clr-white), 0.06);
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;

  img {
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  ${Card}:hover & img,
  ${Card}:focus-within & img {
    transform: scale(1.05);
  }
`;

const CardBody = styled.div`
  padding: 1.75rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;

  h2 {
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(var(--clr-white), 0.8);
  }
`;

const CardFooter = styled.div`
  margin-top: auto;
`;

const PlayLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  background: rgba(var(--clr-torquoise), 0.2);
  color: rgb(var(--clr-white));
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover,
  &:focus-visible {
    background: rgba(var(--clr-torquoise), 0.35);
    transform: translateY(-2px);
  }
`;

export default function FunLandingPage() {
  const t = useTranslations('FunPage');
  const locale = useLocale();

  const games = [
    {
      key: 'memo',
      href: { pathname: '/game' },
      image: '/images/website-game-pairs.png'
    },
    {
      key: 'word',
      href: { pathname: '/pages/word-game' },
      image: '/images/word-game-images/word-game.webp'
    }
  ];

  return (
    <PageWrapper>
      <DynamicTopMenu background="transparent" />
      <PageContainer>
        <HeaderSection>
          <h1>{t('title')}</h1>
          <p>{t('subtitle')}</p>
        </HeaderSection>

        <GamesGrid>
          {games.map((game) => (
            <Card key={game.key}>
              <ImageWrapper>
                <Image
                  src={game.image}
                  alt={t(`games.${game.key}.alt`)}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={game.key === 'memo'}
                />
              </ImageWrapper>
              <CardBody>
                <h2>{t(`games.${game.key}.name`)}</h2>
                <p>{t(`games.${game.key}.description`)}</p>
                <CardFooter>
                  <PlayLink href={game.href}>{t(`games.${game.key}.cta`)}</PlayLink>
                </CardFooter>
              </CardBody>
            </Card>
          ))}
        </GamesGrid>
      </PageContainer>
      <DynamicFooter />
    </PageWrapper>
  );
}
