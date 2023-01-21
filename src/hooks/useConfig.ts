import { useContext } from 'react';

import { ConfigContext } from 'src/contexts/ConfigContext';

const useConfig = () => useContext(ConfigContext);

export default useConfig;
