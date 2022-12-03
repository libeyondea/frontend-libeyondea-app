import _ from 'lodash';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

import Link from 'src/components/Link';

const Breadcrumb = () => {
	const breadcrumbs = useBreadcrumbs();

	return (
		<div className="breadcrumbs py-4 pt-0 text-sm">
			<ul>
				{breadcrumbs.map((breadcrumb, index) => (
					<li key={index}>
						{_.last(breadcrumbs)?.key === breadcrumb.key ? (
							_.size(breadcrumb.key) > 1 ? (
								breadcrumb.breadcrumb
							) : (
								'Home'
							)
						) : (
							<Link className="link-hover link-primary link" to={breadcrumb.match.pathname}>
								{_.size(breadcrumb.key) > 1 ? breadcrumb.breadcrumb : 'Home'}
							</Link>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Breadcrumb;
