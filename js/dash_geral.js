function DashGeralFactory() {
    var user_str = localStorage.getItem("user_logado");
    // implements if condition to verify if the user is logged
    
    HeaderNome(user_str)
    HeaderFoto(user_str)
    LoadParceiros()
    BodyTop10()
    localStorage.removeItem("total");
    localStorage.removeItem("success");
    localStorage.removeItem("fail");
    localStorage.removeItem("fraud");
    localStorage.removeItem("transacoes");
}

function DashParceiroFactory() {
    var user_str = localStorage.getItem("user_logado");
    // implements if condition to verify if the user is logged
    
    HeaderNome(user_str)
    HeaderFoto(user_str)
    montarDashParceiro()
}

function HeaderNome(user_str) {
    if (user_str == null) {
        location="index.html"
    } else {
        var user_json = JSON.parse(user_str);
        document.getElementById("txtnome").innerHTML = user_json.nome +" ("+user_json.racf+")"
    }
}

function HeaderFoto(user_str) {

    if (user_str == null) {
        location="index.html"
    } else {
        var user_json = JSON.parse(user_str);
        document.getElementById("txtfoto").innerHTML = '<img src="images/'+ user_json.foto + '" alt="" width="65" height="53" class="d-inline-block align-top">'
    }
}

function LoadParceiros() {
    // TODO: Change to better performance
    fetch("https://back-gama-12c-g3.herokuapp.com/top_ag_financeiros")
    .then(res => res.json())
    .then(res => preencherComboParceiros(res)); 
    
}

function preencherComboParceiros(lista){
    var saida ="";
    for (let index = 0; index < lista.length; index++) {
        saida+=
        "<option value='"+ lista[index].id_agente + "'>" + lista[index].nome_agente + "</option>";
    }
    document.getElementById("cmbparceiros").innerHTML=saida;
}

function BodyTop10() {
    // TODO: Change to better performance
    fetch("https://back-gama-12c-g3.herokuapp.com/top_ag_financeiros")
    .then(res => res.json())
    .then(res => preencherTabela(res));
}

function preencherTabela(lista) {
    var saida=
    "<table class='table'> " + 
    "<thead>"+
    "<tr>" +
      "<th scope='col'>Parceiro</th>" + 
      "<th scope='col'>Volume Transacional</th>" + 
    "</tr>" + 
    "</thead>"
    "<tbody>";

    for(contador=0;contador<lista.length;contador++){
        saida+= 
        "<tr>" + 
        "<th scope='row'>" + lista[contador].nome_agente + "</th>" + 
        "<th scope='row'>" + lista[contador].volume_transacional + "</th>" + 
        "</tr>";
        localStorage.setItem("dados_parceiro", {
            "id": lista[contador].id_agente,
            "nome": lista[contador].nome_agente,
            "vol": lista[contador].volume_transacional,
        });
    }

    saida+="</tbody></table>";
    document.getElementById("dados_top_10").innerHTML=saida;
}

function carregarDash(){

    localStorage.setItem("nome_parceiro", cmbparceiros.options[cmbparceiros.selectedIndex].text);

    localStorage.setItem("cmbparceiros", document.getElementById("cmbparceiros").value);

    var cmbparceiros_ = localStorage.getItem("cmbparceiros");
    localStorage.removeItem("total");
    localStorage.removeItem("success");
    localStorage.removeItem("fail");
    localStorage.removeItem("fraud");
    localStorage.removeItem("transacoes");

    console.log("cmbparceiros: " + cmbparceiros_);
    fetch("https://back-gama-12c-g3.herokuapp.com/total/"+cmbparceiros_)
    .then(res => res.json())
    .then(res => {
        localStorage.setItem("total", JSON.stringify(res)) ;
    })
    .catch(error => console.log('error', error));

    console.log("cmbparceiros: " + cmbparceiros_);
    fetch("https://back-gama-12c-g3.herokuapp.com/success/"+cmbparceiros_)
    .then(res => res.json())
    .then(res => {
        localStorage.setItem("success", JSON.stringify(res)) ;
    });

    console.log("cmbparceiros: " + cmbparceiros_);
    fetch("https://back-gama-12c-g3.herokuapp.com/fail/"+cmbparceiros_)
    .then(res => res.json())
    .then(res => {
        localStorage.setItem("fail", JSON.stringify(res)) ;
    });

    console.log("cmbparceiros: " + cmbparceiros_);
    fetch("https://back-gama-12c-g3.herokuapp.com/fraud/"+cmbparceiros_)
    .then(res => res.json())
    .then(res => {
        localStorage.setItem("fraud", JSON.stringify(res)) ;
    });

    console.log("cmbparceiros: " + cmbparceiros_);
      
    fetch("https://back-gama-12c-g3.herokuapp.com/ag_trans_vol/"+cmbparceiros_)
    .then(response => response.json())
    .then(res => {
        localStorage.setItem("transacoes", JSON.stringify(res));
        console.log("DADO COLETADO: " + res);
        console.log("DADO LOCAL STORAGE: " + localStorage.getItem("transacoes"));
    })
    .catch(error => console.log('error', error));

    if (localStorage.getItem("nome_parceiro") === null) {
        console.log("Nao carregou")
    }

    
    setTimeout(function(){
        window.location.href = 'dashboard_parceiro.html';
     }, 1200);
}

function montarDashParceiro() {

 

    var nome_parceiro = localStorage.getItem("nome_parceiro");
    var total_trans = localStorage.getItem("total");
    var success = localStorage.getItem("success");
    var fail = localStorage.getItem("fail");
    var fraud = localStorage.getItem("fraud");
    var transacoes = localStorage.getItem("transacoes");
    


    var saida =
    '<div class="alert alert-info col-12" role="info">' +
    '<a href="#" class="alert-link">Parceiro: '+nome_parceiro+'</a>' +
    '<br>'+
    '<a href="#" class="alert-link">Volume de Transações: '+transacoes+'</a>' +
    '</div>';

    saida += '<ul class="list-group col-12">';

    saida += 
    '<li class="list-group-item d-flex justify-content-between align-items-center">Total'+
    '<span class="badge badge-primary badge-pill badge-info">'+ total_trans +'</span>'+
    '</li>';

    saida += 
    '<li class="list-group-item d-flex justify-content-between align-items-center">Sucesso'+
    '<span class="badge badge-primary badge-pill">'+ success +'</span>'+
    '</li>';

    saida += 
    '<li class="list-group-item d-flex justify-content-between align-items-center">Falhas'+
    '<span class="badge badge-primary badge-pill badge-warning">'+ fail +'</span>'+
    '</li>';

    saida += 
    '<li class="list-group-item d-flex justify-content-between align-items-center">Fraudes'+
    '<span class="badge badge-primary badge-pill badge-danger">'+ fraud +'</span>'+
    '</li>';

    saida += '</ul>'

    dados_parceiro.innerHTML=saida;
}