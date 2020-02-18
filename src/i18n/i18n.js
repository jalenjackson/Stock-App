import React from 'react';
import translations from './translations';
import { IntlProvider } from 'react-intl';

const I18nProvider = ({ children }) => (
    <IntlProvider locale='en-us' messages={translations['en-us']}>
        {children}
    </IntlProvider>
);

export default I18nProvider;