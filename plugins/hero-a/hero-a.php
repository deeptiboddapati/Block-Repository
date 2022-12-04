<?php
/**
 * Plugin Name:       Hero A
 * Plugin URI:        www.totalonlinemarketingsystem.com
 * Description:       Hero Image, Headline, Supporting Copy, Conversion button, places to buy.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Deepti Boddapati
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       hero-a
 *
 * @package           toms
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function toms_hero_a_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'toms_hero_a_block_init' );
