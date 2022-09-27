import { ComponentType, LazyExoticComponent, Suspense } from 'react';

type LoaderProps = {};

const Loadable = (Component: LazyExoticComponent<() => JSX.Element> | ComponentType<any>) => (props: LoaderProps) =>
	(
		<Suspense fallback={null}>
			<Component {...props} />
		</Suspense>
	);

export default Loadable;
