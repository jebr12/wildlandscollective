var ST = {"disable_header_floating":"y"};


// Call isotope when all images are loaded
function run_isotope(){
    "use strict";
    jQuery(".cpt-items").isotope();
}


// Reservation Form
function ST_Reservation_Form(){
     "use strict";
    var error_report;
    jQuery('#reservation_submit').bind("click",function(){
        jQuery("#reservation_form .notice_ok").hide();
        jQuery("#reservation_form .notice_error").hide();

        error_report = false;
        jQuery("#reservation_form input, #reservation_form textarea, #reservation_form radio, #reservation_form select").each(function(i){
            var form_element          = jQuery(this);
            var form_element_value    = jQuery(this).val();
            var form_element_id       = jQuery(this).attr("id");
            //var form_element_class    = jQuery(this).attr("class");
            var form_element_required = jQuery(this).hasClass("required");

            // Check email validation
            if(form_element_id === "reservation_email"){
                form_element.removeClass("error valid");
                if(!form_element_value.match(/^\w[\w|\.|\-]+@\w[\w|\.|\-]+\.[a-zA-Z]{2,4}$/)){
                    form_element.addClass("error");
                    error_report = true;
                } else {
                    form_element.addClass("valid");
                }
            }

            // Check input required validation
            if(form_element_required && form_element_id !== "reservation_email"){
                form_element.removeClass("error valid");
                if(form_element_value === ""){
                    form_element.addClass("error");
                    error_report = true;
                } else {
                    form_element.addClass("valid");
                }
            }

            if(jQuery("#reservation_form input, #reservation_form textarea, #reservation_form radio, #reservation_form select").length === i+1){
                if(error_report === false){
                    jQuery("#reservation_form .loading").show();

                    var $string = "ajax=true";
                    jQuery("#reservation_form input, #reservation_form textarea, #reservation_form radio, #reservation_form select").each(function(){
                        var $form_element_name     = jQuery(this).attr("name");
                        var $form_element_value    = encodeURIComponent(jQuery(this).val());
                        $string = $string + "&" + $form_element_name + "=" + $form_element_value;
                    });

                    jQuery.ajax({
                        type: "POST",
                        url: "./page-reservation-ajax.php",
                        data:$string,
                        success: function(response){
                            jQuery("#reservation_form .loading").hide();
                            if(response === 'success'){
                                jQuery("#reservation_form .notice_ok").show();
                                jQuery("#reservation_form .field_submit").hide();
                            } else {
                                jQuery("#reservation_form .notice_error").show();
                                jQuery("#reservation_form .field_submit").hide();
                            }
                        }
                    });
                }
            }
        });

        return false;
    });
}

// Contact Form
function ST_Contact_Form(){

    "use strict";
    
    var error_report;
    jQuery("#contact_submit").bind("click",function(){

        // Hide notice message when submit
        jQuery("#contact_form .notice_ok").hide();
        jQuery("#contact_form .notice_error").hide();
        error_report = false;

        jQuery("#contact_form input, #contact_form select, #contact_form textarea, #contact_form radio").each(function(i){

            var form_element          = jQuery(this);
            var form_element_value    = jQuery(this).val();
            var form_element_id       = jQuery(this).attr("id");
            //var form_element_class    = jQuery(this).attr("class");
            var form_element_required = jQuery(this).hasClass("required");

            // Check email validation
            if(form_element_id === "contact_email"){
                form_element.removeClass("error valid");
                if(!form_element_value.match(/^\w[\w|\.|\-]+@\w[\w|\.|\-]+\.[a-zA-Z]{2,4}$/)){
                    form_element.addClass("error");
                    error_report = true;
                } else {
                    form_element.addClass("valid");
                }
            }

            // Check input required validation
            if(form_element_required && form_element_id !== "contact_email"){
                form_element.removeClass("error valid");
                if(form_element_value === ""){
                    form_element.addClass("error");
                    error_report = true;
                } else {
                    form_element.addClass("valid");
                }
            }

            if(jQuery("#contact_form input, #contact_form select, #contact_form textarea, #contact_form radio").length === i+1){
                if(error_report === false){
                    jQuery("#contact_form .loading").show();

                    var $string = "ajax=true";
                    jQuery("#contact_form input, #contact_form select, #contact_form textarea, #contact_form radio").each(function(){
                        var $form_element_name     = jQuery(this).attr("name");
                        var $form_element_value    = encodeURIComponent(jQuery(this).val());
                        $string = $string + "&" + $form_element_name + "=" + $form_element_value;
                    });

                    jQuery.ajax({
                        type: "POST",
                        url: "./page-contact-ajax.php",
                        data:$string,
                        success: function(response){
                            jQuery("#contact_form .loading").hide();
                            if(response === 'success'){
                                jQuery("#contact_form .notice_ok").show();
                                jQuery("#contact_form .field_submit").hide();
                            } else {
                                jQuery("#contact_form .notice_error").show();
                                jQuery("#contact_form .field_submit").hide();
                            }
                        }
                    });
                }
            }


        });
    return false;
    });

}

// Add Calendar to ID
function ST_Add_Calendar(id){
     "use strict";
    jQuery('<div class="calendar" />')
      .insertAfter( jQuery(id) )
      .datepicker({ 
        dateFormat: 'dd-mm-yy', 
        minDate: new Date(), 
        maxDate: '+1y', 
        altField: id, 
        firstDay: 1,
        showOtherMonths: true,
        dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        beforeShowDay: ST_Date_Available })
      .prev().hide();
}


// Date Available For Select
function ST_Date_Available(date){
    "use strict";
    var dateAsString = date.getFullYear().toString() + "-" + (date.getMonth()+1).toString() + "-" + date.getDate();
    var result = jQuery.inArray( dateAsString ) ===-1 ? [true] : [false];
    return result;
}


jQuery(document).ready(function(){
    "use strict";
    

    var top_bar= jQuery('#header .top-bar-wrapper').eq(0);
    var p_top = top_bar.position().top;
    var top_h = p_top + top_bar.height();
    var fixed_e = jQuery('#header .header-outer-wrapper').eq(0);
    fixed_e.attr('logo-height', jQuery('.logo-wrapper img',fixed_e).height());
    
    var is_changed_e_s = false;
    var down_pd = 24; // 10px;
    var logo_rs_h = 30; 
    
     function setTopPos(){
        if(ST.disable_header_floating==='y'){
            return false ;
        }
        
     if(jQuery(window).width()< 959){
        return ;
     }
         
        var  win_top = jQuery(window).scrollTop(); 
        
        if(win_top > top_h)
                {   
                    fixed_e.addClass('fixed');
               
                    if(is_changed_e_s=== false){
                        is_changed_e_s = true;
                        
                         jQuery('.logo-wrapper',fixed_e).animate({
                                paddingTop: '-='+(down_pd-4)+'px'
                         },200);
                          
                         jQuery('.logo-wrapper img',fixed_e).animate({
                                height: (logo_rs_h)+'px'
                         },200);
                         
                         jQuery('.primary-nav > ul >li >a',fixed_e).animate({
                                paddingTop: '-='+down_pd+'px',
                                paddingBottom: '-='+down_pd+'px'    
                         },200);
                         jQuery('.btn',fixed_e).animate({
                                marginTop: '-='+down_pd+'px'
                         },200);
                         
                          jQuery('.primary-nav > ul >li > ul',fixed_e).animate({
                                top: '-='+(down_pd*2)+'px'
                         },200);
                         
                    }
                    
                }else{
                    
                    if(is_changed_e_s===true){
                        
                        jQuery('.logo-wrapper img',fixed_e).animate({
                                height: (fixed_e.attr('logo-height'))
                         },200);
                         
                        jQuery('.logo-wrapper',fixed_e).animate({
                                paddingTop: '+='+(down_pd-4)+'px'
                         },200);
                         
                         jQuery('.primary-nav > ul >li >a',fixed_e).animate({
                                paddingTop: '+='+down_pd+'px',
                                paddingBottom: '+='+down_pd+'px'    
                         },{ queue: false, duration: 200 });
                         jQuery('.btn',fixed_e).animate({
                                marginTop: '+='+down_pd+'px'
                         },200);
                         
                         jQuery('.primary-nav > ul >li > ul',fixed_e).animate({
                                top: '+='+(down_pd*2)+'px'
                         },200);
                         
                         is_changed_e_s =  false;
                    }
                    
                     fixed_e.removeClass('fixed');
                     fixed_e.css({'top' : ''});
                }
     }
     
    
    jQuery(window).scroll(function () {
        setTopPos();
    });
    
    

    // Call the reservation and contact form
   new ST_Reservation_Form();
   new  ST_Contact_Form();

    //Select Box
    jQuery('.select-box select').fadeTo(0, 0);
    jQuery('.select-box').each(function() {
        if(jQuery(this).find('option:selected').length) {
            jQuery(this).find('span').text(jQuery(this).find('option:selected').text());
        }
    });
    jQuery('.select-box select').change(function() {
        jQuery(this).parent().find('span').text(jQuery(this).find('option:selected').text());
    });

    // Call The Calendar Plugin
    new  ST_Add_Calendar('#reservation_arrival');
    new  ST_Add_Calendar('#reservation_departure');

    //ddsmoothmenu for top-bar navigation
    ddsmoothmenu.init({
        mainmenuid: "top-nav-id", //menu DIV id
        orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
        classname: 'top-nav slideMenu', //class added to menu's outer DIV
        contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
    });

    //ddsmoothmenu for primary navigation
    ddsmoothmenu.init({
        mainmenuid: "primary-nav-id", //menu DIV id
        orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
        classname: 'primary-nav slideMenu', //class added to menu's outer DIV
        contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
});

    // Primary Navigation for mobile.
    var primary_nav_mobile_button = jQuery('#primary-nav-mobile');
    var primary_nav_cloned;
    var primary_nav = jQuery('#primary-nav-id > ul');

    primary_nav.clone().attr('id','primary-nav-mobile-id').removeClass().appendTo( primary_nav_mobile_button );
    primary_nav_cloned = primary_nav_mobile_button.find('> ul');
        jQuery('#primary-nav-mobile-a').click(function(){
            if(jQuery(this).hasClass('primary-nav-close')){
                jQuery(this).removeClass('primary-nav-close').addClass('primary-nav-opened');
                primary_nav_cloned.slideDown( 400 );
            } else {
                jQuery(this).removeClass('primary-nav-opened').addClass('primary-nav-close');
                primary_nav_cloned.slideUp( 400 );
            }
            return false;
        });
        primary_nav_mobile_button.find('a').click(function(event){
            event.stopPropagation();
        });

    // Call LayerSlider
    
    jQuery('#layerslider').layerSlider({
        skinsPath : 'assets/ls_skins/',
        skin : 'fullwidth',
        thumbnailNavigation : 'disabled',
        hoverPrevNext : false,
        responsive : true,
        responsiveUnder : 1366,
        sublayerContainer : 978,
        navStartStop:false,
        imgPreload:true
    });
    

    // Fitvideos
    jQuery(".page-wrapper").fitVids();

    // Thumbnail Hover
    jQuery(".thumb-wrapper").hover(function(){
        jQuery(this).find(".thumb-control-wrapper").animate({ opacity: 1 }, 500).addClass('hover');
    }, function(){
        jQuery(this).find(".thumb-control-wrapper").animate({ opacity: 0 }, 500).removeClass('hover');
    });

    // PrettyPhoto
    jQuery("a[rel^='prettyPhoto']").prettyPhoto({
        theme: 'light_square' /* light_rounded / dark_rounded / light_square / dark_square / facebook */
    });

    // Hash Change
    jQuery(window).bind("hashchange", function(){
        var url = jQuery.url(); // parse the current page URL
        var hashOptions = url.fparam('filter');
       
        if(typeof(hashOptions)!=="undefined")
        {
            jQuery(".cpt-filters a").removeClass("selected");
            if(jQuery(".cpt-filters a[href='#filter="+hashOptions+"']").length){
                 jQuery(".cpt-filters a[href='#filter="+hashOptions+"']").addClass("selected");
            }
            else{
                jQuery(".cpt-filters li:first a").addClass("selected");
            }

            jQuery(".cpt-items").isotope({filter: hashOptions});
        }

    }).trigger("hashchange");

    //isotope
    jQuery(".cpt-items").imagesLoaded(run_isotope);

    // Flexslider
    FS.pauseOnHover = (FS.pauseOnHover === 'true')? true: false;
    FS.pauseOnAction = (FS.pauseOnAction === 'true')? true: false;
    FS.controlNav = (FS.controlNav === 'true')? true: false;
    FS.directionNav = (FS.directionNav === 'true')? true: false;

    jQuery('.flexslider').each(function(){
        jQuery(this).flexslider( FS );
    });
    
    
    // Page Load Event
    jQuery('.thumb-control-wrapper').each(function(i,el){
         var new_overlay_w = jQuery(el).prev('img:first').width() - 20;
         var new_overlay_h = jQuery(el).prev('img:first').height() - 20;
         jQuery(el).css({'width':new_overlay_w,'height':new_overlay_h});
     });
    
    // Browser Resize Event

    jQuery(window).resize(function() {
        jQuery('.thumb-control-wrapper').each(function(i,el){
            
             var new_overlay_w = jQuery(el).prev('img:first').width() - 20;
             var new_overlay_h = jQuery(el).prev('img:first').height() - 20;
             
             jQuery(el).css({'width':new_overlay_w,'height':new_overlay_h});
         });
        
        //isotope
        //jQuery(".cpt-items").imagesLoaded(run_isotope); /// don't need 
        // run_isotope();
    });
    


}); // END Document Ready //
