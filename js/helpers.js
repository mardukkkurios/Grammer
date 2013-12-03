$(document).ready(function(){
	$("#attrModificatorContainer").click(function(){
		$("#attrModificatorContainer").fadeOut(100);
	});
	$("#attrModificator .cancel").click(function(){
		$("#attrModificatorContainer").fadeOut(100);
	});
	$("#attrModificator").click(function(event){
		event.stopPropagation();
	});
});

function helperGenericInput(caller){
	$("#attrModificatorChange input").val($(caller).find("input").val());
	$("#attrModificator .Ok").off("click");
	$("#attrModificator .Ok").on("click",function(event){
		$(caller).find("input").val($("#attrModificatorChange input").val());
		$(caller).find("input").attr("value",$("#attrModificatorChange input").val());
		if(idChange(caller)) $("#attrModificatorContainer").fadeOut(100);
		event.stopPropagation();
	});
}

function helperButton(caller){
	$("#attrModificatorChange textarea").val($(caller).find("input").val());
	$("#attrModificator .Ok").off("click");
	$("#attrModificator .Ok").on("click",function(event){
		$(caller).find("input").val($("#attrModificatorChange textarea").val());
		if($("#attrModificatorChange textarea").val()=="") $(caller).find("input").removeAttr("value")
		else $(caller).find("input").attr("value",$("#attrModificatorChange textarea").val());
		if(idChange(caller)) $("#attrModificatorContainer").fadeOut(100);
		event.stopPropagation();
	});
	$("#attrModificatorChange textarea").off("keypress");
	$("#attrModificatorChange textarea").on("keypress",function(event){
		if(!event.shiftKey&&event.keyCode==13){
			$(caller).find("input").val($("#attrModificatorChange textarea").val());
			if($("#attrModificatorChange textarea").val()=="") $(caller).find("input").removeAttr("value")
			else $(caller).find("input").attr("value",$("#attrModificatorChange textarea").val());
		    if(idChange(caller)) $("#attrModificatorContainer").fadeOut(100);
		}
		event.stopPropagation();
	});
}

function helperSwitch(caller){
	if($(caller).find("input").prop("checked")) $("#attrModificatorChange input").attr("checked","true");
	else $("#attrModificatorChange input").prop("checked",false);
	$("#attrModificator .Ok").off("click");
	$("#attrModificator .Ok").on("click",function(event){
		if($("#attrModificatorChange input").prop("checked")) $(caller).find("input").prop("checked","true");
		else $(caller).find("input").prop("checked",false);
		if(idChange(caller)) $("#attrModificatorContainer").fadeOut(100);
		event.stopPropagation();
	});
}

function helperLabel(caller){
	$("#attrModificatorChange textarea").val($(caller).text());
	$("#attrModificator .Ok").off("click");
	$("#attrModificator .Ok").on("click",function(event){
		$(caller).text($("#attrModificatorChange textarea").val());
		if(idChange(caller)) $("#attrModificatorContainer").fadeOut(100);
		event.stopPropagation();
	});
	$("#attrModificatorChange textarea").off("keypress");
	$("#attrModificatorChange textarea").on("keypress",function(event){
		if(!event.shiftKey&&event.keyCode==13){
			$(caller).text($("#attrModificatorChange textarea").val());
      		if(idChange(caller)) $("#attrModificatorContainer").fadeOut(100);
		}
		event.stopPropagation();
	});
}

function helperLink(caller){
	$("#attrModificatorChange textarea").first().val($(caller).text());
	$("#attrModificatorChange textarea").last().val($(caller).attr("href"));
	$("#attrModificator .Ok").off("click");
	$("#attrModificator .Ok").on("click",function(event){
		$(caller).text($("#attrModificatorChange textarea").first().val());
		if($("#attrModificatorChange textarea").last().val()=="") $(caller).removeAttr("href");
		else $(caller).attr("href",$("#attrModificatorChange textarea").last().val());
		if(idChange(caller)) $("#attrModificatorContainer").fadeOut(100);
		event.stopPropagation();
	});
	$("#attrModificatorChange textarea").off("keypress");
	$("#attrModificatorChange textarea").on("keypress",function(event){
		if(!event.shiftKey&&event.keyCode==13){
			$(caller).text($("#attrModificatorChange textarea").first().val());
			if($("#attrModificatorChange textarea").last().val()=="") $(caller).removeAttr("href");
			else $(caller).attr("href",$("#attrModificatorChange textarea").last().val());
     		if(idChange(caller)) $("#attrModificatorContainer").fadeOut(100);
		}
		event.stopPropagation();
	});
}

function helperForm(caller){
	$("#attrModificatorChange textarea").last().val($(caller).attr("action"));
	$("#attrModificator .Ok").off("click");
	$("#attrModificator .Ok").on("click",function(event){
		if($("#attrModificatorChange textarea").last().val()=="") $(caller).removeAttr("action");
		else $(caller).attr("action",$("#attrModificatorChange textarea").last().val());
		if($("#attrModificatorChange :selected").val()=="Ninguno") $(caller).removeAttr("method");
		else $(caller).attr("method",$("#attrModificatorChange :selected").val());
		if(idChange(caller)) $("#attrModificatorContainer").fadeOut(100);
		event.stopPropagation();
	});
	$("#attrModificatorChange textarea").off("keypress");
	$("#attrModificatorChange textarea").on("keypress",function(event){
		if(!event.shiftKey&&event.keyCode==13){
			if($("#attrModificatorChange textarea").last().val()=="") $(caller).removeAttr("action");
			else $(caller).attr("action",$("#attrModificatorChange textarea").last().val());
			if($("#attrModificatorChange :selected").val()=="Ninguno") $(caller).removeAttr("method");
			else $(caller).attr("method",$("#attrModificatorChange :selected").val());
     		if(idChange(caller)) $("#attrModificatorContainer").fadeOut(100);
			event.stopPropagation();
		}
		event.stopPropagation();
	});
}

function helperText(caller){
	$("#attrModificatorChange textarea").first().val($(caller).find("input").val());
	$("#attrModificatorChange textarea").last().val($(caller).find("input").attr("placeholder"));
	$("#attrModificator .Ok").off("click");
	$("#attrModificator .Ok").on("click",function(event){
		$(caller).find("input").val($("#attrModificatorChange textarea").first().val());
		if($("#attrModificatorChange textarea").last().val()=="") $(caller).find("input").removeAttr("placeholder");
		else $(caller).find("input").attr("placeholder",$("#attrModificatorChange textarea").last().val());
		if(idChange(caller)) $("#attrModificatorContainer").fadeOut(100);
		event.stopPropagation();
	});
	$("#attrModificatorChange textarea").off("keypress");
	$("#attrModificatorChange textarea").on("keypress",function(event){
		if(!event.shiftKey&&event.keyCode==13){
			$(caller).find("input").val($("#attrModificatorChange textarea").first().val());
			if($("#attrModificatorChange textarea").last().val()=="") $(caller).find("input").removeAttr("placeholder");
			else $(caller).find("input").attr("placeholder",$("#attrModificatorChange textarea").last().val());
     		if(idChange(caller)) $("#attrModificatorContainer").fadeOut(100);
		}
		event.stopPropagation();
	});
}

function helperPsswd(caller){
	$("#attrModificatorChange textarea").val($(caller).find("input").attr("placeholder"));
	$("#attrModificator .Ok").off("click");
	$("#attrModificator .Ok").on("click",function(event){
		if($("#attrModificatorChange textarea").val()=="") $(caller).find("input").removeAttr("placeholder");
		else $(caller).find("input").attr("placeholder",$("#attrModificatorChange textarea").val());
		if(idChange(caller)) $("#attrModificatorContainer").fadeOut(100);
		event.stopPropagation();
	});
	$("#attrModificatorChange textarea").off("keypress");
	$("#attrModificatorChange textarea").on("keypress",function(event){
		if(!event.shiftKey&&event.keyCode==13){
			if($("#attrModificatorChange textarea").val()=="") $(caller).find("input").removeAttr("placeholder");
			else $(caller).find("input").attr("placeholder",$("#attrModificatorChange textarea").val());
    		if(idChange(caller)) $("#attrModificatorContainer").fadeOut(100);
		}
		event.stopPropagation();
	});
}

function helperRange(caller){
    if($(caller).find("input").attr("value")=="") $("#attrModificatorChange input").first().attr("value",50);
	else $("#attrModificatorChange input").first().val($(caller).find("input").attr("value"));
	if($(caller).find("input").attr("min")=="") $("#attrModificatorChange input:eq(1)").attr("value",0);
	else $("#attrModificatorChange input:eq(1)").val($(caller).find("input").attr("min"));
	if($(caller).find("input").attr("max")=="") $("#attrModificatorChange input:eq(2)").attr("value",100);
	else $("#attrModificatorChange input:eq(2)").val($(caller).find("input").attr("max"));
	if($(caller).find("input").attr("step")=="") $("#attrModificatorChange input").last().attr("value",1);
	else $("#attrModificatorChange input").last().val($(caller).find("input").attr("step"));
	$("#attrModificator .Ok").off("click");
	$("#attrModificator .Ok").on("click",function(event){
		$(caller).find("input").attr("value",$("#attrModificatorChange input").first().val());
		$(caller).find("input").attr("min",$("#attrModificatorChange input:eq(1)").val());
		$(caller).find("input").attr("max",$("#attrModificatorChange input:eq(2)").val());
		$(caller).find("input").attr("step",$("#attrModificatorChange input").last().val());
		if(idChange(caller)) $("#attrModificatorContainer").fadeOut(100);
		event.stopPropagation();
	});
}

function helperH(caller){
	$("#attrModificatorChange textarea").val($(caller).text());
	var t=caller.tagName.substr(1,1);
	$("#attrModificatorChange input").val(t);
	$("#attrModificator .Ok").off("click");
	$("#attrModificator .Ok").on("click",function(event){
		$(caller).text($("#attrModificatorChange textarea").val());
		if(t!=$("#attrModificatorChange input").val()){	
			var oldID=caller.id;
			t=$("#attrModificatorChange input").val();
			var newNode=document.createElement("H"+t);
			[].forEach.call(caller.childNodes,function(node){
				newNode.appendChild(node);
			});
			addEvents(newNode);
			[].forEach.call(caller.attributes,function(att){
				newNode.setAttribute(att.name,att.value);
			});
			ids.pop();
			caller.setAttribute("id",oldID);
			$(caller).replaceWith(newNode);
		}
		if(idChange(caller)) $("#attrModificatorContainer").fadeOut(100);
		event.stopPropagation();
	});
	$("#attrModificatorChange textarea").off("keypress");
	$("#attrModificatorChange textarea").on("keypress",function(event){
		if(!event.shiftKey&&event.keyCode==13){
			$(caller).text($("#attrModificatorChange textarea").val());
			if(t!=$("#attrModificatorChange input").val()){	
				var oldID=caller.id;
				t=$("#attrModificatorChange input").val();
				var newNode=document.createElement("H"+t);
				[].forEach.call(caller.childNodes,function(node){
					newNode.appendChild(node);
				});
				addEvents(newNode);
				[].forEach.call(caller.attributes,function(att){
					newNode.setAttribute(att.name,att.value);
				});
				ids.pop();
				caller.setAttribute("id",oldID);
				$(caller).replaceWith(newNode);
			}
			if(idChange(caller)) $("#attrModificatorContainer").fadeOut(100);
		}
		event.stopPropagation();
	});
}

function helperDiv(caller){
	$("#attrModificator .Ok").off("click");
	$("#attrModificator .Ok").on("click",function(event){
		if(idChange(caller)) $("#attrModificatorContainer").fadeOut(100);
		event.stopPropagation();
	});
}

function helperID(caller){
   var oldID=$(caller).attr("id");
   var newID;
   $("#attrModificator #newID").removeAttr("placeholder");
   if(oldID.substr(0,22)!="_3L3M3NTO_P4R4_B0RR4R_") $("#attrModificator #newID").val(oldID);
   else $("#attrModificator #newID").val("");
   $("#attrModificator #newID").off("blur");
   $("#attrModificator #newID").on("blur",function(){
      newID=$("#attrModificator #newID").val();
      if(ids.indexOf(newID)!=-1&&newID!=oldID){
	       $("#attrModificator #newID").attr("placeholder","ID repetido");
	  }
   });
}

function idChange(caller){
   var oldID=$(caller).attr("id");
   var newID=$("#attrModificator #newID").val();
   if(newID=="") $(caller).attr("id",oldID);
   else{
       if(ids.indexOf(newID)!=-1&&newID!=oldID){
            $("#attrModificator #newID").attr("placeholder","ID repetido");
			$("#attrModificator #newID").val("");
			return false;
       }
       ids.splice(ids.indexOf(oldID),1,newID);
       $(caller).attr("id",newID);
   }
   return true;
}

//Deben someterse a revision:
//-helperContainer
//-helperLink
//-helperForm
//helperRange por lo de min max y value