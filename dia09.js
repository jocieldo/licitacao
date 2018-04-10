$(document).ready(function(){
     $("#exampleCNPJ").blur(function(){
        consultarCNPJ(); 
 });
   
    preencherTabela();
    
	$("#btnlogin").click(function(){
        cadastrar();
        preencherTabela();
      
	});	
	
});

function preencherTabela(){
    var tabela = $("#tabela");
    
    tabela.html("");
 
  //  var pessoas = consultarTodos();
    
    for(var i = 0; i < sessionStorage.length; i++){
        var index = sessionStorage.key(i);
        
        var pessoa = sessionStorage.getItem(index);
        
        pessoa = JSON.parse(pessoa);
 
        var linha = 
            "<tr><td>" + pessoa.id 
        +   "</td><td>" + pessoa.nome
      +   "</td><td>" + pessoa.sobrenome
          +   "</td><td>" + pessoa.email
           +   "</td><td>" + pessoa.senha + "</td></tr>";
        
        tabela.append(linha);
        
    }
    
}

function cadastrar(){
    var nome = $("#exampleInputName").val();
    var sobrenome = $("#exampleInputLastName").val();
    var email = $("#exampleInputEmail1").val();
    var senha = $("#exampleInputPassword1").val();
    var confirmasenha = $("#exampleConfirmPassword").val();

    var pessoa = {
        
        "id": sessionStorage.length + 1,
        "nome": nome,
        "sobrenome": sobrenome,
        "email": email,
        "senha": senha,
     };
    
    var pessoastring = JSON.stringify(pessoa);
    console.log('string', pessoastring);
    sessionStorage.setItem(pessoa.id, pessoastring );
    
    $(":input").val("");
    
}

function consultar(id){
        
    return sessionStorage.getItem(id);
    
}

function consultarTodos(){
    var pessoas = [];
    for(var i = 0; i < sessionStorage.length; i++){
        var pessoastring =  sessionStorage.key(i);
        var pessoa = JSON.parse(pessoastring);
        
        pessoas.push( pessoa );
       
    }
    return pessoas;
}

function consultarCNPJ(){
    var cnpj = $("#exampleCNPJ").val();
    var url = "https://receitaws.com.br/v1/cnpj/" + cnpj;
    
    $.ajax({
        "url": url 
    }).done(function(resultado){
        
        console.log(resultado);
        
       // var objeto = JSON.parse(resultado);
        
        $("#exampleEMPRESA").val(resultado.nome);
        
    });
}
