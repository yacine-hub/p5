window.onload = function(){
    getCart();
}

let produitStorage = JSON.parse(localStorage.getItem("produits"));
console.log(produitStorage);


/* si le panier est vide = panier vide 
sinon afficher le ou les produits selectionner(nom du produit, image du produit, couleur du produit, quantité)
je fait la boucle, je creer les éléments
*/
function getCart(){
    if (produitStorage === null){
    alert("votre panier est vide")
    } else {
        for (produitStorage in localStorage){ // insert les éléments du fichier cart.html 
        
            let article = document.createElement("article");
        document.querySelector("#cart_item").appendChild(article);
        article.setAttribute(produitStorage.productID);

        let prodImg = document.createElement("img");
        document.querySelector("#cart_item_img").appendChild(prodImg);
        prodImg.setAttribute(produitStorage.imageUrl);

        let prodColor = document.createElement("couleur");
        prodColor.innerHTML = produitStorage.product-color;
       
        
        let prodQuantity = document.createElement("quantité");
        document.querySelector("#cart__item__content__settings__quantity").appendChild(prodQuantity);
        prodQuantity.innerHTML = "quantité: ";


    }
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
              