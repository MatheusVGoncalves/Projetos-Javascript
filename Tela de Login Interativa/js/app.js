
var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");

btnSignin.addEventListener("click", function() {
	body.className = "sing-in-js";
})

btnSignup.addEventListener("click", function() {
	body.className = "sing-up-js";
})