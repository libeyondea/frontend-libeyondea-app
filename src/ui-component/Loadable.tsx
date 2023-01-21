import Loader from './Loader';
import { LinearProgressProps } from '@mui/material/LinearProgress';
import { Suspense, LazyExoticComponent, ComponentType } from 'react';

interface LoaderProps extends LinearProgressProps {}

const Loadable = (Component: LazyExoticComponent<() => JSX.Element> | ComponentType<any>) => (props: LoaderProps) =>
	(
		<Suspense fallback={<Loader />}>
			<Component {...props} />
		</Suspense>
	);

export default Loadable;
