



/*****************************************
* Display error messages
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
* Verify valid input fields
******************************************/

// sum the results, parseInt since split from text
var verifyCCStep4 = function (ccArray) {
	
	var sum = 0;
	
	for (var i = 0; i < ccArray.length; i++) {
		sum += parseInt(ccArray[i]);
	}
	return sum;
};

// multiply even numbers by 2 subtract 9 from numbers > 9
var verifyCCStep3 = function (ccArray) {
	
	for (var i = 1; i < ccArray.length; i = i + 2) {
		ccArray[i] = ccArray[i] * 2;
		
		if (ccArray[i] > 9) {
			ccArray[i] = ccArray[i] - 9;
		}
	}
	return ccArray;
};

// Verify a valid credit card number has been entered
//
//  To verify (from Wikipedia):
//
//	From the rightmost digit, which is the check digit, moving left, 
//	double the value of every second digit; if the product of this 
//	doubling operation is greater than 9 (e.g., 8 × 2 = 16), then sum 
//	the digits of the products (e.g., 16: 1 + 6 = 7, 18: 1 + 8 = 9) or 
//	alternatively subtract 9 from the product (e.g., 16: 16 - 9 = 7, 18: 18 - 9 = 9).
//	Take the sum of all the digits. If the total modulo 10 is equal to 0 
//	(if the total ends in zero) then the number is valid according to the 
//	Luhn formula; else it is not valid.
//
//  fake but correctly formulated numbers found at 
//		http://www.freeformatter.com/credit-card-number-generator-validator.html
//		for testing purposes
var isCCNumberError = function () {
	var step0 = 0;
	var step1Array = [];
	var step2Array = [];
	var step3Array = [];
	var step4 = 0;
	var step5 = 0;
	
	step0 = $('#cc-num').val();	// get the credit card number entered
	
	if (!step0.trim()) {		// check for an empty string
		displayCCNumberError();	// display error message
		return true;
	} else if (step0 == 0) {	// check for a value of 0, (which passes the test otherwise)
		displayCCNumberError();	// display error message
		return true;
	}
	
	step1Array = $('#cc-num').val().split(''); // convert the input text string to an array of numbers
	step2Array = step1Array.reverse();		   // reverse the array, this is just conceptually easier than counting down
	step3Array = verifyCCStep3(step2Array);    // multiply even numbers by 2, subtract 9 from numbers >= 10
	step4 = verifyCCStep4(step3Array);		   // some the result
	step5 = step4 % 10;						   // get the sum modulus 10
	
	if (step5 !== 0) {						   // if the result is 0 it passed
		displayCCNumberError();		// display error message
		return true;
	} else {
		return false;
	}
};

// check to see if a valid zip code has been entered
//		valid:  #####	or  #####-####
//		ex		12345
//		ex					12345-6789
var isZipCodeError = function() {
	
    var zipCode = $('#zip').val();			// get the zip code entered
    var zipCodeRegex = /^\d{5}(-\d{4})?$/;	// Regex to verify input

    if (!zipCodeRegex.test(zipCode))	// perform test
    {
        displayZipCodeError();	// on error display message
		return true;
    } else {
		return false;
	}
 };

 // check to see if a valid CVV code has been entered
 // 	valid:  ###
 //     ex:     123
var isCVVError = function() {
	
    var verificationCode = $('#cvv').val(); // get the code entered
    var verificationCodeRegex = /^\d{3}$/;	// Regex to verify 3 numbers

    if (!verificationCodeRegex.test(verificationCode)) //do the test
    {
        displayCVVError();	// on error display message
		return true;
    } else {
		return false;
	}
 };

 // Check to see that at least one activity was selected
var isActivityCountError = function() {
	
	var activitiesCount = 0;
	var isChecked;
	
	// cycle through all activities in the activitiesArray initialized in data.js
	for (var i = 0; i < activitiesArray.length; i++) {
		isChecked = $('.activities').find('input[type="checkbox"]').eq(i).prop('checked'); // see if activity is selected
		
		// if selected add it to the counter
		if (isChecked) {
			activitiesCount++;
		}
	}	

	// test for at least one activity
	if (activitiesCount > 0) {
		return false;
	} else {
		displayActivityError();	// on error display message
		return true;
	}
};

// check to see if a valid email address has been entered
var isEmailError = function() {
	
	var emailVal = $('#mail').val();	// get email value
	
	// Regex test from http://emailregex.com/
	var emailTest = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
	
	var isNotError = emailTest.test(emailVal); // perform the test
		
	if (isNotError) {
		return false;
	} else {
		displayEmailError(); // on error display message
		return true;	
	}
};

// check to see if a name has been entered
var isNameError = function() {
	var nameVal = $('#name').val();
	
	if (!nameVal.trim()) {	// don't count spaces
		displayNameError();	// on error display message
		return true;
	} else {
		return false;
	}
};

// Check to see if no payment method is selected
var isPaymentMethodError = function() {
	var selectedPaymentMethodValue = $('#payment').find(':selected').val();
	
	if (selectedPaymentMethodValue === 'select_method') {
		displayPaymentMethodError();	// on error display message
		return true;
	} else {
		return false;
	}
};

// Event handler for form submit input verification
$('form').on('click', 'button[type="submit"]', function($event) {
	
	var selectedPaymentValue = $('#payment').find(':selected').val(); // get payment method
	var isError;
	
	clearDisplayErrors();
	
	// Or all the isXXXError(s) together to get a single true/false for an error occured  
	// wrote the isXxxError checks like this with checks on the left of the || operator
	//	to insure all error checks run
	isError = isNameError();
	isError = isEmailError() || isError;
	isError = isActivityCountError() || isError;
	isError = isPaymentMethodError() || isError;

	// don't check for credit card errors unless it is the payment method selected
	if (selectedPaymentValue === 'credit card') {
		isError = isCCNumberError() || isError;
		isError = isZipCodeError() || isError;
		isError = isCVVError() || isError;
	}
		
	// if there is an error don't submit the form
	if (isError) {
		$event.preventDefault();
	} 
});

/*****************************************
* Payment section
******************************************/

// hide/show appropriate section
var hideCreditCard = function() {
	$('#credit-card').hide();
};

var showCreditCard = function() {
	$('#credit-card').show();
};

var hidePayPal = function() {
	$("#payment").parents().find('p:not(.error)').first().hide(); // make sur not to select error message p
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

// function only run on-load
var selectCreditCard = function() {
	$('#payment').find(':selected').prop('selected', false);		// unselect default
	$('#payment').children('option').eq(1).prop('selected', true);  // select credit card for payment method
	showCreditCard();	// display credit card info
	hidePayPal();		// hide the others
	hideBitCoin();
};
	
// Event handler for Payment Information
$('#payment').change( function () {
	var selectedVal = $('#payment').find(':selected').val(); // get selected payment method
	
	if (selectedVal === 'credit card') {	// if credit card selected show credit card hide the others
		hidePayPal();
		hideBitCoin();
		showCreditCard();
	} else if (selectedVal === 'paypal') {	// if paypal selected show paypal hide the others
		hideCreditCard();
		hideBitCoin();
		showPayPal();
	} else if (selectedVal === 'bitcoin') {	// if bitcoin selected show bitcoin hide the others
		hideCreditCard();
		hidePayPal();
		showBitCoin();
	} else {								// if no payment method selected hide all of them
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