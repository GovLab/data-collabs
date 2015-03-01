jQuery(document).ready(function($) {
   
   'use strict';
   
   
   //FULLSCREEN SLIDER
	$('#slides').superslides({
      animation: 'fade'
   });
	
	
	//SMOOTH SCROLL
	smoothScroll.init({
		speed: 500, // How fast to complete the scroll in milliseconds
		easing: 'easeInOutCubic', // Easing pattern to use
		updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
		callbackBefore: function ( toggle, anchor ) {}, // Function to run before scrolling
		callbackAfter: function ( toggle, anchor ) {} // Function to run after scrolling
	 });
	 
	 
	//TEXT ROTATOR
	$(".rotate").textrotator({
	  animation: "fade", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
	  separator: "," // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
	});

	  
	//MILESTONE
    $('.timer').countTo();
		
 	 	
	//ANIMATIONS
	var wow = new WOW(
	  {
		boxClass:     'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset:       0,          // distance to the element when triggering the animation (default is 0)
		mobile:       false        // trigger animations on mobile devices (true is default)
	  }
	);
	wow.init();
    
	  
	//OWLCAROUSEL TESTIMONIAL
	$("#quote").owlCarousel({
 
		pagination : false, 
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:true,
		navigation : true, // Show next and prev buttons
		navigationText : ['<i class="pe-7s-angle-left-circle pe-3x"></i>','<i class="pe-7s-angle-right-circle pe-3x"></i>']
	});
	
	
	//OWLCAROUSEL TEAM
	$("#team-slider").owlCarousel({
 
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:false,
		items : 3,
		itemsDesktop : [1200,3],
		itemsDesktopSmall : [980,3],
		itemsTablet: [768,2],
		itemsMobile : [479,1],
		navigation : true, // Show next and prev buttons
		navigationText : ['<i class="pe-7s-angle-left-circle pe-3x"></i>','<i class="pe-7s-angle-right-circle pe-3x"></i>']
	});
	
	
	//OWLCAROUSEL CLIENTS 
	$("#clients-carousel").owlCarousel({
 
      autoPlay: false, 
 
      items : 6,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3]
 
  	});
  
  
	//LIGHTBOX GALLERY
	(function ($, window, document, undefined) {

    var gridContainer = $('#grid-container'),
        //filtersContainer = $('#filters-container');
        filtersContainer = $('.filters-container');

	// init cubeportfolio
    gridContainer.cubeportfolio({

        defaultFilter: '*',

        animationType: 'flipOut',

        gapHorizontal: 45,

        gapVertical: 30,

        gridAdjustment: 'responsive',

        caption: 'minimal',

        displayType: 'lazyLoading',

        displayTypeSpeed: 100,

        // lightbox
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: true,
        lightboxTitleSrc: 'data-title',
        lightboxShowCounter: false,

        // singlePage popup
        singlePageDelegate: '.cbp-singlePage',
        singlePageDeeplinking: true,
        singlePageStickyNavigation: false,
        singlePageShowCounter: false,
        singlePageCallback: function (url, element) {

            // to update singlePage content use the following method: this.updateSinglePage(yourContent)
            var t = this;

            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                timeout: 5000
            })
            .done(function(result) {
                t.updateSinglePage(result);
            })
            .fail(function() {
                t.updateSinglePage("Error! Please refresh the page!");
            });

        },

        // single page inline
        singlePageInlineDelegate: '.cbp-singlePageInline',
        singlePageInlinePosition: 'above',
        singlePageInlineShowCounter: false,
        singlePageInlineInFocus: true,
        singlePageInlineCallback: function(url, element) {
            // to update singlePage Inline content use the following method: this.updateSinglePageInline(yourContent)
        }
    });

    // add listener for filters click
    filtersContainer.on('click', '.cbp-filter-item', function (e) {

        var me = $(this), wrap;

        // get cubeportfolio data and check if is still animating (reposition) the items.
        if ( !$.data(gridContainer[0], 'cubeportfolio').isAnimating ) {

            if ( filtersContainer.hasClass('cbp-l-filters-dropdown') ) {
                wrap = $('.cbp-l-filters-dropdownWrap');

                wrap.find('.cbp-filter-item').removeClass('cbp-filter-item-active');

                wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());

                me.addClass('cbp-filter-item-active');
            } else {
                me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
            }

        }

        // filter the items
        var filters = $('.cbp-filter-item-active').map( function() { return $(this).data('filter'); }).toArray().join('');
        //filters = filters.replace('*.','.').replace('.*.','.').replace('.*', '').replace('**', '*');
        if (filters == '*****') {
            filters = '*';
        } else {
            filters = filters.replace(/\*{1,}/g, '');
        }
        console.log(filters);
        gridContainer.cubeportfolio('filter', filters, function () {});
    });

    // activate counters
    gridContainer.cubeportfolio('showCounter', filtersContainer.find('.cbp-filter-item'));


    // add listener for load more click
    $('.cbp-l-loadMore-button-link').on('click', function(e) {

        e.preventDefault();

        var clicks, me = $(this), oMsg;

        if (me.hasClass('cbp-l-loadMore-button-stop')) return;

        // get the number of times the loadMore link has been clicked
        clicks = $.data(this, 'numberOfClicks');
        clicks = (clicks)? ++clicks : 1;
        $.data(this, 'numberOfClicks', clicks);

        // set loading status
        oMsg = me.text();
        me.text('LOADING...');

        // perform ajax request
        $.ajax({
            url: me.attr('href'),
            type: 'GET',
            dataType: 'HTML'
        })
        .done( function (result) {
            var items, itemsNext;

            // find current container
            items = $(result).filter( function () {
                return $(this).is('div' + '.cbp-loadMore-block' + clicks);
            });

            gridContainer.cubeportfolio('appendItems', items.html(),
                 function () {
                    // put the original message back
                    me.text(oMsg);

                    // check if we have more works
                    itemsNext = $(result).filter( function () {
                        return $(this).is('div' + '.cbp-loadMore-block' + (clicks + 1));
                    });

                    if (itemsNext.length === 0) {
                        me.text('NO MORE WORKS');
                        me.addClass('cbp-l-loadMore-button-stop');
                    }

                 });

        })
        .fail(function() {
            // error
        });

    });

})(jQuery, window, document);

 
}); 


$(window).load(function(){
	
	
	//PARALLAX BACKGROUND
	$(window).stellar({
		horizontalScrolling: false,
	});
    
	
    //PRELOADER
    $('#preload').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
	
	
	//HEADER ANIMATION
	$(window).scroll(function() {
		if ($(".navbar").offset().top > 50) {
			$(".navbar-fixed-top").addClass("top-nav-collapse");
		} else {
			$(".navbar-fixed-top").removeClass("top-nav-collapse");
		}
	});

});


	//GOOGLE MAP
	function init_map() {
    var myOptions = {
        zoom: 14,
        center: new google.maps.LatLng(40.801485408197856, -73.96745953467104), //change the coordinates
        mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		mapTypeControl: false,
   		styles: [{featureType:'all',stylers:[{saturation:-100},{gamma:0.50}]}]
    };
	
	

	
    map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
    marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(40.801485408197856, -73.96745953467104) //change the coordinates
    });
    infowindow = new google.maps.InfoWindow({
        content: "<b>Avalith Co.</b><br/>2880 Broadway<br/> New York"  //add your address
    });
    google.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
    });
    infowindow.open(map, marker);
	}
	google.maps.event.addDomListener(window, 'load', init_map);
	
	
	// CONTACT FORM FUNCTION
	var contact_send = function(){
	
	'use strict';
	
	var name 	= $("#name").val();
	var email	= $("#email").val();
	var message = $("#message").val();
	
	if ( name=="" ){ alert("Your name is empty!"); $("#name").focus(); }
	else if ( email=="" ){ alert("Your email address is empty!"); $("#email").focus(); }
	else if ( message=="" ){ alert("Your message is empty!"); $("#message").focus(); }
	else {
		$.post("contact.send.php", { name:name, email:email, message:message }, function( result ){
			if ( result=="SUCCESS" ){
				alert("Your contact form is sent.");
				setTimeout(function(){
					$("#name").val("");
					$("#email").val("");
					$("#message").val("");
				}, 3000);
			} else {
				alert("Your contact form isn't sent. Please check fields and try again.");
			}
		});
	}

};