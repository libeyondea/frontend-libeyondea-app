import { useContext } from 'react';

import AuthContext from 'src/contexts/FirebaseContext';

// import AuthContext from 'contexts/Auth0Context';
// import AuthContext from 'contexts/JWTContext';
// import AuthContext from 'contexts/AWSCognitoContext';

const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) throw new Error('context must be use inside provider');

	return context;
};

export default useAuth;
