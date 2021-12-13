let localdata
const prodEl = document.getElementById('products')
const paymentDetails = document.getElementById('cartdetails')
const authBtn = document.getElementById('authbtn')
const logoutBtn = document.getElementById('logoutbtn')

const initPage = () => {
	if (refreshCurrentUser()) {
		authBtn.style.display = 'none'
	} else {
		logoutBtn.style.display = 'none'
	}
}
// isLoggedIn()
authCheck()
initPage()
let itemSize = 0
let totalPrice = 0
let getData = () => {
	let object = getCartProducts()
	prodEl.innerHTML = ''
	itemSize = object.length
	totalPrice = 0
	loadItems(object)
}

const loadItems = (list) => {
	for (const i of Object.values(list)) {
		insertItem(i)
	}
	insertDetails()
}
const insertItem = (i) => {
	let fav = getFav()
	let cart = getCartById(i.id)
	totalPrice += i.price * cart.qty
	let item = ` <div class="item">
	<div class="prod_title title_color">
		${i.name}
	</div>
	<div class="prod_desc">
		Price*Qty: ${i.price}x${cart.qty}
	</div>
	<div class="prod_cal cartno">
	Total: ${i.price * cart.qty}
	</div>
	</div>`
	prodEl.insertAdjacentHTML('beforeend', item)
}

function insertDetails() {
	let item = `<p class="cartno">Items: ${itemSize}  </p>
    <p class="cartno"> Total: ${totalPrice}  </p>
  `
	paymentDetails.innerHTML = item
}

function goBackHome() {
	location.href = '../index.html'
}

function placeOrders() {
	if (itemSize === 0) {
		goBackHome()
		return
	}
	const date = new Date()
	let id = date.getMilliseconds()
	let order = {
		id: id,
		total: totalPrice,
		items: itemSize,
		cart: getCart()
	}
	addOrders(order)
	goBackHome()
}

getData()
