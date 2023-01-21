import { Typography } from '@mui/material';
import _ from 'lodash';
import { Fragment, memo } from 'react';

import NavGroup from './NavGroup';
import menuItem from 'src/menu-items';

const MenuList = () => {
	const navItems = _.map(menuItem.items, (item) => {
		switch (item.type) {
			case 'group':
				return <NavGroup key={item.id} item={item} />;
			default:
				return (
					<Typography key={item.id} variant="h6" color="error" align="center">
						Menu Items Error
					</Typography>
				);
		}
	});

	return <Fragment>{navItems}</Fragment>;
};

export default memo(MenuList);
