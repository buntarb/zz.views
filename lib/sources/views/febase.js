/**
 * @fileoverview Provide zz.views.BaseRenderer.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.views.FEBase' );

goog.require( 'goog.dom' );
goog.require( 'goog.array' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.ControlRenderer' );
goog.require( 'zz.environment.services.RAM' );
goog.require( 'zz.models.Message' );
goog.require( 'zz.models.enums.EventType' );

/**
 * The default implementation of base view.
 * @param {Function} dataset_template
 * @param {Function} datarow_template
 * @extends {goog.ui.ControlRenderer}
 * @constructor
 */
zz.views.FEBase = function( dataset_template, datarow_template ){

	goog.base( this, 'constructor' );

	/**
	 * Application environment.
	 * @type {zz.environment.services.Environment}
	 * @private
	 */
	this.env_ = zz.environment.services.Environment.getInstance( );

	/**
	 * Application RAM.
	 * @type {zz.environment.services.RAM}
	 * @private
	 */
	this.ram_ = zz.environment.services.RAM.getInstance( );

	/**
	 * Dataset template function.
	 * @type {Function}
	 * @private
	 */
	this.dataset_template_ = dataset_template;

	/**
	 * Datarow template function.
	 * @type {Function}
	 * @private
	 */
	this.datarow_template_ = datarow_template;
};

/**
 * Base inheritance.
 */
goog.inherits( zz.views.FEBase, goog.ui.ControlRenderer );
goog.addSingletonGetter( zz.views.FEBase );

/**
 * @override
 */
zz.views.FEBase.prototype.createDom = function( controller ){

	var element = soy.renderAsElement(

		this.dataset_template_(

			this.getDirectives( controller ),
			this.getFields( controller ),
			controller.getModel( ) ) );

	this.setElementUid_( controller, element );
	return element;
};

/**
 * Return element arrtibute if setted, false otherwise.
 * @param {Element} element
 * @param {string} name
 * @param {string} value
 * @private
 */
zz.views.FEBase.prototype.setElementAttribute_ = function( element, name, value ){

	element.setAttribute( name, value );
};

/**
 * Return element arrtibute if setted, false otherwise.
 * @param {Element} element
 * @param {string} name
 * @returns {string|boolean}
 * @private
 */
zz.views.FEBase.prototype.getElementAttribute_ = function( element, name ){

	var val = element.getAttribute( name );
	return val === "" ? false : !goog.isDefAndNotNull( val ) ? false : val;
};

/**
 * Setting up element uid.
 * @param {zz.controllers.FEBase} controller
 * @param {Element} element
 * @returns {string|boolean}
 * @private
 */
zz.views.FEBase.prototype.setElementUid_ = function( controller, element ){

	if( !this.getElementAttribute_( element, "data-uid" ) ){

		var uid = "";//DS||DR:F
		if( uid = this.getElementAttribute_( element, "data-set" ) ){

			this.ram_.set( uid, controller, element, [ goog.events.EventType.INPUT ] );
		}
		if( uid = this.getElementAttribute_( element, "data-row" ) ){

			this.ram_.set( uid, controller, element, [ ] );
		}
		if( uid = uid + "::" + this.getElementAttribute_( element, "data-field" ) ){

			this.ram_.set( uid, controller, element, [ ] );
		}
		if( uid = uid + "::" + this.getElementAttribute_( element, "data-event" ) ){

			this.ram_.set( uid, controller, element, [ ] );
		}
		if( uid.length ){

			this.ram_.set( uid, controller, element, [ ] );
			this.setElementAttribute_( element, "data-uid", uid );
		}
		// TODO (buntarb): Optimize it with single cycle.
		goog.array.forEach( goog.dom.getChildren( element ), function( child ){

			this.setElementUid_( controller, child );

		}, this );
		return uid;
	}
	return false;
};

/**
 * Return element uid if setted, false otherwise.
 * @param {Element} element
 * @returns {string|boolean}
 */
zz.views.FEBase.prototype.getElementUid = function( element ){

	return this.getElementAttribute_( element, 'data-uid' );
};

/**
 * Return uid for specified message.
 * @param {zz.models.Message} message
 * @returns {string}
 */
zz.views.FEBase.prototype.getMessageUid = function( message ){

	if( message.eventtype == zz.models.enums.EventType.DATAROW_UPDATE ){

		return message.datarow.getUid( ) + "::" + message.datafield;
	}
	if( message.eventtype == zz.models.enums.EventType.DATAROW_CREATE ||
		message.eventtype == zz.models.enums.EventType.DATAROW_DELETE ){

		return message.datarow.getUid( ).toString( );
	}
};

/**
 * Return message zz.
 * @param {zz.models.Message} message
 * @returns {Object|boolean}
 */
zz.views.FEBase.prototype.getMessageZZ = function( message ){

	return this.ram_.get( this.getMessageUid( message ) );
};

/**
 * Base subscriber for model changes.
 * @param {zz.models.Message} message
 * @final
 */
zz.views.FEBase.prototype.modelChanged = function( message ){

	var zz = this.getMessageZZ( message );
	if( zz ){

		if( message.eventtype == zz.models.enums.EventType.DATAROW_CREATE ){

			zz.controller.renderDatarow( message );
		}
		if( message.eventtype == zz.models.enums.EventType.DATAROW_UPDATE ){

			zz.controller.updateDatarow( message );
		}
		if( message.eventtype == zz.models.enums.EventType.DATAROW_DELETE ){

			zz.controller.removeDatarow( message );
		}
	}
};

/**
 * Return supported events.
 * @param {zz.controllers.FEBase} controller
 * @returns {Object}
 */
zz.views.FEBase.prototype.getDirectives = function( controller ){

	return { };
};

/**
 * Return supported fields.
 * @param {zz.controllers.FEBase} controller
 * @returns {Object}
 */
zz.views.FEBase.prototype.getFields = function( controller ){

	return controller.getModel( ).datafield;
};

/**
 * Handler for DATAROW_CREATE
 * @param {zz.models.Message} message
 * @returns {Element}
 */
zz.views.FEBase.prototype.renderDatarow = function( message ){

	var zz = this.ram_.get( this.getMessageUid( message ) );
	var element = soy.renderAsElement(

		this.datarow_template_(

			this.getDirectives( zz.controller ),
			this.getFields( zz.controller ),
			message.datarow ) );

	this.setElementUid_( zz.controller, element );
	return element;
};

/**
 * Handler for DATAROW_UPDATE
 * @param {zz.models.Message} message
 */
zz.views.FEBase.prototype.updateDatarow = function( message ){

	var zz = this.ram_.get( this.getMessageUid( message ) );
	zz.element.value = message.new_value;
};

/**
 * Handler for DATAROW_DELETE
 * @param {zz.models.Message} message
 */
zz.views.FEBase.prototype.removeDatarow = function( message ){

	//
};