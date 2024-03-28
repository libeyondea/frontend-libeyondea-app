import { ComponentType, LazyExoticComponent, Suspense } from 'react';

type Props = object;

const Loadable = (Component: LazyExoticComponent<() => JSX.Element> | ComponentType<any>) => (props: Props) => (
	<Suspense fallback={null}>
		<Component {...props} />
	</Suspense>
);

export default Loadable;
