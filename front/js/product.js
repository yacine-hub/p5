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
/**
 * 
 * @param {*} data 
 * @param {*} productID 
 */
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
/**
 * 
 * @param {*} productID 
 */
function attachEvent(productID){
    document.getElementById("addToCart").addEventListener("click",() =>{
        add(productID);
    }); 
                                               
}



// console.log(checkColor("red"));
/**
 * 
 * @param {*} id 
 */
function add(id){
    
    const colorSelect = document.getElementById("colors");
    // const color = colorSelect.options[colorSelect.selectedIndex].value;
    let color = colorSelect.options[colorSelect.selectedIndex].value;
    // const color = colorSelect.value;
  
    const quant = document.getElementById("quantity").value;
   console.log(colorSelect);
   console.log(quant);
   

   if(checkColor(color) && checkQuantity(quant)){
        let prod = {
            _id: id,
            qty: quant,
            color: color,
        };  

        const basket = stockage(prod);
        if(basket){
            alert("produit ajouté")    
        } else {    
            alert("echec")
        }
   }
}

    
    // 3:recuperer l'id du produit a mettre dans un produit //cart(prod)
    //declare la variable "produitStorage"
        //******JSON.parse converti les données au format JSON en objet javascript dans le localstorage
    //const produitStorage = [];
/**
 * 
 * @param {*} prod 
 * @returns 
 */
function stockage(prod){
    console.log(prod);
    // si un produit est deja un produit enregistré
    //JSON.stringify CONVERTI UNE VALEUR JAVASCRIPT EN JSON
    let produitStorage;
    if(!localStorage.getItem('produits')){
        //si aucun produit n'est enregistré
        console.log("aucun produit");
        produitStorage  = [];      
        produitStorage.push(prod); 
        console.log("produit ajouté");
       // const value = checkBasket(prod)
          
        // recuperer le localstorage( le parse en tableau JSON.PARSE) faire une boucle ajouter une fonction externe  checkBasket(prod, json.parse) , pour chaque tour de boucle est ce que dans le local storage il y'a la meme couleur et le meme identifiant que le produit que j'ai envoyer 
    } else {
        produitStorage = JSON.parse(localStorage.getItem('produits')); 
        if(checkBasket(produitStorage, prod)){
            console.log('return true');
            produitStorage.push(prod);
        }
        console.log('return false');      
    }
    console.log('insert');      
    localStorage.setItem('produits', JSON.stringify(produitStorage));
    return true; 
}
/**
 * 
 * @param {*} panier 
 * @param {*} prod 
 * @returns 
 */
function checkBasket (panier, prod){
    let control = true;    
    panier.forEach(elem => {
        console.log(elem._id + '__boucle__' +prod._id);
        if(elem._id == prod._id && elem.color == prod.color){
            elem.qty = parseInt(elem.qty) + parseInt(prod.qty);            
            control = false;
        }
    }); 
    return control;
      
}
/**
 * 
 * @param {*} color 
 * @returns 
 */
function checkColor(color){
    if(!color){
        alert("veuillez selectionner une couleur")
        return false;
    }
    return true;
}
// 2:Verifie la valeur du champ  input (id quantity) cet valeur doit etre sup a 0 inferieur a 100 
/**
 * 
 * @param {*} qty 
 * @returns 
 */
function checkQuantity(qty){
    if(parseInt(qty) < 1 || parseInt(qty) > 100){
        alert("vous ne pouvez séléctionner que des quantité de  1 a 100")
        return false;
    }
    return qty;
}
  








