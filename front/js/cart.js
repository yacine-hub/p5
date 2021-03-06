
window.onload = function(){
    getCart();
}
/* si le panier est vide = panier vide 
sinon afficher le ou les produits selectionner(nom du produit, image du produit, couleur du produit, quantité)
je fait la boucle, je creer les éléments
*/

function getCart(){
    let produitStorage = JSON.parse(localStorage.getItem("produits"));
    console.log(produitStorage);
    let totPrice = 0;
    let totQty = 0;
    if (produitStorage === null){
        alert("votre panier est vide")
    } else {
        for (let i in produitStorage){ // insert les éléments du fichier cart.html 
            fetch ("http://localhost:3000/api/products/"+ produitStorage[i]._id)
            .then(response => response.json())
            .then(data => {
                console.log(produitStorage[i]);
                displayProduct(data, produitStorage[i].qty, produitStorage[i].color);
                console.log(produitStorage[i].qty)
                console.log(data.price)
                
                totQty += parseInt(produitStorage[i].qty);
                let qp = document.getElementById('totalQuantity');
                qp.textContent = totQty;

                totPrice += parseInt(data.price) * parseInt(produitStorage[i].qty);// accummuler les prix de chaque par la quantité
                console.log(totPrice);
                
                let tp = document.getElementById('totalPrice');
                tp.textContent = totPrice; 
            }) 
        }
        addEvent();     
    }
    
}
/* j'attache un evenement click*/
function addEvent(){
    document.getElementById("order").addEventListener('click', getForm );
}
function displayProduct(prod, qty, color){
    
    console.log(prod);
    console.log(color);
    let totalPriceByProduct = prod.price * qty;
    console.log( totalPriceByProduct)
    
    let prodArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(prodArticle);
    prodArticle.className = "cart__item";
    prodArticle.setAttribute('data-id',prod._id);

    // Insertion de l'élément "div"
    let prodDiv = document.createElement("div");
    prodArticle.appendChild(prodDiv);
    prodDiv.className = "cart__item__img";

    // Insertion de l'image
    let prodImg = document.createElement("img");
    prodDiv.appendChild(prodImg);
    prodImg.src = prod.imageUrl;
    prodImg.alt = prod.altTxt;
    
    // Insertion de l'élément "div"
    let prodItemContent = document.createElement("div");
    prodArticle.appendChild(prodItemContent);
    prodItemContent.className = "cart__item__content";

    // Insertion de l'élément "div"
    let prodItemContentTitlePrice = document.createElement("div");
    prodItemContent.appendChild(prodItemContentTitlePrice);
    prodItemContentTitlePrice.className = "cart__item__content__titlePrice";
    
    // Insertion du titre 
    let prodTitle = document.createElement("h2");
    prodItemContentTitlePrice.appendChild(prodTitle);
    prodTitle.textContent = prod.name;

    // Insertion de la couleur
    let prodColor = document.createElement("p");
    prodTitle.appendChild(prodColor);
    prodColor.textContent = color;
    prodColor.style.fontSize = "15px";
    
    let prodPrice = document.createElement("p");
    prodItemContentTitlePrice.appendChild(prodPrice);
    prodPrice.textContent = (prod.price * qty)  + "€";

    let prodItemSetting = document.createElement("div");
    prodItemContent.appendChild(prodItemSetting);
    prodItemSetting.className = "cart__item__content__settings";

    let prodItemQty= document.createElement("div");
    prodItemSetting.appendChild(prodItemQty);
    prodItemQty.className = "cart__item__content__settings__quantity";

    let prodQuantity = document.createElement("p");
    prodItemQty.appendChild(prodQuantity);
    prodQuantity.textContent = "Quantité : ";

    let quantité = document.createElement("input");
    prodQuantity.appendChild(quantité);
    quantité.className ="itemQuantity";
    quantité.setAttribute("type", "number");
    quantité.setAttribute("name","itemQuantity");
    quantité.setAttribute("min","1");
    quantité.setAttribute("max","100");
    quantité.setAttribute("value",qty);
    quantité.myParamId = prod._id;
    quantité.myParamOpt = color;
    quantité.myParamPrice = prod.price;
    // attacher un evement a l'element quantité (adevenListener) change 
    quantité.addEventListener("change",(e)=>{
        getModifQuantity(e);
    })
    let deleteSettings = document.createElement("div");
    prodItemSetting.appendChild(deleteSettings);
    deleteSettings.className = "cart__item__content__settings__delete";

    let prodDelete = document.createElement("p");
    deleteSettings.appendChild(prodDelete);
    prodDelete.textContent = "supprimer";
    prodDelete.className = "deleteItem";
    
    prodDelete.addEventListener("click", (e) => {
        const elt = e.target;
        const ancestor = elt.closest("article");
        deleteProd(prod, color, ancestor, e);
    });
    //attacher un evenement qui appel la fonction  (adeventListener) 
    //lorsque je clique sur supprimer, closest remonte au parent
}

//partie modification 

function getModifQuantity(e){
    
    const newQuant = parseInt(e.target.value);
    console.log(newQuant);
    cart = JSON.parse(localStorage.getItem("produits"));
    let error = false;
    console.log(error);
    cart.forEach((elem) => {
        if(elem._id === e.target.myParamId && elem.color === e.target.myParamOpt){
            console.log(elem.qty);
            console.log(document.getElementById("totalPrice").textContent);
            console.log(parseInt(e.target.myParamPrice));
            document.getElementById('totalQuantity').textContent = newQuant;
            console.log(elem._id);
        }
    });
    console.log(e)
}

function updatedCart(prod, color, e){

    console.log(prod)  // identifiant du canapé à mettre à jour
    console.log(color)  // color du canapé à mettre à jour
    console.log(e.target.value) // nouvelle valeur de champ quantité  newQty
    
    // on récupére le localstorage.
    let produitStorage = JSON.parse(localStorage.getItem('produits'));
    // on fait une boucle sur le tableau du local storage
    let oldQty = 0;
    console.log(produitStorage);
    
    for (let i in produitStorage){
        if(produitStorage[i]._id == prod._id && produitStorage[i].color == color){
            produitStorage[i].qty
            produitStorage[i].qty = e.target.value;
            localStorage.setItem('produits',JSON.stringify(produitStorage));
                //document.getElementById("totalQuantity").textContent
                //document.getElementById('totalPrice').textContent
                //totalPrice = priceTotal - (oldQty *  prod.price) + (newQty * prod.price)

        }
    }
    const oldPrice = 1 * parseInt(prod.price);
    const newP = e.target.value * parseInt(prod.price);
    const tot = document.getElementById('totalPrice').textContent;
    console.log(tot)
    
    document.getElementById('totalPrice').textContent = parseInt(tot) - parseInt(oldPrice) + parseInt(newP);
}

function deleteProd(prod, color, ancestor,e){
    
    console.log(prod)
    console.log(color)
    console.log(ancestor)
    console.log(e)
    const toto = e.target.closest("article");
    //toto.remove();
   
    let produitStorage = JSON.parse(localStorage.getItem("produits"));
        
    for (i = 0; i < produitStorage; i++){
            
        if (produitStorage[i]._id == e.target &&  produitStorage[i].color == e.target){
                
            let ttPrice = document.getElementById("totalPrice").textContent;
            let ttQuantity = document.getElementById("totalQuantity").textContent;
            //le prix du produit qu'on veut supprimer x  la quantité supprimer. (myparamPrice )
            let quantity = document.getElementsByClassName("itemQuantity").value;
            let ttPriceAsupp = parseInt(quantity) * parseInt(e.target);
            let ttQuantiteAsupp = parseInt(price) * parseInt(e.target);
            ttPrice = document.getElementById("totalPrice").textContent = ttPriceAsupp;
            ttQuantity = document.getElementById("totalQuantity").textContent = ttQuantiteAsupp;
                //supprimer ce produit du localStorage et toto remove
            localStorage.clear();
        }   
    } 
    // IDEM QUE UPDATE MAIS AVEC UNE SUPPPRESSION
    //updateTotal(totalQty, totalPrice)
    toto.remove();    
}

function updateTotal(totalQty, totalPrice){
    document.getElementById("totalQuantity").innerText = totalQty;
    document.getElementById('totalPrice').innerText =  totalPrice;
}
/* calcul total des produits selectionner
    additionner et soustraire les produit ajouter ou supprimer*/
    



//id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice">
//localStorage.removeItem('produits');
  

//----------------Partie Formulaire-----------------

function getForm(e) {
    e.preventDefault();
    let contact = {};
    const selectForm = document.forms[0];

    const firstName = selectForm.elements.firstName.value;
    if (checkData('firstName',firstName)){
        return false;
    }
    contact.firstName = firstName;

    const lastName = selectForm.elements.lastName.value;
    if(checkData('lastName',lastName)){
        return false;
    }
     contact.lastName = lastName;
    
     const address = selectForm.elements.address.value; 
     if(checkData('address',address)){
        return false;
     }
      contact.address = address;

      const city = selectForm.elements.city .value;
      if(checkData('city ',city )){
        return false;
      }
       contact.city  = city ;

       const email = selectForm.elements.email.value;
       if (checkData('email',email)){
        return false;
       }
       contact.email = email;  
    let products = checkCart();
    if (products.length != 0){
        let data = {
            contact,
            products
        };
        console.log(data);
        //sendData(data);
        
    } else {
        alert("Votre panier est vide")
        return false;
    }
}
function sendData(data){
    const apiURL = "http://localhost:3000/api/products/order";

    const requestOptions = {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    fetch(apiURL, requestOptions)
        then(function(response) {
            if (response.ok){
                response.json().then(function(resp){
                    if (resp.orderId) {
                        localStorage.removeItem('produitStorage');
                        window.location = "confirmation.html?orderid=" + resp.orderId;

                    }
                });

            } else {
                alert(response);
            }
        })
        .catch(function(err){
        
        });
}
function checkCart(){
    let products = [];
    const article = document.getElementsByClassName("cart__item");
    for( let i = 0; i < article.length; i++ ) {
        console.log(i);
        products.push(article[i].getAttribute("data-id"));
    }
    return products;
}
function checkContent(e){
    if(checkData(e.target.id, e.target.value)){
        return false;
    }else{
        let msg =getElementById(e.target.id + "ErrorMsg");
        msg.textContent = '';
    }
}

function checkData(type,val) {
    let ret = false;
    switch(type){
        case 'firsName':
        case 'lastName':
        case 'city':
            ret = checkNoNumber(type, val);
            break;
        case 'adress':
            ret = checkAddress(type, val);
            break;
        case 'email':
            ret = checkEmail(type, val);
            break;
    }
    return ret;
}
function checkNoNumber(type,val){
    
    const checkNumber = /[0-9]/;
    if(checkNumber.test(val) === true || checkSpecialCharacter.test(val) === true || val === "") {
        let msg = getById(type + "ErrorMsg");
        msg.textContent = 'you must fill the field with only letters';
        return true;
    }
}    

function checkAddress(type, val){
    const checkSpecialCharacter = /[§!@#$%¨^&*(),.?":{}|<>|]/;
    if(checkSpecialCharacter.test(val) === true || val == "") {
        let msg = getById(type + "ErrorMsg");
        msg.textContent = 'you must fill the field with only letters and numbers';
        return true;
    }
    return false
    
}
//console.log(checkSpecialCharacter);
function checkEmail(type, val){
    const checkMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(checkMail.test(val) === false){
        let msg = getById(type + "ErrorMsg");
        msg.textContent = 'You must fill the field  with a valid email';
        return true;
    }
    return false;
}



   

    
