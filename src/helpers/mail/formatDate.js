import moment from 'moment';

export const formatDate = (stamp) => {
	const today = moment();
	const date = moment(parseInt(stamp));

	const A_WEEK_OLD = today.clone().subtract(7, 'days').startOf('day');
	const YESTERDAY = today.clone().subtract(1, 'days').startOf('day');

	// if before this year
	if (date.isBefore(today.startOf('year'))) {
		return date.format('L');
	} else if (date.isSame(YESTERDAY, 'd')) {
		// If yesterday
		return 'Yesterday';
	} else if (!date.isAfter(A_WEEK_OLD) && date.isAfter(today.startOf('year'))) {
		// If more than a week old and this year
		return date.format('MMM Do');
	}
	// Return time if its today
	return date.format('LT');
};
