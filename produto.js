
var db = firebase.firestore();

var list_sizes = [];
var list_sizes_badge = [];
var list_colors = [];
var list_colors_badge = [];
var list_images = [];
var list_sizes_update = [];
var list_sizes_update_badge = [];
var list_colors_update = [];
var list_colors_update_badge = [];


function storeData() {

    var title = document.getElementById("title").value;
    var price = document.getElementById("price").value;
    var category = document.getElementById("category").value;
    var brand = document.getElementById("brand").value;
    var description = document.getElementById("description").value;
    var promocao = document.getElementById("promocao").value;


    db.collection("products").doc(category).collection("items").doc().set({
        title: title.toUpperCase(),
        price: parseFloat(price),
        brand: brand.toUpperCase(),
        description: description,
        promocao: promocao == "false" ? Boolean(false) : Boolean(true),
        sizes: list_sizes,
        colors: list_colors,
        images: list_images,
    })
        .then(function () {

            alert("Cadastrado com sucesso");
            window.history.back();

        })
        .catch(function (error) {
            console.error("error", error);

        })
}

function add_sizes() {

    list_sizes.push(document.getElementById("item_size").value);//add a lista
    list_sizes_badge.push(
        document.getElementById("sizes_badge").innerHTML +=
        `
        <span class="badge badge-primary">`+ document.getElementById("item_size").value + `</span>
        `
    );//add a tela e a lista de badge

    document.getElementById("item_size").value = "";//limpa lista

}

function del_sizes() {


    list_sizes.pop();
    list_sizes_badge.pop();

    document.getElementById("sizes_badge").innerHTML = list_sizes_badge;

}

function add_colors() {
    list_colors.push(document.getElementById("item_color").value);//add a lista
    list_colors_badge.push(
        document.getElementById("colors_badge").innerHTML +=
        `
        <span class="badge badge-primary">`+ document.getElementById("item_color").value + `</span>
        `
    );//add a tela e a lista de badge

    document.getElementById("item_color").value = "";//limpa lista
}

function del_colors() {
    list_colors.pop();
    list_colors_badge.pop();
    document.getElementById("colors_badge").innerHTML = list_colors_badge;

}

function uploadImg() {
    var image = document.getElementById("imagePrincipal").files[0];
    var imageName = Date.now();
    var storageRef = firebase.storage().ref('produtos/' + imageName);
    var uploadTask = storageRef.put(image);

    uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + " done");
    }, function (error) {
        console.log(error.message);
    }, function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downlaodURL) {

            list_images.push(downlaodURL).value;
            // document.getElementById("item_images_text").innerHTML = list_images;
            // document.getElementById("img-thumb").src = downlaodURL.innerHTML = list_images;

            var img = document.createElement("IMG");
            img.setAttribute("src", downlaodURL);
            img.setAttribute("width", "80");
            img.setAttribute("height", "80");
            img.setAttribute("class", "m-3");
            document.getElementById("img_thumb").appendChild(img);

        });
    });
}

function del_img() {
    list_images.pop();
    var teste = document.getElementById("img_thumb");
    teste.removeChild(teste.lastChild);
}

function loadCategory() {
    db.collection("products").onSnapshot(function (snapshot) {
        document.getElementById("categorias").innerHTML = "";
        snapshot.forEach(function (category) {
            document.getElementById("categorias").innerHTML +=
                `
                <a href="">
                <tr onClick="location.href='cons_produto_final.php?category=${category.id}&title=${category.data().title}';">
                        <td class="text-center"><img src="${category.data().icon}" width="30" height="30"></img></td>
                        <td>${category.data().title}</td>
                </tr>
                </a>        

                `
        });
    });
}

function loadProducts(category) {
    db.collection("products").doc(category).collection("items").onSnapshot(function (snapshot) {
        document.getElementById("produtos").innerHTML = "";
        snapshot.forEach(function (productsValue) {

            var colors = productsValue.data().colors;
            var res = colors.join("</span><span class='badge badge-secondary ml-1 mt-1'>");

            var tamanhos = productsValue.data().sizes;
            var res2 = tamanhos.join("</span><span class='badge badge-dark ml-1 mt-1'>");

            document.getElementById("produtos").innerHTML +=
                `
                <tr>
                    <td><img src="${productsValue.data().images[0]}" width="30" height="30"></img></td>
                    <td>${productsValue.id}</td>
                    <td>${productsValue.data().title} - ${productsValue.data().brand}</td>
                    <td><span class="badge badge-secondary">${res}</span></td>
                    <td><span class="badge badge-dark">${res2}</span></td>
        <td>${productsValue.data().price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
        <td><button type="submit" class="btn btn-danger btn-sm" onclick="deleteProduct('${productsValue.id}', '${category}')">Apagar</button></td>
        <td> <a class="btn btn-primary btn-sm" href="update_produto.php?id=${productsValue.id}&title=${productsValue.data().title}&brand=${productsValue.data().brand}&price=${productsValue.data().price}&promocao=${productsValue.data().promocao}&sizes=${productsValue.data().sizes}&colors=${productsValue.data().colors}&category=${category}">Editar</a></td>
                </tr >
            `

        });
    });
}

function deleteProduct(id, category) {
    db.collection("products").doc(category).collection("items").doc(id).delete().then(() => {
        console.log('ok' + id);
    });
    document.getElementById("cardSection").innerHTML = '';
    loadProducts(category);
}

function update(id, category) {


    var sizesString = document.getElementById("item_size_hidden").value;
    var sizesNotMod = sizesString.split(',');

    var colorsString = document.getElementById("item_color_hidden").value;
    var colorsNotMod = colorsString.split(',');

    var promocao = document.getElementById("promocao").value;

    var productUpdate = {
        title: document.getElementById("title").value,
        brand: document.getElementById("brand").value,
        price: parseFloat(document.getElementById("price").value),
        sizes: list_sizes_update.length == 0 ? sizesNotMod : list_sizes_update,
        colors: list_colors_update.length == 0 ? colorsNotMod : list_colors_update,
        promocao: promocao == "false" ? Boolean(false) : Boolean(true),
    }

    let db_update = db.collection("products").doc(category).collection("items").doc(id);
    db_update.update(productUpdate).then(() => {
        alert("Alterado com sucesso");
        window.history.back();

    });

}

function update_add_sizes() {

    list_sizes_update.push(document.getElementById("item_size").value);//add a lista

    // document.getElementById("item_size_text").innerHTML = list_sizes_update;

    // document.getElementById("sizes_badge").innerHTML += `
    // <span class="badge badge-primary">`+ document.getElementById("item_size").value + `</span>
    // `;

    list_sizes_update_badge.push(
        document.getElementById("sizes_badge").innerHTML +=
        `
        <span class="badge badge-primary">`+ document.getElementById("item_size").value + `</span>
        `
    );//add a tela e a lista de badge

    document.getElementById("item_size").value = "";//limpa lista

}

function update_del_sizes() {

    list_sizes_update.pop();
    list_sizes_update_badge.pop();

    document.getElementById("sizes_badge").innerHTML = list_sizes_update_badge;
}

function update_add_colors() {

    list_colors_update.push(document.getElementById("item_color").value);//add a lista

    list_colors_update_badge.push(
        document.getElementById("colors_badge").innerHTML +=
        `
        <span class="badge badge-primary">`+ document.getElementById("item_color").value + `</span>
        `
    );//add a tela e a lista de badge

    document.getElementById("item_color").value = "";
}

function update_del_colors() {

    list_colors_update.pop();
    list_colors_update_badge.pop();
    document.getElementById("colors_badge").innerHTML = list_colors_update_badge;
}

function set_colors_null() {
    list_colors_update = [];
    document.getElementById("item_color_hidden").value = "";

    document.getElementById("item_color").value = "";
    list_sizes_update_badge.push(
        document.getElementById("colors_badge").innerHTML =
        `
        <span class="badge badge-warning">nenhuma</span>
        `
    );//ad
}

function set_sizes_null() {
    list_sizes_update = [];
    list_sizes_update_badge = [];
    document.getElementById("item_size_hidden").value = "";
    document.getElementById("item_size").value = "";

    list_sizes_update_badge.push(
        document.getElementById("sizes_badge").innerHTML =
        `
        <span class="badge badge-warning">nenhum</span>
        `
    );//add a tela e a lista de badge


}



