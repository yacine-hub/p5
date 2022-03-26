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
    let totalPrice;
    if (produitStorage === null){
        alert("votre panier est vide")
    } else {
        let totalPrice = 0;
        for (let i in produitStorage){ // insert les éléments du fichier cart.html 
            fetch ("http://localhost:3000/api/products/"+ produitStorage[i]._id)
            .then(response => response.json())
            .then(data => {
                console.log(produitStorage[i]);
                displayProduct(data, produitStorage[i].qty, produitStorage[i].color);
                console.log(produitStorage[i].qty)
                console.log(data.price)
                // 
                totalPrice += data.price * produitStorage[i].qty;;// accummuler les prix de chaque par la quantité
                console.log(totalPrice);
                
            }) 
        }
        
    }
    
}


function displayProduct(prod, product, qty, color){
    
    console.log(product);
    console.log(color);
    let totalPriceByProduct = product.price * qty;
    console.log( totalPriceByProduct)
    

    /*let prodArticle = document.createElement("article");
    //document.querySelector("#cart_items").appendChild(prodArticle);
    prodArticle.className = "cart_item";
    prodArticle.setAttribute('data-id',prod._id);
    prodArticle.setAttribute('data-color',prod._id);
    
    
    let prodImg = document.createElement("img");
    prodArticle.appendChild(prodImg);
    prodImg.className = "cart_item_img";
    prodImg.src = prod.imageUrl;
    prodImg.alt = prod.altTxt;*/

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
    prodTitle.innerHTML = prod.name;

    // Insertion de la couleur
    let prodColor = document.createElement("p");
    prodTitle.appendChild(prodColor);
    prodColor.innerHTML = prod.colors;
    prodColor.style.fontSize = "15px";
    
    let prodPrice = document.createElement("p");
    prodItemContentTitlePrice.appendChild(prodPrice);
    prodPrice.innerHTML = prod.price + "€";

    let prodItemSetting = document.createElement("div");
    prodItemContent.appendChild(prodItemSetting);
    prodItemSetting.className = "cart__item__content__settings";

    let prodItemQty= document.createElement("div");
    prodItemSetting.appendChild(prodItemQty);
    prodItemQty.className = "cart__item__content__settings__quantity";

    let prodQuantity = document.createElement("p");
    prodItemQty.appendChild(prodQuantity);
    prodQuantity.innerHTML = "Quantité : " ;

    let quantité = document.createElement("input");
    prodQuantity.appendChild(quantité);
    quantité.className ="itemQuantity";
    quantité.setAttribute("type", "number");
    quantité.setAttribute("name","itemQuantity");
    quantité.setAttribute("min","1");
    quantité.setAttribute("max","100");
    
    
    let deleteSettings = document.createElement("div");
    prodItemSetting.appendChild(deleteSettings);
    deleteSettings.className = "cart__item__content__settings__delete";

    console.log(deleteSettings);

    let prodDelete = document.createElement("p");
    deleteSettings.appendChild(prodDelete);
    prodDelete.innerHTML = "supprimer";
    prodDelete.className = "deleteItem";
    
    
}
getTotal();
/* calcul total des produits selectionner
    additionner et soustraire les produit ajouter ou supprimer*/
    
function getTotal(){
    
    // Partie quantité: recuperer les quantité
    
    let qtyProd = document.getElementsByClassName('itemQuantity');
    
    numberTotal = 0;

    for (let i = 0; i <qtyProd.length ; ++i){
      numberTotal += qtyProd[i].valueAsNumber;
       
    }
    console.log(numberTotal);
    
    let totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.textContent = numberTotal;
    console.log(numberTotal);


    prixTotal = 0;

    for (let a = 0; a < qtyProd; a++){
    prixTotal += (qtyProd[a].valueAsNumber * produitStorage[a].price);
   

    }

    let prodPrixTotal = document.getElementById('totalPrice');
    prodPrixTotal.textContent = totalPrice;
    console.log(totalPrice);
    

    //getModifQuantity();
}
//partie modification 

/*function getModifQuantity(){
    
    let modifQuant = document.querySelectorAll('itemQuantity');

    for (let n = 0; n< modifQuant.length; n++){
        modifQuant[n].addEventListener(function (event) {
            event.preventDefault();
            
            produitStorage[n].qty = event.target.value;

            if(
                produitStorage[n].qty== 0 || produitStorage[n].qty > 100)
            {
                alert('sélectionner une quantité comprise entre 1 et 100');
                
            }else{
                localStorage.setItem('produits', JSON.stringify(produitStorage));
        
        }
    }
}*/
deleteProd();
function deleteProd(){
    let suppProd = document.querySelector('deleteItem');
    for(let y = 0; y < suppProd.length; y++){
        suppProd[y].addEventListener('click',(e) =>{
            e.preventDefault();
        })
    }

}
    /*<!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> -->
              */
