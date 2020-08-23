<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="js/jquery-ui.min.css">

</head>

<body>

    <div class="container-fluid">
        <?php
        include 'nav_bar.php';
        ?>

        <div class="container">
            <h1 class="mt-3">Editar Produto</h1>
            <form>

                <div class="row mt-3 mb-3">
                    <div class="col-md-6">
                        <label>Produto</label>
                        <input type="text" class="form-control" id="title" value="<?php echo $_GET['title']; ?>">
                    </div>
                    <div class="col-md-6">
                        <label>Marca</label>
                        <input type="text" class="form-control" id="brand" value="<?php echo $_GET['brand']; ?>">
                    </div>
                </div>

                <div class="row mt-3 mb-3">
                    <div class="col-md-6">
                        <label>Preço</label>
                        <input type="text" class="form-control" id="price" onkeypress="$(this).mask('#,##0.00' , {reverse: true})" value="<?php echo $_GET['price']; ?>">
                    </div>
                </div>


                <div class="dropdown-divider"></div>


                <div class="row mt-3 mb-3">
                    <form class="form-sizes">
                        <div class="col-md-4">
                            <label>Tamanhos</label>

                            <div class="row">
                            </div>

                            <input type="text" class="form-control" id="item_size" />
                            <input type="text" class="form-control" id="item_size_hidden" value="<?php echo $_GET['sizes']; ?>" hidden />
                        </div>
                        <div class="col-md-4">
                            <label>Usando:</label><br />
                            <?php
                            $sizes = $_GET['sizes'];
                            $sizes_ar = explode(',', $sizes);
                            $res = implode("</span><span class='badge badge-dark mb-2 mr-2'>", $sizes_ar);
                            print "<span class='badge badge-dark mb-2 mr-2'>" . $res . "</span>";
                            ?>

                        </div>
                        <div class="col-md-4">
                            <label>Novos:</label><br />
                            <div id="sizes_badge"></div>

                        </div>
                    </form>
                </div>

                <button class="btn btn-primary btn-sm mr-2" onclick="update_add_sizes()">Adicionar</button>
                <button class="btn btn-danger btn-sm mr-2" onclick="update_del_sizes()">Deletar</button>
                <button class="btn btn-info btn-sm" onclick="set_sizes_null()">Nenhum Tamanho</button>



                <div class="dropdown-divider"></div>



                <div class="row mt-3 mb-3">
                    <div class="col-md-4">
                        <label>Cores</label>
                        <input type="text" class="form-control" id="item_color" />
                        <input type="text" class="form-control" id="item_color_hidden" value="<?php echo $_GET['colors']; ?>" hidden />
                    </div>
                    <div class="col-md-4">
                        <label>Usando:</label><br />
                        <?php
                        $colors = $_GET['colors'];
                        $colors_ar = explode(',', $colors);
                        $res = implode("</span><span class='badge badge-secondary mb-2 mr-2'>", $colors_ar);
                        print "<span class='badge badge-secondary mb-2 mr-2'>" . $res . "</span>";
                        ?>
                    </div>
                    <div class="col-md-4">
                        <label>Novas:</label><br />
                        <div id="colors_badge"></div>
                    </div>
                </div>

                <button class="btn btn-primary btn-sm mr-2" onclick="update_add_colors()">Adicionar</button>
                <button class="btn btn-danger btn-sm mr-2" onclick="update_del_colors()">Deletar</button>
                <button class="btn btn-info btn-sm" onclick="set_colors_null()">Nenhuma cor</button>

                <div class="dropdown-divider"></div>

                <div class="row mt-3 mb-3">
                    <div class="col-md-4">
                        <label>Em Promoção</label>
                        <select class="form-control" id="promocao">
                            <option value="false" <?php echo $_GET['promocao'] == "false" ? "selected" : null; ?>>Não</option>
                            <option value="true" <?php echo $_GET['promocao'] == "true" ? "selected" : null; ?>>Sim</option>
                        </select>
                    </div>
                </div>

                <div class="dropdown-divider"></div>

                <div class="col text-center">
                    <button type="button" class="btn btn-primary mb-5 mt-5" id="submit_btn" onclick="update('<?php echo $_GET['id'] ?>', '<?php echo $_GET['category'] ?>')">Atualizar</button>
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
    <script type="text/javascript" src="produto.js"></script>
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