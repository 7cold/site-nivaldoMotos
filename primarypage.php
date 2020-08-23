<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

    <link rel="stylesheet" type="text/css" href="js/jquery-ui.min.css">

    <link rel="manifest" href="manifest.json">

</head>

<body>
    <div class="container-fluid">
        <div id="alert_initial"></div>


        <div class="container">
        </div>
        <?php
        include 'nav_bar.php';
        ?>
        <form method="POST" action="notificacao/subscribe.php" name="myform" id="myform" class="mt-5">
            <input type="hidden" id="token" name="rout_markers" />
            <input type="hidden" name="newToken" id="newToken" value="" />
            <input type="submit" id="send-btn" class="btn btn-primary" value="Ativar Notificações" onclick="submitform()" />
        </form>


    </div>
    </div>

    <script type="text/javascript">
        function submitform() {
            var hiddenData = document.getElementById('token').value;
            document.getElementById('newToken').value = hiddenData;
            document.myform.submit();
        }
    </script>

    <script src="http://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>




    <script src="https://www.gstatic.com/firebasejs/5.8.5/firebase.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.8.5/firebase-messaging.js"></script>



    <script type="text/javascript" src="js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui.min.js"></script>


    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>

    <script src="app.js"></script>
    <script src="notify_script.js"></script>


</body>

</html>