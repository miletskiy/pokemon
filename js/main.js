
var url = 'http://pokeapi.co/api/v1/pokemon/?limit=12';
// var url = 'http://pokeapi.co/api/v1/pokemon/?limit=12&offset=24';
var pokemon_data;
var pokemons;

var $details = $('#details');
var $12pokemons = $('.item');
var $image = $('.preview');
var imageUrl = 'http://pokeapi.co/media/img/';
var $name = $details.find('h3');
var $previewValues = $('.tableDetails td:odd');

var fruit = {};
var pokFeatures = [];


(function takePokemons() {
  $.getJSON(
    url,
    function(data) {
      pokemon_data = data;
    }
  ).success(function() {
      console.log('done');
      pokemons = pokemon_data['objects'];

      for(i in pokemons) {
        pokemon = pokemons[i];
        var pkdx_id = pokemon.pkdx_id;
        var name = pokemon.name;
        if (pokemon.types.length === 1) {
          var types = capitalize(pokemon.types[0].name);
        }else{
          var types = [];
          types.push(capitalize(pokemon.types[0].name),
              ' ' + capitalize(pokemon.types[1].name));
        };
        var attack = pokemon.attack;
        var defense = pokemon.defense;
        var hp = pokemon.hp;
        var spAttack = pokemon.sp_atk;
        var spDefense = pokemon.sp_def;
        var speed = pokemon.speed;
        var weight = pokemon.weight;
        var totalMoves = pokemon.moves.length;

        pokFeatures.push(pkdx_id, name, types, attack, defense, hp, spAttack,
          spDefense,speed,weight, totalMoves);
        fruit[i] = pokFeatures;
        pokFeatures = [];
      };

  }).complete(function() {
      console.log('complete');
      $12pokemons.each(function(elm) {
        $(this).attr('id',elm);
        $(this).find('p').text(fruit[elm][1]);
        $(this).find('.image').attr('src', imageUrl + fruit[elm][0] + '.png');
        var abilities = fruit[elm][2];
        if (abilities.length === 2) {
          $(this).find('.ability').clone().appendTo($(this));
          $(this).find('button').addClass(abilities[0]).text(abilities[0]);
          $(this).find('button:last').addClass(abilities[1])
            .removeClass(abilities[0]).text(abilities[1]);
        } else {
          $(this).find('button').addClass(abilities).text(abilities);
        };
      });
  });
})()

// capitalize string
function capitalize(string) {
  var result = string.charAt(0).toUpperCase() + string.substr(1);
  return result;
}

// take preview for selected Pokemon
function takePreview(id) {
  pokemon = fruit[id];
  $('#details').removeClass('no_details').addClass('details');
  $image.attr('src', imageUrl + pokemon[0] + '.png');
  $name.text(pokemon[1]+ ' #' + pokemon[0]);
  fetures = pokemon.slice(2);
  $previewValues.each(function(elm) {
    $(this).text(fetures[elm]);
  });
};


// load next 12 pokemons
$('#id_loadmore')
  .click(function() {
    console.log(fruit);
  });


// wait for click on the pokemon's area
$12pokemons.on('click', function() {
  takePreview(this.id);
});



$(document).ready(function () {
// takePokemons();
});
