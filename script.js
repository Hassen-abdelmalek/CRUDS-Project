var addBtn = document.getElementById("addProduct");
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var content = document.getElementById("content");
var updateBtn = document.getElementById("updateBtn");
var deletBtn = document.getElementById("deletBtn");
var search = document.getElementById("search");
var productNameAlert = document.getElementById("productNameAlert");
var productPriceAlert = document.getElementById("productPriceAlert");
var productCategoryAlert = document.getElementById("productCategoryAlert");
var productDescriptionAlert = document.getElementById("productDescriptionAlert");

var mainIndex;
var productArr = [];


if (JSON.parse(localStorage.getItem("productArr")) != null) {
	productArr = JSON.parse(localStorage.getItem("productArr"));
	desplay()
}

function addUpdateProduct(){
	validateProductData();

	if (isProductDataValid()) {
		var product = {
			name: productName.value,
			price: productPrice.value,
			category: productCategory.value,
			description: productDescription.value,
		}
	
		if (addBtn.innerHTML == `Add Product`) {
			addProduct(product);
		}else{
			updateProduct(product);
		}
	
		onDataChange();
		clearInputs();
		clearStyleValidation()
	}
}

function addProduct(product) {
	productArr.push(product);
}

function updateProduct(product){
	productArr.splice(mainIndex, 1, product);
	addBtn.innerHTML = `Add Product`;
}

function desplay(){
	var container =``;
	for (let i = 0; i < productArr.length; i++) {
		container += `
		<tr class="">
			<th class="py-3 px-2" scope="row">${i}</th>
			<td class="py-3 px-2">${productArr[i].name}</td>
			<td class="py-3 px-2">${productArr[i].price}</td>
			<td class="py-3 px-2">${productArr[i].category}</td>
			<td class="py-3 px-2">${productArr[i].description}</td>
			<td><button onclick="takeProductToUpdate(${i})" id="updateBtn" class="btn btn-outline-warning">Update</button></td>
			<td><Button onclick="deleteProduct(${i})" id="deletBtn" class="btn btn-outline-danger">Delete</Button></td>
		</tr>	`;
	}
	content.innerHTML = `${container}`;
}

function deleteProduct(i){
	productArr.splice(i, 1);
	localStorage.clear("productArr");
	onDataChange();
}

function searchProduct(){
	searchTerm = search.value;
	temp = ``;
	for (let i = 0; i < productArr.length; i++) {
		if ( productArr[i].name.toLowerCase().includes(searchTerm.toLowerCase()) || productArr[i].price.includes(searchTerm) || productArr[i].category.toLowerCase().includes(searchTerm.toLowerCase())) {
			temp += `
			<tr class="">
				<th class="py-3 px-2" scope="row">${i}</th>
				<td class="py-3 px-2">${productArr[i].name}</td>
				<td class="py-3 px-2">${productArr[i].price}</td>
				<td class="py-3 px-2">${productArr[i].category}</td>
				<td class="py-3 px-2">${productArr[i].description}</td>
				<td><button onclick="takeProductToUpdate(${i})" id="updateBtn" class="btn btn-outline-warning">Update</button></td>
				<td><Button onclick="deleteProduct(${i})" id="deletBtn" class="btn btn-outline-danger">Delete</Button></td>
		  </tr>`;
		}
	}
	content.innerHTML = temp ;
} 

function takeProductToUpdate(i){
	mainIndex = i;
	productName.value = productArr[i].name;
	productPrice.value = productArr[i].price;
	productCategory.value = productArr[i].category;
	productDescription.value = productArr[i].description;

	addBtn.innerHTML = `Update Product`	;
}

function onDataChange(){
	localStorage.setItem("productArr", JSON.stringify(productArr));
	desplay();
}

function clearInputs(){
	productName.value = "";
	productPrice.value = "";
	productCategory.value = "";
	productDescription.value = "";
}

function isProductDataValid() {
	return (/^[A-Z]{1}[a-zA-z0-9\s]{2,19}$/.test(productName.value) 
	&& /^[1-9][0-9]*$/.test(productPrice.value) 
	&& /^[A-Z]{1}[a-zA-z0-9\s]{2,19}$/.test(productCategory.value)
	&& /^[A-Za-z].{2,}$/.test(productDescription.value));
}

function validateProductData() {
	if(/^[A-Z]{1}[a-zA-z0-9\s]{2,19}$/.test(productName.value)){
		productNameAlert.classList.add("d-none");
		productName.classList.remove("is-invalid")
		productName.classList.add("is-valid")
	}else{
		productNameAlert.classList.remove("d-none");
		productName.classList.remove("is-valid")
		productName.classList.add("is-invalid")

		if (/^[A-Z]+/.test(productName.value)) {
			document.getElementById("nameUppercase").classList.add("d-none")
		}else{
			document.getElementById("nameUppercase").classList.remove("d-none")
		}

		if (productName.value.length >= 3) {
			document.getElementById("nameMoreThan").classList.add("d-none")
		}else{
			document.getElementById("nameMoreThan").classList.remove("d-none")
		}
		
		if (productName.value.length <= 20) {
			document.getElementById("nameLessThan").classList.add("d-none")
		}else{
			document.getElementById("nameLessThan").classList.remove("d-none")
		}
	}

	if(/^[1-9][0-9]*$/.test(productPrice.value)){
		productPriceAlert.classList.add("d-none");
		productPrice.classList.remove("is-invalid")
		productPrice.classList.add("is-valid")
	}else{
		productPriceAlert.classList.remove("d-none");
		productPrice.classList.remove("is-valid")
		productPrice.classList.add("is-invalid")
	}

	if(/^[A-Z]{1}[a-zA-z0-9\s]{2,19}$/.test(productCategory.value)){
		productCategoryAlert.classList.add("d-none");
		productCategory.classList.remove("is-invalid")
		productCategory.classList.add("is-valid")
	}else{
		productCategoryAlert.classList.remove("d-none");
		productCategory.classList.remove("is-valid")
		productCategory.classList.add("is-invalid")

		if (/^[A-Z]+/.test(productCategory.value)) {
			document.getElementById("categoryUppercase").classList.add("d-none")
		}else{
			document.getElementById("categoryUppercase").classList.remove("d-none")
		}

		if (productCategory.value.length >= 3) {
			document.getElementById("categoryMoreThan").classList.add("d-none")
		}else{
			document.getElementById("categoryMoreThan").classList.remove("d-none")
		}
		
		if (productCategory.value.length <= 20) {
			document.getElementById("categoryLessThan").classList.add("d-none")
		}else{
			document.getElementById("categoryLessThan").classList.remove("d-none")
		}
	}

	if(/^[A-Za-z].{2,}$/.test(productDescription.value)){
		productDescriptionAlert.classList.add("d-none");
		productDescription.classList.remove("is-invalid")
		productDescription.classList.add("is-valid")
	}else{
		productDescriptionAlert.classList.remove("d-none");
		productDescription.classList.remove("is-valid")
		productDescription.classList.add("is-invalid")
	}

}

function clearStyleValidation(){
	productName.classList.remove("is-valid")
	productPrice.classList.remove("is-valid")
	productCategory.classList.remove("is-valid")
	productDescription.classList.remove("is-valid")
}



