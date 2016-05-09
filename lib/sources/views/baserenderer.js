/**
 * @fileoverview Provide zz.views.BaseRenderer.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 * @author popkov.aleksander@gmail.com (Popkov Alexander)
 */

goog.provide( 'zz.views.BaseRenderer' );

goog.require( 'goog.ui.ControlRenderer' );
goog.require( 'zz.views.enums.BaseCss' );

/**
 * The default implementation of base view.
 * @extends {goog.ui.ControlRenderer}
 * @constructor
 */
zz.views.BaseRenderer = function( ){

	zz.views.BaseRenderer.base( this, 'constructor' );
};

/**
 * Base inheritance.
 */
goog.inherits( zz.views.BaseRenderer, goog.ui.ControlRenderer );
goog.addSingletonGetter( zz.views.BaseRenderer );


/**
 * @override
 */
zz.views.BaseRenderer.prototype.getCssClass = function( ){

	return zz.views.enums.BaseCss.CSS_CLASS;
};

/**
 * @override
 */
zz.views.BaseRenderer.prototype.canDecorate = function( element ){

	return goog.base( this, 'canDecorate', element );
};

/**
 * @override
 */
zz.views.BaseRenderer.prototype.createDom = function( view ){

	return goog.base( this, 'createDom', view );
};

/**
 * @override
 */
zz.views.BaseRenderer.prototype.decorate = function( view, element ){

	return goog.base( this, 'decorate', view, element );
};

/**
 * @override
 */
zz.views.BaseRenderer.prototype.setState = function( view, state, enable ){

	return goog.base( this, 'setState',  view, state, enable );
};

/**
 * @override
 */
zz.views.BaseRenderer.prototype.getContent = function( element ){

	return goog.base( this, 'getContent', element );
};

/**
 * @override
 */
zz.views.BaseRenderer.prototype.setContent = function( element, content ){

	return goog.base( this, 'setContent', element, content );
};

/**
 *
 * @param {zz.views.Base} view
 * @param {zz.models.Message} message
 */
zz.views.BaseRenderer.prototype.datarowUpdated = function( view, message ){

	console.log( view, message );
};

/**
 *
 * @param {zz.views.Base} view
 * @param {zz.models.Message} message
 */
zz.views.BaseRenderer.prototype.datarowDeleted = function( view, message ){

	console.log( 'del', view, message );
};

/**
 *
 * @param {zz.views.Base} view
 * @param {zz.models.Message} message
 */
zz.views.BaseRenderer.prototype.datarowCreated = function( view, message ){

	console.log( 'create', view, message );
};
