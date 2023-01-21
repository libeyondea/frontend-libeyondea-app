import React, { Fragment, useEffect, useState } from 'react';
import { IntlProvider, MessageFormatElement } from 'react-intl';

import useConfig from 'src/hooks/useConfig';

const loadLocaleData = (locale: string) => {
	switch (locale) {
		case 'fr':
			return import('src/utils/locales/fr.json');
		case 'ro':
			return import('src/utils/locales/ro.json');
		case 'zh':
			return import('src/utils/locales/zh.json');
		default:
			return import('src/utils/locales/en.json');
	}
};

interface LocalesProps {
	children: React.ReactNode;
}

const Locales = ({ children }: LocalesProps) => {
	const { locale } = useConfig();
	const [messages, setMessages] = useState<Record<string, string> | Record<string, MessageFormatElement[]> | undefined>();

	useEffect(() => {
		loadLocaleData(locale).then((d: { default: Record<string, string> | Record<string, MessageFormatElement[]> | undefined }) => {
			setMessages(d.default);
		});
	}, [locale]);

	return (
		<Fragment>
			{messages && (
				<IntlProvider locale={locale} defaultLocale="en" messages={messages}>
					{children}
				</IntlProvider>
			)}
		</Fragment>
	);
};

export default Locales;
