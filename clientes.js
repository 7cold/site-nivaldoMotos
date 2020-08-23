var db = firebase.firestore();

function loadClientes(valor, orderBy, desc) {
    db.collection("users").orderBy(orderBy, desc).limit(valor).onSnapshot(function (snapshot) {
        document.getElementById("clientes").innerHTML = "";
        snapshot.forEach(function (clientes) {
            document.getElementById("clientes").innerHTML +=
                `
                <tr>
                <td>${clientes.id}</td>
                <td>${clientes.data().nome} ${clientes.data().sobrenome}</td>
                <td>${clientes.data().cpf}</td>
                <td>${clientes.data().celular}</td>
                <td><a class="btn btn-primary btn-sm" href="cons_cliente_final.php?id=${clientes.id}">Info.</a></td>
                </tr>
               
        `
        });
    });

}

function loadClientesDetail(id) {
    db.collection("users").doc(id)
        .get()
        .then(function (clientes) {
            document.getElementById("dadosCliente").innerHTML = "";
            if (clientes.exists) {
                var dateFormat = clientes.data().data_cadastro;
                var myDate = new Date(dateFormat.seconds * 1000);
                const options = { weekday: 'short', year: '2-digit', month: '2-digit', day: 'numeric', };
                var dataformatadaPT = myDate.toLocaleDateString('pt-BR', options);
                var horaformatadaPT = myDate.toLocaleTimeString('pt-BR');

                document.getElementById("dadosCliente").innerHTML +=
                    `
                <div class="card mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">${clientes.data().nome} ${clientes.data().sobrenome}</h5>
                                    Cliente ID: <b>${clientes.id}</b><br/>
                                    CPF: <b>${clientes.data().cpf}</b><br/>
                                    Email: <b>${clientes.data().email}</b><br/>
                                    Celular: <b>${clientes.data().celular}</b><br/>
                                    <div class="dropdown-divider"></div>
                                    Endereço: <b>${clientes.data().endereco} ,${clientes.data().end_numero}</b><br/>
                                    Bairro: <b>${clientes.data().bairro}</b><br/>
                                   Cidade: <b>${clientes.data().cidade}</b><br/>
                                   <div class="dropdown-divider"></div>
                                   Cadastro em: <b>${dataformatadaPT} | ${horaformatadaPT}</b><br/>
      
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

function loadOrders(clienteId) {
    db.collection("users").doc(clienteId).collection("orders").onSnapshot(function (snapshot) {
        document.getElementById("pedidos").innerHTML = "";
        snapshot.forEach(function (orders) {

            var dateFormat = orders.data().date;
            var myDate = new Date(dateFormat.seconds * 1000);

            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', };

            var dataformatadaPT = myDate.toLocaleDateString('pt-BR', options);
            var horaformatadaPT = myDate.toLocaleTimeString('pt-BR');

            document.getElementById("pedidos").innerHTML +=
                `
                <tr>
                    <td>${orders.id}</td>
                    <td>${dataformatadaPT} | ${horaformatadaPT}</td>
                    <td><a href="cons_order.php?orderId=${orders.id}"  class="btn btn-primary btn-sm">Editar</a></td>
                </tr>

        `
        });
    });
}

function loadOrderByCliente(orderId) {
    db.collection("orders").doc(orderId)
        .get()
        .then(function (order) {
            document.getElementById("dadosCliente").innerHTML = "";
            if (order.exists) {
                var dateFormat = order.data().date;
                var myDate = new Date(dateFormat.seconds * 1000);

                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', };

                var dataformatadaPT = myDate.toLocaleDateString('pt-BR', options);
                var horaformatadaPT = myDate.toLocaleTimeString('pt-BR');

                var tipo_entrega;
                order.data().shipping == "retirar_loja" ? tipo_entrega = "Retirar na Loja 🏢" : tipo_entrega = "Entrega via Motoboy 🚚";

                var products = order.data().products;
                var status = order.data().status;

                products.forEach(valorAtual => {
                    document.getElementById("listaProdutos").innerHTML +=
                        `
                        <tr>
                            <td>${valorAtual.pid}</td>
                            <td>${valorAtual.product.title}</td>
                            <td>${valorAtual.product.brand}</td>
                            <td>${valorAtual.color}</td>
                            <td>${valorAtual.size}</td>
                            <td>${valorAtual.quantity}</td>
                            <td >${valorAtual.product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                        </tr>
                        `
                });

                document.getElementById("totalListaProdutos").innerHTML +=
                    `
                            
                                <th class="table-Active">TOTAL</th>
                                <th colspan="7" class="text-right table-Active">${order.data().totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</th>
                                
                           
                        `

                var requestURL = 'https://api.mercadopago.com/v1/payments/' + order.data().payInfo.id + '?access_token=APP_USR-4618697567453611-051814-a3a76e6bab50fbba6131c817383c1f61-38201203#json';
                var request = new XMLHttpRequest();
                request.open('GET', requestURL);
                request.responseType = 'json';
                request.send();
                request.onload = function () {
                    var resultadoApi = request.response;

                    document.getElementById("payType").innerHTML = resultadoApi.payment_type_id;
                    document.getElementById("payMethod").innerHTML = resultadoApi.payment_method_id;


                    //status
                    resultadoApi.status == "refunded" ?
                        document.getElementById("statusMP").innerHTML = `<span class="badge badge-danger">Devolvido</span>` :
                        resultadoApi.status == "rejected" ?
                            document.getElementById("statusMP").innerHTML = `<span class="badge badge-danger">Rejeitado</span>` :
                            resultadoApi.status == "cancelled" ?
                                document.getElementById("statusMP").innerHTML = `<span class="badge badge-danger">Cancelado</span>` :
                                resultadoApi.status == "pending" ?
                                    document.getElementById("statusMP").innerHTML = `<span class="badge badge-warning">Pendente</span>` :
                                    resultadoApi.status == "in_process" ?
                                        document.getElementById("statusMP").innerHTML = `<span class="badge badge-warning">Em Processo</span>` :
                                        resultadoApi.status == "authorized" ?
                                            document.getElementById("statusMP").innerHTML = `<span class="badge badge-info">Autorizado</span>` :
                                            resultadoApi.status == "approved" ?
                                                document.getElementById("statusMP").innerHTML = `<span class="badge badge-success">Aprovado</span>` :
                                                resultadoApi.status == "partially_refunded" ?
                                                    document.getElementById("statusMP").innerHTML = `<span class="badge badge-danger">Parcialmente Devolvido</span>` :
                                                    resultadoApi.status == "charged_back" ?
                                                        document.getElementById("statusMP").innerHTML = `<span class="badge badge-danger">Devolvido ao Cartao</span>` :
                                                        resultadoApi.status == "vacated" ?
                                                            document.getElementById("statusMP").innerHTML = `<span class="badge badge-danger">ERRO INTERNO</span>` :
                                                            resultadoApi.message == "Payment not found" ?
                                                                document.getElementById("statusMP").innerHTML = `<span class="badge badge-light">Não Pago</span>` :
                                                                resultadoApi.message == "Not Found" ?
                                                                    document.getElementById("statusMP").innerHTML = `<span class="badge badge-light">Não Encontrado</span>` : ""

                }


                document.getElementById("dadosCliente").innerHTML +=
                    `
                <div class="card mb-3">
                            <div class="card-body">
                            <h5>${order.data().clienteNome}</h5>
                            Venda ID: <b>${order.id}</b><br/>
                            Data: <b>${dataformatadaPT} | ${horaformatadaPT}</b><br/>
                            Tipo de entrega: <b>${tipo_entrega}</b>

                            <table class="table table-bordered mt-3 text-center table-sm">
                                <thead>
                                    <tr>
                                    <th scope="col">Entrega</th>
                                    <th scope="col">Produtos</th>
                                    <th scope="col">Desconto</th>
                                    <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>${order.data().shipPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</th>
                                    <td>${order.data().productsPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                    <td>${order.data().discount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                    <th>${order.data().totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</th>
                                    </tr>
                                </tbody>
                                </table>

                                <div class="row mt-3">
                                    <div class="col-md-6 mt-3">
                                    <div class="card">
                                    <div class="card-body">
                                        <h5>Status da Entrega<h5><p/></h5>

                                        <div class="mt-3 alert alert-${status == 1 ? "warning" : status == 2 ? "primary" : status == 0 ? "danger" : "success"}" role="alert">
                                ${status == 1 ? "Preparando os produtos" : status == 2 ? "Transporte" : status == 0 ? "Cancelado" : "Entregue"}
                                </div>
                                <div class="dropdown-divider"></div>
                                <label for="" class="col-form-label">Alterar Status de Envio:</label>
                                <select class="form-control" id="status" onchange="updateStatus(value, '${order.id}')">
                                    <option selectd>Selecione...</option>
                                    <option value="0">Cancelado</option>
                                    <option value="1">Preparando</option>
                                    <option value="2">Transporte</option>
                                    <option value="3">Entregue</option>
                                </select>
                                    </div>
                                    </div>
                                    </div>

                                
                                    <div class="col-md-6 mt-3">
                                    <div class="card">
                                    <div class="card-body">
                                    <h5>Status do Pagamento</h5>
                                    
                                    <label for="" class="col-form-label">Ação do Usuario: ${order.data().payInfo.result == 'done' ? "<span class='badge badge-pill badge-success'>Operação concluída</span>" : order.data().payInfo.result == 'canceled' ? "<span class='badge badge-pill badge-danger'>Operação cancelada pelo Usuario</span>" : order.data().payInfo.result == '' ? "<span class='badge badge-pill badge-light'>Operação não executada</span>" : ""}</label ><br/>
                                   
                                    <label for="" class="col-form-label">Id Pagamento: ${order.data().payInfo.id}</label > 
                                    
                                    <a href="https://api.mercadopago.com/v1/payments/${order.data().payInfo.id}?access_token=APP_USR-4618697567453611-051814-a3a76e6bab50fbba6131c817383c1f61-38201203" class="badge badge-light">Link MercadoPago</a>
                                    <br/>
                                    <label for="" class="col-form-label">Status MP: <span id="statusMP"></span></label> 
                                    <br/>
                                    <label for="" class="col-form-label">Info: <span id="payType"></span> | <span id="payMethod"></span></label > 
                                    <p/>
                                   
                                    </div>
                                  </div>
                                    </div>
                                </div>


                               
                            </div >
                        </div >
                </div >
                    `
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
}

function updateStatus(status, id) {

    var statusUpdate = {
        status: parseInt(status),
    }

    let db_update = db.collection("orders").doc(id);
    db_update.update(statusUpdate).then(() => {
        location.reload();
    });

}

function updateStatusPay(status, id, idPay, installments, issuer_id, payment_method_id, payment_type_id, result) {

    var statusUpdate = {
        "payInfo": {
            "status": status,
            "id": idPay,
            "installments": installments,
            "inssuer_id": issuer_id,
            "payment_method_id": payment_method_id,
            "payment_type_id": payment_type_id,
            "result": result
        }
    }

    let db_update = db.collection("orders").doc(id);
    db_update.update(statusUpdate).then(() => {
        location.reload();
    });

}