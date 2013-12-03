$(document).ready(function(){
	[].forEach.call(categorias, function(category,i){
		var parent=i==0?$("<details open></details>"):$("<details></details>");
		parent.append("<summary>"+category+"</summary>");
		[].forEach.call(elementos, function(elemento) {
			if(elemento.category==category){
				var nuevo="<div><img src=\""+elemento.presentationInfo.img+"\"><span>"+elemento.presentationInfo.Label+"</span></div>"
				parent.append(nuevo);
			}
		$("#grammerDevelopmentAppContainer .paletteContainer").append(parent);
	})});
	objetosPaleta = document.querySelectorAll('#grammerDevelopmentAppContainer .paletteContainer details *');
	[].forEach.call(objetosPaleta, function(obj) {
		if(obj.nodeName=="DIV")
		{
			obj.draggable = true;
			obj.addEventListener('dragstart', handleDragStart, false);
			obj.addEventListener('dragend', handleDragEnd, false);
		}
		if(obj.nodeName=="IMG"){obj.draggable = false;}
	});
});