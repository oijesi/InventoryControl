$(function(){
	
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
	
	$('#form-produto').submit(function(){
		var nomeProd = $('#produto').val();
		var valorProd = $('#valor-produto').val();
		var qtdProd = $('#qtd-produto').val();
		if(nomeProd === "" || valorProd === "" || qtdProd === ""){
			$('#produto-erro').val(Materialize.toast('Nenhum campo pode estar vazio.', 1500, 'rounded deep-orange accent-2'));
			return false;
		}else {
			var produto = {nomeProd: nomeProd, valorProd: valorProd, qtdProd: qtdProd};
			salvaProduto(produto);
			$('#produto').val("");
			$('#valor-produto').val("");
			$('#qtd-produto').val("");
			$('#produto-erro').val(Materialize.toast('Produto salvo com sucesso!', 1500, 'rounded green'));
		}
		return false;
	});
	
});

function salvaProduto(data){
	var idProduto = 0;
	var produto =  JSON.parse(localStorage.getItem('produtos'));

	if(produto === null){
		var idProduto = 1;
	}else {
		var idProduto = produto.length + 1;
	}

	var objProduto = {idProduto: idProduto, 'nomeProd': data.nomeProd, 'valorProd': data.valorProd, 'qtdProd': data.qtdProd};
	if(produto != null){
  		produto.push(objProduto);
  	}
  	else{
		var produto =[]
		produto.push(objProduto);
    }

    var produtoJson = JSON.stringify(produto);
  	localStorage.setItem('produtos', produtoJson);
}

function montaListaProdutos(){
	var produtos = retornaProdutosLocalStorage();
	
	if(produtos === null){
		$('#tabela-produtos').hide();
		$('#resultado-vazio-produtos').text("Nenhum produto cadastrado.").addClass('center-align');
	}else {
		for(var i = 0; i < produtos.length; i++){
			$('#tabela-produtos tbody').append(
				'<tr>'+
				'	<td>' + produtos[i].nomeProd  + '</td>'+
				'	<td>' + produtos[i].valorProd + '</td>'+
				'	<td>' + produtos[i].qtdProd  + '</td>'+
				'	<td>'+
				'</tr>'
			);
		}
	}
}


function listaProdutos(){
	var produtos =  JSON.parse(localStorage.getItem('produtos'));
	if(produtos !== null){
		for(var i = 0; i < produtos.length; i++){
			$('#lista-produtos').append(
				'<option value="'+ produtos[i].valorProd +'">'+ produtos[i].nomeProd +'</option>'
			);
		}
	}
}

function retornaProdutosLocalStorage(){
	return JSON.parse(localStorage.getItem('produtos'));
}

function getDataAtual(){
	var data = new Date();
	var dataFormatada = (data.toLocaleString("pt-BR"));
	dataFormatada = dataFormatada.split(" ");
	return dataFormatada[0];
}

function logout(){
	sessionStorage.removeItem("user");
	window.location.href = '../index.html';
}

function numberToReal(numero) {
    var numero = numero.toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}