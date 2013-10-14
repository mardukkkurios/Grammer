$(document).ready(function() {
  /*$('#slidebottom button').click(function() {
    $(this).next().slideToggle();
  });

  $('#slidewidth button').click(function() {
    $(this).next().animate({width: 'toggle'});
  });*/
  $("#containerButtons").click(function() {//document.getElementById("BarraLateralIzquierda");//#navigationMenu a
		var $lefty = $("#BarraLaterarIzquerda")
		$lefty.animate({left: parseInt($lefty.css('left'),10) == 0 ? -$lefty.outerWidth()+35 : 0});
  });
  
  var $ultimoPresionado = 0;//$(this);
  $('#navigationMenu a').click(function() {//document.getElementById("BarraLateralIzquierda");//#navigationMenu a
    var $lefty = $("#BarraLaterarIzquerda");
	if($ultimoPresionado == 0 || $ultimoPresionado == $(this).attr('class')|| $lefty.css('left')!='0px'){
		$lefty.animate({left: parseInt($lefty.css('left'),10) == 0 ? -$lefty.outerWidth()+35 : 0});
	}
	switch ($(this).attr('class')){
		case 'home':
			$("#barrasContainers").css("background-color", "#83CF86");
			$("#containerButtons").css("background-color", "#2E9B2E");
			$("#BarraLaterarIzquerda").css("background-color", "rgba(0, 10, 253, 0.15)");
			break;
		case 'about':
			$("#barrasContainers").css("background-color", "#43C7E0");
			$("#containerButtons").css("background-color", "#006ADD");
			$("#BarraLaterarIzquerda").css("background-color", "rgba(0, 253, 81, 0.43)");
			break;
		case 'services':
			$("#barrasContainers").css("background-color", "#F89C47");
			$("#containerButtons").css("background-color", "#DD6100");
			$("#BarraLaterarIzquerda").css("background-color", "rgba(255, 143, 0, 0.43)");
			 break;
		case 'portfolio':
			$("#barrasContainers").css("background-color", "#F8FFA6");
			$("#containerButtons").css("background-color", "#F3FC1E");
			$("#BarraLaterarIzquerda").css("background-color", "rgba(0, 255, 245, 0.43)");
			break;
		case 'contact':
			$("#barrasContainers").css("background-color", "#DFA6FF");
			$("#containerButtons").css("background-color", "#D81EFC");
			$("#BarraLaterarIzquerda").css("background-color", "rgba(253, 0, 172, 0.59)");
			break;
		default:
		break;
	}
	$ultimoPresionado = $(this).attr('class');
	});
/*
  $('#slidemarginleft button').click(function() {
    var $marginLefty = $(this).next();
    $marginLefty.animate({marginLeft: parseInt($marginLefty.css('marginLeft'),10) == 0 ? $marginLefty.outerWidth() : 0});
  });
  
  $('#slidewidthsome button').click(function() {
    var $some = $(this).next(),
    someWidth = $some.outerWidth(),
    parentWidth = $some.parent().width();
    $some.animate({width: someWidth === parentWidth ? someWidth/2 : parentWidth - (parseInt($some.css('paddingLeft'),10) + parseInt($some.css('paddingRight'),10))});
  }); */ 
});
