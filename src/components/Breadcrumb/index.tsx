import classNames from 'classnames';
import { To } from 'react-router-dom';

import Link from '../Link';

type Props = {
	className?: string;
	items: Array<{
		title: string;
		to: To;
	}>;
};

const Breadcrumb = ({ className, items }: Props) => {
	return (
		<div className={classNames('text-sm breadcrumbs', className)}>
			<ul>
				{items.map((item) => (
					<li>
						<Link to={item.to} className="link link-hover">
							{item.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Breadcrumb;
