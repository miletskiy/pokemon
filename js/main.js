
var url = 'http://pokeapi.co/api/v1/pokemon/?limit=12';

function takePokemons () {

    $.ajax({
        type: 'GET',
        url: url,
        success: function(data){
            console.log(data['objects'][0])
            console.log(data['objects'][0]['name']);
        },

        error: function(){
            console.log('An error occurred!');
        }
    });
};


$(document).ready(function () {
    takePokemons();
});
