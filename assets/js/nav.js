var ST = {"disable_header_floating":"y"};
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
    jQuery('#primary-nav-mobile-id li:last-child a').attr('id', 'mobile-contact-top');
    jQuery('#primary-nav-mobile-id li span').addClass('dropdown-close');

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
        jQuery('#primary-nav-mobile-id span').click(function(){
            if(jQuery(this).hasClass('dropdown-close')){
                jQuery('.dropdown-opened').next('ul').slideUp( 400 );
                jQuery('.dropdown-opened').removeClass('dropdown-opened').addClass('dropdown-close');
                jQuery(this).removeClass('dropdown-close').addClass('dropdown-opened');
                jQuery(this).next('ul').slideDown( 400 );
            } else {
                jQuery(this).removeClass('dropdown-opened').addClass('dropdown-close');
                jQuery(this).next('ul').slideUp( 400 );
            }
            return false;
        });
        primary_nav_mobile_button.find('a').click(function(event){
            event.stopPropagation();
        });

  });