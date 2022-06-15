commentaireScript



    


/* attendre que le DOM soit charger, appel la 1er fonction*/
window.onload = function(){
    console.log("DOMContentLoaded");
    getProducts();
    }
/*on contacte le back avec la methode fetch quand la promesse de la reponse est resolu on a parser qui nous permet
 d'avoir un objet JSON qui est data qui est en argument de la fontion displayProduct */

function getProducts(){
    fetch("http://localhost:3000/api/products")
        .then(response => response.json()
            .then(data =>{
                displayproduct(data);
            }) 
        )
}
/*function displayproduct(data){
    //console.log(data)
    for(let i in data){
        createProduct(data[i]);
    }

}*/
// Je fait une boucle sur le tableau
/* a chaque tours de boucle de mon data je recupere un produits complet et je l'envoie a  la fonction createProduct 
(ligne 38 ) avec argument product
ensuite */
function displayproduct(data){
    //console.log(data)
    for(let product of data){
        createProduct(product);
    }

}
/**
 * affiche les proprietés de la variable (product) dans les elements HTML.
 * @param {Object} product 
 */
function createProduct(product){
    
    //creation des elements correspondant au produit id dans localhost
    let productLink =  document.createElement("a");
    productLink.setAttribute("href","product.html?id="+ product._id);
    
    //creation des element img dans le fichier html 
    let productArticle = document.createElement("article");
    let productImg = document.createElement("img");
    
    //attribution des images url et des texte a chaque produit dans le tableau des produits
    productImg.setAttribute("src", product.imageUrl);
    productImg.setAttribute("alt",product.altTxt);
    productImg.setAttribute("class","img-fluid");
    let productName = document.createElement("h3");
    
    //attribution des noms des produits depuis le tableau
    productName.setAttribute("class","productName");
    productName.textContent = product.name;
    let productText = document.createElement("p");
    
    //description des produits depuis le tableau
    productText.setAttribute("class","productDescription")
    productText.textContent = product.description;
    
    // Utilisation de "append" afin d'ajouter les éléments attribuer dpuis le tableau
    productArticle.append(productImg, productName, productText);
    productLink.append(productArticle);
    document.getElementById("items").append(productLink)
  
}