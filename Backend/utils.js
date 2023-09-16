CONST_CHAR='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()//:;<>_'

module.exports.putNoise = (password) => {
	function getRandomInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function getRandomComplexString(length) {
		let result = '';
		const charactersLength = CONST_CHAR.length;

		for (let i = 0; i < length; i++) {
			result += CONST_CHAR.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result
	}
	const newString = `${password.substring(0, 7)}${getRandomComplexString(getRandomInteger(5, 5))}${password.substring(7)}`;
	return newString;
}

module.exports.removeNoise = (encryptedPassword) => {
    const cleaned = encryptedPassword.substring(0, 7) + encryptedPassword.substring(12, 49)
	return cleaned;
}