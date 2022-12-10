<?php
/**
 * Plugin Name:       Heros
 * Plugin URI:        www.totalonlinemarketingsystem.com
 * Description:       A Plugin Containing all the Hero blocks used on this site.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Deepti Boddapati
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       toms
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
function toms_heros_init() {
	register_block_type( __DIR__ .'/build/hero-a' );
	register_block_type( __DIR__ .'/build/hero-b' );
	register_block_type( __DIR__ .'/build/two-images' );
}
add_action( 'init', 'toms_heros_init' );
