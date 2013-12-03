function sudoDameLosFormatosCSS(){
	cssJquery = $(".propertiesContainerForSorting").children();
	var resultado = "";
	cssJquery.each(function(){
		var styleSheet = jQuery.data($(this)[0],"styleSheet");
		resultado += styleSheet.toString();
	});
	return resultado;
}
/*
function sudoDameLosFormatosCSSPorArchivo(){
	cssJquery = $(".propertiesContainerForSorting").children();
	var resultado = "";
	cssJquery.each(function(){
		var styleSheet = jQuery.data($(this)[0],"styleSheet");
		resultado += styleSheet.toString();
	});
	return resultado;
}*/