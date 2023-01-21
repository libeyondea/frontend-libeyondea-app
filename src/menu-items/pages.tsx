import { BugReport as BugReportIcon } from '@mui/icons-material';
import { FormattedMessage } from 'react-intl';

const pages = {
	id: 'pages',
	type: 'group',
	children: [
		{
			id: 'maintenance',
			title: <FormattedMessage id="maintenance" />,
			type: 'collapse',
			icon: BugReportIcon,
			children: [
				{
					id: 'error',
					title: <FormattedMessage id="error-404" />,
					type: 'item',
					url: '/pages/error'
				},
				{
					id: 'coming-soon',
					title: <FormattedMessage id="coming-soon" />,
					type: 'collapse',
					children: [
						{
							id: 'coming-soon1',
							title: (
								<>
									<FormattedMessage id="coming-soon" /> 01
								</>
							),
							type: 'item',
							url: '/pages/coming-soon1'
						},
						{
							id: 'coming-soon2',
							title: (
								<>
									<FormattedMessage id="coming-soon" /> 02
								</>
							),
							type: 'item',
							url: '/pages/coming-soon2'
						}
					]
				},
				{
					id: 'under-construction',
					title: <FormattedMessage id="under-construction" />,
					type: 'item',
					url: '/pages/under-construction'
				}
			]
		}
	]
};

export default pages;
