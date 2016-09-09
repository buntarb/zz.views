/**
 * @fileoverview Provide zz.views base object.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.views' );

goog.require( 'zz.views.Base' );

/**
 * Base namespace for zz.views module.
 * @const
 */
zz.views = zz.views || { };

/**
 * Bootstrap module method.
 */
zz.views.bootstrap = function( ){ };
goog.exportSymbol( 'zz.views.bootstrap', zz.views.bootstrap );
