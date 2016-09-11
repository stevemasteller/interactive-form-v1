

var displayJsPunsColors = function() {
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
	
	if (selectVal === 'js puns') {
		displayJsPunsColors();
	} else if (selectVal === 'heart js') {
		displayHeartJsColors();
	} else {
		displayThemeColors();
	}
});
/*****************************************
*
******************************************/
var addOtherTitleMarkup = function() {
	$newInput = $('<input id="other-title" placeholder="Your Title">');
	
	$('#title').after($newInput);
};

var removeOtherTitleMarkup = function() {
	$('#other-title').remove();
};

// Event handler for Job Role select element
$('#title').change( function() {
	var selectedVal = $('#title').find(':selected').val();
	
	if (selectedVal === 'other') {
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

var enableActivities = function() {
	
	// Set disabled and color of all inputs to enabled 
	for (var j = 0; j < activitiesArray.length; j++) {
	    $('.activities').find('input').eq(j).prop('disabled', false);
		$('.activities').find('label').eq(j).attr('style', 'color: black');
	}
	
	removeTotalMarkup();
}

var disableActivities = function() {
	var total = 0;
	
	// disable select checboxes depending on which boxes are checked
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
	enableActivities();
	disableActivities();
});

/*****************************************
*
******************************************/
// On load
$('#name').focus();
