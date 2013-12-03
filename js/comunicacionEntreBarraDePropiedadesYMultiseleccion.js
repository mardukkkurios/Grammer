/*
QUE NOMBRE TAN LARGO !
	archivos relacionados: // no se puso en el mismo ya que lic esta juntando los codigos. Para hacer esto mas facilmente integrable.		
	
*/
//seleccion // es el array que contiene a todos los seleccionados
var clasesSeleccionadas;
var tiposDeElementosSeleccionados;	
var elementsIdSeleccionados;
var lastSeleccionLength=0;
function llamarCadaVezQueSeAgregueElementoALaSeleccion(){
	//esta funcion esta siendo llamada cada vez que se agrega algo con shift. -> perdon Ctrl shift no sirve
	//este ciclo me guarda en rules todas sus regas Css en un formato coprimido y sin repeticiones
	//complejidad O( n*m * O(getMatches)) probablemente es cuadratico
	var rules = [];
	for(var i=0; i<seleccion.length; i++){
		var rule = window.getMatchedCSSRules(seleccion[i]);
		if(rule != null)
		for(var j = 0; j<rule.length; j++){
			if((jQuery.inArray(rule[j].selectorText, rules)) == -1){
				rules.push(rule[j].selectorText);
				console.log("Element "+i+", Rule "+j+", "+rule[j].selectorText+"_");
			}
		}
	}
	//obtener todos los cadSelectorComprimido de los stylesheets complejidad lineal
	var myOwnRules = [];
	var myRuleActive = null;
	var myRuleActive = [];
	var styles = $(".propertiesContainerForSorting .styleSheetContainer");
	styles.each(function( index ) {
		  styleSheet = jQuery.data($(this)[0],"styleSheet");
		  console.log("myStyles "+index+": "+styleSheet.cadSelectorComprimido+"_");
		  myOwnRules.push(styleSheet.cadSelectorComprimido);
		  myRuleActive.push(false);
		});
	
	//revisa coinsidencias Cuadratico
	var len = rules.length;
	var len2 = myOwnRules.length;
	for(var i=0; i<len; i++){ // por cada rule que me dio el  CSSMatcher
		for(var j=0; j<len2; j++){
			if(!myRuleActive[j])
				if(rules[i]===myOwnRules[j])
					myRuleActive[j]=true;
		}
	}
	//imprime resultados
	var check = false;
	for(var j=0; j<len2; j++){
		if(myRuleActive[j]){
			$(styles[j]).css('display', 'block');
			check = true;
		}else{
			$(styles[j]).css('display', 'none');
			colectorDeBasura($(styles[j]));
			}
		}
		
	if(check){
		$(".navigationMenu li a.services")[0].click();
	}else{ //muestralos todos para que no se vea vacio
		for(var j=0; j<len2; j++)
			if($(styles[j]).length)
				$(styles[j]).css('display', 'block');
	}
	//sacales los datos
	getSelectedElementsInnerData();
	console.log("/////////////////////////////////////////////");
}
//remplazare luego

function getSelectedElementsInnerData(){
	//ya tengo el array en lugar de seleccionado es seleccionados
	clasesSeleccionadas = null;
	clasesSeleccionadas = [];
	elementsIdSeleccionados = null;
	elementsIdSeleccionados = [];
	tiposDeElementosSeleccionados = null;
	tiposDeElementosSeleccionados = [];
	lastSeleccionLength = seleccion.length;
	for(var i=0; i<seleccion.length; i++){
		//console.log(window.getMatchedCSSRules(seleccion[i]));
		
		if( seleccion[i].className != "" ){
			var clasesSeleccionadasInternas = seleccion[i].className;
			
			var check = false;
			var primeraLetra = null;
			for(var j=0; j<clasesSeleccionadasInternas.length; j++){
				if(clasesSeleccionadasInternas[j]==' '){
					if(check == true){
						var newClass = ".".concat(clasesSeleccionadasInternas.substring(primeraLetra, j));
						if ((jQuery.inArray(newClass, clasesSeleccionadas)) == -1 && newClass != ".seleccionado")
							clasesSeleccionadas.push(newClass);
						primeraLetra=null;
						check = false;
					}
				}else{
					check = true;
					if(primeraLetra==null)primeraLetra = j;
				}
			}
			if(check == true){
				var newClass = ".".concat(clasesSeleccionadasInternas.substring(primeraLetra, clasesSeleccionadasInternas.length));
				if ((jQuery.inArray(newClass, clasesSeleccionadas)) == -1 && newClass != ".seleccionado")
					clasesSeleccionadas.push(newClass);
				primeraLetra=null;
			}
			//alert("Id: "+seleccion[i].id +", Clase: "+ seleccion[i].className+", NodeName: "+seleccion[i].nodeName)
		}	
		if(seleccion[i].nodeName != ""){
			if ((jQuery.inArray(seleccion[i].nodeName, tiposDeElementosSeleccionados)) == -1)
							tiposDeElementosSeleccionados.push(seleccion[i].nodeName);
		}
		if(seleccion[i].id != " " && seleccion[i].id != "" && seleccion[i].id != "undefined"){
			if ((jQuery.inArray(seleccion[i].id, elementsIdSeleccionados)) == -1)
							elementsIdSeleccionados.push("#".concat(seleccion[i].id));
		}
		
	}
}


function colectorDeBasura(estilo){
	if(estilo.length==0) return;
	//movamos estas cosas para no borrarlas
	var selectStyles = $("#ui-widget-Su-Id");
	$(".propertiesContainer").append(selectStyles);
	var selectArchivos = $("#tags").parent();
	selectArchivos.css('display', 'none');
	$(".propertiesContainer").append(selectArchivos);
	
	
	var selectores = estilo.children().first().children().first().children("a");
	if(selectores.length > 0){
		//continua 
		var propiedades = estilo.find("table.styleRule tbody").children();
		if(propiedades.length > 0) return;
	}
	//borralo !!!!!
	var styleSheet = jQuery.data(estilo[0],"styleSheet");
	document.getElementsByTagName('head')[0].removeChild(styleSheet.style);
	estilo.remove();
}