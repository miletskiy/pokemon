
// capitalize string
function capitalize(string) {
  var result = string.charAt(0).toUpperCase() + string.substr(1);
  return result;
};

// get next url for pokemons load
var mainDomain = 'http://pokeapi.co/';
var nextUrl = '/api/v1/pokemon/?limit=12';
function getNextUrl(mainDomain, nextUrl) {
  var url = mainDomain + nextUrl;
  return url;
};

// get juicy data from pokemons general data
var fruit = {};
var pokFeatures = [];
function getFruit(pokemons) {
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
};

// fill html juicy data
var $12pokemons = $('.item');
function fillPokemons() {
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
};

//load general pokemons data
function getPokemons() {
  var url = getNextUrl(mainDomain, nextUrl);
  // console.log(url);
  // console.log('url1');

  $.getJSON(
    url,
    function(data) {
      pokemons = data['objects'];
      nextUrl = data['meta'].next;
    }
  ).success(function() {
      console.log('done');
  }).complete(function() {
      console.log('complete');
      getFruit(pokemons);
      fillPokemons();
  });
};

// get preview for selected Pokemon
var $details = $('#details');
var $image = $('.preview');
var imageUrl = 'http://pokeapi.co/media/img/';
var $name = $details.find('h3');
var $previewValues = $('.tableDetails td:odd');
function getPreview(id) {
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
  getPreview(this.id);
});


$(document).ready(function () {
  getPokemons();
});
