const updateUsers = (users) => localStorage.setItem(USERS, JSON.stringify(users))

function getAllProducts() {
	return app_data['products']
}

function getProductById(id) {
	return app_data['products'][`${id}`]
}

function getFav() {
	if (refreshCurrentUser()) {
		if (refreshUsers() && users[activeUser.username] && users[activeUser.username]['fav']) {
			return users[activeUser.username]['fav']
		}
	}
	return []
}

function getCart() {
	if (refreshCurrentUser()) {
		if (refreshUsers() && users[activeUser.username] && users[activeUser.username]['cart']) {
			return users[activeUser.username]['cart']
		}
	}
	return []
}

function getCartById(id) {
	if (refreshCurrentUser()) {
		if (refreshUsers() && users[activeUser.username] && users[activeUser.username]['cart']) {
			return users[activeUser.username]['cart'][id]
		}
	}
	return []
}

function getFavProducts() {
	let list = []
	if (refreshCurrentUser()) {
		if (refreshUsers() && users[activeUser.username] && users[activeUser.username]['fav'] && users[activeUser.username]['fav'].length > 0) {
			for (const id of users[activeUser.username]['fav']) {
				let item = getProductById(id)
				if (item) list.push(item)
			}
			return list
		}
	}
	return []
}

function addFavProduct(prodId) {
	let fav = new Set()
	if (refreshCurrentUser()) {
		if (refreshUsers() && users[activeUser.username] && users[activeUser.username]['fav'] && users[activeUser.username]['fav'].length > 0) {
			for (const key of users[activeUser.username]['fav']) fav.add(key)
		} // else users[activeUser.username] = { fav: [] }
		if (fav.has(prodId)) fav.delete(prodId)
		else fav.add(prodId)

		users[activeUser.username]['fav'] = Array.from(fav)
		updateUsers(users)
	}
	return getFavProducts()
}

function getCartProducts() {
	let list = []
	if (refreshCurrentUser()) {
		if (refreshUsers() && users[activeUser.username] && users[activeUser.username]['cart']) {
			for (const id in users[activeUser.username]['cart']) {
				let item = getProductById(users[activeUser.username]['cart'][id]['prodId'])
				if (item) list.push(item)
			}
			return list
		}
	}
	return []
}

function addCartProduct(cart) {
	if (refreshCurrentUser()) {
		if (refreshUsers() && users[activeUser.username]) {
			if (users[activeUser.username]['cart']) {
				if (Object.hasOwnProperty.call(users[activeUser.username]['cart'], cart.prodId)) delete users[activeUser.username]['cart'][cart.prodId]
				else users[activeUser.username]['cart'][cart.prodId] = cart
			} else {
				let id = cart.prodId
				users[activeUser.username]['cart'] = { [id]: cart }
			}
			updateUsers(users)
			return getCartProducts()
		}
	}
	return
}

function updateCartItem(cart) {
	if (refreshCurrentUser()) {
		if (refreshUsers() && users[activeUser.username] && users[activeUser.username]['cart']) {
			let id = cart.prodId
			users[activeUser.username]['cart'][id] = cart
			updateUsers(users)
		}
	}
}

function removeCart() {
	if (refreshCurrentUser()) {
		if (refreshUsers() && users[activeUser.username]) {
			users[activeUser.username]['cart'] = {}
			updateUsers(users)
			return getCartProducts()
		}
	}
}

function getOrders() {
	if (refreshCurrentUser()) {
		if (refreshUsers() && users[activeUser.username] && users[activeUser.username]['orders']) {
			return users[activeUser.username]['orders']
		}
	}
	return {}
}

function addOrders(order) {
	if (refreshCurrentUser()) {
		if (refreshUsers() && users[activeUser.username]) {
			let id = order.id
			if (users[activeUser.username]['orders']) {
				users[activeUser.username]['orders'][id] = order
			} else {
				users[activeUser.username]['orders'] = { [id]: order }
			}
			updateUsers(users)
            removeCart()
		}
	}
}
