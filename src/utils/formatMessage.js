import { IntlProvider } from 'react-intl';
import translations from '../i18n/translations/index';

const locale = 'en-us';
const intlProvider = new IntlProvider({ locale, messages: translations[locale], defaultLocale: 'en-us', onError: (err) =>  console.error(err) });
export const formatMessage = intlProvider.state.intl.formatMessage;