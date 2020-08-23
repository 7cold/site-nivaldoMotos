<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

    <link rel="stylesheet" type="text/css" href="js/jquery-ui.min.css">




</head>

<body onload="loadPromocaoDetail('<?php echo $_GET['id'] ?>')">

    <div class="container-fluid">
        <?php
        include 'nav_bar.php';
        ?>


        <div class="container">

            <h1 class="mt-3">Editar Banners</h1>

            <div class="mt-2" id="cardPromo">

            </div>

            <form>
                <div class="form-group row">
                    <label>Titulo</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="title" value="<?php echo $_GET['title']; ?>">
                    </div>
                </div>

                <div class="form-group row">
                    <label class="mr-3">Status</label>
                    <select class="form-control col-md-2" id="active">
                        <option value="false" <?php echo $_GET['active'] == "false" ? "selected" : null; ?>>Não</option>
                        <option value="true" <?php echo $_GET['active'] == "true" ? "selected" : null; ?>>Sim</option>
                    </select>

                </div>


                <div class="dropdown-divider"></div>
                <div class="col text-center">
                    <button type="button" class="btn btn-dark mb-5 mt-3" id="submit_btn" onclick="updatePromocao('<?php echo $_GET['id'] ?>')">Atualizar</button>
                </div>
            </form>


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
    <script type="text/javascript" src="promocao.js"></script>
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