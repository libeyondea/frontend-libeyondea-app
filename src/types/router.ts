import type { RouteObject } from 'react-router-dom';

export type RouteObjectWithRole = {
	roles?: string[];
	children?: any; //Fix temporary
} & RouteObject;
