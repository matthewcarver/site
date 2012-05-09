(function($){
	
// The DOM is now ready

//Carousel Plugin
$(function() {
	
	
	var items = $('#carousel ul li').size();  //Gets number of <li>s and sets the number to a variable of 'items'
	//Set .carousel-nav markup
	var navmarkup = '<div class="carousel-nav"><a href="javascript:void(0)" class="prev" rel="' + items + '">&lt;</a><a href="javascript:void(0)" class="next" rel="2">&gt;</a></div>'
	//Set .dots markup
	var dots = '<div class="dots"></div>'
	//Set how much to move divs
	var move = 100 / items
	
	
	
	$(dots).insertAfter('#carousel'); //Inserts .dots after the #carousel
	for (i=1;i<=items;i++){
		var bullets = '<a href="#" rel="' + i + '">&bull;</a>'
		$('.dots').append(bullets);
	}// Adds a dot for every <li>
	
	$(navmarkup).insertBefore("#carousel");//Inserts .carousel-nav before the #carousel
	$('#carousel ul li:first').addClass('active'); //drops active class on first li
	$('.dots a:first').addClass('active'); //drops active class on first dot
	
	function prevSlide(event){
		$('.prev').unbind('click', prevSlide);
		$('.next').unbind('click', nextSlide);
		
		$('#carousel ul li:last').clone().prependTo('#carousel ul').css('margin-left', '-'+ move +'%').animate({marginLeft:'0%'},1500).addClass('active').next().removeClass('active');
		$('#carousel ul li:last').remove();
		
		setTimeout(function(){
			$('.prev').bind('click', prevSlide);
			$('.next').bind('click', nextSlide);
		}, 1500);
	}

	function nextSlide(event){
		
		$('.prev').unbind('click', prevSlide);
		$('.next').unbind('click', nextSlide);
		
		$('#carousel ul li:first').animate({marginLeft:'-' + move + '%'},1500).removeClass('active').next().addClass('active');
		
		setTimeout(function() {
		$('#carousel ul li:first').clone().appendTo('#carousel ul').css('margin-left', '0%');
		$('#carousel ul li:first').remove();
		}, 1500);
		
		setTimeout(function(){
			$('.prev').bind('click', prevSlide);
			$('.next').bind('click', nextSlide);
		}, 1500);
	}

	function randomSlide(event){
		
	}

	$('.prev').bind('click', prevSlide);
	$('.next').bind('click', nextSlide);
	

});
// end Carousel Plugin

//Tabs Plugin
$(function() {
	
	var tabs = $('#tabs ul li').size();  //Gets number of <li>s and sets the number to a variable of 'tabs'
	
	//.each loops to number tabs
	$("#tabs div.tab").each(function (i) {
    i = i+1;
    $(this).addClass("tab-"+ i);
   });
	$("#tabs ul li").each(function (i) {
    i = i+1;
    $(this).attr('rel', ("tab-"+ i) );
   });
	
	
	//add starting classes
	$('#tabs ul li:first').addClass('active');
	$('#tabs ul li:first').addClass('first');
	$('#tabs ul li:last').addClass('last');
	$('#tabs .tab:first').addClass('active');
	
	
	function tabChange(event){
		
		var clicked = $(this).attr('rel');
		
		console.log(clicked)
		
		$('#tabs ul li.active').removeClass('active');
		$(this).addClass('active');
		$('#tabs .tab.active').removeClass('active');
		$('#tabs .' + clicked + '').addClass('active');
		
	}
	
	$("#tabs ul li").bind('click', tabChange);
	
});
// end Tabs Plugin

})( jQuery.noConflict() ); // Pass in jQuery so we can safely use the $ alias within this block
