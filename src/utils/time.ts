import moment from 'moment';

const time = {
	ago: (value: moment.MomentInput) => {
		return moment(value).fromNow();
	},
	format: (value: moment.MomentInput) => {
		return moment(value).format('YYYY-MM-DD HH:mm:ss');
	}
};

export default time;
