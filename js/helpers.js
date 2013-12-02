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
	$("#attrModificator .Ok").on("click",function(){
		$(caller).find("input").val($("#attrModificatorChange input").val());
		$(caller).find("input").attr("value",$("#attrModificatorChange input").val());
		$("#attrModificatorContainer").fadeOut(100);
		event.stopPropagation();
	});
}

function helperButton(caller){
	$("#attrModificator textarea").val($(caller).find("input").val());
	$("#attrModificator .Ok").off("click");
	$("#attrModificator .Ok").on("click",function(){
		$(caller).find("input").val($("#attrModificator textarea").val());
		$(caller).find("input").attr("value",$("#attrModificator textarea").val());
		$("#attrModificatorContainer").fadeOut(100);
		event.stopPropagation();
	});
	$("#attrModificator textarea").off("keypress");
	$("#attrModificator textarea").on("keypress",function(event){
		if(!event.shiftKey&&event.keyCode==13){
			$(caller).find("input").val($("#attrModificator textarea").val());
			$(caller).find("input").attr("value",$("#attrModificator textarea").val());
			$("#attrModificatorContainer").fadeOut(100);
		}
		event.stopPropagation();
	});
}

function helperContainer(caller){
	$("#attrModificator textarea").val($(caller).html());
	$("#attrModificator .Ok").off("click");
	$("#attrModificator .Ok").on("click",function(){
		$(caller).html($("#attrModificator textarea").val());
		$("#attrModificatorContainer").fadeOut(100);
		event.stopPropagation();
	});
	$("#attrModificator textarea").off("keypress");
	$("#attrModificator textarea").on("keypress",function(event){
		if(!event.shiftKey&&event.keyCode==13){
			$(caller).html($("#attrModificator textarea").val());
			$("#attrModificatorContainer").fadeOut(100);
		}
		event.stopPropagation();
	});
}

function helperLink(caller){
// alert($("#attrModificator textarea").first())
	$("#attrModificator textarea").first().val($(caller).html());
	$("#attrModificator textarea").last().val($(caller).attr("href"));
	$("#attrModificator .Ok").off("click");
	$("#attrModificator .Ok").on("click",function(){
		$(caller).html($("#attrModificator textarea").first().val());
		$(caller).attr("href",$("#attrModificator textarea").last().val());
		$("#attrModificatorContainer").fadeOut(100);
		event.stopPropagation();
	});
	$("#attrModificator textarea").off("keypress");
	$("#attrModificator textarea").on("keypress",function(event){
		if(!event.shiftKey&&event.keyCode==13){
			$(caller).html($("#attrModificator textarea").first().val());
			$(caller).attr("href",$("#attrModificator textarea").last().val());
			$("#attrModificatorContainer").fadeOut(100);
		}
		event.stopPropagation();
	});
}

//Deben someterse a revision:
//-helperContainer
//-helperLink
//-helperForm