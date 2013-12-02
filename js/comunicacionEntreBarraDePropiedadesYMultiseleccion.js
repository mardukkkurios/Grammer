/*
QUE NOMBRE TAN LARGO !
	archivos relacionados: // no se puso en el mismo ya que lic esta juntando los codigos. Para hacer esto mas facilmente integrable.		
	
*/
//seleccion // es el array que contiene a todos los seleccionados
var clasesSeleccionadas;
var tiposDeElementosSeleccionados;	
var elementsIdSeleccionados;

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
			}
		}
	}
	//obtener todos los cadSelectorComprimido de los stylesheets complejidad lineal
	var myOwnRules = [];
	var myRuleActive = [];
	var styles = $(".propertiesContainerForSorting .styleSheetContainer");
	styles.each(function( index ) {
		  styleSheet = jQuery.data($(this)[0],"styleSheet");
		  console.log("myStyles: "+styleSheet.cadSelectorComprimido);
		  myOwnRules.push(styleSheet.cadSelectorComprimido);
		  myRuleActive.push(false);
		});
	
	//revisa coinsidencias Cuadratico
	var len = rules.length;
	var len2 = myOwnRules.length;
	for(var i=0; i<len; i++){ // por cada rule que me dio el  CSSMatcher
		for(var j=0; j<len2; j++){
			if(!myRuleActive[j])
				if(rules[i]==myOwnRules[j])
					myRuleActive[j]=true;
		}
	}
	//imprime resultados
	for(var i=0; i<rules.length; i++){
		if(myRuleActive[i]){
			$(styles[i]).css('display', 'block');
		}else{
			$(styles[i]).css('display', 'none');
			//console.log(" "+i+":"+rules[i]);
			}
		}
	//}
}
//remplazare luego
/*
function llamarCadaVezQueSeAgregueElementoALaSeleccion(){
	//ya tengo el array en lugar de seleccionado es seleccionados
	clasesSeleccionadas = null;
	clasesSeleccionadas = [];
	elementsIdSeleccionados = null;
	elementsIdSeleccionados = [];
	tiposDeElementosSeleccionados = null;
	tiposDeElementosSeleccionados = [];
	for(var i=0; i<seleccion.length; i++){
		console.log(window.getMatchedCSSRules(seleccion[i]));
		
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
	reordenarBarraDePropiedadesPorSeleccion();
}
*/
function reordenarBarraDePropiedadesPorSeleccion(){
	return;
	var styles = $(".propertiesContainerForSorting .styleSheetContainer");
	//console.log("buajajaja");
	styles.each(function( index ) {
		  styleSheet = jQuery.data($(this)[0],"styleSheet");
		  var array = styleSheet.getSelectorsArray();
		  // si en alguno de los elementos de array (selectores de style) encontramos
			// algun elemento de los 3 arrays que construi
			var check = false;
			for(var i=0; !check && i<elementsIdSeleccionados.length; i++){
				//console.log(elementsIdSeleccionados[i]);
			}
			if(check==false)
			for(var i=0; !check && i<clasesSeleccionadas.length; i++){
				//console.log(clasesSeleccionadas[i]);
			}
			if(check==false)
			for(var i=0; !check && i<tiposDeElementosSeleccionados.length; i++){
				//console.log(tiposDeElementosSeleccionados[i]);
			}
		});
	//console.log("buajajaja2");
	
	//console.log("/****DATOS AQUI ABAJO*******************/");
	for(var i=0; i<elementsIdSeleccionados.length; i++){
		//console.log(elementsIdSeleccionados[i]);
	}
	for(var i=0; i<clasesSeleccionadas.length; i++){
		//console.log(clasesSeleccionadas[i]);
	}
	for(var i=0; i<tiposDeElementosSeleccionados.length; i++){
		//console.log(tiposDeElementosSeleccionados[i]);
	}
	//console.log("///////////////////////////////////////////////////");
}