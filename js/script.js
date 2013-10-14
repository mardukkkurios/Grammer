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
//*******Global variables for drag and drop*******////
var dragSrcEl = null;
var dragOrigin = 0;
var seleccion=new Array();

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
		e.dataTransfer.dropEffect = 'copy';  // See the section on the DataTransfer object.
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
	{
		// Set the source column's HTML to the HTML of the column we dropped on.
		var temp = document.importNode(dragSrcEl, true);
		//e.dataTransfer.getData('text/html');
		temp.addEventListener('dragstart', handleDragStartForResize, false);
		temp.addEventListener('dragenter', handleDragEnter, false);
		temp.addEventListener('dragover', handleDragOver, false);
		temp.addEventListener('dragleave', handleDragLeave, false);
		temp.addEventListener('drop', handleDrop, false);
		temp.addEventListener('dragend', handleDragEndForResize, false);
		temp.addEventListener('click', handleClick, false);
		temp.style.opacity = "1.0";
		temp.draggable = true;
		this.appendChild(temp);

		dragSrcEl=null;
		e.dataTransfer.clearData();
	}
	return false;
}

function handleDragEnd(e){
	this.style.opacity = '1.0';  // this / e.target is the source node.
}

////********Resize********/////////
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
	return false;
}

function handleDragStartForResize(e){
	if(this==e.target){
		dragOrigin=9;
		if(e.offsetY<this.offsetHeight-20){dragOrigin=6;}
		if(e.offsetY<20){dragOrigin=3;}
		if(e.offsetX<this.offsetWidth-20){ 
			dragOrigin=8;
			if(e.offsetY<this.offsetHeight-20){dragOrigin=5;}
			if(e.offsetY<20){dragOrigin=2;}
		}
		if(e.offsetX<20){
			dragOrigin=7;
			if(e.offsetY<this.offsetHeight-20){dragOrigin=4;}
			if(e.offsetY<20){dragOrigin=1;}
		}
	}
	return false;
}

////********Selection*********////
function handleClick(e){
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

////*******Delete, cut, copy and past elements********////
function handleKeyDown(e){
	switch(e.keyCode){
		//DEL
		case 46:for(var i=0;i<seleccion.length;i++){//go throught the selection and delete all
					if(seleccion[i]!=null&&seleccion[i].parentNode!=null){
						seleccion[i].parentNode.removeChild(seleccion[i]);
					}
				}
				break;
	}
}