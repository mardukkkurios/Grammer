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
	
	this.getSelectorsArray = getSelectorsArray;
	function getSelectorsArray(){
		var result = [];
		var selectores = $(this.propertiesContainer).find(".selectors>a");
		//console.log("···································");
		selectores.each(function( index ) {
		  //console.log( index + ": " + $( this ).text() );
		  result.push($( this ).text().toLowerCase());
		});
		//console.log("···································");
		return result
	}
	this.toString = toString;
	function toString(){
		 //result = this.cadSelectorComprimido+"\n";
		 result = "";
		 array = this.getSelectorsArray();
		 for(var i=0; i<array.length; i++){
			result += array[i] + ",\n";
		 }
		 result = result.substring(0, result.length-2);
		 result+="\n";
		 result+= "{\n";
		 var filas = $(this.propertiesContainer).find("tr");
		 filas.each(function(){
			var link1 = $(this).children().first() // el td inicial
					.children().first(); // el link que ocupo
			var link2 = $(this).children().last() // el td final
					.children().first(); // el link que ocupo
			result+= "\t"+ link1.text().toLowerCase() +" : "+ link2.text().toLowerCase() +";\n";
		 });
		result+= "}\n\n\n";
		return result
	}
	
	return this;
}
