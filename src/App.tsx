import { FirebaseProvider as AuthProvider } from './contexts/FirebaseContext';
import NavigationScroll from './layout/NavigationScroll';
import Routes from './routes';
import ThemeCustomization from './themes';
import Locales from './ui-component/Locales';
import Snackbar from './ui-component/extended/Snackbar';

// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

const App = () => (
	<ThemeCustomization>
		<Locales>
			<NavigationScroll>
				<AuthProvider>
					<>
						<Routes />
						<Snackbar />
					</>
				</AuthProvider>
			</NavigationScroll>
		</Locales>
	</ThemeCustomization>
);

export default App;
