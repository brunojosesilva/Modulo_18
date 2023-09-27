document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formulario').addEventListener('submit', function (evento) {
        evento.preventDefault();

        let numeroForm = document.getElementById('numero').value;
        numeroForm = parseInt(numeroForm);

        let numeroAle = Math.random() * numeroForm;
        numeroAle = Math.round(numeroAle + 1);
        document.getElementById('valor').innerText = numeroAle;

        document.querySelector('.resultado').style.display = "block";
    })
})