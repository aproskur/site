'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import styled from 'styled-components';

const LanguageSwitcherContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 1rem;
  color: white;
`;

const LanguageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  text-decoration: ${({ $active }) => ($active ? 'underline' : 'none')};
  color: white;
  font-size: 1rem;
  text-underline-offset: 6px;
  text-decoration-color: rgb(var(--clr-torquoise));

  &:hover {
    opacity: 0.8;
  }
`;

export default function LanguageSwitcher({ className }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentLocale = useLocale();

    const switchLanguage = (locale) => {
        if (locale === currentLocale) return;
        const search = searchParams.toString();
        const newPath = `/${locale}${pathname.replace(/^\/[^/]+/, '')}`;
        window.location.href = search ? `${newPath}?${search}` : newPath;
    };

    return (
        <LanguageSwitcherContainer className={className}>
            <LanguageButton $active={currentLocale === 'en'} onClick={() => switchLanguage('en')}>
                EN
            </LanguageButton>
            |
            <LanguageButton $active={currentLocale === 'ru'} onClick={() => switchLanguage('ru')}>
                RU
            </LanguageButton>
        </LanguageSwitcherContainer>
    );
}
