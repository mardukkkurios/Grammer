//**********ONLOAD FUNCTION**********************************//
var clases;
var tiposDeElementos;	
var elementsId;
var penUltimaCadenaFuncional=" ";
var ultimaCadenaFuncional="";
var palabrasFuncionales = 0;
var subPalabrasFuncionales = 0;
var status = 1;
var lastStatus = 0;

function ocupaCambio(){
	var input = document.getElementById("EscribeCssTextbox");
	var text = input.value;

	var it=0;
	var len = text.length;
	while(it<len){
		if(text[it]!=' ')break;
		it++;
	}
    var pos = 0;
	var check = false;
	var arrayResultante="";
	for( ; it<len; it++){
		if(text[it]!=' '){
			arrayResultante += text[it];
            pos++;
            check = true;
		}else{
			if(check==true ){
				arrayResultante += text[it];
				check=false;
				pos++;
			}
		}
	}
	if(pos>0)if(arrayResultante[arrayResultante.length-1]==' ')
		text = arrayResultante.substring(0, arrayResultante.length-1);
	else text = arrayResultante;


	if(text=="" || text==null){
		status = 1;
		document.getElementById("div17").innerHTML = "Status: "+status;
		cargaTodosLosIdsClasesYElementos();
		return;
	}else{
		//alert("Texto: "+text);
		var ultimo = text[text.length-1];
		var select = "";
		if(ultimo!='.' && ultimo!='#')
		 	select = document.querySelectorAll(text);
		if(select.length > 0){
			document.getElementById("message").innerHTML = "CORRECTO";
			ultimaCadenaFuncional = text;
			palabrasFuncionales = countWordsIn(ultimaCadenaFuncional);
			subPalabrasFuncionales = lastWordSubCount(ultimaCadenaFuncional);
			status = 1;
			document.getElementById("div17").innerHTML = "Status: "+status;
			cargaTodosLosIdsClasesYElementos();
			return;
		}else{
			document.getElementById("message").innerHTML = "Incorrecto";
			if(text.indexOf(ultimaCadenaFuncional)==-1){
				document.getElementById("message").innerHTML = "reload raiz";
				len = text.length;
				if(ultimaCadenaFuncional.length < len) len = ultimaCadenaFuncional.length;
				var max=0;
				while(max<len){
					if(ultimaCadenaFuncional[max]!=text[max])break;
					max++;
				}
				max--;
				while(max>0){
					if(!(text[max]=='#'||text[max]=='.'||text[max]==' '))break;
					max--;
				}
				if(max<0)max=0;
				if(!(text[max]=='#'||text[max]=='.'||text[max]==' '))max++;
				if(max>0) ultimaCadenaFuncional = text.substring(0,max);
				else ultimaCadenaFuncional = "";
			}
				if(ultimaCadenaFuncional==""){
					status = 1;
					document.getElementById("div17").innerHTML = "Status: "+status;
					cargaTodosLosIdsClasesYElementos();
					return;
				}	
				//ultima cadena sigue intacta
				var temp = text.substring(ultimaCadenaFuncional.length);
				document.getElementById("message").innerHTML = temp;
				switch (temp[0]){
					case '#': status = 3; break;
					case '.': status = 4; break;
					case ' ': status = 1; break;
					default: status = 0; break;
				}
				document.getElementById("div17").innerHTML = "Status: "+status;
				cargaTodosLosIdsClasesYElementos();
				return;
		}
	}
}
function lastWordSubCount(temp){
	var cont = 0;
	var len = temp.length;
	var ini;
	var check = false;
	for(ini=len-1; ini>=0; ini--){
		if(check==false){
			if(temp[ini]!=' ')check=true;
		}else{
			if(temp[ini]==' ')break;
		}
	}
	if(temp[ini]==' ')ini+=2;
	cont = 1;
	if(ini>=len)return cont;
	
	for(var i = ini; i<len; i++){
		if(temp[i]=='#'|| temp[i]=='.'){
			cont++;
		}
	}
	return cont;
}
function countWordsIn(temp){
	var cont = 0;
	var len = temp.length;
	var check = false;
	for(var i = 0; i<len; i++){
		if(temp[i]!=' '){
			if(check == false){
				cont++;
				check=true;
			}
		}else{
			check=false;
		}
	}
	return cont;
}

function cargaTodosLosIdsClasesYElementos(e){
	if(status == lastStatus && ultimaCadenaFuncional== penUltimaCadenaFuncional) return; 
	lastStatus = status;
	penUltimaCadenaFuncional = ultimaCadenaFuncional;
	
	switch (status){
		case '1':
			select = document.querySelectorAll(ultimaCadenaFuncional+" *");
		break;
		case '3':
			select = document.querySelectorAll(ultimaCadenaFuncional); //#
		break;
		case '4':
			select = document.querySelectorAll(ultimaCadenaFuncional); //.
		break;
		default:
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
