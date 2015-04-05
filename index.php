<?php
/*
Plugin Name: Accessible WP Carousel Plugin
Plugin URI: https://github.com/ericmasiello/Accessible-WP-Carousel-Plugin
Description: A simple WP plugin for
Version: 1.0.0
Author: Eric Masiello
Author URI: http://www.synbydesign.com
License: GPL
Copyright: Eric Masiello
Credit: Shouts to John Chapman (https://thenounproject.com/chapmanjw/) for the icons and
	shouts to http://accessibility.athena-ict.com/aria/examples/carousel.shtml for the code that
	inspired this
*/

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

wp_enqueue_style( 'accessible-carousel-css', plugins_url( '/carousel.css', __FILE__ ) );
wp_enqueue_script( 'accessible-carousel-js', plugins_url( '/carousel.js', __FILE__ ), array('jquery'), NULL, true );

function accessible_carousel_item( $atts, $content = NULL ) {
	extract( shortcode_atts( array( 'text' => '' ), $atts ) );
	$output = '';
	$output .= '<li aria-hidden="false" class="carousel-item" id="item-1">';
	$output .= '<p class="carousel-text">' . $text . '</p>';
	$output .= do_shortcode( $content );
	$output .= '</li>';

	return $output;
}

add_shortcode( "carousel", "accessible_carousel" );


function accessible_carousel( $atts, $content = NULL ) {

	extract( shortcode_atts( array( 'autoplay' => 'false', 'delay' => null ), $atts ) );
	$uniqueId = uniqid("carousel-");

	$output = '<section class="carousel-container" data-autoplay="' . $autoplay . '" data-delay="' . $delay . '">';
	$output .= '<ul class="carousel-content" aria-live="polite" id="' . $uniqueId .'">';
	$output .= do_shortcode( $content );
	$output .= '</ul>';
	$output .= '<fieldset aria-label="carousel buttons" class="carousel-buttons" aria-controls="' . $uniqueId .'">';
    $output .= '<input type="button" value="Pause" id="' . $uniqueId . '-pause" aria-label="pause" class="carousel-button carousel-pause" />';
    $output .= '<input type="button" value="Play" id="' . $uniqueId . '-resume" class="carousel-button  carousel-play" />';
    $output .= '<button value="prev" aria-label="previous" id="' . $uniqueId . '-previous" class="carousel-button  carousel-previous">Previous</button>';
    $output .= '<button value="next" id="' . $uniqueId . '-next" aria-label="next" class="carousel-button  carousel-next">Next</button>';
    $output .= '</fieldset>';
    $output .= '</section>';

	return $output;
}
add_shortcode( "carousel", "accessible_carousel" );
add_shortcode( "carousel_item", "accessible_carousel_item" );


/*
 * Should remove any empty <p></p> tags from content
 */
remove_filter( 'the_content', 'wpautop' );
add_filter( 'the_content', 'wpautop', 99 );
add_filter( 'the_content', 'shortcode_unautop', 100 );
?>