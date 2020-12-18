function logar() {
    // var str_login = txtemail.value;
    if (txtemail.value.indexOf("@") !== -1) {
        var user_json = {
            "email": txtemail.value,
            "senha": txtsenha.value
        }
        var path = "https://back-gama-12c-g3.herokuapp.com/login_email";
    } else {
        var user_json = {
            "racf": txtemail.value,
            "senha": txtsenha.value
        }
        var path = "https://back-gama-12c-g3.herokuapp.com/login_racf";
    }

    var pacote = {
        method: "POST",
        body: JSON.stringify(user_json),
        headers: {
            "Content-type": "application/json"
        }
    };

    fetch(path, pacote)
    .then(res => res.json())
    .then(res => {
        localStorage.setItem("user_logado", JSON.stringify(res));
        window.location="dashboard_geral.html";
    })
    .catch(error => window.alert("Não foi possível conectar.\nEntre em contato com o administrador."))
}