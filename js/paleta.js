$(document).ready(function() {
  /*$('#slidebottom button').click(function() {
    $(this).next().slideToggle();
  });

  $('#slidewidth button').click(function() {
    $(this).next().animate({width: 'toggle'});
  });*/
  var $pinStatus = 0;
  $("Button.pin").click(function() {//document.getElementById("BarraLateralIzquierda");//#navigationMenu a
		var $righty = $(".rightSidebar")
		if(parseInt($righty.css('right'),10) == 0 && $pinStatus == 1){
			//se va a minimizar
			//$(this).css( "background-color" );
			//$(this).html("O");
			$righty.attr('style', '');
			$(this).css('backgroundPosition', '0 0');
			$pinStatus = 0;
			//alert("1");
		}else{
			//se va a expandir
			//$(this).html("X");
			$(this).css('backgroundPosition', '-40px 0');
			$righty.animate({right: 0});
			$pinStatus = 1;
			//alert("2");
		}
		//$righty.animate({right: parseInt($righty.css('right'),10) != 0 ? 0});
  });
  
  var $ultimoPresionado = 0;//$(this);
  $('.navigationMenu a').click(function() {//document.getElementById("BarraLateralIzquierda");//#navigationMenu a
    var $righty = $(".rightSidebar");
	if($ultimoPresionado == 0 || $ultimoPresionado == $(this).attr('class')|| $righty.css('right')!='0px'){
		//$righty.animate({right: parseInt($righty.css('right'),10) == 0 ? -$righty.outerWidth()+35 : 0});
	}
	
	$(".paletteContainer").css('display','none');
	$(".propertiesContainer").css('display','none');
	$(".moreStuffContainer").css('display','none');
	
	switch ($(this).attr('class')){
		case 'home':
			$(".barContainer").css("background-color", "#83CF86");
			$(".buttonsContainer").css("background-color", "#2E9B2E");
			$(".rightSidebar").css("background", "-webkit-linear-gradient(rgba(31, 255, 0, 0.47), rgba(0, 253, 81, 0.43))");
			
			$(".paletteContainer").css('display','block');
			break;
		case 'about':
			$(".barContainer").css("background-color", "#43C7E0");
			$(".buttonsContainer").css("background-color", "#006ADD");
			$(".rightSidebar").css("background", "-webkit-linear-gradient(rgba(31, 255, 0, 0.47), rgba(0, 253, 81, 0.43))");
			
			$(".moreStuffContainer").css('display','block');
			break;
		case 'services':
			$(".barContainer").css("background-color", "#308686");
			$(".buttonsContainer").css("background-color", "#DD6100");
			$(".rightSidebar").css("background", "-webkit-linear-gradient(rgba(255, 0, 0, 0.55), rgba(253, 0, 0, 0.11))");
	
			$(".propertiesContainer").css('display','block');
			break;
		case 'portfolio':
			$(".barContainer").css("background-color", "#F8FFA6");
			$(".buttonsContainer").css("background-color", "#F3FC1E");
			$(".rightSidebar").css("background", "-webkit-linear-gradient(rgba(31, 255, 0, 0.47), rgba(0, 253, 81, 0.43))");
			break;
		case 'contact':
			$(".barContainer").css("background-color", "#DFA6FF");
			$(".buttonsContainer").css("background-color", "#D81EFC");
			$(".rightSidebar").css("background", "-webkit-linear-gradient(rgba(31, 255, 0, 0.47), rgba(0, 253, 81, 0.43))");
			break;
		default:
		break;
	}
	$ultimoPresionado = $(this).attr('class');
	});
/*
  $('#slidemarginright button').click(function() {
    var $marginrighty = $(this).next();
    $marginrighty.animate({marginright: parseInt($marginrighty.css('marginright'),10) == 0 ? $marginrighty.outerWidth() : 0});
  });
  
  $('#slidewidthsome button').click(function() {
    var $some = $(this).next(),
    someWidth = $some.outerWidth(),
    parentWidth = $some.parent().width();
    $some.animate({width: someWidth === parentWidth ? someWidth/2 : parentWidth - (parseInt($some.css('paddingright'),10) + parseInt($some.css('paddingRight'),10))});
  }); */ 
});
