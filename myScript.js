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
	
	};


//**********DRAG EVENTS**************************************//
var dragSrcEl = null;
function handleDragStart(e) {
  this.style.opacity = '0.4';  // this / e.target is the source node.
  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  // this / e.target is current target element.
	this.classList.remove('over');
	if (e.stopPropagation) {
		e.stopPropagation(); // Stops some browsers from redirecting.
	}
	

		// Set the source column's HTML to the HTML of the column we dropped on.
		var temp = document.importNode(dragSrcEl, true);
		//e.dataTransfer.getData('text/html');
		temp.addEventListener('dragenter', handleDragEnter, false);
		temp.addEventListener('dragover', handleDragOver, false);
		temp.addEventListener('dragleave', handleDragLeave, false);
		temp.addEventListener('drop', handleDrop, false);
		temp.addEventListener('dragend', handleDragEnd, false);
		temp.style.opacity = "1.0";
		temp.draggable = false;
		this.appendChild(temp);
		
	
	return false;
}


function handleDragEnd(e) {
  this.style.opacity = '1.0';  // this / e.target is the source node.
}