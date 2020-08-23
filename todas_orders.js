var db = firebase.firestore();


function loadAllOrders(limit) {
    db.collection("orders")
        .orderBy("date", "desc").limit(limit).onSnapshot(function (snapshot) {

            document.getElementById("table").innerHTML = "";
            snapshot.forEach(function (orders) {

                var dateFormat = orders.data().date;
                var myDate = new Date(dateFormat.seconds * 1000);
                const options = { weekday: 'short', year: '2-digit', month: '2-digit', day: 'numeric', };
                var dataformatadaPT = myDate.toLocaleDateString('pt-BR', options);
                var horaformatadaPT = myDate.toLocaleTimeString('pt-BR');

                document.getElementById("table").innerHTML +=
                    `<tr>
                    <td >${orders.data().shipping == "retirar_loja" ? "🏢" : orders.data().shipping == "entrega_motoboy" ? "🚚" : ""}</td>
                    <td>${dataformatadaPT} | ${horaformatadaPT}</td>
                    <td>${orders.data().clienteNome}</td>    
                    <td>${orders.data().payInfo.result == "canceled" ? "<span class='badge badge-light'>Aguardando Pagamento</span>" : orders.data().payInfo.id == "00000" ? "<span class='badge badge-light'>Aguardando Pagamento</span>" : "<span class='badge badge-success'>Realizado</span>"}</label > </td>
                    <td>${orders.data().status == 0 ? "<span class='badge badge-danger'>Cancelado</span>" : orders.data().status == 1 ? "<span class='badge badge-warning'>Preparando</span>" : orders.data().status == 2 ? "<span class='badge badge-info'>Transporte</span>" : orders.data().status == 3 ? "<span class='badge badge-success'>Entregue</span>" : ""}</label > </td>
                    <td><span class="badge badge-light" data-toggle="collapse" data-target="#${orders.id}" aria-expanded="true" aria-controls="collapseOne"><a class='text-dark' href="cons_order.php?orderId=${orders.id}">Info</a></span></td>
                   </tr>                
                `

            });

        });

}

