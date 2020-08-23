var db = firebase.firestore();


var imgCad = "";

function cadPromocao() {

    var title = document.getElementById("title").value;
    var active = document.getElementById("active").value;

    console.log(imgCad);

    db.collection("promocoes").doc().set({
        title: title,
        active: active == "false" ? Boolean(false) : Boolean(true),
        image: imgCad
    })
        .then(function () {
            alert("Cadastrado com sucesso");
            location.reload();
        })
        .catch(function (error) {
            console.error("error", error);

        })
}

function uploadImg() {
    var image = document.getElementById("imagePrincipal").files[0];
    var imageName = Date.now();
    var storageRef = firebase.storage().ref('banners/' + imageName);
    var uploadTask = storageRef.put(image);

    uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + " done");
    }, function (error) {
        console.log(error.message);
    }, function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downlaodURL) {



            imgCad = downlaodURL;

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

function loadPromocao() {
    db.collection("promocoes").onSnapshot(function (snapshot) {
        document.getElementById("banners").innerHTML = "";
        snapshot.forEach(function (promo) {
            document.getElementById("banners").innerHTML +=
                `
                <tr>
                    <td><img src="${promo.data().image}" width="80" height="45"></img></td>
                    <td>${promo.data().title}</td>
                    <td>${promo.data().active == true ? "<span class='badge badge-success'>Ativo</span>" : "<span class='badge badge-danger'>Inativo</span>"}</td>
                    <td><a href="update_promocao.php?id=${promo.id}&title=${promo.data().title}&active=${promo.data().active}"  class="btn btn-primary btn-sm">Editar</a></td>
                </tr> 
                
                `
        });
    });
}

function loadPromocaoDetail(id) {
    db.collection("promocoes").doc(id)
        .get()
        .then(function (promo) {
            document.getElementById("cardPromo").innerHTML = "";
            if (promo.exists) {
                document.getElementById("cardPromo").innerHTML +=
                    `
                <div class="card mb-3">
                <div class="col text-center">
                                <div class="card-body">
                                <img src="${promo.data().image}" width="160" height="80"></img>
                                </div>
                        </div>
                        </div>
                </div>

        `
            } else {

                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
}

function updatePromocao(id) {

    var promoUpdate = {
        title: document.getElementById("title").value,
        active: document.getElementById("active").value == "false" ? Boolean(false) : Boolean(true),
    }

    let db_update = db.collection("promocoes").doc(id);
    db_update.update(promoUpdate).then(() => {
        window.history.back();
    });

}

function deletePromocao(id) {
    db.collection("coupons").doc(id).delete().then(() => {
        console.log('ok' + id);
    });

    document.getElementById("cardCupom").innerHTML = '';
    loadCupom();
}