let auth
let activeUser
let users

const USERS = 'USERS'
const AUTH = 'AUTH'
const ACTIVE_USER = 'ACTIVE_USER'

const authCheck = () => {
	refreshAuth()
	refreshCurrentUser()
	refreshUsers()
	console.log(users, auth)
}
const refreshAuth = () => {
	auth = JSON.parse(localStorage.getItem(AUTH))
	return auth
}
const refreshUsers = () => {
	users = JSON.parse(localStorage.getItem(USERS))
	return users
}
const refreshCurrentUser = () => {
	activeUser = JSON.parse(localStorage.getItem(ACTIVE_USER))
	return activeUser
}

let registerUser = (username, password, profile) => {
	if (refreshAuth() && auth[username]) {
		alert(`User ${username} already exists`)
		return
	}

	if (refreshAuth()) {
		auth[username] = { password: password }
	} else {
		auth = {}
		auth[username] = { password: password }
	}
	localStorage.setItem(AUTH, JSON.stringify(auth))

	if (refreshUsers()) {
		users[username]['profile'] = profile
	} else {
		users = {}
		users[username] = { profile: profile }
	}
	localStorage.setItem(USERS, JSON.stringify(users))

	activeUser = {
		loggedIn: true,
		username: username
	}
	localStorage.setItem(ACTIVE_USER, JSON.stringify(activeUser))
	return true
}

const loginUser = (username, password) => {
	if (refreshUsers()) {
		if (refreshAuth() && auth[username]) {
			if (auth[username]['password'] === password) {
				activeUser = {
					loggedIn: true,
					username: username
				}
				localStorage.setItem(ACTIVE_USER, JSON.stringify(activeUser))
				return true
			} else alert('email or password dont match')
		} else alert('No user found Please SignUp!')
	} else alert('No user found Please SignUp!')
}

let logoutUser = () => {
	if (refreshCurrentUser()) {
		localStorage.removeItem(ACTIVE_USER)
	}
}

const isLoggedIn = () => {
	if (refreshCurrentUser()) {
		location.replace('../index.html')
	}
}
