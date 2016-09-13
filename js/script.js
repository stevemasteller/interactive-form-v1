



/*****************************************
*
******************************************/
var clearDisplayErrors = function() {
	$('p.error').remove();
};

var displayCVVError = function() {
	var $newP = $('<p class="error">CVV Required</p>');
	
	$('#cvv').after($newP);
};

var displayZipCodeError = function() {
	var $newP = $('<p class="error">Required ##### or #####-####</p>');
	
	$('#zip').after($newP);
};

var displayCCNumberError = function() {
	var $newP = $('<p class="error">Credit card number invalid</p>');
	
	$('#cc-num').after($newP);
};

var displayPaymentMethodError = function() {
	var $newP = $('<p class="error">Select payment method</p>');
	
	$('#payment').after($newP);
};

var displayNameError = function() {
	var $newP = $('<p class="error">Name required</p>');
	
	$('#name').after($newP);
};

var displayEmailError = function() {
	var $newP = $('<p class="error">Valid email required</p>');
	
	$('#mail').after($newP);	
};

var displayActivityError = function() {
	var $newP = $('<p class="error">Select at least one activity</p>');
	
	$('.activities').find('legend').after($newP);
};

/*****************************************
*
******************************************/

var verifyCCStep4 = function (ccArray) {
	
	var sum = 0;
	
	for (var i = 0; i < ccArray.length; i++) {
		sum += parseInt(ccArray[i]);
	}
	return sum;
};

var verifyCCStep3 = function (ccArray) {
	
	for (var i = 1; i < ccArray.length; i = i + 2) {
		ccArray[i] = ccArray[i] * 2;
		
		if (ccArray[i] > 9) {
			ccArray[i] = ccArray[i] - 9;
		}
	}
	return ccArray;
};

var isCCNumberError = function () {
	var step0 = 0;
	var step1Array = [];
	var step2Array = [];
	var step3Array = [];
	var step4 = 0;
	var step5 = 0;
	
	step0 = $('#cc-num').val();
	
	if (!step0.trim()) {
		displayCCNumberError();
		return true;
	} else if (step0 == 0) {
		displayCCNumberError();
		return true;
	}
	
	step1Array = $('#cc-num').val().split('');
	step2Array = step1Array.reverse();
	step3Array = verifyCCStep3(step2Array);
	step4 = verifyCCStep4(step3Array);
	step5 = step4 % 10;
	
	if (step5 !== 0) {
		displayCCNumberError();
		return true;
	} else {
		return false;
	}
};

var isZipCodeError = function() {
	
    var zipCode = $('#zip').val();
    var zipCodeRegex = /^\d{5}(-\d{4})?$/;

    if (!zipCodeRegex.test(zipCode))
    {
        displayZipCodeError();
		return true;
    } else {
		return false;
	}
 };

var isCVVError = function() {
	
    var verificationCode = $('#cvv').val();
    var verificationCodeRegex = /^\d{3}$/;

    if (!verificationCodeRegex.test(verificationCode))
    {
        displayCVVError();
		return true;
    } else {
		return false;
	}
 };

var isActivityCountError = function() {
	
	var activitiesCount = 0;
	var isChecked;
	
	for (var i = 0; i < activitiesArray.length; i++) {
		isChecked = $('.activities').find('input[type="checkbox"]').eq(i).prop('checked');
		
		if (isChecked) {
			activitiesCount++;
		}
	}	

	if (activitiesCount > 0) {
		return false;
	} else {
		displayActivityError();
		return true;
	}
};

var isEmailError = function() {
	
	var emailVal = $('#mail').val();
	
	var emailTest = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
	
	var isNotError = emailTest.test(emailVal);
		
	if (isNotError) {
		return false;
	} else {
		displayEmailError();
		return true;	
	}
};

var isNameError = function() {
	var nameVal = $('#name').val();
	
	if (!nameVal.trim()) {
		displayNameError();
		return true;
	} else {
		return false;
	}
};

var isPaymentMethodError = function() {
	var selectedPaymentMethodValue = $('#payment').find(':selected').val();
	
	if (selectedPaymentMethodValue === 'select_method') {
		displayPaymentMethodError();
		return true;
	} else {
		return false;
	}
};

$('form').on('click', 'button[type="submit"]', function($event) {
	
	var selectedPaymentValue = $('#payment').find(':selected').val();
	var isError;
	
	clearDisplayErrors();
	
	isError = isNameError();
	isError = isEmailError() || isError;
	isError = isActivityCountError() || isError;
	isError = isPaymentMethodError() || isError;

	if (selectedPaymentValue === 'credit card') {
		isError = isCCNumberError() || isError;
		isError = isZipCodeError() || isError;
		isError = isCVVError() || isError;
	}
		
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
	$("#payment").parents().find('p:not(.error)').first().hide();
};

var showPayPal = function() {
	$("#payment").parents().find('p:not(.error)').first().show();
};

var hideBitCoin = function() {
	$("#payment").parents().find('p:not(.error)').last().hide();	
};

var showBitCoin = function() {
	$("#payment").parents().find('p:not(.error)').last().show();	
};

var selectCreditCard = function() {
	$('#payment').find(':selected').prop('selected', false);
	$('#payment').children('option').eq(1).prop('selected', true);
	showCreditCard();
	hidePayPal();
	hideBitCoin();
};
	
// Event handler for Payment Information
$('#payment').change( function () {
	var selectedVal = $('#payment').find(':selected').val();
	
	if (selectedVal === 'credit card') {
		hidePayPal();
		hideBitCoin();
		showCreditCard();
	} else if (selectedVal === 'paypal') {
		hideCreditCard();
		hideBitCoin();
		showPayPal();
	} else if (selectedVal === 'bitcoin') {
		hideCreditCard();
		hidePayPal();
		showBitCoin();
	} else {
		hideCreditCard();
		hidePayPal();
		hideBitCoin();
	}
});

/*****************************************
* T-Shirt Section
******************************************/

// brute force selection of Java Script Puns theme Colors
var displayJsPunsColors = function() {
	$('#color').children(':selected').prop('selected', false);		// remove selected option
	$('#color').children('option').eq(0).prop('selected', true);	// select first option in JS Puns theme colors
	
	$('#color').children('option').eq(0).removeAttr('style');	// display JS Puns theme colors
	$('#color').children('option').eq(1).removeAttr('style');
	$('#color').children('option').eq(2).removeAttr('style');
	$('#color').children('option').eq(3).attr('style', 'display: none');	// hide I heart JS theme colors
	$('#color').children('option').eq(4).attr('style', 'display: none');
	$('#color').children('option').eq(5).attr('style', 'display: none');
};

// brute force selection of I heart Java Script theme colors
var displayHeartJsColors = function() {
	$('#color').children(':selected').prop('selected', false);		// remove selected option
	$('#color').children('option').eq(3).prop('selected', true);	// select first option in I heart JS theme
	
	$('#color').children('option').eq(0).attr('style', 'display: none');	// hide JS Puns theme colors
	$('#color').children('option').eq(1).attr('style', 'display: none');
	$('#color').children('option').eq(2).attr('style', 'display: none');
	$('#color').children('option').eq(3).removeAttr('style');	// display I heart JS theme colors
	$('#color').children('option').eq(4).removeAttr('style');
	$('#color').children('option').eq(5).removeAttr('style');
};

// Hide the colors selector
var hideColorsSelect = function() {
	$('#colors-js-puns').children().hide();
};

// Show the colors selector
var showColorsSelect = function() {
	$('#colors-js-puns').children().show();
};

// Event handler for T-Shirt design select element
$('#design').change( function () {
	var selectedVal = $('#design').find(':selected').val();	// find selected theme
	
	if (selectedVal === 'js puns') {			// if Js Puns theme display
		displayJsPunsColors();						// js puns colors
		showColorsSelect();							// colors selector
	} else if (selectedVal === 'heart js') {	// if I heart js theme display
		displayHeartJsColors();						// i heart js colors
		showColorsSelect();							// colors selector
	} else {
		hideColorsSelect();	// if no theme selected hide colors selector
	}
});

/*****************************************
* Job Role Selector Section
******************************************/

var hideOtherTitle = function() {
	$('#other-div').children().hide();
};

var showOtherTitle = function() {
	$('#other-div').children().show();
};

// Event handler for Job Role select element
$('#title').change( function () {
	var selectedVal = $('#title').find(':selected').val();
	
	if (selectedVal === 'other') {		// other is special it displays an alternate input for title
		showOtherTitle();
	} else {
		hideOtherTitle();
	}
});
	
/*****************************************
* Register for Activities Section
******************************************/

// remove display of total from markup
var removeTotalMarkup = function() {
	$('.activities').find('H4').remove();
};

// adds an <h4> for the display of the total activity cost
var addTotalMarkup = function(total) {
	
	// display total
	if (total > 0) {
		var $newH4 = $('<h4>Total: $' + total + '<h4>');
		
		$('.activities').append($newH4);
	}
};

// removes all viduals for conflicting activities 
var clearActivities = function() {
	
	// Set disabled and color of all inputs to enabled 
	for (var j = 0; j < activitiesArray.length; j++) {
	    $('.activities').find('input').eq(j).prop('disabled', false);
		$('.activities').find('label').eq(j).attr('style', 'color: black');
	}
	
	removeTotalMarkup();
};

// cycle through the activitiesArray initialized in the data file
//		for each checked activity cycle through conflicts and disable them
var disableActivities = function() {
	var total = 0;				// running cost total
	var isChecked;				// indicates selected activity
    var conflictingActivity;	// single conflicting activity fetched from the activitiesArray
	
	// cycle through all activities
	for (var j = 0; j < activitiesArray.length; j++) {
		isChecked = $('.activities').find('input[type="checkbox"]').eq(j).prop('checked');
		
		// activity is selected
		if (isChecked) {
			total += activitiesArray[j].cost;	// add cost to total
			
			// cycle through all conflicting activities
			for (var i = 0; i < activitiesArray[j].conflicts.length; i++) {
				conflictingActivity = activitiesArray[j].conflicts[i];	// fetch a single conflict
				
				// visually show conflicting activity
				$('.activities').find('input').eq(conflictingActivity).prop('disabled', true);
				$('.activities').find('label').eq(conflictingActivity).attr('style', 'color: rgb(84, 84, 84)');
			}
		}
	}	
	
	addTotalMarkup(total); // display total
};

// Event handler for Activities check boxes
$('.activities').on('click', 'input[type="checkbox"]', function() {
	clearActivities();		// enable all activities
	disableActivities();	// disable activities based on conflicts, also adds total
});

/*****************************************
* On load
******************************************/
$('#name').focus();		// switch focus to first input
hideOtherTitle();		// hide some things
hideColorsSelect();
hidePayPal();
hideBitCoin();
selectCreditCard();		// initialize payment method to credit card