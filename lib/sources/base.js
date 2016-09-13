/**
 * @fileoverview Provide zz.views base object.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.views' );

goog.require( 'zz.views.Base' );
goog.require( 'zz.tests.models.SimplestDataset' );

/**
 * Bootstrap module method.
 */
zz.views.bootstrap = function( ){

    var simpleModelDataset = new zz.tests.models.SimplestDataset( );
    var view = new zz.views.Base( );
    view.setModel( simpleModelDataset );
    simpleModelDataset.createFirst( );
    simpleModelDataset.deleteFirst( );
};
goog.exportSymbol( 'zz.views.bootstrap', zz.views.bootstrap );
