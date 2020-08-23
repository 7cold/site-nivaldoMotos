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
            <h1 class="mt-3">Cadastrar Produto</h1>
            <form>

                <div class="row mt-3 mb-3">
                    <div class="col-md-6">
                        <label>Produto</label>
                        <input type="text" class="form-control" id="title">
                    </div>
                    <div class="col-md-6">
                        <label>Marca</label>
                        <input type="text" class="form-control" id="brand">
                    </div>
                </div>

                <div class="row mt-3 mb-3">
                    <div class="col-md-6">
                        <label>Preço</label>
                        <input type="text" class="form-control" id="price" onkeypress="$(this).mask('#,##0.00' , {reverse: true})">
                    </div>
                </div>

                <div class="row mt-3 mb-3">
                    <div class="col">
                        <label>Categoria</label>
                        <select class="form-control col-md-6" id="category">
                            <option selected>Escolha...</option>
                            <option value="acessorios">Acessórios</option>
                            <option value="bau">Bau</option>
                            <option value="capa_chuva">Capa de Chuva</option>
                            <option value="capacetes">Capacetes</option>
                            <option value="jaquetas">Jaquetas</option>
                            <option value="kits">Kits</option>
                            <option value="luvas">Luvas</option>
                            <option value="moletom">Moletons</option>
                            <option value="oleos">Óleos</option>
                            <option value="pneus">Pneus</option>
                            <option value="reparos">Reparos</option>
                        </select>
                    </div>
                </div>


                <div class="dropdown-divider"></div>


                <div class="row mt-3 mb-3">
                    <form class="form-sizes">
                        <div class="col-md-6">
                            <label>Tamanhos</label>
                            <input type="text" class="form-control" id="item_size" />
                        </div>

                        <div class="col-md-6">
                            <label>Novos:</label><br />
                            <div id="sizes_badge"></div>

                        </div>
                    </form>
                </div>

                <button class="btn btn-primary btn-sm mr-2" onclick="add_sizes()">Adicionar</button>
                <button class="btn btn-danger btn-sm mr-2" onclick="del_sizes()">Deletar</button>




                <div class="dropdown-divider"></div>



                <div class="row mt-3 mb-3">
                    <div class="col-md-6">
                        <label>Cores</label>
                        <input type="text" class="form-control" id="item_color" />

                    </div>
                    <div class="col-md-6">
                        <label>Novas:</label><br />
                        <div id="colors_badge"></div>
                    </div>
                </div>

                <button class="btn btn-primary btn-sm mr-2" onclick="add_colors()">Adicionar</button>
                <button class="btn btn-danger btn-sm mr-2" onclick="del_colors()">Deletar</button>


                <div class="dropdown-divider"></div>

                <div class="row mt-3 mb-3">
                    <div class="col-md-4">
                        <label>Em Promoção</label>
                        <select class="form-control" id="promocao">
                            <option value="false">Não</option>
                            <option value="true">Sim</option>
                        </select>
                    </div>
                </div>

                <div class="dropdown-divider"></div>

                <p>Fotos do Produto</p>

                <div id="img_thumb" class="bg-light mt-3 mb-3">
                </div>

                <button class="btn btn-danger btn-sm" onclick="del_img()">Deletar</button>

                <div class="form-group row pt-1 mt-5">


                    <div class="custom-file">
                        <form enctype="multipart/form-data">
                            <input type="file" class="custom-file-input" id="imagePrincipal" accept="image/*" onchange="uploadImg()">

                            <label class="custom-file-label" for="customFile">Escolher Imagem</label>
                        </form>
                    </div>
                </div>

                <div>



                </div>

                <div class="dropdown-divider"></div>

                <div class="col text-center">

                    <button type="button" class="btn btn-primary mb-5 mt-5" id="submit_btn" onclick="storeData()">Salvar</button>
                </div>
            </form>
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



        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>

</body>

</html>