/**
 * @fileoverview Provide zz.views.Base.
 * @license Apache-2.0
 * @author popkov.aleksander@gmail.com (Popkov Alexander)
 */

goog.provide( 'zz.views.Base' );

goog.require( 'goog.dom' );
goog.require( 'goog.ui.Control' );
goog.require( 'zz.models.Message' );
goog.require( 'zz.models.enums.EventType' );
goog.require( 'zz.views.BaseRenderer' );

/**
 * The default implementation of base view.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @param {zz.views.BaseRenderer=} opt_renderer Optional renderer.
 * @extends {goog.ui.Component}
 * @constructor
 */
zz.views.Base = function( opt_renderer, opt_domHelper ){

	goog.base(

		this,
		undefined,
		opt_renderer || zz.views.BaseRenderer.getInstance( ),
		opt_domHelper );

	/**
	 * View controller.
	 * @type {Object|undefined}
	 * @private
	 */
	this.controller_ = undefined;
};

/**
 * Base inheritance.
 */
goog.inherits( zz.views.Base, goog.ui.Control );

/**
 * @override
 */
zz.views.Base.prototype.getContentElement = function( ){

	return goog.base( this, 'getContentElement' );
};

/**
 * @override
 */
zz.views.Base.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );

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
zz.views.Base.prototype.disposeInternal = function( ){

	this.unsubscribe_( );
	goog.base( this, 'disposeInternal' );
};

/**
 * Subscribe view on setting model changes.
 * @private
 */
zz.views.Base.prototype.subscribe_ = function( ){

	var model = this.getModel( );
	if( goog.isDefAndNotNull( model ) ){

		model.dataset.subscribe( this );
	}
};

/**
 * Unsubscribe view from setting model changes.
 */
zz.views.Base.prototype.unsubscribe_ = function( ){

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
zz.views.Base.prototype.setModel = function( dataset, opt_datarow, opt_datafield ){

	this.unsubscribe_( );
	this.model_ = {

		dataset: dataset,
		datarow: opt_datarow,
		datafield: opt_datafield
	};
	this.subscribe_( );
};

/**
 * Calling protected zz.views.Base#modelChangedInternal to process model changes and update current view.
 * @param {zz.models.Message} message
 * @final
 */
zz.views.Base.prototype.modelChanged = function( message ){

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
zz.views.Base.prototype.modelChangedInternal = function( message ){

	if( goog.isDefAndNotNull( this.model_.dataset ) ){

		if( goog.isDefAndNotNull( this.model_.datarow ) ){

			if ( message.eventtype == zz.models.enums.EventType.DATAROW_UPDATE &&
				message.sourceDataset.getUid( ) === this.getModel( ).dataset.getUid( )){

				this.getRenderer( ).modelUpdated( this, message );
			}
		}else{

			if ( message.eventtype == zz.models.enums.EventType.DATAROW_CREATE &&
				message.sourceDataset.getUid( ) === this.getModel( ).dataset.getUid( )){

				this.getRenderer( ).modelCreated( this, message );
			}
			if ( message.eventtype == zz.models.enums.EventType.DATAROW_DELETE &&
				message.sourceDataset.getUid( ) === this.getModel( ).dataset.getUid( )){

				this.getRenderer( ).modelDeleted( this, message );
			}
		}
	}
};

/**
 * Setting up view controller. Need to be upgraded by subclass.
 * @protected
 */
zz.views.Base.prototype.setControllerInternal = function( ){ };

/**
 * Return view controller.
 * @returns {Object|undefined}
 * @protected
 */
zz.views.Base.prototype.getController = function( ){

	return this.controller_;
};