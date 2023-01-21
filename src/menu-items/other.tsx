import { Dashboard as DashboardIcon } from '@mui/icons-material';
import { FormattedMessage } from 'react-intl';

const other = {
	id: 'sample-docs-roadmap',
	type: 'group',
	children: [
		{
			id: 'sample-page',
			title: <FormattedMessage id="sample-page" />,
			type: 'item',
			url: '/sample-page',
			icon: DashboardIcon
		},
		{
			id: 'documentation',
			title: <FormattedMessage id="documentation" />,
			type: 'item',
			url: '/berry',
			icon: DashboardIcon
		},
		{
			id: 'roadmap',
			title: <FormattedMessage id="roadmap" />,
			type: 'item',
			url: '/berry/roadmap',
			icon: DashboardIcon
		}
	]
};

export default other;
