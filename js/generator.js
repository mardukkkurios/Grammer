function genHead(){
	var head="<!DOCTYPE html>\n";
	head+="\t<head>\n";
	head+="\t\t<title>"+conf[0]+"</title>\n";
	head+="\t\t<meta name=\"generator\" content=\"Grammer 1.0\"/>\n";
	if(conf[1]!=""){head+="\t\t<meta name=\"author\" content=\""+conf[1]+"\" />\n";}
	if(conf[2]!=""){head+="\t\t<meta name=\"description\" content=\""+conf[2]+"\" />\n";}
	if(conf[3]!=""){head+="\t\t<meta name=\"keywords\" content=\""+conf[3]+"\" />\n";}
	if(conf[4]!=""){head+="\t\t<meta charset=\""+conf[4]+"\" />\n";}
	/******************************************************
	*****                                             *****
	*****               links y scripts               *****
	*****                                             *****
	******************************************************/
	head+="\t</head>\n";
	return head;
}

function genBody(){
	var body="<body>\n";
	/******************************************************
	*****                                             *****
	*****                 crear body                  *****
	*****                                             *****
	******************************************************/
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