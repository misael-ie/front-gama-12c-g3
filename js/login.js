function logar() {
    var user_json = {
        "email": txtemail.value,
        "senha": txtsenha.value
    }

    var pacote = {
        method: "POST",
        body: JSON.stringify(user_json),
        headers: {
            "Content-type": "application/json"
        }
    };

    fetch("https://back-gama-12c-g3.herokuapp.com/login_email", pacote)
    .then(res => res.json())
    .then(res => {
        localStorage.setItem("user_logado", JSON.stringify(res));
        window.location="dashboard_geral.html";
    })
    .catch(error => console.log('error', error));
}