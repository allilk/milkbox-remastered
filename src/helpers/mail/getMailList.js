import { getMessage } from './getMessage';

export const getMailList = async () => {
	const response = await gapi.client.gmail.users.messages.list({
		userId: 'me'
	});

	let messages = [];

	for (let i = 0; i < 20; i++) {
		let msg = await getMessage(response.result.messages[i].id);
		messages.push(msg);
	}

	localStorage.setItem('mailList', JSON.stringify(messages));
	localStorage.setItem('dateCached', JSON.stringify(Date.now()));

	return messages;
};
