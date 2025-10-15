'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import styled from 'styled-components';

const Dropdown = styled.select`
  background-color: inherit;
  color: #fff;
  padding: 0.5em 1em;
  margin: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;

const Option = styled.option`
  background-color: white;
  color: black;
  font-size: 1rem;
`;

export default function LanguageSwitcher({ className }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentLocale = useLocale();

    const switchLanguage = (locale) => {
        const search = searchParams.toString();
        const newPath = `/${locale}${pathname.replace(/^\/[^/]+/, '')}`;
        window.location.href = search ? `${newPath}?${search}` : newPath;
    };

    return (
        <Dropdown
            className={className}
            value={currentLocale}
            onChange={(e) => switchLanguage(e.target.value)}
        >
            <Option value="en">EN</Option>
            <Option value="ru">RU</Option>
        </Dropdown>
    );
}
