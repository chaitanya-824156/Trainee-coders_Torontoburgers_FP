const ordersEl = document.getElementById('orders')
const authButton = document.getElementById('authbtn')
const logoutButton = document.getElementById('logoutbtn')

const initializePage = () => {
	if (refreshCurrentUser()) {
		authButton.style.display = 'none'
	} else {
		logoutButton.style.display = 'none'
	}
}

authCheck()
initializePage()
let htmltext = ''
let fetchData = () => {
	ordersEl.innerHTML = ''
	let orders = getOrders()
	htmltext = ''
	for (const key in orders) {
		const e = orders[key]
		htmltext += `<div class="wrapper">
		<div class="order_details">
			<p class="cartno">OrderId: ${e.id} </p>
			<p class="cartno">Items: ${e.items} </p>
			<p class="cartno"> Total: ${e.total} </p>
		</div>
		<div class="order_prod">
		`
		loadProd(e.cart)
		htmltext += `</div></div>`
	}
	ordersEl.innerHTML = htmltext
}

const loadProd = (list) => {
	for (const i of Object.values(list)) {
		concatProd(i)
	}
}
const concatProd = (cart) => {
	let i = getProductById(cart.prodId)
	htmltext += `<div class="item">
	<div class="prod_title title_color">${i.name}
	</div>
	<div class="prod_desc">Price*Qty: ${i.price}x${cart.qty}
	</div>
	<div class="prod_cal cartno">Total: ${i.price * cart.qty}
	</div> </div>`
}

fetchData()
