

var addOtherTitleMarkup = function() {
	$newInput = $('<input id="other-title" placeholder="Your Title">');
	
	$('#title').after($newInput);
};

var removeOtherTitleMarkup = function() {
	$('#other-title').remove();
};

var displayJsPunsColors = function() {
	alert();
	$('#color').children('option').eq(0).removeAttr('style');
	$('#color').children('option').eq(1).removeAttr('style');
	$('#color').children('option').eq(2).removeAttr('style');
	$('#color').children('option').eq(3).attr('style', 'display: none');
	$('#color').children('option').eq(4).attr('style', 'display: none');
	$('#color').children('option').eq(5).attr('style', 'display: none');
};

var displayHeartJsColors = function() {
	$('#color').children('option').eq(0).attr('style', 'display: none');
	$('#color').children('option').eq(1).attr('style', 'display: none');
	$('#color').children('option').eq(2).attr('style', 'display: none');
	$('#color').children('option').eq(3).removeAttr('style');
	$('#color').children('option').eq(4).removeAttr('style');
	$('#color').children('option').eq(5).removeAttr('style');
};

var displayThemeColors = function() {
	$('#color').children('option').eq(0).removeAttr('style');
	$('#color').children('option').eq(1).removeAttr('style');
	$('#color').children('option').eq(2).removeAttr('style');
	$('#color').children('option').eq(3).removeAttr('style');
	$('#color').children('option').eq(4).removeAttr('style');
	$('#color').children('option').eq(5).removeAttr('style');
};

// Event handler for T-Shirt design select element
$('#design').change( function () {
		var selectVal = $('#design').find(':selected').val();
		
		alert(selectVal);
		if (selectVal === 'js puns') {
			displayJsPunsColors();
		} else if (selectVal === 'heart js') {
			displayHeartJsColors();
		} else {
			displayThemeColors();
		}
	});

// Event handler for Job Role title select element
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
