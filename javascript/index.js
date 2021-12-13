let localdata
const prodEl = document.getElementById('products')
const authBtn = document.getElementById('authbtn')
const logoutBtn = document.getElementById('logoutbtn')

const initPage = () => {
	this.localdata = localStorage.getItem('TODO')
	if (refreshCurrentUser()) {
		authBtn.style.display = 'none'
	} else {
		logoutBtn.style.display = 'none'
	}
}

initPage()

let getData = () => {
	let object = getAllProducts()
	prodEl.innerHTML = ''
	loadItems(object)
}

const loadItems = (list) => {
	for (const i of Object.values(list)) {
		insertItem(i)
	}
	// list.foreach((i) => {
	// 	insertItem(i)
	// })
}
const insertItem = (i) => {
	let fav = getFav()
	let cart = getCart()
	let item = ` <div class="item">
	<figure> <img src="${i.image}"> </figure>
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
		<i onclick="addToFav(${i.id})" class="button fa fa-heart ${fav.includes(i.id) ? 'selected' : ''}"></i>
		<i onclick="addToCart(${i.id})" class="button fa fa-${cart[i.id] ? 'check selected' : 'plus'}"></i>
	</div>
	</div>`
	prodEl.insertAdjacentHTML('beforeend', item)
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

authCheck()
getData()
