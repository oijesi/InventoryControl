$('#login-page').submit(function(){
	var login = $('#login').val();
	var password = $('#password').val();
	if(login === "" || password === ""){
		$('#login-erro').val(Materialize.toast('Nenhum campo pode estar vazio.', 1500, 'rounded deep-orange accent-2'));
		return false;
	}else {
		if((login === "Admin" || login === "admin" || login === "ADMIN") && password === "123123"){
			sessionStorage.setItem('user', login);
			window.location.href = "dashboard/cadastrar-produto.html";
		}else {
			$('#login-erro').val(Materialize.toast('Login ou senha incorretos.', 1500, 'rounded deep-orange accent-2'));
		}
	}
	return false;
});

function sair(){
	sessionStorage.removeItem("user");
	window.location.href = '../index.html';
}