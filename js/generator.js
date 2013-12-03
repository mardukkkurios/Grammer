function genHead(){
	var head="<!DOCTYPE html>\n";
	head+="\t<head>\n";
	head+="\t\t<title>"+conf[0]+"</title>\n";
	head+="\t\t<meta name=\"generator\" content=\"Grammer 1.0\"/>\n";
	if(conf[1]!=""){head+="\t\t<meta name=\"author\" content=\""+conf[1]+"\" />\n";}
	if(conf[2]!=""){head+="\t\t<meta name=\"description\" content=\""+conf[2]+"\" />\n";}
	if(conf[3]!=""){head+="\t\t<meta name=\"keywords\" content=\""+conf[3]+"\" />\n";}
	if(conf[4]!=""){head+="\t\t<meta charset=\""+conf[4]+"\" />\n";}
	head+="\t\t<link rel=\"style\" type=\"text/css\" href=\"css/"+conf[0]+".css\"/>\n";
	head+="\t</head>\n";
	return head;
}

function genBody(){
	var body="<body>\n";
	[].forEach.call(document.getElementsByTagName("body")[1].children,function(obj){
		body+=elementHTML(2,obj);
	})
	body+="\t</body>\n";
	return body;
}

function genHTML(){
	var html="<html>\n";
	html+="\t"+genHead();
	html+="\t"+genBody();
	html+="</html>";
	return html;
}

function elementHTML(tab,element){
	var elhtml="";
	for(var i=0;i<tab;i++) elhtml+="\t";
	if(element.classList.contains("divInput")) element=element.firstChild;
	elhtml+="<"+element.tagName.toLowerCase()+attributesHTML(element)+">";
	if(element.hasChildNodes()){
		elhtml+="\n";
		[].forEach.call(element.childNodes,function(node){
			if(node.nodeType==3){
				for(var i=0;i<tab;i++) elhtml+="\t";
				elhtml+="\t"+node.nodeValue+"\n";
			}
			else elhtml+=elementHTML(tab+1,node); 
		});
		for(var i=0;i<tab;i++) elhtml+="\t";
	}
	elhtml+="</"+element.tagName.toLowerCase()+">\n";
	return elhtml;
}

function attributesHTML(element){
	var att="";
	[].forEach.call(element.attributes,function(attribute){
		if(attribute.name!="style"&&attribute.name!="disabled"&&attribute.name!="draggable"){
			if(attribute.name!="class") att+=" "+attribute.name+"=\""+attribute.value+"\"";
			else{
				var clases=element.className.split(" ");
				if(element.classList.contains("seleccionado")){
				  clases.splice(clases.indexOf("seleccionado"),1);
				}
				if(element.classList.contains("divInput")){
				  clases.splice(clases.indexOf("divInput"),1);
				}
				if(element.classList.contains("containerStart")){
				  clases.splice(clases.indexOf("containerStart"),1);
				}
				clases=clases.join(" ");
				if(clases.length>0) att+=" "+"class=\""+clases+"\"";
			}
		}
	});
	return att;
}
