import moment from 'moment';
import { getMailList } from './getMailList';

export const grabMailList = async (id) => {
	const mailList = JSON.parse(localStorage.getItem('mailList'));
	let dateCached = JSON.parse(localStorage.getItem('dateCached'));
	dateCached = moment(parseInt(dateCached));

	const daysSince = moment().diff(dateCached, 'minutes');

	return mailList != typeof null && daysSince <= 60 ? mailList : await getMailList(id);
};
