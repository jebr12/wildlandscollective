/*
 * Demo v1.0
 * www.designorbital.com
 *
 * Copyright (c) 2013 DesignOrbital.com
 *
 * License: GNU General Public License, GPLv3
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 */

(function($){
	
	var kamnDemo = {
		
		readyInit: function() {
			kamnDemo.readCookieInit();
			kamnDemo.controlInit();
		},
		
		readCookieInit: function() {		
			if( $.cookie( 'kamn_skin_control_cookie' ) != 'undefined' ) {
				$( '#prod-css' ).attr( 'href', $.cookie( 'kamn_skin_control_cookie' ) );
			}		
		},
		
		controlInit: function() {
			
			/** Demo Control */
			$kamn_demo_control = $( '.kamn_demo_control' );
			$kamn_demo_wrapper = $( '.kamn_demo_wrapper' );			
			
			$kamn_demo_control.off( 'click' ).on( 'click', function( e ) {
				
				if( $kamn_demo_wrapper.css( 'left' ) <= '-190px' ) {
					$kamn_demo_wrapper.animate( { 'left': '0' }, 500, 'easeOutBack' );
				} else {
					$kamn_demo_wrapper.animate( { 'left': '-190px' }, 500, 'easeInBack' );
				}
				
				e.preventDefault();
					  
			});
			
			/** Demo Interface */
			$kamn_demo_skin = $( '.kamn_demo_skin a' );
			$kamn_demo_reset = $( '.kamn_demo_reset a' );			
			
			$kamn_demo_skin.off( 'click' ).on( 'click', function( e ) {				
				e.preventDefault();
				var css = 'lib/css/' + $(this).attr( 'data-css' );
				$( '#prod-css' ).attr( 'href', css );
				$.cookie( 'kamn_skin_control_cookie', css, { path: '/' } );
			});
			
			$kamn_demo_reset.off( 'click' ).on( 'click', function( e ) {				
				e.preventDefault();
				$.removeCookie( 'kamn_skin_control_cookie', { path: '/' } );
				var path = document.URL;
				window.open( document.URL, '_self' );					  
			});
								
		}		
		
	}
	
	/** Document Ready */
	$(document).ready(function(){
		kamnDemo.readyInit();
	});

})(jQuery);