import { useSelector } from 'react-redux';
import { dictionary } from '../utils';

const useTranslation = () => {
  const appStateLanguage = useSelector((state) => state.catalogReducer.language);
  const translate = (key) => dictionary?.[appStateLanguage]?.[key];
  return { translate };
};

export default useTranslation;
