function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}
String.prototype.replaceAll = function(search, replace)
{
    //if replace is null, return original string otherwise it will
    //replace search string with 'undefined'.
    if(!replace) 
        return this;

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
};
//PROPIEDADES
function desapareceLinkApareceInput(){
	var link = $(this).children().first();
	link.css('display', 'none');
	link.next().css('display', 'block');
	link.next().val($(this).text());
	link.next().focus();
	link.next().select();
}
function desapareceInputApareceLink(e){
	var dad = $(this).parent().parent();
	textNode = jQuery.data(dad[0],"textNode");
	if(isBlank($(this).val())){
		event.preventDefault();
		textNode.parentNode.removeChild(textNode);
		dad.remove();
		return;
	}
	$(this).css('display', 'none');
	$(this).prev().css('display', 'block');
	$(this).prev().text($(this).val());
	$(this).prev().attr({"title" : $(this).val()});
	textNode.nodeValue = 	dad.children().first().children().first().text()+
							" : "+
							dad.children().last().children().first().text()+
							";";
							
	var dad = $(this).parent();
		if(dad.next().next().is("td")){
			if(isBlank(dad.next().next().children().first().text())){ 
				event.preventDefault();
				dad.next().next()[0].click().focus();
			}
		}
 }
 
 function controlDeTabulacionYEnter(e){
	if(event.which==13){
		this.blur();
		var dad = $(this).parent();
		if(dad.next().next().is("td")){
			if(isBlank(dad.next().next().children().first().text())){ 
				textNode = jQuery.data(dad.parent()[0],"textNode");
				textNode.parentNode.removeChild(textNode);
				dad.parent().remove();
			}
		}
	}else 
		if(event.which === 9 && !event.shiftKey){
			event.preventDefault();
			var dad = $(this).parent();
			if(dad.next().next().is("td")){
				dad.next().next()[0].click();
			}else{
				dad = dad.parent();
				if(dad.next().is("tr")){
					dad.next().children().first()[0].click();
				}else{
					dad = dad.parent();
					dad.children().first().children().first()[0].click();
	//				alert("primer elemento siguiente tabla")
				}
			}
			
		}else 
			if(event.which === 9 && event.shiftKey){
				event.preventDefault();
				var dad = $(this).parent();
				if(dad.prev().prev().is("td")){
					dad.prev().prev()[0].click();
				}else{
					dad = dad.parent();
					if(dad.prev().is("tr")){
						dad.prev().children()[2].click();
					}else{
						dad = dad.parent();
						dad.children().last().children().last()[0].click();
					}
				}
				
			}
  }
  //STYLERULE AGREGA PROPIEDAD A LA TABLA
  function agregaNuevaPropiedadAlFinal(){
		var dad = $(this).prev();
		dad.append( "<tr>" +
						"<td><a></a><input></input></td>" +
						"<td>:</td>" +
						"<td><a></a><input></input></td>" +
					"</tr>" );
		var hijos = dad.children().first().children().last().children();
		var textNode = document.createTextNode("");
		//textNode.nodeValue = "nuevo Valor :)";
		
		var styleSheet = jQuery.data(dad.parent().parent()[0],"styleSheet");
		//alert(dad.next().prop('class'));
		styleSheet.style.insertBefore(textNode, jQuery.data(dad.next()[0],"endingKey"));
		//styleSheet.style.appendChild(textNode);
		
		jQuery.data(hijos.parent()[0],"textNode", textNode);
		var link = hijos.first().children().first();
		link.parent().click(desapareceLinkApareceInput);
		link.next()
			.blur(desapareceInputApareceLink)
			.keydown(controlDeTabulacionYEnter);
		link.parent()[0].click();
		link = hijos.last().children().first();
		link.parent().click(desapareceLinkApareceInput);
		link.next()
			.blur(desapareceInputApareceLink)
			.keydown(controlDeTabulacionYEnter);
		//alert(jQuery.data(hijos.parent()[0],"textNode").value);
	}

var last = null;
$(document).ready(function(){
	$(".styleMainContainer .izquierdaAbajo").click(agregaNuevaPropiedadAlFinal);
	$(".styleMainContainer td").click(desapareceLinkApareceInput);
	$(".styleMainContainer td input")
		.blur(desapareceInputApareceLink)
		.keydown(controlDeTabulacionYEnter);
	// selectors container
	$(".propertiesContainer .selectorsContainer .selectors a").click(desapareceLinkApareceSelector);
	$(".propertiesContainer .selectorsContainer .izquierdaAbajo").click(clickAddSelector);
	
	$(".propertiesMenu input ").click(function(){
		var dad = $(".propertiesContainerForSorting");
		dad.prepend('<div class="styleSheetContainer">'+
						'<div class="selectorsContainer">'+
							'<div class="selectors">'+
							'</div>'+
							'<div class="izquierdaAbajo">PRESIONAME</div>'+
						'</div>'+
						'<div class="styleMainContainer">'+
							'<div class="derechaArriba">{ <a href="#">Editar</a></div>'+
							'<table class = "styleRule"></table>'+
							'<div class="izquierdaAbajo">}	</div>'+
						'</div>'+
					'</div>');
		dad = dad.children().first();
		
		
		//alert(mainContainer.prop('class'));
		//zona de datos de los style
		var styleSheet = new propertiesContainerData(dad[0]);
		jQuery.data(dad[0],"styleSheet", styleSheet);
		var mainContainer = dad.find(".styleMainContainer");
		
		var textNode = document.createTextNode("{");
		styleSheet.style.appendChild(textNode);
		jQuery.data(mainContainer.children().first()[0],"startingKey", textNode);
		
		var textNode = document.createTextNode("}");
		styleSheet.style.appendChild(textNode);
		jQuery.data(mainContainer.children().last()[0],"endingKey", textNode);
		
		
		dad.find(".selectorsContainer .izquierdaAbajo").click(clickAddSelector);
		dad.find(".styleMainContainer .izquierdaAbajo").click(agregaNuevaPropiedadAlFinal);
		
		if(lastSeleccionLength == seleccion.length && lastSeleccionLength>0){
			var divSelector = mainContainer.prev().children().first();
			for(var i=0; i<lastSeleccionLength; i++){
				addSelectorToDivSelectors(divSelector, elementsIdSeleccionados[i], false);
			}
		}
	});
});
// SELECTORS CONTAINER
function clickAddSelector(){
		addSelectorToDivSelectors($(this).prev(), "", true);
}
function addSelectorToDivSelectors(divSelector, value, active){
	divSelector.append("<a></a>");
	var link = divSelector.children().last();
	var textNode = document.createTextNode("");
	jQuery.data(link[0],"textNode", textNode);
	var styleSheet = jQuery.data(divSelector.parent().parent()[0],"styleSheet");
	styleSheet.style.insertBefore(textNode, jQuery.data(divSelector.parent().next().children().first()[0],"startingKey"));
	link.click(desapareceLinkApareceSelector);
	if(!isBlank(value)){
		cambiaContenidoDelSelector(value, link);
	}else{
		link[0].click();
	}
}


function desapareceLinkApareceSelector(){
		if(last != null){
			//llama a funcion acabo
			//miFocusTerminoAgregar();
			last.css('display', 'block');
		}
		last = $(this);
		$(this).css('display', 'none');
		$("#ui-widget-Su-Id")
			.css('display', 'block')
			.insertAfter($(this));
		var input = $("#EscribeCssTextbox");
		//input.focus();
		input.val($(this).text());
		miTextChanged();
		input.select();
	}
