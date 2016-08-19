
disablePage();

// capitalize string
function capitalize(string) {
  var result = string.charAt(0).toUpperCase() + string.substr(1);
  return result;
};

// get next url for pokemons load
var baseUrl = 'http://pokeapi.co';
var offset = '';
// offset = '&offset=500';
var nextUrl = '/api/v1/pokemon/?limit=12' + offset;

function getNextUrl(baseUrl, nextUrl) {
  var url = baseUrl + nextUrl;
  return url;
};

// get juicy data from pokemons general data
function getFruit(pokemons) {
  var pokFeatures = [];
  var fruit = [];
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
    var spritesUrl = pokemon['sprites'][0]['resource_uri'];

    pokFeatures.push(pkdx_id, name, types, attack, defense, hp,
                     spAttack, spDefense, speed, weight, totalMoves, spritesUrl);
    fruit[i] = pokFeatures;
    pokFeatures = [];
  };

  return fruit;
};


// get image urls from sprites
function getUrlImage(url) {
  var urlImage;
  $.ajaxSettings.async = false;
  $.getJSON(url, function(data) {
    urlImage = data.image;
  });
  return urlImage;
};


// fill html with juicy data
function fillPokemons(fruit, objectPokemons) {
  objectPokemons.each(function(elm) {
    var spriteUrl = baseUrl + fruit[elm][11];
    var imageSpriteUrl = getUrlImage(spriteUrl);

    $(this).attr('id',elm);
    $(this).find('p').text(fruit[elm][1]);
    $(this).find('.image').attr('src', baseUrl + imageSpriteUrl );

    var abilities = fruit[elm][2];
    if (abilities.length === 2) {
      if ($(this).find('.ability').length !== 2) {
            $(this).find('.ability').clone().appendTo($(this));
            $(this).find('button').addClass(abilities[0]).text(abilities[0]);
            $(this).find('button:last').addClass(abilities[1])
              .removeClass(abilities[0]).text(abilities[1]);
      }
    } else {
      $(this).find('button').addClass(abilities).text(abilities);
      };
  });
};


//load general pokemons data and put it on the main page
var pokemons;
var fruit = [];
var $itemPokemons = $('.item');
function getPokemons() {
  var url = getNextUrl(baseUrl, nextUrl);

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

    var getF = getFruit(pokemons);
    [].push.apply(fruit, getF);

    $itemPokemons = $('.item');
    fillPokemons(fruit, $itemPokemons);
    // wait for click on the pokemon's area
    $itemPokemons.on('click', function() {
      getPreview(this.id);
    });
    // disable preview function on the pokemon's buttons
    $('.btn').on('click', function(event) {
      event.stopPropagation();
    })
    enablePage();
  });
};

// add zero to Pokemon id
function getPokemonNumber(number) {
  var result;
  number = number+'';
  if (number.length === 1) {
    result = '00' + number;
  } else if (number.length === 2) {
    result = '0' + number;
  }  else {
    result = number;
  }
  return result;
}

// get preview for selected Pokemon
var $details = $('.details');
var $image = $('.preview');
var imageUrl = 'http://pokeapi.co/media/img/';
var $name = $details.find('h3');
var $previewValues = $('.tableDetails td:odd');

function getPreview(id) {
  pokemon = fruit[id];
  var spriteUrl = baseUrl + pokemon[11];
  var imageSpriteUrl = getUrlImage(spriteUrl);

  $details.slideDown();
  $image.attr('src', baseUrl + imageSpriteUrl);

  var pokemonNumber = getPokemonNumber(pokemon[0]);
  $name.text(pokemon[1]+ ' #' + pokemonNumber);
  fetures = pokemon.slice(2);
  $previewValues.each(function(elm) {
    $(this).text(fetures[elm]);
  });
};

// load next 12 pokemons
var pokemonsContainer = $('.pokemons-container');
var $clone = pokemonsContainer.clone();
$('#id_loadmore')
  .click(function() {
    disablePage();
    pokemonsContainer.append($clone.html());
    getPokemons();
  });

// disable page while loading data
function disablePage() {
    $('#id_loadmore').attr('disabled',true);
    $('#id_indicator').slideDown();
    $('#id_background_layer').show();
};

// enable page after loading data
function enablePage() {
    $('#id_loadmore').removeAttr('disabled');
    $('#id_indicator').slideUp('fast');
    $('#id_background_layer').hide();
};

$(document).ready(function () {
  getPokemons();
});
