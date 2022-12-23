import _ from 'lodash';
import { Fragment } from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

import Link from 'src/components/Link';

const Breadcrumb = () => {
	const breadcrumbs = useBreadcrumbs();

	return (
		<div className="flex py-4 pt-0">
			<ol className="inline-flex items-center">
				{breadcrumbs.map((breadcrumb, index) => (
					<li className="inline-flex items-center" key={index}>
						{_.last(breadcrumbs)?.key === breadcrumb.key ? (
							<span className="text-sm font-medium text-gray-500">{_.size(breadcrumb.key) > 1 ? breadcrumb.breadcrumb : 'Home'}</span>
						) : (
							<Fragment>
								<Link className="text-sm font-medium text-gray-800 hover:text-gray-900" to={breadcrumb.match.pathname}>
									{_.size(breadcrumb.key) > 1 ? breadcrumb.breadcrumb : 'Home'}
								</Link>
								<span className="mx-2 text-sm font-bold text-gray-500">/</span>
							</Fragment>
						)}
					</li>
				))}
			</ol>
		</div>
	);
};

export default Breadcrumb;
