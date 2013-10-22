//*******Global variables for drag and drop*******////
var dragSrcEl = null;
var dragOrigin = 0;
var seleccion = new Array();
var clipboard= new Array();

//**********ONLOAD FUNCTION**********************************//
window.onload=function(){			
	//DEBUG
	debug = document.getElementById("debug");
	//PALETA
	objetosPaleta = document.querySelectorAll('#interfazDeObjetos *');
	[].forEach.call(objetosPaleta, function(obj) {
		obj.draggable = true;
		obj.addEventListener('dragstart', handleDragStart, false);
		obj.addEventListener('dragend', handleDragEnd, false);
	});
	//INTERFAZ DE EDICION
	temp = document.getElementById("interfazDeEdicion");
	temp.addEventListener('dragenter', handleDragEnter, false);
	temp.addEventListener('dragover', handleDragOver, false);
	temp.addEventListener('dragleave', handleDragLeave, false);
	temp.addEventListener('drop', handleDrop, false);
	temp.addEventListener('dragend', handleDragEnd, false);
	
	temp=document.getElementsByTagName("body");
	temp[0].addEventListener("keydown",handleKeyDown,false);
	
	//TOOLS
	tools = document.querySelectorAll('.tools  ul li a img');
	[].forEach.call(tools, function(obj) {
		obj.draggable = false;
	});
};

//**********DRAG EVENTS**************************************//
function handleDragStart(e) {
  this.style.opacity = '0.4';  // this / e.target is the source node.
  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'copy';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
	if (e.preventDefault) {
		e.preventDefault(); // Necessary. Allows us to drop.
	}
	if(dragSrcEl!=null){
		this.classList.add('over');
	} 
	return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  if(dragSrcEl!=null){this.classList.add('over');}
}

function handleDragLeave(e) {
  if(dragSrcEl!=null){this.classList.remove('over');}  // this / e.target is previous target element.
}

function handleDrop(e) {
  // this / e.target is current target element.
	var t=document.getElementsByClassName('over');
	for(var i=0;i<t.length;i++){
		t[i].classList.remove('over');
	}
	
	if (e.stopPropagation) {
		e.stopPropagation(); // Stops some browsers from redirecting.
	}
	
	if(dragSrcEl!=null)
	{//falta seleccion multiple
		var temp;
		if(e.dataTransfer.effectAllowed=='copy'){
			// Set the source column's HTML to the HTML of the column we dropped on.
			temp = document.importNode(dragSrcEl, true);
			addEvents(temp);
		}
		if(e.dataTransfer.effectAllowed=='move')temp=dragSrcEl;
		temp.style.opacity = "1.0";
		this.appendChild(temp);

		dragSrcEl=null;
		dragOrigin=0;
		e.dataTransfer.clearData();
	}
	return false;
}

function handleDragEnd(e){
	this.style.opacity = '1.0';  // this / e.target is the source node.
}

////********Resize and Move********/////////
function handleDragEndForResize(e) {
	var newPaddingX;
	var newPaddingY;
	var oldPaddingLeft   = isNaN(parseInt(this.style.paddingLeft))?0:parseInt(this.style.paddingLeft);
	var oldPaddingRight  = isNaN(parseInt(this.style.paddingRight))?0:parseInt(this.style.paddingRight);
	var oldPaddingTop    = isNaN(parseInt(this.style.paddingTop))?0:parseInt(this.style.paddingTop);
	var oldPaddingBottom = isNaN(parseInt(this.style.paddingBottom))?0:parseInt(this.style.paddingBottom);
	switch(dragOrigin)
	{
		case 1: newPaddingX=oldPaddingLeft-parseInt(e.offsetX)+"px";
				this.style.paddingLeft=parseInt(newPaddingX)<0?"0px":newPaddingX;
				newPaddingY=oldPaddingTop-parseInt(e.offsetY)+"px";
				this.style.paddingTop=parseInt(newPaddingY)<0?"0px":newPaddingY;
				break;
		case 2:	newPaddingY=oldPaddingTop-parseInt(e.offsetY)+"px";
				this.style.paddingTop=parseInt(newPaddingY)<0?"0px":newPaddingY;
				break;
		case 3:	newPaddingX=oldPaddingRight+(parseInt(e.offsetX)-parseInt(this.offsetWidth))+"px";
				this.style.paddingRight=parseInt(newPaddingX)<0?"0px":newPaddingX;
				newPaddingY=oldPaddingTop-parseInt(e.offsetY)+"px";
				this.style.paddingTop=parseInt(newPaddingY)<0?"0px":newPaddingY;
				break;
		case 4:	newPaddingX=oldPaddingLeft-parseInt(e.offsetX)+"px";
				this.style.paddingLeft=parseInt(newPaddingX)<0?"0px":newPaddingX;
				break;
		case 5:	break;
		case 6:	newPaddingX=oldPaddingRight+(parseInt(e.offsetX)-parseInt(this.offsetWidth))+"px";
				this.style.paddingRight=parseInt(newPaddingX)<0?"0px":newPaddingX;
				break;
		case 7:	newPaddingX=oldPaddingLeft-parseInt(e.offsetX)+"px";
				this.style.paddingLeft=parseInt(newPaddingX)<0?"0px":newPaddingX;
				newPaddingY=oldPaddingBottom+(parseInt(e.offsetY)-parseInt(this.offsetHeight))+"px";
				this.style.paddingBottom=parseInt(newPaddingY)<0?"0px":newPaddingY;
				break;
		case 8: newPaddingY=oldPaddingBottom+(parseInt(e.offsetY)-parseInt(this.offsetHeight))+"px";
				this.style.paddingBottom=parseInt(newPaddingY)<0?"0px":newPaddingY;
				break;
		case 9:	newPaddingX=oldPaddingRight+(parseInt(e.offsetX)-parseInt(this.offsetWidth))+"px";
				this.style.paddingRight=parseInt(newPaddingX)<0?"0px":newPaddingX;
				newPaddingY=oldPaddingBottom+(parseInt(e.offsetY)-parseInt(this.offsetHeight))+"px";
				this.style.paddingBottom=parseInt(newPaddingY)<0?"0px":newPaddingY;
				break;
	}
	dragOrigin=0;
	this.style.opacity = '1.0';
	return false;
}

function handleDragStartForResize(e){
	if(this==e.target){
		dragOrigin=9;
		if(e.offsetY<this.offsetHeight-10){dragOrigin=6;}
		if(e.offsetY<10){dragOrigin=3;}
		if(e.offsetX<this.offsetWidth-10){ 
			dragOrigin=8;
			if(e.offsetY<this.offsetHeight-10){
				dragOrigin=5;
				moving=true;
				this.style.opacity = '0.4';  // this / e.target is the source node.
				dragSrcEl = this;
				e.dataTransfer.effectAllowed = 'move';
				e.dataTransfer.setData('text/html', this.innerHTML);
			}
			if(e.offsetY<10){
				dragSrcEl=null;
				dragOrigin=2;
				e.dataTransfer.clearData();
			}
		}
		if(e.offsetX<10){
			dragSrcEl=null;
			dragOrigin=7;
			e.dataTransfer.clearData();
			if(e.offsetY<this.offsetHeight-10){dragOrigin=4;}
			if(e.offsetY<10){dragOrigin=1;}
		}
	}
	return false;
}

function handleDropForMove(e) {
  // this / e.target is current target element.
	var t=document.getElementsByClassName('over');
	for(var i=0;i<t.length;i++){
		t[i].classList.remove('over');
	}
	
	if (e.stopPropagation) {
		e.stopPropagation(); // Stops some browsers from redirecting.
	}
	
	var temp=null;
	if(e.dataTransfer.effectAllowed=='copy'){
		temp=document.importNode(dragSrcEl,true);
		addEvents(temp);
	}
	if(e.dataTransfer.effectAllowed=='move'){
		//esto tiene que cambiar para multiseleccion
		temp=dragSrcEl;
	}
	temp.style.opacity = "1.0";
	if(dragSrcEl!=null)
	{
		if(e.offsetY < this.offsetHeight/5){
			this.parentNode.insertBefore(temp,this);
		}else{ 
			if(e.offsetY > this.offsetHeight*4/5){
				insertAfter(temp,this);
			}else{
				if(e.offsetX < this.offsetWidth/5){
					this.parentNode.insertBefore(temp,this);
				}else{
					if(e.offsetX > this.offsetWidth*4/5){
						insertAfter(temp,this);
					}else{
						this.appendChild(temp);
					}
				}
			}
		}

		dragSrcEl=null;
		dragOrigin=0;
		e.dataTransfer.clearData();
	}
	return false;
}

////********Selection*********////
function handleMouseDown(e){
	if (this==e.target){
		if(e.ctrlKey==1){//revisamos si esta o no la tecla control presionada
			if(seleccion.indexOf(this)==-1){//si lo esta revisamos si el elemento clickeado esta actualmente entre los elementos seleccionados
				seleccion.push(this);    //si no lo esta se agrega a la seleccion y se le agrega la clase css "seleccionado"
				this.classList.add("seleccionado");
			}else{//si ya lo esta se saca de la sseleccion y se le quita la clase css
				seleccion.splice(seleccion.indexOf(this),1);//recomendado http://www.w3schools.com/jsref/jsref_splice.asp
				this.classList.remove("seleccionado");
			}
		}else{
			var temp=document.getElementsByTagName("*");//si se hace click sin ctrl entonces se limpia toda la seleccion
			for(var i=0;i<temp.length;i++){//y a todos los elementos se les retira la clase "seleccionado"
				temp[i].classList.remove("seleccionado");
			}
			seleccion=new Array();//luego se agrega el elemento clickeado a la selecion y se le agrega la clase
			seleccion.push(this);
			this.classList.add("seleccionado");
		}	
	}
}

////*******Delete, cut, copy and paste elements*******////
function handleKeyDown(e){
	switch(e.keyCode){
		//DEL
		case 46:while(seleccion.length>0){
					if(seleccion[0]==null||seleccion[0].parentNode==null){
						seleccion.shift()
					}else{
						seleccion[0].parentNode.removeChild(seleccion[0]);
					}
				}
				break;
		//C
		case 67:clipboard=new Array();
				for(var i=0;i<seleccion.length;i++){
					clipboard.push(seleccion[i].cloneNode(true));
				}
				break;
		//V
		case 86:if(seleccion.length==0){
					var iDE=document.getElementById("interfazDeEdicion");
					var t;
					var tdesc;
					for(var i=0;i<clipboard.length;i++){
						t=clipboard[i].cloneNode(true);
						addEvents(t);
						t.classList.remove("seleccionado");
						tdesc=t.querySelectorAll("*");
						[].forEach.call(tdesc,function(obj){
								addEvents(obj);
								obj.classList.remove("seleccionado");
							});
						iDE.appendChild(t);
					}
				}else{
					var t;
					var tdesc;
					for(var i=0;i<seleccion.length;i++){
						for(var j=0;j<clipboard.length;j++){
							t=clipboard[j].cloneNode(true);
							addEvents(t);
							t.classList.remove("seleccionado");
							tdesc=t.querySelectorAll("*");
							[].forEach.call(tdesc,function(obj){
								addEvents(obj);
								obj.classList.remove("seleccionado");
							});
							seleccion[i].appendChild(t);
						}
					}
				}
				break;
		//X
		case 88:clipboard=new Array;
				while(seleccion.length>0){
					if(seleccion[0]==null||seleccion[0].parentNode==null){
						seleccion.shift()
					}else{
						clipboard.push(seleccion[0].cloneNode(true));
						seleccion[0].parentNode.removeChild(seleccion[0]);
					}
				}
				break;
	}
}

////*******Miscelaneous*******////
function insertAfter(node,reference){ 
	if(reference.nextSibling){ 
		reference.parentNode.insertBefore(node,reference.nextSibling); 
	} else { 
		reference.parentNode.appendChild(node); 
	}
}

function addEvents(element){
		element.addEventListener('dragstart', handleDragStartForResize, false);
		element.addEventListener('dragenter', handleDragEnter, false);
		element.addEventListener('dragover', handleDragOver, false);
		element.addEventListener('dragleave', handleDragLeave, false);
		element.addEventListener('drop', handleDropForMove, false);
		element.addEventListener('dragend', handleDragEndForResize, false);
		element.addEventListener('mousedown', handleMouseDown, false);
		element.draggable = true;
}

