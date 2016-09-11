
var addOtherTitleMarkup = function() {
	$newInput = $('<input id="other-title" placeholder="Your Title">');
	
	$('#title').after($newInput);
};

var removeOtherTitleMarkup = function() {
	$('#other-title').remove();
}

// Event handler for Job Role select element
$('#title').change( function() {
		var selectedVal = $('#title').find(':selected').val();
		
		if (selectedVal === 'other') {
			addOtherTitleMarkup();
		} else {
			removeOtherTitleMarkup();
		}
	});

// On load
$('#name').focus();
