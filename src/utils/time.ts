import moment from 'moment';

const time = {
	ago: (value: moment.MomentInput) => {
		return moment(value).fromNow();
	},
	format: (value: moment.MomentInput) => {
		return moment(value).format('YYYY-MM-DD HH:mm:ss');
	},
	yearNow: () => {
		return moment().format('YYYY');
	}
};

export default time;
