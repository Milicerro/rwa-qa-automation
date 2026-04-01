export const seededUser = {
	username: process.env.PW_USERNAME || 'Heath93',
	password: process.env.PW_PASSWORD || 's3cret',
};

export function createPaymentDetails() {
	const amount = Number(process.env.PW_PAYMENT_AMOUNT || 25);
	const note = `QA payment ${Date.now()}`;

	return { amount, note };
}
