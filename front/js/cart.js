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
        
    }
    
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
    prodDelete.addEventListener("click",(e)=>{
        suppItem(e);
    })
    //attacher un evenement qui appel la fonction "suppItem" (adeventListener) 
    //lorsque je clique sur supprimer, closest remonte au parent
    
}

/* calcul total des produits selectionner
    additionner et soustraire les produit ajouter ou supprimer*/
    

//partie modification 

function getModifQuantity(e){
    
    /*const modifQuant = document.querySelectorAll('.itemQuantity');

    for (let n = 0; n < modifQuant.length; n++) {
        modifQuant[n].addEventListener('modif', function (event) {
            event.preventDefault();
            
            produitStorage[n].qty = event.target.value;

            if(
                produitStorage[n].qty == 0 || produitStorage[n].qty > 100)
            {
                alert('sélectionner une quantité comprise entre 1 et 100');
                
            }else{
                localStorage.setItem('produits', JSON.stringify(produitStorage));
        
            }
        });
    
    }*/
    
    console.log(e)
    //suppItem();
}

function suppItem(e) {
    //closest pour remonter jusqu'au parent( article,class..)
    //appeller la fonction qui modifie le prix total (getElementbyId)
    //appel la fonction qui modifie la quantité total
    
    const toto = e.target.closest("article");
    toto.remove();
    
    
    let modifQuant = document.getElementById("totalQuantity");
    console.log(modifQuant);
   
    moins.forEach((negative) => {
        negative.addEventListener("click", () => {
          console.log(negative);
    
          let totalProduit = prodDelete.length;
    
          for (i = 0; i < totalProduit; i++) {
            console.log(totalProduit);
            if (prodDelete[i].qty == 1 && totalProduit == 1) {
              return (
                localStorage.removeItem("produit")
        
            );
        
    }
    
    /*let modifQuant = document.getElementById('totalQuantity');
    
    for (let i = 0; i < modifQuant.length; i++){
        console.log(modifQuant[i])
        modifQuant[i].addEventListener("click" , () => {
            localStorage.removeItem(modifQuant[i]);


        })
        localStorage.setItem('produit', JSON.stringify(produitStorage));
    }*/

    //id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice">
    //localStorage.removeItem('produits');
  

    
    
    
}



   

    
