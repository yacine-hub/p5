//charger le DOM
window.onload = function(){
    console.log("DOMContentLoaded");
    getProduct();
}

// 1 Declarer la fonction getproduct,
// 2 Utilisation du new URLSearchParams RECUPERE l'ID 
function getProduct(){
    const productID = new URLSearchParams (window.location.search).get("id");
    
    // 3 Utilisation du fetch pour recupere avec l'ID l'article    
    fetch ("http://localhost:3000/api/products/"+ productID)
        .then(response => response.json()
            .then(data => {
                displayProduct(data,productID);
            }) 
        )
        
        
}

function displayProduct(data,productID){
    console.log(data);
    console.log(productID);
    for(let i in data.colors){
        const optColors = document.createElement("option");
        optColors.setAttribute("value", data.colors[i]);
        optColors.textContent = data.colors[i];
        document.getElementById("colors").append(optColors);
    }
   const productimage = document.createElement("img");
    productimage.setAttribute("src",data.imageUrl);
    productimage.setAttribute("alt",data.altTxt);
    document.getElementById("price").textContent = data.price;
    document.getElementById("title").textContent = data.name;
    document.getElementById("description").textContent = data.description;
    document.querySelector(".item__img").appendChild(productimage);
    console.log(productimage);
    // attacher un evenement a un element html 
   attachEvent(productID); 
    
}

function attachEvent(productID){
    document.getElementById("addToCart").addEventListener("click",() =>{
        add(productID);
    }); 
                                               
}

function add(id){
    
    const colorSelect = document.getElementById("colors");
    const color = colorSelect.options[colorSelect.selectedIndex].value;
  
    const quant = document.getElementById("quantity").value;
   console.log(colorSelect)
   console.log(quant);
   

   if(checkColor(color) && checkQuantity(qty)){
    let prod = {
        _id: id,
        qty: quant,
        color: color,
    };  
        const basket = stockage(prod);
        if(basket){
            alert("eee")    
        } else { 
            alert("fff")
        }
    }
}
    
    // 3:recuperer l'id du produit a mettre dans un produit //cart(prod)
    //declare la variable "produitStorage"
        //******JSON.parse converti les données au format JSON en objet javascript dans le localstorage
function stockage(prod){
    
    // si un produit est deja un produit enregistré
    //JSON.stringify CONVERTI UNE VALEUR JAVASCRIPT EN JSON
    if(localStorage.getItem('produits')){
        produitStorage.push(prod); 
        localStorage.setItem('produits', JSON.stringify(produitStorage));
        console.log(produitStorage);
        // recuperer le localstorage( le parse en tableau JSON.PARSE) faire une boucle ajouter une fonction externe  checkBasket(prod, json.parse) , pour chaque tour de boucle est ce que dans le local storage il y'a la meme couleur et le meme identifiant que le produit que j'ai envoyer 
      checkBasket(prod)  
    } else {
        //si aucun produit n'est enregistré
        produitStorage = [];
        produitStorage.push(prod);
        localStorage.setItem('produits', JSON.stringify(produitStorage));
        console.log(produitStorage);
        return true;
    }
    
}

function checkBasket (prod){
    const panier = JSON.parse(localStorage.getItem('produits')); 
    
    //boucle
     /*if( produitStorage == null) {
        for(i = 0; i < produitStorage.length; i++)
        console.log("test");
        if (produitStorage [i].id == productID && produitStorage[i] == prod.value){
            return(
                produitStorage
            )
        }
    }*/
}
function checkColor(color){
    if(!color){
        alert("veuillez selectionner une couleur")
        return false;
    }
}
// 2:Verifie la valeur du champ  input (id quantity) cet valeur doit etre sup a 0 inferieur a 100 
function checkQuantity(quant){
    if(parseInt(quant) < 1 || parseInt(quant) > 100 ){
        alert("vous ne pouvez séléctionner que de 1 a 100")
       return false;

    }
    return quant;
}
  
// 4: import dans le localStorage

//let cart = JSON.parse(localStorage.getItem("prod"));
//console.log(prod);
 







