//Custom error validation

$(document).ready(function(){
	var nameField = document.getElementById("full-name");
	nameField.setCustomValidity("Please enter your first and last name");
});