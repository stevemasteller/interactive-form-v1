

/*****************************************
*
******************************************/

var displayJsPunsColors = function() {
//	$('#color').children(':selected').prop('selected', false);
//	$('#color').children('option').eq(0).prop('selected', true);
	
	$('#color').children('option').eq(0).removeAttr('style');
	$('#color').children('option').eq(1).removeAttr('style');
	$('#color').children('option').eq(2).removeAttr('style');
	$('#color').children('option').eq(3).attr('style', 'display: none');
	$('#color').children('option').eq(4).attr('style', 'display: none');
	$('#color').children('option').eq(5).attr('style', 'display: none');
};

var displayHeartJsColors = function() {
//	$('#color').children(':selected').prop('selected', false);
//	$('#color').children('option').eq(3).prop('selected', true);
	
	$('#color').children('option').eq(0).attr('style', 'display: none');
	$('#color').children('option').eq(1).attr('style', 'display: none');
	$('#color').children('option').eq(2).attr('style', 'display: none');
	$('#color').children('option').eq(3).removeAttr('style');
	$('#color').children('option').eq(4).removeAttr('style');
	$('#color').children('option').eq(5).removeAttr('style');
};

var hideColorsSelect = function() {
	$('#colors-js-puns').children().hide();
};

var showColorsSelect = function() {
	$('#colors-js-puns').children().show();
};

// Event handler for T-Shirt design select element
$('#design').click( function () {
	var selectText = $('#design').find('a').first().text();
	
	alert(sectText);
	if (selectText === 'js puns') {
//		displayJsPunsColors();
		showColorsSelect();
	} else if (selectText === 'heart js') {
//		displayHeartJsColors();
		showColorsSelect();
	} else {
		hideColorsSelect();
	}
});

/*****************************************
*
******************************************/

var addOtherTitleMarkup = function() {
	$newInput = $('<input id="other-title" placeholder="Your Title">');
	
	$('#role').after($newInput);
};

var removeOtherTitleMarkup = function() {
	$('#other-title').remove();
};

// Event handler for Job Role select element
$('#role').click( function () {
	
	var selectedText = $('#role').find('a').first().text();
	
	if (selectedText === 'Other') {
		removeOtherTitleMarkup();
		addOtherTitleMarkup();
	} else {
		removeOtherTitleMarkup();
	}
});
	
/*****************************************
*
******************************************/

var removeTotalMarkup = function() {
	$('.activities').find('H4').remove();
}

var addTotalMarkup = function(total) {
	
	// display total
	if (total > 0) {
		newH4 = $('<h4>Total: $' + total + '<h4>');
		
		$('.activities').append(newH4);
	}
}

var clearActivities = function() {
	
	// Set disabled and color of all inputs to enabled 
	for (var j = 0; j < activitiesArray.length; j++) {
	    $('.activities').find('input').eq(j).prop('disabled', false);
		$('.activities').find('label').eq(j).attr('style', 'color: black');
	}
	
	removeTotalMarkup();
}

var disableActivities = function() {
	var total = 0;
	
	// disable select checkboxes depending on which other boxes are checked
	for (var j = 0; j < activitiesArray.length; j++) {
		var isChecked = $('.activities').find('input').eq(j).prop('checked');
		
		if (isChecked) {
			total += activitiesArray[j].cost;
			
			for (var i = 0; i < activitiesArray[j].conflicts.length; i++) {
				var conflictingActivity = activitiesArray[j].conflicts[i];
				
				$('.activities').find('input').eq(conflictingActivity).prop('disabled', true);
				$('.activities').find('label').eq(conflictingActivity).attr('style', 'color: rgb(84, 84, 84)');
			}
		}
	}	
	
	addTotalMarkup(total);
}

// Event handler for Activities check boxes
$('.activities').on('click', 'input[type="checkbox"]', function() {
	clearActivities();
	disableActivities();
});

/*****************************************
*
******************************************/
// On load
$('#name').focus();
//hideColorsSelect();
