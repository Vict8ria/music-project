$(document).ready(function () {

	$(".arrow-down").click((function() {
	    var i = 0;
	    return function() {
	        $(".artists__items").animate({
	            height: (++i % 2) ? 400 : 200
	        }, 'linear' );
	        $(this).toggleClass("rotate-button");
	    }
	    
	})());

	var submitIcon = $('.searchbox-icon');
	var inputBox = $('.searchbox-input');
	var searchBox = $('.searchbox');
	var isOpen = false;
	submitIcon.click(function(){
		if(isOpen == false){
			searchBox.addClass('searchbox-open');
			inputBox.focus();
			isOpen = true;
		} else {
			searchBox.removeClass('searchbox-open');
			inputBox.focusout();
			isOpen = false;
		}
	});  
	submitIcon.mouseup(function(){
		return false;
	});
	searchBox.mouseup(function(){
		return false;
	});
	$(document).mouseup(function(){
		if(isOpen == true){
			$('.searchbox-icon').css('display','block');
			submitIcon.click();
		}
	});
	

	$('ul.top__links li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.top__links li').removeClass('current');
		$('.top-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

	if($(window).width() > 720) {
	    var element = document.querySelector('.top__link'),
	    margin = window.getComputedStyle(element).marginRight, 
	    left = 0,
	    margin = parseInt(margin.replace(/\D+/g,""));

	    $(".top__link:eq(0)").click(function(){
	        var elem = document.getElementsByClassName("top__link")[0];
	        left = 0 + parseFloat(elem.offsetLeft);
	        var widthCurrent = Math.ceil($(".top__link:eq(0)").outerWidth());
	        $(".slide__link").outerWidth(widthCurrent).animate({left: left }, 500);
	      });

	     $(".top__link:eq(1)").click(function(){
	        var elem = document.getElementsByClassName("top__link")[1];
	        left = 0 + parseFloat(elem.offsetLeft);
	        var widthCurrent = Math.ceil($(".top__link:eq(1)").outerWidth());
	        $(".slide__link").outerWidth(widthCurrent).animate({left: left}, 500);
	    });
	 }

})
  
function buttonUp(){
	var inputVal = $('.searchbox-input').val();
	inputVal = $.trim(inputVal).length;
	if( inputVal !== 0){
		$('.searchbox-icon').css('display','none');
	} else {
		$('.searchbox-input').val('');
		$('.searchbox-icon').css('display','block');
	}
}