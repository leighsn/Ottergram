var otterData = [
	{
		img: 'img/otter1.jpg',
		title: "LOL Otter"
	},

	{
		img: 'img/otter2.jpg',
		title: 'Gangnam Otter'
	},

	{
		img: 'img/otter3.jpg',
		title: "Handsome Otter"
	},

	{
		img: 'img/otter4.jpg',
		title: 'Loving Otters'
	},

	{
		img: 'img/otter5.jpg',
		title: 'Cuddly Otters'
	},

	{
		img: 'img/otter6.jpg',
		title: 'Tubby Otter'
	}
];

var existy = function(x){
	return x != null
};

 var createOtterLink = function (data) {

	 	var $anchor = $('<a></a>', {
	 		href: data.img
	 	});

	 	var $img = $('<img />', {
	 		src: data.img
	 	});

	 	var $title = $('<div></div>', {
	 		class: 'title',
	 		text: data.title
	 	});

	 	$anchor.append($img);
	 	$anchor.append($title);

	 	return $anchor;
 };

 var createOtterListItem = function (link){
 	var $li = $('<li></li>');
 	$li.append(link);
 	return $li;
 }

 var appendToThumbnails = function ($element) {
 	var $thumbnails = $('.thumbnails');
 	$thumbnails.append($element);
 }

 var ottersToDom = function (otterArray){
 	var docFragment = document.createDocumentFragment();
 	$.each(otterArray, function (idx, otter){
 		var $link = createOtterLink(otter);
 		docFragment.appendChild(createOtterListItem($link).get(0));
  	});

 	appendToThumbnails(docFragment);
 };

var $bigImage = $('#bigImage');

var links;

var hideDetail = function(){
	console.log('Hiding...');
	$(document.body).addClass('hide-detail');
	$bigImage.get(0).removeEventListener('click', hideDetail);
	$('a').removeClass('active');
};


var showImage = function(url) {
	$bigImage.attr('src', url);
	$(document.body).removeClass('hide-detail');
	$bigImage.get(0).addEventListener('click', hideDetail);
};

var handleClick = function (event){
	event.preventDefault();
	var imageUrl = $(this).attr('href');
	console.log(this);
	showImage(imageUrl);
	$('a').removeClass('active');
	$(this).addClass('active');
};

var keySequence = [];

var shorten = function(array){
  while (array.length > 10){
  	array.shift();
  }
  return array;
}


var checkLength = function(array){
	if (array.length < 10){
		return false;
	} else if (array.length > 10){
		array = shorten(array);
		return true;
	} else return true;
}


var checkSequence = function(array){
	var correctSequence = [38, 38, 40, 40, 37, 39, 37, 39, 16, 13];
	for (var i = 0; i < array.length; i++){
		console.log(array[i]);
		if (array[i] !== correctSequence[i]){
			return false;
		} 
	}
	return true;
}


document.addEventListener('keydown', function (event){
    keySequence.push(event.keyCode);
    console.log(keySequence);
	/*console.log(event.keyCode);
	if (event.keyCode === 32){
		hideDetail();*/
		if(checkLength(keySequence) && checkSequence(keySequence)){
			showImage('http://i.ytimg.com/vi/sfA0tZgtSeg/maxresdefault.jpg');
		}
});

var thumbnailsClass = document.getElementsByClassName('thumbnails');
var detailsClass = document.getElementsByClassName('detail');

var goldChallenge = function(){
   thumbnailsClass.classList.add('shrink');
   detailsClass.classList.add('expand');
};

$(document).ready(function(){
	ottersToDom(otterData);
	$(document.body).on('click', '.thumbnails a', handleClick);
});

