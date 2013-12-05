//**********ONLOAD FUNCTION**********************************//
var clases;
var tiposDeElementos;	
var elementsId;
var penUltimaCadenaFuncional=" ";
var ultimaCadenaFuncional="";
//var palabrasFuncionales = 0;
//var subPalabrasFuncionales = 0;
var precadena = "#interfazDeEdicion ";
var status = 1;
var lastStatus = 0;



var focusGained = false;
function miFocusInicio(){
	if(focusGained == true)return;
	//alert("focus");
	focusGained=true;
	cargaTodosLosIdsClasesYElementos();
	//$("#EscribeCssTextbox").keydown();
	//input.autocomplete( "search", "" );
	//alert("Focus Gained");
}
var lastText = "";
function miTextChanged(){
	var input = $("#EscribeCssTextbox");
	text = input.val();
	//revisa si hay comas
	var regex = new RegExp(",+");
	if (regex.test(text)) {
		input.val() = text.replaceAll(","," ");
	}
	//if(focusGained == false)return;
	//alert(event.which);
	if(lastText === input.val()) return;
	lastText = input.val();
	ocupaCambio();
	
}
function miFocusTerminoAgregar(){
	if(focusGained==false)
		return;
	focusGained=false;
	selector = $("#ui-widget-Su-Id");
	selector.css('display', 'none');
	//	borralo
	if(isBlank($("#EscribeCssTextbox").val())){
		var textNodeLink = jQuery.data(selector.prev()[0],"textNode");
		
		if(textNodeLink.parentNode.firstChild !=textNodeLink){//revisa si hay mas de un elemento			
			if(textNodeLink.nodeValue[textNodeLink.nodeValue.length-1]!=',')//revisa que SI exista la coma
			{
				var antTextNode = textNodeLink.previousSibling;//toma el elemento de atras para ponerle la coma
				if(antTextNode.nodeValue[antTextNode.nodeValue.length-1]==',')
					antTextNode.nodeValue = antTextNode.nodeValue.substring(0,antTextNode.nodeValue.length-1);
			}
		}
		textNodeLink.parentNode.removeChild(textNodeLink);
		selector.prev().remove();
		return;
	}else{
	//Cambia su contenido
		var result = $("#EscribeCssTextbox").val();
		cambiaContenidoDelSelector(result, selector.prev());
	}
}
function cambiaContenidoDelSelector(newValue, link){
	link.text(newValue)
		.attr({"title" : newValue})
		.css('display', 'block');
	newValue = precadena + newValue;
	var textNodeLink = jQuery.data(link[0],"textNode");
	if(textNodeLink.nextSibling.nodeValue=="{")//si es ultimo
		textNodeLink.nodeValue = newValue;
	else textNodeLink.nodeValue = newValue+",";
	
	if(textNodeLink.parentNode.firstChild !=textNodeLink){//revisa que no estemos modificando el -1
		var antTextNode = textNodeLink.previousSibling;//toma el elemento de atras para ponerle la coma
		if(antTextNode.nodeValue[antTextNode.nodeValue.length-1]!=',')//revisa que SI exista la coma
			antTextNode.nodeValue = antTextNode.nodeValue + ",";
	}
	jQuery.data(link.parent().parent().parent()[0],"styleSheet").comprimeSelector();
}
function ocupaCambio(){

	var input = $("#EscribeCssTextbox");
	var text = input.val();
	//alert("."+text+".");
	//recorre iterador hasta la primera letra o a len
	var it=0;
	var len = text.length;
	while(it<len){
		if(text[it]!=' ')break;
		it++;
	}
	//si cadena vacia o espacios "           "
	if (it == len){
	//llena con todo
		status = 1;
		ultimaCadenaFuncional = "";
		cargaTodosLosIdsClasesYElementos();
		return;
	}
	//comprime cadena, ponla en la cadena text
    var pos = 0;
	var check = false;
	var arrayResultante="";
	for( ; it<len; it++){
		if(text[it]!=' '){//concatena las todas letras
			arrayResultante += text[it];
            pos++;
            check = true;
		}else{
			if(check==true ){//concatena solo el primer espacio que encuentres despues de las letras
				arrayResultante += text[it];
				check=false;
				pos++;
			}
		}
	}
	//elimina el ultimo espacio. Si existe claro
	if(pos>0)if(arrayResultante[arrayResultante.length-1]==' ')
		text = arrayResultante.substring(0, arrayResultante.length-1);
	else text = arrayResultante;
	
	//procesemos para ver hasta donde es valido
	var ultimo = text[text.length-1]; //ultimo caracter
	var select = "";
	if(ultimo!='.' && ultimo!='#') //trata de hacer la consulta
		select = document.querySelectorAll(precadena + text);
		//alert("Len "+select.length);
	if(select.length > 0){ //si devolvio algo
		ultimaCadenaFuncional = text;
		status = 1;
		cargaTodosLosIdsClasesYElementos();
		return;
	}else
	{ 	//si no devolvio nada puede estar bien parcialmente. Casi todos caen aqui
		//reducelo hasta la parte funcional cercana lejana posible
		var ultimaLetra = ' ';
		if(text.indexOf(ultimaCadenaFuncional)==-1){ // si no encontro completa a ultima cadena funcional
			
			//compara la cadena vieja y nueva hasta que punto son iguales
			len = text.length;
			if(ultimaCadenaFuncional.length < len) len = ultimaCadenaFuncional.length;
			var max=0;
			while(max<len){//llegamos al punto diferente rompemos
				if(ultimaCadenaFuncional[max]!=text[max])break;
				max++;
			}
			
				//si la diferencia toca una letra esa palabra se echo a perder
				while(max>0){
					if(ultimaCadenaFuncional[max]=='#'||ultimaCadenaFuncional[max]=='.'||ultimaCadenaFuncional[max]==' ')break;
					max--;
				}
				//borra los signos y espacios de lo que quede a la orilla
				while(max>0){
					if(!(ultimaCadenaFuncional[max]=='#'||ultimaCadenaFuncional[max]=='.'||ultimaCadenaFuncional[max]==' '))break; 
					//Mientras caracter es ['.', ' ', '#'] -> CONTINUA max--;
					//rompe si estoy en letras
					max--;
				}
				if(max<0){
					ultimaCadenaFuncional = "";
					status = 1;
					cargaTodosLosIdsClasesYElementos();
					return;
				}else{
					//if(!(text[max]=='#'||text[max]=='.'||text[max]==' '))
						max++;//si letra, incrementa uno por la cuestion de longintud
						ultimaLetra = ultimaCadenaFuncional[max];
						ultimaCadenaFuncional = ultimaCadenaFuncional.substring(0,max);
						//alert(ultimaCadenaFuncional);
					//else ultimaCadenaFuncional = "";
				}
		}
		//Para este punto sabemos que ultimaCadenaFuncionalEstaActualizada
		//si vacia carga todo
			if(ultimaCadenaFuncional==""){
				status = 1;
				cargaTodosLosIdsClasesYElementos();
				return;
			}	
			//ultima cadena contiene algo
			switch (ultimaLetra){
				case '#': status = 3; break;
				case '.': status = 4; break;
				case ' ': status = 1; break;
				default: status = 0; break;
			}
			//alert(status+ultimaLetra);
			cargaTodosLosIdsClasesYElementos();
			return;
		
	}
	
}

function cargaTodosLosIdsClasesYElementos(e){
	if(status == lastStatus && ultimaCadenaFuncional== penUltimaCadenaFuncional) return; 
	lastStatus = status;
	penUltimaCadenaFuncional = ultimaCadenaFuncional;
	
	switch (status){
		case '1':
			select = document.querySelectorAll(precadena + ultimaCadenaFuncional+" *");
			//alert("o1");
		break;
		case '3':
			select = document.querySelectorAll(precadena + ultimaCadenaFuncional); //#
			//alert("o2");
		break;
		case '4':
			select = document.querySelectorAll(precadena + ultimaCadenaFuncional); //.
			//alert("o3");
		break;
		default:
		//alert(ultimaCadenaFuncional);
			//alert(status + "ESTO NO DEBERIA DE PASAR, LLAMA A LA POLICIA !!! ");
			return;
		break;
	}	
		
	clases = null;
	clases = [];
	elementsId = null;
	elementsId = [];
	tiposDeElementos = null;
	tiposDeElementos = [];
	for(var i=0; i<select.length; i++){
		if( select[i].className != "" ){
			var clasesInternas = select[i].className;
			
			var check = false;
			var primeraLetra = null;
			for(var j=0; j<clasesInternas.length; j++){
				if(clasesInternas[j]==' '){
					if(check == true){
						if ((jQuery.inArray(clasesInternas, clases)) == -1)
							clases.push(".".concat(clasesInternas.substring(primeraLetra, j)));
						primeraLetra=null;
						
					}
				}else{
					check = true;
					if(primeraLetra==null)primeraLetra = j;
				}
			}
			if(check == true){
				clases.push(".".concat(clasesInternas.substring(primeraLetra, clasesInternas.length)));
				primeraLetra=null;
			}
			//alert("Id: "+select[i].id +", Clase: "+ select[i].className+", NodeName: "+select[i].nodeName)
		}	
		if(select[i].nodeName != ""){
			if ((jQuery.inArray(select[i].nodeName, tiposDeElementos)) == -1)
							tiposDeElementos.push(select[i].nodeName);
		}
		if(select[i].id != " " && select[i].id != "" && select[i].id != "undefined"){
			if ((jQuery.inArray(select[i].id, elementsId)) == -1)
					if(select[i].id.indexOf("_3L3M3NTO_P4R4_B0RR4R_")==-1)
							elementsId.push("#".concat(select[i].id));
		}
		
	}
	//for(var i=0; i<elementsId.length; i++){
		//alert(elementsId[0]);
	//}
	llenaSelect();
}
function llenaSelect(){
/********
Dependiendo de status, esta seccion llena el combobox con:
	*
	var clases;
	var tiposDeElementos;	
	var elementsId;
- Parametros
	var mensaje;
	onload: 
	*						(necesary)
	"#interfazDeEdicion *" 	(todo)
	
	De aqui puede poner algo real o inexistente. Inexistente no cambian los selectores internos no importa que sea
		
		En el momento que escribe algo que si existe. Unicamente la linea funcional. 
	

********/
//alert("hello");
var prestring = "";
switch (status){
	case '1':
		// *
		//no borras nada
		prestring = ultimaCadenaFuncional + " ";
	break;
	case '3':
		//#
		clases = "";
		tiposDeElementos = "";
		prestring = ultimaCadenaFuncional;
	break;
	case '4':
		//.
		tiposDeElementos = "";	
		elementsId = "";
		prestring = ultimaCadenaFuncional;
	break;
	default:
		return;
	break;
}
	var contenedor = document.getElementById("combobox");
	contenedor.innerHTML = "";
	{
		if(ultimaCadenaFuncional != ""){
			var variable = ultimaCadenaFuncional + " ";
			var node=document.createElement("OPTION");
			node.value = variable;
			var textnode = document.createTextNode(variable);
			node.appendChild(textnode);
			contenedor.appendChild(node);
		}
		
		if(ultimaCadenaFuncional[ultimaCadenaFuncional.length-1] != '*'){
			var variable = ultimaCadenaFuncional + " *";
			var node=document.createElement("OPTION");
			node.value = variable;
			var textnode = document.createTextNode(variable);
			node.appendChild(textnode);
			contenedor.appendChild(node);
		}
	}
	//alert(tiposDeElementos.length +"  "+elementsId.length+"  "+clases.length);
	for(var i=0; i<tiposDeElementos.length; i++){
		var node=document.createElement("OPTION");
		node.value = prestring + tiposDeElementos[i];
		var textnode=document.createTextNode(prestring + tiposDeElementos[i]);
		node.appendChild(textnode);		
		contenedor.appendChild(node);
		//<option value="ActionScript">ActionScript</option>
	}
	for(var i=0; i<elementsId.length; i++){
		var node=document.createElement("OPTION");
		node.value = prestring + elementsId[i];
		var textnode=document.createTextNode(prestring + elementsId[i]);
		node.appendChild(textnode);		
		contenedor.appendChild(node);
		//<option value="ActionScript">ActionScript</option>
	}
	for(var i=0; i<clases.length; i++){
		var node=document.createElement("OPTION");
		node.value = prestring + clases[i];
		var textnode=document.createTextNode(prestring + clases[i]);
		node.appendChild(textnode);		
		contenedor.appendChild(node);
		//<option value="ActionScript">ActionScript</option>
	}
	
}
