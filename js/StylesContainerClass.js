/*var j = StyleContainer();
j.addSelector("#ParaModificar");
j.addProperty("background-color","#F80808");
j.addProperty("margin","50px");
j.addProperty("padding","50px");
j.addProperty("border","10px");
j.generateCSS();
/*
 style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '#ParaModificar { background-color: #F80808; margin: 50px; padding: 50px; border: 10px;}';
document.getElementsByTagName('head')[0].appendChild(style);
*/
//document.getElementById('someElementId').className = 'cssClass';
function propertiesContainerData(myContainer){
	this.propertiesContainer = myContainer;
	//alert(dad.prop('class'));
	this.style = document.createElement('style');
	this.style.type = 'text/css';
	this.style.innerHTML = '';
	document.getElementsByTagName('head')[0].appendChild(this.style);
	this.cadSelectorComprimido = "";
	
	
	this.comprimeSelector = comprimeSelector;
	function comprimeSelector(){
		var cad = this.style.innerHTML;
		var llave = cad.indexOf("{");
		if(llave==-1){
			this.cadSelectorComprimido = "";
			return;
		}
		cad = cad.substring(0, llave).toLowerCase();
		//comiienza proceso de compresion
		var newcad = "";
		var len = cad.length;
		var check = false;
		for(var i = 0; i<len; i++){
			if(cad[i]==' '){
				if(check==true){
					newcad += cad[i];
				}
				check=false;
			}else{
				
				if(cad[i]==','){ 
					if(newcad[newcad.length-1]==' '){
						newcad[newcad.length-1] = ',';
					}else{
						newcad+=',';
					}
					newcad+=' ';
					check=false;
				}else{
					check=true;
					newcad += cad[i];
				}
			}
		}
		this.cadSelectorComprimido = newcad;
	}
	
	/* //esto funciona bien pero no lo he ocupado hasta ahora. Esta en lista de posibles a borrar
	this.getSelectorsArray = getSelectorsArray;
	function getSelectorsArray(){
		var result = [];
		var selectores = $(this.propertiesContainer).find(".selectors>a");
		//console.log("···································");
		selectores.each(function( index ) {
		  //console.log( index + ": " + $( this ).text() );
		  result.push($( this ).text());
		});
		//console.log("···································");
		return result
	}*/
	this.toString = toString;
	function toString(){
		 result = "";
		 result = "se supone que esto regresa el string de todo";
	/*	 len = this.selectors.length;
		for( var i = 0 ; i<len; i++){
			result.concat(this.selectors[i]);
			if((i+1) <len ) result.concat(",\n");
			else result.concat("\n");
		}
		///////propiedades
		result.concat("{\n");
		 len = this.properties.length;
		for( var i = 0 ; i<len; i++){
			result.concat(this.properties[i][0], ":", this.properties[i][0], ";\n");
		}
		result.concat("}\n");*/
		return result
	}
	this.apply = apply;
	function apply(){
		//alert("hola");
		this.style.innerHTML = this.toString();
	}
	return this;
}

function StyleContainer2(){
	this.style = document.createElement('style');
	this.style.type = 'text/css';
	this.style.innerHTML = '';
	document.getElementsByTagName('head')[0].appendChild(style);
	
	this.selectors = [];		// list
	this.properties = [];	// list
	//////////
	this.addSelector = addSelector;
	this.removeSelector = removeSelector;
	this.aditSelector = editSelector;
	function addSelector(selector){
		return this.selectors.push(selector);
	}
	function removeSelector( i){
		return this.selector.splice(i, 1);
	}
	function editSelector( i,  selector){
		this.selector[i] = selector;
		return true;
	}
	//////
	this.addProperty = addProperty;
	this.removeProperty = removeProperty;
	this.aditProperty = editProperty;
	function addProperty( propertyName,  value){
		if(propertyName == "" || value == "")return false
		return this.properties.push(propertyName, value);
	}
	function removeProperty( i){
		return this.properties.splice(i, 1);
	}
	function editProperty( i,  property){
		if(propertyName == "" || value == ""){
			this.removeProperty(i);
			return false;
		}
		this.properties[i] = property;
		return true;
	}
	///////
	this.toString = toString;
	function toString(){
		 result = "";
		 len = this.selectors.length;
		for( var i = 0 ; i<len; i++){
			result.concat(this.selectors[i]);
			if((i+1) <len ) result.concat(",\n");
			else result.concat("\n");
		}
		///////propiedades
		result.concat("{\n");
		 len = this.properties.length;
		for( var i = 0 ; i<len; i++){
			result.concat(this.properties[i][0], ":", this.properties[i][0], ";\n");
		}
		result.concat("}\n");
		return result
	}
	this.generateCSS = generateCSS;
	function generateCSS(){
		document.write(this.toString());
	}
	this.apply = apply;
	function apply(){
		alert("hola");
		this.style.innerHTML = this.toString();
	}
	return this;
}