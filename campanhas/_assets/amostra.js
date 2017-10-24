$(document).ready(function() {
    $(".etka_card__close").click(function() {
        $(".etka_popup-card").addClass("etka_popup-enviado");
    });
});

$("#etka_amostra").submit(function(event){
    var email = document.forms["etka_amostra"]["amostra-email"].value;
    var contato_email = document.getElementById("amostra-email");
    var endereco = document.forms["etka_amostra"]["amostra-endereco"].value;
    var contato_end = document.getElementById("amostra-endereco");
    var att = document.createAttribute("required");
    if (email == "") {
        contato_email.setAttributeNode(att);
        return false;
        // handle the invalid form...
        validadeAError();
    }
    if (endereco == "") {
        contato_end.setAttributeNode(att);
        return false;
        // handle the invalid form...
        validadeAError();
    } 
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        validadeAError();
    } else {
        // everything looks good!
        event.preventDefault();
        submitAValidade();
    }
});

function submitAValidade(){
    // Initiate Variables With Form Content
    var nome = $("#amostra-nome").val();
    var email = $("#amostra-email").val();
    var empresa = $("#amostra-empresa").val();
    var telefone = $("#amostra-tel").val();
    var endereco = $("#amostra-endereco").val();
    var mensagem = $("#amostra-mensagem").val();
 
    $.ajax({
        type: "POST",
        url: "./amostra.php",
        data: "amostra-nome=" + nome + "&amostra-email=" + email + "&amostra-empresa=" + empresa + "&amostra-tel=" + telefone + "&amostra-endereco=" + endereco + "&amostra-mensagem=" + mensagem,
        success : function(text){
            if (text == "success"){
                validadeASuccess();
            } else {
                validadeAError();
            }
        }
    });
}

function validadeASuccess(){
    $( "#etka_amostra-enviado" ).removeClass( "etka_popup-enviado" );
    $( '#amostra-nome, #amostra-email, #amostra-empresa, #amostra-tel, #amostra-endereco, #amostra-mensagem' ).val('');
}

function validadeAError(){
    $( "#etka_amostra-erro" ).removeClass( "etka_popup-erro" );
}
