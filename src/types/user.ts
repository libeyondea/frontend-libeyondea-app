import { Profile, UserProfile } from 'src/types/user-profile';

export interface FollowerCardProps {
	avatar: string;
	follow: number;
	location: string;
	name: string;
}

export interface FriendRequestCardProps extends Profile {
	mutual: number;
}

export interface FriendsCardProps {
	avatar: string;
	location: string;
	name: string;
}

export interface UserProfileCardProps extends UserProfile {
	profile: string;
}

export interface UserSimpleCardProps {
	avatar: string;
	name: string;
	status: string;
}
