var availableTagsForFiles = [
      "Style.css"
    ];
 $(document).ready(function() {
	 //$( "#tags" ).autocomplete({ "minLength": 0, "source": availableTagsForFiles }); // causa errores en modo app
				$( "#tags" ).click(function(e){$('#' + e.target.id).keydown()});
				$( "#tags" ).blur(function(e){
					var nuevo = $(this).val();
					if(isBlank(nuevo)){
						$(this).parent().css('display', 'none');
						$(this).parent().prev().css('display', 'block');
						return;
					}
					
					var matchString = nuevo;
					var rslt = null;
					$.each(availableTagsForFiles, function(index, value) { 
					  if (rslt == null && value.toLowerCase() == (matchString.toLowerCase())) {
						rslt = index;
						return false;
					  }
					});
					if(rslt!=null){
						$(this).parent().css('display', 'none');
						$(this).parent().prev().css('display', 'block');
						$(this).parent().prev().text(availableTagsForFiles[rslt]);
						return;
					}
					availableTagsForFiles.push(nuevo);
					$(this).parent().css('display', 'none');
					$(this).parent().prev().css('display', 'block');
					$(this).parent().prev().text(nuevo);
					return;
				});
				$( "#tags" ).bind('keypress', function (event) {
					if(event.which == 32){
						event.preventDefault();
					}
					if(event.which == 13){
						$(this).blur();
					}
				});
/*	availableTagsForFiles = [
      "ActionScript",
      "AppleScript",
      "Asp"
    ];
	$( "#tags" ).autocomplete({
      source: availableTags
    });*/
  });