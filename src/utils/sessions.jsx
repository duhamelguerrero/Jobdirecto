import * as crypto from "crypto";
import axios from "axios";

const algorithm = "aes-256-cbc";
const password = navigator.userAgent;

function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
}

function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, password);
    var dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
}
let firebase = window.firebase;
//window.firebase = undefined;

export function sessionInit() {
    return new Promise(d => {
        var firebaseConfig = {
            apiKey: "AIzaSyDuj70ofk1YwUKRcej0yCbkc0gYAcIUPtA",
            authDomain: "jobdirecto-4fac9.firebaseapp.com",
            databaseURL: "https://jobdirecto-4fac9.firebaseio.com",
            projectId: "jobdirecto-4fac9",
            storageBucket: "",
            messagingSenderId: "49743961497",
            appId: "1:49743961497:web:7ba9fb47724f7a2326c708",
            measurementId: "G-JV7QCNZDM9"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
        firebase.auth().onAuthStateChanged(user => {
            console.log(isLogged());
            if (isLogged()) {
                axios.defaults.headers.common["Authorization"] = btoa(
                    JSON.stringify({
                        id: isLogged().uid,
                        displayName: isLogged().displayName
                    })
                );
            }
            d();
        });
    });

    console.log(isLogged());

    axios.interceptors.request.use(
        function(config) {
            if (isLogged()) {
                config.headers["Authorization"] = isLogged().uid;
            }
            return config;
        },
        function(error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );
}

export function isLogged() {
    return firebase.auth().currentUser;
}

export function logOut() {
    firebase.auth().signOut();
}
export function loginWithEmail(email, password) {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.error(errorCode, errorMessage);
        });
}
export function loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            axios.defaults.headers.common["Authorization"] = user.uid;
            console.log(user);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.error(errorCode, errorMessage, email, credential);
        });
}

export function loginWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
        display: "popup"
    });
    return firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            axios.defaults.headers.common["Authorization"] = user.uid;
            console.log(
                "user and accesstoken",
                user,
                result.credential.accessToken
            );
            return;
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.error(
                "error in sign in fb",
                errorCode,
                errorMessage,
                email,
                credential
            );
        });
}
