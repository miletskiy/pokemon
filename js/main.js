
var url = 'http://pokeapi.co/api/v1/pokemon/?limit=12';
// var url = 'http://pokeapi.co/api/v1/pokemon/?limit=12&offset=108';
var pokemon_data;

var $12pokemons = $('.item');

var $image = $('.preview');
var imageUrl = 'http://pokeapi.co/media/img/';
var $name = $('.details').find('h3');

var $previewValues = $('.tableDetails td:odd');
var pokFeatures = [];

var fruit = {};
var pokemons;

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
          var types = pokemon.types[0].name;
        }else{
          var types = [];
          types.push(pokemon.types[0].name, pokemon.types[1].name);
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

function takePreview(pokemons, pokemon) {
  $image.attr('src', imageUrl + pokemon.pkdx_id + '.png');
  $name.text(pokemon.name + ' #' + pokemon.pkdx_id);
  $previewValues.each(function(elm) {
      $(this).text(pokFeatures[elm]);
  });
};

// preview single Pokemon
$('#id_pokemon')
  .click(function() {
  takePreview(pokemons, pokemon);
});

$('#id_loadmore')
  .click(function() {
      console.log($12pokemons);
  });


$(document).ready(function () {
// takePokemons();
});
