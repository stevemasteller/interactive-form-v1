



/*****************************************
*
******************************************/
var displayNameError = function() {
	$('#name').attr('style', 'background: #faffbd');
	
	var $newP = $('<p class="error">Name required<p>');
	
	$('#name').after($newP);
};

var displayEmailError = function() {
	$('#mail').attr('style', 'background: #faffbd');
	
	var $newP = $('<p class="error">Valid email required<p>');
	
	$('#mail').after($newP);	
}

var displayActivityError = function() {
	$('.activities').find('input[type="checkbox"]').attr('style','background: #faffbd');

	var $newP = $('<p class="error">Select at least one activity<p>');
	
//	$('div.hook').append($newP);
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
		alert('cc number error');
		return true;
	} else if (step0 == 0) {
		alert('cc number error');
		return true;
	}
	
	step1Array = $('#cc-num').val().split('');
	step2Array = step1Array.reverse();
	step3Array = verifyCCStep3(step2Array);
	step4 = verifyCCStep4(step3Array);
	step5 = step4 % 10;
	
	if (step5 !== 0) {
		alert('cc number error');
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
        alert('zipcode error');
		return true;
    } else {
		return false;
	}
 };

var isVerificationCodeError = function() {
	
    var verificationCode = $('#zip').val();
    var verificationCodeRegex = /^\d{3}$/;

    if (!verificationCodeRegex.test(verificationCode))
    {
        alert('verification code error');
		return true;
    } else {
		return false;
	}
 };

var isActivityCountError = function() {
	
	var activitiesCount = 0;
	
	for (var i = 0; i < activitiesArray.length; i++) {
		var isChecked = $('.activities').find('input[type="checkbox"]').eq(i).prop('checked');
		
		if (isChecked) {
			activitiesCount++;
		}
	}	

	if (activitiesCount.length > 0) {
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

$('form').on('click', 'button[type="submit"]', function($event) {
	
	var selectedPaymentValue = $('#payment').find(':selected').val();
	var isError;
	
	isError = isNameError();
	isError = isEmailError() || isError;
	isError = isActivityCountError() || isError;

	if (selectedPaymentValue === 'credit card') {
		isError = isCCNumberError() || isError;
		isError = isZipCodeError() || isError;
		isError = isVerificationCodeError() || isError;
	}
		
	alert('Submit');
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

var hideOtherTitle = function() {
	$('#other-div').children().hide();
};

var showOtherTitle = function() {
	$('#other-div').children().show();
};

// Event handler for Job Role select element
$('#title').change( function () {
	var selectedVal = $('#title').find(':selected').val();
	
	if (selectedVal === 'other') {
		showOtherTitle();
	} else {
		hideOtherTitle();
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
		var $newH4 = $('<h4>Total: $' + total + '<h4>');
		
		$('.activities').append($newH4);
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
		var isChecked = $('.activities').find('input[type="checkbox"]').eq(j).prop('checked');
		
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
hideOtherTitle();
hideColorsSelect();
hidePayPal();
hideBitCoin();
selectCreditCard();