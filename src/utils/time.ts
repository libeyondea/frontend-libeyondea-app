import moment from 'moment';

const time = {
	ago: (value: moment.MomentInput): string => {
		return moment(value).fromNow();
	},
	format: (value: moment.MomentInput): string => {
		return moment(value).format('YYYY-MM-DD HH:mm:ss');
	},
	yearNow: (): string => {
		return moment().format('YYYY');
	}
};

export default time;
