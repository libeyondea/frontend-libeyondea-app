import { Divider, List, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import _ from 'lodash';
import { Fragment } from 'react';

import NavCollapse from '../NavCollapse';
import NavItem from '../NavItem';
import { NavMenuType } from 'src/types';

export interface NavGroupProps {
	item: NavMenuType;
}

const NavGroup = ({ item }: NavGroupProps) => {
	const theme = useTheme();

	const items = _.map(item.children, (menu) => {
		switch (menu.type) {
			case 'collapse':
				return <NavCollapse key={menu.id} menu={menu} level={1} />;
			case 'item':
				return <NavItem key={menu.id} item={menu} level={1} />;
			default:
				return (
					<Typography key={menu.id} variant="h6" color="error" align="center">
						Menu Items Error
					</Typography>
				);
		}
	});

	return (
		<Fragment>
			<List
				subheader={
					item.title && (
						<Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
							{item.title}
							{item.caption && (
								<Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
									{item.caption}
								</Typography>
							)}
						</Typography>
					)
				}
			>
				{items}
			</List>
			<Divider sx={{ mt: 0.25, mb: 1.25 }} />
		</Fragment>
	);
};

export default NavGroup;
