// Initialize the Firebase app by passing in the messagingSenderId
// var config = {
//     messagingSenderId: "230412053175"
// };
// firebase.initializeApp(config);
const messaging = firebase.messaging();

navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then(function (registration) {
        messaging.useServiceWorker(registration);

        // Request for permission
        messaging.requestPermission()
            .then(function () {
                console.log('Notification permission granted.');
                // TODO(developer): Retrieve an Instance ID token for use with FCM.
                messaging.getToken()
                    .then(function (currentToken) {
                        if (currentToken) {

                            console.log('Token: ' + currentToken);
                            document.getElementById('token').value = currentToken;
                            sendTokenToServer(currentToken);
                        } else {
                            console.log('No Instance ID token available. Request permission to generate one.');
                            setTokenSentToServer(false);
                        }
                    })
                    .catch(function (err) {
                        console.log('An error occurred while retrieving token. ', err);
                        setTokenSentToServer(false);
                    });
            })
            .catch(function (err) {
                console.log('Unable to get permission to notify.', err);
            });
    });

// Handle incoming messages
messaging.onMessage(function (payload) {

    var d = new Date(Date.now());
    var horaformatadaPT = d.toLocaleTimeString('pt-BR');


    document.getElementById("alert_initial").innerHTML += `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Ótima Notícia!</strong> Você tem novas compras pelo app 🎉 | ${horaformatadaPT}.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
    `;

    console.log("Notification received: ", payload);

});

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function () {
    messaging.getToken()
        .then(function (refreshedToken) {
            console.log('Token refreshed.');
            // Indicate that the new Instance ID token has not yet been sent 
            // to the app server.
            setTokenSentToServer(false);
            // Send Instance ID token to app server.
            sendTokenToServer(refreshedToken);
        })
        .catch(function (err) {
            console.log('Unable to retrieve refreshed token ', err);
        });
});

// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
        console.log('Sending token to server...');
        // TODO(developer): Send the current token to your server.
        setTokenSentToServer(true);
    } else {
        console.log('Token already sent to server so won\'t send it again ' +
            'unless it changes');
    }
}

function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') == 1;
}

function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? 1 : 0);
}