/**
 * @fileoverview Provide zz.views.BaseView.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.views.BaseView' );
goog.require( 'goog.dom' );
goog.require( 'goog.json' );
goog.require( 'goog.ui.Component' );
goog.require( 'zz.models.Message' );
goog.require( 'zz.models.enums.EventType' );
goog.require( 'zz.controllers.BaseController' );

/**
 * The default implementation of base view.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {goog.ui.Component}
 * @constructor
 */
zz.views.BaseView = function( opt_domHelper ){

	goog.ui.Component.call( this, opt_domHelper );
};

/**
 * Base inheritance.
 */
goog.inherits( zz.views.BaseView, goog.ui.Component );

/**
 * Default CSS class to be applied to the root element of view.
 * @type {string}
 */
zz.views.BaseView.CSS_CLASS = goog.getCssName( 'zz-base-view' );

/**
 * @override
 */
zz.views.BaseView.prototype.getCssClass = function( ){

	return zz.views.BaseView.CSS_CLASS;
};

/**
 * @override
 */
zz.views.BaseView.prototype.getContentElement = function( ){

	return zz.views.BaseView.superClass_.getContentElement.call( this );
};

/**
 * @override
 */
zz.views.BaseView.prototype.canDecorate = function( element ){

	return zz.views.BaseView.superClass_.canDecorate.call( this, element );
};

/**
 * @override
 */
zz.views.BaseView.prototype.createDom = function( ){

	return zz.views.BaseView.superClass_.createDom.call( this );
};

/**
 * @override
 */
zz.views.BaseView.prototype.decorate = function( element ){

	return zz.views.BaseView.superClass_.decorate.call( this, element );
};

/**
 * @override
 */
zz.views.BaseView.prototype.enterDocument = function( ){

	zz.views.BaseView.superClass_.enterDocument.call( this );

	this.setControllerInternal( );
	if( this.model_ ){

		this.modelChanged( new zz.models.Message(

			zz.models.enums.EventType.DATAROW_UPDATE,
			this.model_.dataset,
			this.model_.datarow,
			this.model_.datafield,
			undefined,
			this.model_.datafield ? this.model_.datarow[ this.model_.datafield ] : undefined
		) );
	}
};

/**
 * @override
 */
zz.views.BaseView.prototype.disposeInternal = function( ){

	zz.views.BaseView.superClass_.disposeInternal.call( this );
	this.unsubscribe_( );
};

/**
 * Subscribe view on setting model changes.
 * @private
 */
zz.views.BaseView.prototype.subscribe_ = function( ){

	var model = this.getModel( );
	if( goog.isDefAndNotNull( model ) ){

		model.dataset.subscribe( this );
	}
};

/**
 * Unsubscribe view from setting model changes.
 */
zz.views.BaseView.prototype.unsubscribe_ = function( ){

	var subModel = this.getModel( );
	if( goog.isDefAndNotNull( subModel ) ){

		subModel.dataset.unsubscribe( this );
	}
};

/**
 * Setting up view model.
 * @param {zz.models.Dataset} dataset
 * @param {zz.models.Datarow=} opt_datarow
 * @param {string=} opt_datafield
 */
zz.views.BaseView.prototype.setModel = function( dataset, opt_datarow, opt_datafield ){

	this.unsubscribe_( );
	this.model_ = {

		dataset: dataset,
		datarow: opt_datarow,
		datafield: opt_datafield
	};
	this.subscribe_( );
};

/**
 * Calling protected zz.views.BaseView#modelChangedInternal to process model changes and update current view.
 * @param {zz.models.Message} message
 * @final
 */
zz.views.BaseView.prototype.modelChanged = function( message ){

	var model = this.getModel( );
	if( goog.isDefAndNotNull( model ) ){

		if( goog.isDefAndNotNull( model.datafield ) ){

			if( model.datarow.getUid( ) === message.datarow.getUid( ) ){

				this.modelChangedInternal( message );
			}
		}else{

			this.modelChangedInternal( message );
		}
	}
};

/**
 * Update view to process model changes. This method need to be override by child.
 * @param {zz.models.Message} message
 * @protected
 */
zz.views.BaseView.prototype.modelChangedInternal = function( message ){ };

/**
 * Setting up view controller. Need to be upgraded by subclass.
 * @protected
 */
zz.views.BaseView.prototype.setControllerInternal = function( ){ };