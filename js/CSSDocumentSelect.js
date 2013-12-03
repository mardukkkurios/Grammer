  $(function() {
    var availableTagsForFiles = [
      "Style.css"
    ];
    $( "#tags" ).autocomplete({ minLength: 0, source: availableTagsForFiles })
				.click(function(e){ $('#' + e.target.id).keydown() })
				.blur(function(e){
					//alert($(this).val());
				})
				.bind('keypress', function (event) {
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