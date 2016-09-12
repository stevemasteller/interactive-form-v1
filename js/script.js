/*****************************************
*
******************************************/



var isNameError = function () {
	var name = $('#name').val();
	
	if (!name.trim()) {
		return true;
	} else {
		return false;
	}
}

$('form').on('click', 'button[type="submit"]', function($event) {
	var isError = isNameError();
	
	alert(isError);
	if (isError) {
		$event.preventDefault();
	} 
});

/*****************************************
*
******************************************/

var hideCreditCard = function() {
	$('#credit-card').hide();
};

var showCreditCard = function() {
	$('#credit-card').show();
};

var hidePayPal = function() {
	$("#payment").parents().find('p').first().hide();
};

var showPayPal = function() {
	$("#payment").parents().find('p').first().show();
};

var hideBitCoin = function() {
	$("#payment").parents().find('p').last().hide();	
};

var showBitCoin = function() {
	$("#payment").parents().find('p').last().show();	
};

var selectCreditCard = function() {
	$('#payment').find(':selected').prop('selected', false);
	$('#payment').children('option').eq(1).prop('selected', true);
};
	
// Event handler for Payment Information
$('#payment').change( function () {
	var selectedVal = $('#payment').find(':selected').val();
	
	alert(selectedVal);
	if (selectedVal === 'credit card') {
		hidePayPal();
		hideBitCoin();
		showCreditCard();
	} else if (selectedVal === 'paypal') {
		hideCreditCard();
		hideBitCoin();
		showPayPal();
	} else {
		hideCreditCard();
		hidePayPal();
		showBitCoin();
	}
});

/*****************************************
*
******************************************/

var displayJsPunsColors = function() {
	$('#color').children(':selected').prop('selected', false);
	$('#color').children('option').eq(0).prop('selected', true);
	
	$('#color').children('option').eq(0).removeAttr('style');
	$('#color').children('option').eq(1).removeAttr('style');
	$('#color').children('option').eq(2).removeAttr('style');
	$('#color').children('option').eq(3).attr('style', 'display: none');
	$('#color').children('option').eq(4).attr('style', 'display: none');
	$('#color').children('option').eq(5).attr('style', 'display: none');
};

var displayHeartJsColors = function() {
	$('#color').children(':selected').prop('selected', false);
	$('#color').children('option').eq(3).prop('selected', true);
	
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
$('#design').change( function () {
	var selectedVal = $('#design').find(':selected').val();
	
	if (selectedVal === 'js puns') {
		displayJsPunsColors();
		showColorsSelect();
	} else if (selectedVal === 'heart js') {
		displayHeartJsColors();
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
	
	$('#title').parent().after($newInput);
};

var removeOtherTitleMarkup = function() {
	$('#other-title').remove();
};

// Event handler for Job Role select element
$('#title').change( function () {
	var selectedVal = $('#title').find(':selected').val();
	
	if (selectedVal === 'other') {
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
};

var addTotalMarkup = function(total) {
	
	// display total
	if (total > 0) {
		newH4 = $('<h4>Total: $' + total + '<h4>');
		
		$('.activities').append(newH4);
	}
};

var clearActivities = function() {
	
	// Set disabled and color of all inputs to enabled 
	for (var j = 0; j < activitiesArray.length; j++) {
	    $('.activities').find('input').eq(j).prop('disabled', false);
		$('.activities').find('label').eq(j).attr('style', 'color: black');
	}
	
	removeTotalMarkup();
};

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
};

// Event handler for Activities check boxes
$('.activities').on('click', 'input[type="checkbox"]', function() {
	clearActivities();
	disableActivities();
});

/*****************************************
* On load
******************************************/
$('#name').focus();
hideColorsSelect();
hidePayPal();
hideBitCoin();
selectCreditCard();

