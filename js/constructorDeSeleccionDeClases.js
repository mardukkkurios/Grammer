//Inicializacion
$(document).ready(function(){
	$(".SelectorDeClases .izquierdaAbajo").click(function(){
	agregaNuevaClaseALasTagsDeClases($(this).prev(), "", true);
	});
	//construirSelectorDeClases("hola");
	//construirSelectorDeClases("hola");
	//alert(getSelectorDeClasesValue());
});
function agregaNuevaClaseALasTagsDeClases(container, cad, selected){
	container.append(
		'<div>'+
			'<a class="textoDeLaClase"></a>'+
			'<input/>'+
			'<a href="#" class="eliminarEstaClaseMolesta">x</a>'+
		'</div>');
	var nuevo = container.children().last().children();
	nuevo.first().click(desapareceTextoDeClaseApareceInput)
					.text(cad);
	nuevo.first().next().blur(apareceTextDeClaseDesapareceInput)
						.bind('keypress', prevenirTeclasPresionadasAlAgregarUnaClase);
	nuevo.last().click(eliminaEstaClaseMolesta);
	if(!isBlank(cad) && selected == false)
		return;
	nuevo.first()[0].click();
	nuevo.first().next()[0].focus();
}
function prevenirTeclasPresionadasAlAgregarUnaClase(event) {
	var regex = new RegExp("[,; ]");
	var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	if (regex.test(key)) {
			event.preventDefault();		
		}else{
			if(event.which === 13){
				$(this).blur();
				return
			}
		}
}
function eliminaEstaClaseMolesta(){ 
	$(this).parent().remove();
}
function apareceTextDeClaseDesapareceInput(){//ocurre en blur del input
	if(isBlank($(this).val())){
		//destrullelo
		$(this).parent().remove();
		return;
	}
	event.preventDefault();
	//modificalo
	var cad = $(this).val();
	if(cad[0]!='.') cad = "."+cad;
	$(this).prev().css('display', 'inline')
				.text(cad);
	$(this).css('display', 'none');
	$(this).next().css('display', 'inline');
}
function desapareceTextoDeClaseApareceInput(){ //ocurre en clic agegar
	$(this).css('display', 'none');
	$(this).next().css('display', 'inline')
				.val($(this).text())
				.focus()
				.select();
	$(this).next().next().css('display', 'none');
}

function getSelectorDeClasesValue(){
	var result = "";
	var clases = $(".objectClassesContainer").children().find("a.textoDeLaClase");
	clases.each(function() {
		result += $(this).text()+", ";
	});
	return result.substring(0, result.length-2);
}
function corrigeClaseYBorraEspacios( cad ){
	var cad2 = "";
	var i = 0;
	var len = cad.length;
	while(i<len){
		if(cad[i]!=' ' && cad[i]!=','&& cad[i]!='.') cad2 += cad[i];
		i++;
	}
	if(isBlank(cad2))return "";
	return "."+cad2;
}
function construirSelectorDeClases(clases){
	destruirSelectorDeClases();
	var comaAnterior = 0;
	var container = $(".objectClassesContainer");
	while((coma = clases.indexOf(",", comaAnterior+1)) != -1){
		if(comaAnterior > 0)
			agregaNuevaClaseALasTagsDeClases(container, corrigeClaseYBorraEspacios(clases.substring(comaAnterior+1, coma)), false);
		else
			agregaNuevaClaseALasTagsDeClases(container, corrigeClaseYBorraEspacios(clases.substring(0, coma)), false);
		comaAnterior = coma;
	}
	if(coma<clases.length) 
		if(comaAnterior > 0)
			agregaNuevaClaseALasTagsDeClases(container, corrigeClaseYBorraEspacios(clases.substring(comaAnterior+1, clases.length)), false);
		else
			agregaNuevaClaseALasTagsDeClases(container, corrigeClaseYBorraEspacios(clases.substring(0, clases.length)), false);
		
		
}
function destruirSelectorDeClases(){
	$(".objectClassesContainer")[0].innerHTML = "";
}
