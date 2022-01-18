import { getMessage } from './getMessage';

export const grabMessage = async (id) => {
	const mailList = JSON.parse(localStorage.getItem('mailList'));

	const foundCache = await mailList.find((mail) => mail.id == id);

	return foundCache ? foundCache : await getMessage(id);
};
