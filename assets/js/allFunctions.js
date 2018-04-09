$('#login-page').submit(function(){
	var login = $('#login').val();
	var password = $('#password').val();
	if(login === "" || password === ""){
		alert('Preencha os campos!');
		return false;
	}else {
		if((login === "Admin" || login === "admin" || login === "ADMIN") && password === "123123"){
			window.location.href = "dashboard/cadastrar-produto.html";
		}else {
			alert("Login ou senha errados");
		}
	}
	return false;
});

function sair(){
	sessionStorage.removeItem("user");
	window.location.href = '../index.html';
}