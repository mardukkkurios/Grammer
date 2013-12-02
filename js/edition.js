//*******Global variables for drag and drop*******////
var dragSrcEl = null;
var dragOrigin = 0;
var seleccion = new Array();
var clipboard= new Array();
var idCounter = 1000000;

//**********ONLOAD**********************************//
$(document).ready(function(){	
	temp = document.getElementById("interfazDeEdicion");
	var secondBody=document.createElement("body");
	temp.appendChild(secondBody);
	temp = secondBody;
	temp.addEventListener('dragenter', handleDragEnter, false);
	temp.addEventListener('dragover', handleDragOver, false);
	temp.addEventListener('dragleave', handleDragLeave, false);
	temp.addEventListener('drop', handleDrop, false);
	temp.addEventListener('dragend', handleDragEnd, false);
	temp.addEventListener('click', handleClickForCleanSelection, false);
	
	temp=document.getElementsByTagName("body");
	temp[0].addEventListener("keydown",handleKeyDownForShortcuts,false);
});

//**********DRAG EVENTS**************************************//
function handleDragStart(e){
  dragSrcEl = this;
  dragOrigin=5;

  e.dataTransfer.effectAllowed = 'copy';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e){
	e.preventDefault(); // Necessary. Allows us to drop.
	return false;
}

function handleDragEnter(e){
}

function handleDragLeave(e){
}

function handleDrop(e){
	e.stopPropagation(); // Stops some browsers from redirecting.
	
	if(dragSrcEl!=null){
		var temp=new Array();
		if(e.dataTransfer.effectAllowed=='copy'){
			var p= new DOMParser();
			var category=elementoPorLabel(dragSrcEl.children[1].textContent).category;
			var element=elementoPorLabel(dragSrcEl.children[1].textContent).HTMLContent;
			var node=p.parseFromString(element,"text/html").firstChild.children[1].firstChild;
			temp.push(node);
		}
		if(e.dataTransfer.effectAllowed=='move'){
			temp=seleccion;
			dragOrigin=0;
		}
		for(var k in temp){
			this.appendChild(temp[k]);
			temp[k].style.opacity="1.0";
		}

		if(e.dataTransfer.effectAllowed=='copy'){
			if(category=="Prefabricados"){addEvents(node,true);}
			else{addEvents(node);}
		}
		
		dragSrcEl=null;
		e.dataTransfer.clearData();
	}
	return false;
}

function handleDragEnd(e){
	this.style.opacity = '1.0';  // this / e.target is the source node.
}

////********Resize and Move********////
function handleDragEndForResize(e){
	var newWidth;
	var newHeight;
	switch(dragOrigin){
		case 1: newWidth=$(this).width()-parseInt(e.offsetX);
				newHeight=$(this).height()-parseInt(e.offsetY);
				break;
		case 2:	newHeight=$(this).height()-parseInt(e.offsetY);
				break;
		case 3:	newWidth=$(this).width()+(parseInt(e.offsetX)-parseInt(this.offsetWidth));
				newHeight=$(this).height()-parseInt(e.offsetY);
				break;
		case 4:	newWidth=$(this).width()-parseInt(e.offsetX);
				break;
		case 5:	break;
		case 6:	newWidth=$(this).width()+(parseInt(e.offsetX)-parseInt(this.offsetWidth));
				break;
		case 7:	newWidth=$(this).width()-parseInt(e.offsetX);
				newHeight=$(this).height()+(parseInt(e.offsetY)-parseInt(this.offsetHeight));
				break;
		case 8: newHeight=$(this).height()+(parseInt(e.offsetY)-parseInt(this.offsetHeight));
				break;
		case 9:	newWidth=$(this).width()+(parseInt(e.offsetX)-parseInt(this.offsetWidth));
				newHeight=$(this).height()+(parseInt(e.offsetY)-parseInt(this.offsetHeight));
				break;
	}
	newWidth=parseInt(newWidth)<0?0:newWidth;
	newHeight=parseInt(newHeight)<0?0:newHeight;
	$(this).width(newWidth);
	$(this).height(newHeight);
	dragOrigin=0;
	this.style.opacity = '1.0';
	return false;
}

function handleDragStartForResize(e){
	dragOrigin=9;
	if(e.offsetY<this.offsetHeight-10) dragOrigin=6;
	if(e.offsetY<10) dragOrigin=3;
	if(e.offsetX<this.offsetWidth-10){ 
		dragOrigin=8;
		if(e.offsetY<this.offsetHeight-10) dragOrigin=5;
		if(e.offsetY<10) dragOrigin=2;
	}
	if(e.offsetX<10){
		dragOrigin=7;
		if(e.offsetY<this.offsetHeight-10) dragOrigin=4;
		if(e.offsetY<10) dragOrigin=1;
	}
	if(dragOrigin==5){
		this.style.opacity = '0.4'; 
		dragSrcEl = this;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/html', this.innerHTML);
		if(seleccion.indexOf(this)==-1){//Esto es para poner en objeto en eleccion al hacer move
			var temp=document.getElementsByTagName("*");//si se hace click sin ctrl entonces se limpia toda la seleccion
			//y a todos los elementos se les retira la clase "seleccionado"
			for(var i=0;i<temp.length;i++){ temp[i].classList.remove("seleccionado");}
			seleccion=new Array();//luego se agrega el elemento clickeado a la selecion y se le agrega la clase
			seleccion.push(this);
			this.classList.add("seleccionado");
		}
	}
	e.stopPropagation();
	return false;
}

function handleDropForMove(e){
	if(dragOrigin==5){
		e.stopPropagation();
		var t=document.getElementsByClassName('over');
		for(var i=0;i<t.length;i++) t[i].classList.remove('over');
		
		var temp=new Array();
		if(e.dataTransfer.effectAllowed=='copy'){
			var p= new DOMParser();
			var category=elementoPorLabel(dragSrcEl.children[1].textContent).category;
			var element=elementoPorLabel(dragSrcEl.children[1].textContent).HTMLContent;
			var node=p.parseFromString(element,"text/html").firstChild.children[1].firstChild;
			temp.push(node);
		}
		if(e.dataTransfer.effectAllowed=='move') temp=seleccion;

		for(var k in temp){
			if(e.offsetY < this.offsetHeight/5) this.parentNode.insertBefore(temp[k],this);
			else{ 
				if(e.offsetY > this.offsetHeight*4/5) insertAfter(temp[k],this);
				else{
					if(e.offsetX < this.offsetWidth/5) this.parentNode.insertBefore(temp[k],this);
					else{
						if(e.offsetX > this.offsetWidth*4/5) insertAfter(temp[k],this);
						else this.appendChild(temp[k]);
					}
				}
			}
			temp[k].style.opacity = "1.0";
		}
		if(e.dataTransfer.effectAllowed=='copy'){
			if(category=="Prefabricados"){addEvents(node,true);}
			else{addEvents(node);}
		}
		e.dataTransfer.clearData();
		dragSrcEl=null;
		dragOrigin=0;
	}
	return false;
}

////********Inputs and Images********////
function handleDragEndForResizeInput(e){
	var newWidth;
	var newHeight;
	switch(dragOrigin){
		case 1: newWidth=$(this.firstChild).width()-parseInt(e.offsetX);
				newHeight=$(this.firstChild).height()-parseInt(e.offsetY);
				break;
		case 2:	newHeight=$(this.firstChild).height()-parseInt(e.offsetY);
				break;
		case 3:	newWidth=$(this.firstChild).width()+(parseInt(e.offsetX)-parseInt(this.offsetWidth));
				newHeight=$(this.firstChild).height()-parseInt(e.offsetY);
				break;
		case 4:	newWidth=$(this.firstChild).width()-parseInt(e.offsetX);
				break;
		case 5:	break;
		case 6:	newWidth=$(this.firstChild).width()+(parseInt(e.offsetX)-parseInt(this.offsetWidth));
				break;
		case 7:	newWidth=$(this.firstChild).width()-parseInt(e.offsetX);
				newHeight=$(this.firstChild).height()+(parseInt(e.offsetY)-parseInt(this.offsetHeight));
				break;
		case 8: newHeight=$(this.firstChild).height()+(parseInt(e.offsetY)-parseInt(this.offsetHeight));
				break;
		case 9:	newWidth=$(this.firstChild).width()+(parseInt(e.offsetX)-parseInt(this.offsetWidth));
				newHeight=$(this.firstChild).height()+(parseInt(e.offsetY)-parseInt(this.offsetHeight));
				break;
	}
	newWidth=parseInt(newWidth)<0?0:newWidth;
	newHeight=parseInt(newHeight)<0?0:newHeight;
	$(this.firstChild).width(newWidth);
	$(this.firstChild).height(newHeight);
	dragOrigin=0;
	this.style.opacity = '1.0';
	return false;
}

function handleMouseMoveHelpInput(e){
	if(e.offsetY<this.offsetHeight-10) this.style.cursor="move";
	e.stopPropagation();
	return false;
}

function handleDragStartForResizeInput(e){
	if(e.offsetX<this.offsetWidth-10){ 
		if(e.offsetY<this.offsetHeight-10) dragOrigin=5;
	}
	if(dragOrigin==5){
		this.parentNode.style.opacity = '0.4'; 
		dragSrcEl = this.parentNode;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/html', this.parentNode.innerHTML);
		if(seleccion.indexOf(this)==-1){//Esto es para poner en objeto en eleccion al hacer move
			var temp=document.getElementsByTagName("*");//si se hace click sin ctrl entonces se limpia toda la seleccion
			//y a todos los elementos se les retira la clase "seleccionado"
			for(var i=0;i<temp.length;i++){ temp[i].classList.remove("seleccionado");}
			seleccion=new Array();//luego se agrega el elemento clickeado a la selecion y se le agrega la clase
			seleccion.push(this);
			this.parentNode.classList.add("seleccionado");
		}
	}
}

////********Selection*********////
function handleClick(e){
    e.preventDefault();
	if(e.ctrlKey==true){//revisamos si esta o no la tecla control presionada
		if(seleccion.indexOf(this)==-1){//si lo esta revisamos si el elemento clickeado esta actualmente entre los elementos seleccionados
			seleccion.push(this);    //si no lo esta se agrega a la seleccion y se le agrega la clase css "seleccionado"
			this.classList.add("seleccionado");
		}else{//si ya lo esta se saca de la sseleccion y se le quita la clase css
			seleccion.splice(seleccion.indexOf(this),1);//recomendado http://www.w3schools.com/jsref/jsref_splice.asp
			this.classList.remove("seleccionado");
		}
	}else{
		var temp=document.getElementsByTagName("*");//si se hace click sin ctrl entonces se limpia toda la seleccion
		//y a todos los elementos se les retira la clase "seleccionado"
		for(var i=0;i<temp.length;i++) temp[i].classList.remove("seleccionado");
		seleccion=new Array();//luego se agrega el elemento clickeado a la selecion y se le agrega la clase
		seleccion.push(this);
		this.classList.add("seleccionado");
	}	
	llamarCadaVezQueSeAgregueElementoALaSeleccion();
	e.stopPropagation();
}

function handleDoubleClick(e){
	e.preventDefault();
	$("#attrModificatorChange").html(elementoPorTag(this).helper.content);
	$("#attrModificator").css("top",e.clientY);
	$("#attrModificator").css("left",e.clientX);
	$("#attrModificatorContainer").fadeIn(100);
	elementoPorTag(this).helper.managment(this);
	// var tdesc;
	// if(e.ctrlKey==true){//revisamos si esta o no la tecla control presionada
		// if(seleccion.indexOf(this)==-1){//si lo esta revisamos si el elemento clickeado esta actualmente entre los elementos seleccionados
			// seleccion.push(this);    //si no lo esta se agrega a la seleccion y se le agrega la clase css "seleccionado"
			// this.classList.add("seleccionado");//y se agregan todos los desce
			// tdesc=this.querySelectorAll('*');
			// [].forEach.call(tdesc,function(obj){
				// if(seleccion.indexOf(obj)==-1 && obj.tagName!="INPUT" && obj.tagName!="IMG" && !obj.classList.contains("divInputHelp")){
					// seleccion.push(obj);
					// obj.classList.add("seleccionado");
				// }
			// });
		// }else{//si ya lo esta se saca de la seleccion y se le quita la clase css
			// seleccion.splice(seleccion.indexOf(this),1);//recomendado http://www.w3schools.com/jsref/jsref_splice.asp
			// this.classList.remove("seleccionado");
			// tdesc=this.querySelectorAll('*');
			// [].forEach.call(tdesc,function(obj){
				// if(seleccion.indexOf(obj)!=-1){
					// seleccion.splice(seleccion.indexOf(obj),1);
					// obj.classList.remove("seleccionado");
				// }
			// });
		// }
	// }else{
		// var temp=document.getElementsByTagName("*");//si se hace click sin ctrl entonces se limpia toda la seleccion
		// //y a todos los elementos se les retira la clase "seleccionado"
		// for(var i=0;i<temp.length;i++) temp[i].classList.remove("seleccionado");
		// seleccion=new Array();//luego se agrega el elemento clickeado a la selecion y se le agrega la clase
		// seleccion.push(this);
		// this.classList.add("seleccionado");
		// tdesc=this.querySelectorAll('*');
		// [].forEach.call(tdesc,function(obj){
			// if(obj.tagName!="INPUT" && obj.tagName!="IMG" && !obj.classList.contains("divInputHelp")){
				// seleccion.push(obj);
				// obj.classList.add("seleccionado");
			// }
		// });
	// }
	e.stopPropagation();
}

function handleClickForCleanSelection(e){
	if(e.ctrlKey==false){
		var temp=document.getElementsByTagName("*");
		for(var i=0;i<temp.length;i++) temp[i].classList.remove("seleccionado");
		seleccion=new Array();
		llamarCadaVezQueSeAgregueElementoALaSeleccion();
	}
}

////********Mouse*********////
function handleMouseMove(e){//Solo para q cambie el cursor
	this.style.cursor="se-resize";
	if(e.offsetY<this.offsetHeight-10) this.style.cursor="e-resize";
	if(e.offsetY<10) this.style.cursor="ne-resize";
	if(e.offsetX<this.offsetWidth-10){ 
		this.style.cursor="s-resize";
		if(e.offsetY<this.offsetHeight-10) this.style.cursor="move";
		if(e.offsetY<10) this.style.cursor="n-resize";
	}
	if(e.offsetX<10){
		this.style.cursor="sw-resize";
		if(e.offsetY<this.offsetHeight-10) this.style.cursor="w-resize";
		if(e.offsetY<10) this.style.cursor="nw-resize";
	}
	e.stopPropagation();
	return false;
}

////*******Shortcuts*******////
function handleKeyDownForShortcuts(e){
	//DEL
	if(e.keyCode==46){
		while(seleccion.length>0){
			if(seleccion[0]==null||seleccion[0].parentNode==null) seleccion.shift();
			else{
				// while(seleccion[0].children.length>0) seleccion[0].parentNode.insertBefore(seleccion[0].children[0],seleccion[0]);
				seleccion[0].parentNode.removeChild(seleccion[0]);
			}
		}
		return;
	}
	if(e.ctrlKey && e.shiftKey){
		switch(e.keyCode){
			//Ctrl+Shift+C
			case 67:clipboard=new Array();
					for(var i=0;i<seleccion.length;i++) clipboard.push(seleccion[i].cloneNode(true));
					break;
			//Ctrl+Shift+E
			case 69:var d=document.querySelectorAll("#interfazDeEdicion *");
					seleccion=new Array();
					[].forEach.call(d,function(des){
						if(des.tagName!="INPUT" && des.tagName!="IMG" && !des.classList.contains("divInputHelp")){
							des.classList.add("seleccionado");
							seleccion.push(des);
						}
					});
					llamarCadaVezQueSeAgregueElementoALaSeleccion();
					break;
			//Ctrl+Shift+V
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
			//Ctrl+Shift+X
			case 88:clipboard=new Array;
					while(seleccion.length>0){
						if(seleccion[0]==null||seleccion[0].parentNode==null) seleccion.shift();
						else{
							clipboard.push(seleccion[0].cloneNode(true));
							seleccion[0].parentNode.removeChild(seleccion[0]);
						}
					}
					break;
		}
		return;
	}
				//d
				// case 68:me=document.getElementById("interfazDeEdicion");
					// var r=new Array();
					// alert(me.children.length);
					// for(var i=0;i<me.children.length;i++) descendents(me.children[i],r)
					// for(var i=0;i<r.length;i++) alert(r[i]);
					// break;
}

////*******Miscelaneous*******////
function insertAfter(node,reference){ 
	if(reference.nextSibling) reference.parentNode.insertBefore(node,reference.nextSibling); 
	else reference.parentNode.appendChild(node);
}

function addEvents(element,deep){	
	deep=deep||false;
	var input=false;
	if(element.tagName=="INPUT" || element.tagName=="IMG"){
		var inputDiv=document.createElement("div");
		var inputHelpDiv=document.createElement("div");
		insertAfter(inputDiv,element);
		inputDiv.appendChild(element);
		inputDiv.appendChild(inputHelpDiv);
		element=inputDiv;
		inputDiv.classList.add("divInput");
		inputHelpDiv.classList.add("divInputHelp");
		input=true;
	}
	element.setAttribute("ID","_3L3M3NTO_P4R4_B0RR4R_" + ++idCounter);
	element.addEventListener('dblclick', handleDoubleClick, false);
	element.addEventListener('dragstart', handleDragStartForResize, false);
	element.addEventListener('dragenter', handleDragEnter, false);
	element.addEventListener('dragover', handleDragOver, false);
	element.addEventListener('dragleave', handleDragLeave, false);
	element.addEventListener('drop', handleDropForMove, false);
	element.addEventListener('dragend', input ? handleDragEndForResizeInput:handleDragEndForResize, false);
	element.addEventListener('click', handleClick, false);
	element.addEventListener('mousemove', handleMouseMove, false);
	element.draggable = true;
	if(input){
		element.children[1].addEventListener('mousemove', handleMouseMoveHelpInput,false);
		element.children[1].addEventListener('dragstart', handleDragStartForResizeInput, false);
	}
	if(deep&& !input){
		[].forEach.call(element.children,function(el){
			addEvents(el,true);
		});
	}
}

function descendents(node,des){
	des.push(node)
	for(var i=0;i<node.children.length;i++) descendents(node.children[i],des)
}
