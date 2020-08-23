var db = firebase.firestore();

function cadCupom() {

    var cupom = document.getElementById("cupom").value;
    var percent = document.getElementById("percent").value;


    db.collection("coupons").doc(cupom).set({
        percent: parseFloat(percent),
    })
        .then(function () {

            alert("Cadastrado com sucesso");
            location.reload();
        })
        .catch(function (error) {
            console.error("error", error);

        })
}

function loadCupom() {
    db.collection("coupons").onSnapshot(function (snapshot) {
        document.getElementById("cupons").innerHTML = "";
        snapshot.forEach(function (cupom) {
            document.getElementById("cupons").innerHTML +=
                `


    <tr>
      <td>${cupom.data().percent}%</td>
      <td>${cupom.id}</td>
      <td><button type="submit" onclick="deleteCupom('${cupom.id}')" class="btn btn-danger btn-sm">Apagar</buttons></td>
    </tr>

              
        `
        });
    });
}

function update(id) {

    var cupomUpdate = {
        id: document.getElementById("id").value,
        percent: parseInt(document.getElementById("percent").value),
    }

    let db_update = db.collection("coupons").doc(id);
    db_update.update(cupomUpdate).then(() => {
        alert("Alterado com sucesso");
        window.history.back();
    });

}

function deleteCupom(id) {
    db.collection("coupons").doc(id).delete().then(() => {
        console.log('ok' + id);
    });

    document.getElementById("cardCupom").innerHTML = '';
    loadCupom();
}