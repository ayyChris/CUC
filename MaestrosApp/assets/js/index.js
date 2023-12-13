

$('#registrar').submit(function (event) {
    alert("Maestro agregado adecuadamente.");
})



if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3001/API/Users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Quieres eliminar a este maestro?")){
            $.ajax(request).done(function(response){
                alert("Profesor eliminado exitosamente!");
                location.reload();
            })
        }

    })
}