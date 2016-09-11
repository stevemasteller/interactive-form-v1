

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

var enableDisableActivities = function(index) {
	var selectChecked = $('.activities').find('input').eq(index).prop('checked');
	
	for (var i = 1; i < arguments.length; i++) {
		$('.activities').find('input').eq(arguments[i]).prop('disabled', selectChecked);
		
		if (selectChecked) {
			$('.activities').find('label').eq(arguments[i]).attr('style', 'color: rgb(84, 84, 84)');
		} else {
			$('.activities').find('label').eq(arguments[i]).attr('style', 'color: black');
		}
	}
}

//Event handlers for Workshops
$('.activities').find('input').eq(1).change(function() {enableDisableActivities(1,3,5)});
$('.activities').find('input').eq(2).change(function() {enableDisableActivities(2,4,6)});
$('.activities').find('input').eq(3).change(function() {enableDisableActivities(3,1,5)});
$('.activities').find('input').eq(4).change(function() {enableDisableActivities(4,2,6)});
$('.activities').find('input').eq(5).change(function() {enableDisableActivities(5,1,3)});
$('.activities').find('input').eq(6).change(function() {enableDisableActivities(6,2,4)});
	
// On load
$('#name').focus();
