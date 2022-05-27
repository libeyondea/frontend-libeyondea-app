import { Fragment } from 'react';
import { useRoutes } from 'react-router-dom';
import UserRouter from './router';

type Props = {};

const UserComponent: React.FC<Props> = () => {
	return <Fragment>{useRoutes(UserRouter)}</Fragment>;
};

export default UserComponent;
