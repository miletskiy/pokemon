
var url = 'http://pokeapi.co/api/v1/pokemon/?limit=12';
var pokemon_data;

(function takePokemons() {
  $.getJSON(
    url,
    function(data) {
      pokemon_data = data;
    }
  ).done(function() {
      console.log('done');
  });
})()

var $image = $('.preview');
var imageUrl = 'http://pokeapi.co/media/img/';
var $name = $('.details').find('h3');

var $previewValues = $('.tableDetails td:odd');
var pokFeatures = [];

// preview single Pokemon
$('#id_pokemon')
  .click(function() {
  var pokemons = pokemon_data['objects'];
  pokemon = pokemons[1];
  if (pokemon.types.length === 1) {
    var types = pokemon.types[0].name;
  }else{
    var types = pokemon.types[0].name + ' ' + pokemon.types[1].name;
  };
  var attack = pokemon.attack;
  var defense = pokemon.defense;
  var hp = pokemon.hp;
  var spAttack = pokemon.sp_atk;
  var spDefense = pokemon.sp_def;
  var speed = pokemon.speed;
  var weight = pokemon.weight;
  var totalMoves = pokemon.moves.length;

  pokFeatures.push(types, attack, defense, hp, spAttack,
    spDefense,speed,weight, totalMoves);
  takePreview(pokemons, pokemon);
});

function takePreview(pokemons, pokemon) {
  $image.attr('src', imageUrl + pokemon.pkdx_id + '.png');
  $name.text(pokemon.name + ' #' + pokemon.pkdx_id);
  $previewValues.each(function(elm) {
      $(this).text(pokFeatures[elm]);
  });
};

$('#id_loadmore')
  .click(function() {
      var meta = pokemon_data['meta'];
      var nextUrl = meta.next;
      console.log('Hello!');
      console.log(pokemons[0]);
      console.log(nextUrl);
  });


$(document).ready(function () {
// takePokemons();
});
