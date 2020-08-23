<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="js/jquery-ui.min.css">

    <script type="text/javascript">
        window.onload = initPage;

        var qtd = 10;
        var ordem = "data_cadastro"

        function initPage() {
            loadClientes(10, "data_cadastro", "desc");
        }

        function atualizarValorQtd(valor) {
            qtd = valor;
            loadClientes(parseInt(qtd), ordem, "desc");
        }

        function atualizarValorOrdem(valor) {

            ordem = valor;
            loadClientes(parseInt(qtd), ordem, valor == "nome" ? "asc" : "desc");
        }
    </script>


</head>

<body>

    <div class="container-fluid">

        <?php
        include 'nav_bar.php';
        ?>
        <div class="container">

            <h1 class="mt-3">Clientes</h1>
            <div class="row">

                <div class="form-group mt-3 col-md-2">
                    <label>Qtd. Clientes</label>
                    <select class="form-control" onchange="atualizarValorQtd(value)">

                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="9999">Todos</option>
                    </select>
                </div>

                <div class="form-group mt-3 col-md-2">
                    <label>Ordem</label>
                    <select class="form-control" onchange="atualizarValorOrdem(value)">
                        <option selected>Selecione...</option>
                        <option value="data_cadastro">Data de Cadastro</option>
                        <option value="nome">Nome</option>
                    </select>
                </div>
            </div>


            <table class="table table-sm table-hover mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Cel</th>
                    </tr>
                </thead>
                <tbody id="clientes">

                </tbody>
            </table>



        </div>
    </div>


    <!-- Conexao com firebase -->
    <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase.js"></script>

    <!-- Configuracao com firebase -->
    <script>
        var firebaseConfig = {
            apiKey: "AIzaSyAJDP7Q1A0URL1vmZsD11AlR8oOQpS1XC4",
            authDomain: "nivaldomotos-b6e53.firebaseapp.com",
            databaseURL: "https://nivaldomotos-b6e53.firebaseio.com",
            projectId: "nivaldomotos-b6e53",
            storageBucket: "nivaldomotos-b6e53.appspot.com",
            messagingSenderId: "230412053175",
            appId: "1:230412053175:web:7f9d31e8c0ed482bfd7b32",
        };
        firebase.initializeApp(firebaseConfig);
    </script>

    <!-- conexao com jquery e js -->
    <script type="text/javascript" src="clientes.js"></script>
    <script type="text/javascript" src="js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui.min.js"></script>

    <script src="https://www.gstatic.com/firebasejs/4.9.1/firebase.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.9.1/firebase-messaging.js"></script>
    <script src="notify_script.js"></script>


    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>

</body>

</html>