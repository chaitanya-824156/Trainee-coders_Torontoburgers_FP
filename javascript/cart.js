let localdata
const prodEl = document.getElementById('products')
const cartDetails = document.getElementById('cartdetails')
const authBtn = document.getElementById('authbtn')
const logoutBtn = document.getElementById('logoutbtn')

const initPage = () => {
	if (refreshCurrentUser()) {
		authBtn.style.display = 'none'
	} else {
		logoutBtn.style.display = 'none'
	}
}

authCheck()
initPage()
let size = 0
let total = 0
let getData = () => {
	let object = getCartProducts()
	prodEl.innerHTML = ''
	size = object.length
	total = 0
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
	total += i.price * cart.qty
	let item = ` <div class="item">
	<figure> <img src=".${i.image}"> </figure>
	<div class="prod_title title_color">
		${i.name}
	</div>
	<div class="prod_desc">
		${i.description}
	</div>
	<div class="prod_cal">
		cal : ${i.cal}
	</div>
	<div class="prod_desc">
		Category : ${i.category}
	</div>
	<div class="prod_cal">
	Price : ${i.price}
	</div>
   
    <div class="prod_action">
    <i onclick="decCart(${i.id})" class="button fa fa-minus"></i>
    <div class="prod_cal qty"> ${cart.qty}</div>
    <i onclick="incCart(${i.id})" class="button fa fa-plus"></i>
    </div>
    <div class="prod_action total_price">
	Total Price : ${i.price * cart.qty}
	</div>
	<div class="prod_action">
		<i onclick="addToFav(${i.id})" class="button fa fa-heart ${fav.includes(i.id) ? 'selected' : ''}"></i>
		<i onclick="addToCart(${i.id})" class="button fa fa-check selected"></i>
	</div>
	</div>`
	prodEl.insertAdjacentHTML('beforeend', item)
}

function insertDetails() {
	let item = `<p> No of Items: ${size}  </p>
    <p> Total Price: ${total}  </p>
    <br/>
    <button type="button" onclick="gotoPayment()" class="button">Make Payment</button>
`
	cartDetails.innerHTML = item
}

function gotoPayment(){
	if (size === 0) return
    location.href = "./payment.html"
}

function decCart(id) {
	let cart = getCartById(id)
	if (cart.qty > 1) {
		cart.qty = cart.qty - 1
		updateCartItem(cart)
		getData()
	}
}

function incCart(id) {
	let cart = getCartById(id)
	cart.qty = cart.qty + 1
	updateCartItem(cart)
	getData()
}

function addToFav(id) {
	if (!refreshCurrentUser()) {
		alert('please login first')
		return
	}
	addFavProduct(id)
	getData()
}

function addToCart(id) {
	if (!refreshCurrentUser()) {
		alert('please login first')
		return
	}
	let cart
	if (getCart()[id]) {
		cart = getCart()[id]
	} else {
		cart = {
			prodId: id,
			qty: 01
		}
	}
	addCartProduct(cart)
	getData()
}

getData()
