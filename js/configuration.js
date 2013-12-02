var conf=["NuevoProyectoGrammer","","","",""];

$(document).ready(function(){
	$("#documentConfiguration input[type=text]").each(function(index){
		$(this).val(conf[index]);
	});
	$(".conf").click(function(){
		$("#documentConfiguration").fadeIn(400);
	});
	$("#documentConfiguration .cancel").click(function(){
		$("#documentConfiguration").fadeOut(400);
		$("#documentConfiguration input[type=text]").each(function(index){
			$(this).val(conf[index]);
		});
	});
	$("#documentConfiguration .Ok").click(function(){
		$("#documentConfiguration").fadeOut(400);
		$("#documentConfiguration input[type=text]").each(function(index){
			if(index==0&&$(this).val()==""){$(this).val(conf[index]);}
			conf[index]=$(this).val();
		});
	});
});