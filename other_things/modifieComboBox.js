//**********ONLOAD FUNCTION**********************************//
var select;
window.onload=function(){			
	//BARRA DE PROPIEDADES
	//alert("Hola");
	temp = document.getElementById("combobox");
	temp.addEventListener('onfocus', cargaTodosLosIdsClasesYElementos, false);
	//cargaTodosLosIdsClasesYElementos();
	/*temp = document.getElementById("interfazDeEdicion");
	temp.addEventListener('dragenter', handleDragEnter, false);
	temp.addEventListener('dragover', handleDragOver, false);
	temp.addEventListener('dragleave', handleDragLeave, false);
	temp.addEventListener('drop', handleDrop, false);
	temp.addEventListener('dragend', handleDragEnd, false);
	*/
	};
var currentSelectorModifed = false;
var currentSelector = "#interfazDeEdicion *";
var clases;
var tiposDeElementos;	
var elementsId;
function isValidTypedSelector(e){
	input = document.getElementById("#EscribeCss");
	select = document.querySelectorAll(input.text);
	alert("hi".concat(select));
	if(select!= null && select!= "" && select!= " "){
		currentSelector = input.value;
		cargaTodosLosIdsClasesYElementos(e);
	}
}
function cargaTodosLosIdsClasesYElementos(e){
	select = document.querySelectorAll(currentSelector);
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
	var contenedor = document.getElementById("combobox");
	contenedor.innerHTML = "";
	for(var i=0; i<tiposDeElementos.length; i++){
		var node=document.createElement("OPTION");
		node.value = tiposDeElementos[i];
		var textnode=document.createTextNode(tiposDeElementos[i]);
		node.appendChild(textnode);		
		contenedor.appendChild(node);
		//<option value="ActionScript">ActionScript</option>
	}
	for(var i=0; i<elementsId.length; i++){
		var node=document.createElement("OPTION");
		node.value = elementsId[i];
		var textnode=document.createTextNode(elementsId[i]);
		node.appendChild(textnode);		
		contenedor.appendChild(node);
		//<option value="ActionScript">ActionScript</option>
	}
	for(var i=0; i<clases.length; i++){
		var node=document.createElement("OPTION");
		node.value = clases[i];
		var textnode=document.createTextNode(clases[i]);
		node.appendChild(textnode);		
		contenedor.appendChild(node);
		//<option value="ActionScript">ActionScript</option>
	}
	
}