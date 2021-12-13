const inusername = document.getElementById('username')
const inpassword = document.getElementById('password')


isLoggedIn()

function signInUser() {
	if (inusername.value.trim() !== '' && inusername.value.trim().length >= 8 && inpassword.value && inpassword.value.trim() !== '' && inpassword.value.trim().length >= 6) {
		if (loginUser(inusername.value.trim(), inpassword.value.trim())) {
			location.replace('../index.html')
		}
	}
}

function signUpUser() {
	const inname = document.getElementById('name')
	const inaddress = document.getElementById('address')
	if (
		inusername.value.trim() !== '' &&
		inusername.value.trim().length >= 8 &&
		inpassword.value &&
		inpassword.value.trim() !== '' &&
		inpassword.value.trim().length >= 6 &&
		inname.value.trim() !== '' &&
		inname.value.trim().length >= 8 &&
		inaddress.value.trim() !== '' &&
		inaddress.value.trim().length >= 10
	) {
		let profile = {
			name: inname.value.trim(),
			username: inusername.value.trim(),
			address: inaddress.value.trim()
		}
		if (registerUser(inusername.value.trim(), inpassword.value.trim(), profile)) {
			window.location.replace(index.html)
		}
	}
}
