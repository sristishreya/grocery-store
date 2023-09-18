function reduceQuantity(itemId, amount) {
    axios
        .get(`https://crudcrud.com/api/cb10fef6021f432fab50fe83c3aa742a/addItems/${itemId}`)
        .then((res) => {
            const itemData = res.data;
            
            if (itemData.quantity >= amount) {
                let newQuantity = itemData.quantity;
                newQuantity -= amount;

                const updatedData = {
                    item: itemData.item,
                    description: itemData.description,
                    price: itemData.price,
                    
                    quantity : newQuantity
                };

                // Update the item's quantity in the database
                axios
                    .put(`https://crudcrud.com/api/cb10fef6021f432fab50fe83c3aa742a/addItems/${itemId}`, updatedData)
                    .then(() => {
                        // Reload the data to reflect the updated quantity
                        displayData();
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            } else {
                alert("Not enough quantity to reduce.");
            }
        })
        .catch((err) => {
            console.error(err);
        });
}




function addItems(){
    axios
    .post("https://crudcrud.com/api/cb10fef6021f432fab50fe83c3aa742a/addItems", {
        item: document.getElementById("item").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        quantity: document.getElementById("quantity").value
    })
    .then((res)=>{
        console.log(res);
        alert("Item Added Successfully");
        document.getElementById("item").value='';
        document.getElementById("description").value='';
        document.getElementById("price").value='';
        document.getElementById("quantity").value='';
    })
    .catch((err)=>{
        console.error(err);
    })
}

function displayData() {
    axios
        .get("https://crudcrud.com/api/cb10fef6021f432fab50fe83c3aa742a/addItems")
        .then((res) => {
            const addedData = document.querySelector(".submittedData");
            addedData.innerHTML = '';

            res.data.forEach((data) => {
                const newDataDiv = document.createElement('div');
                newDataDiv.innerHTML = `${data.item}  ${data.description}  ${data.price}  ${data.quantity}
                <button class="buyone" data-id="${data._id}">Buy One</button>
                <button class="buytwo" data-id="${data._id}">Buy Two</button>
                <button class="buythree" data-id="${data._id}">Buy Three</button>
                `;
                addedData.appendChild(newDataDiv);
            })
        })
        .catch((err) => {
            console.error(err);
        })
}

document.getElementById("my-form").addEventListener("submit",function (event) {
    event.preventDefault();
    addItems();
});

window.addEventListener("DOMContentLoaded", displayData);

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("buyone")) {
        const itemId = event.target.getAttribute("data-id");
        reduceQuantity(itemId, 1); // Reduce quantity by 1
    }
});

// Event listener for Buy Two button
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("buytwo")) {
        const itemId = event.target.getAttribute("data-id");
        reduceQuantity(itemId, 2); // Reduce quantity by 2
    }
});

// Event listener for Buy Three button
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("buythree")) {
        const itemId = event.target.getAttribute("data-id");
        reduceQuantity(itemId, 3); // Reduce quantity by 3
    }
});