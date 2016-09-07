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
 * @param {Element} view
 * @returns {string|boolean}
 * @private
 */
zz.views.FEBase.prototype.setElementUid_ = function( model, controller, view ){

	if( !this.getElementAttribute_( view, "data-uid" ) ){

		var uid = "";
		if( uid = this.getElementAttribute_( view, "data-set" ) ){

			this.ram_.set( uid, model, controller, view, [ ] );
			return uid;

		}else if( uid = this.getElementAttribute_( view, "data-row" ) ){

			uid = this.getElementRelatedUid( view ) + ':' + uid;
			this.ram_.set( uid, model, controller, view, [ ] );
			return uid;

		}else if( uid = this.getElementRelatedUid( view ) ){

			var key;
			if( key = this.getElementAttribute_( view, "data-field" ) ){

				// TODO (buntarb): Only one unique field/event per view.
				uid = uid + ":" + key;
				this.ram_.set( uid, model, controller, view, [

					goog.events.EventType.INPUT,
					goog.events.EventType.CHANGE
				] );
			}
			if( key = this.getElementAttribute_( view, "data-type" ) ){

				// TODO (buntarb): Only one unique field/event per view.
				uid = uid + ":" + key;
				this.ram_.set( uid, model, controller, view, [ ] );
			}
		}
		if( uid.length ){

			this.setElementAttribute_( view, "data-uid", uid );
		}
		// TODO (buntarb): Optimize it with single cycle.
		goog.array.forEach( goog.dom.getChildren( view ), function( child ){

			this.setElementUid_( model, controller, child );

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
 * Return uid related with current element.
 * @param {Element} element
 * @returns {string|boolean}
 */
zz.views.FEBase.prototype.getElementRelatedUid = function( element ){

	var tmp;
	if( this.getElementUid( element ) ){

		return this.getElementUid( element );
	}
	if( tmp = goog.dom.getParentElement( element ) ){

		return this.getElementRelatedUid( tmp );
	}
	return false;
};

/**
 * Return uid for specified message.
 * @param {zz.models.Message} message
 * @returns {string}
 */
zz.views.FEBase.prototype.getMessageUid = function( message ){

	if( message.eventtype == zz.models.enums.EventType.DATAROW_UPDATE ){

		return message.dataset.getUid( ) + ":" +

			message.datarow.getUid( ) + ":" +
			message.datafield;
	}
	if( message.eventtype == zz.models.enums.EventType.DATAROW_CREATE ||
		message.eventtype == zz.models.enums.EventType.DATAROW_DELETE ){

		return message.dataset.getUid( ) + ":" + message.datarow.getUid( );
	}
};

/**
 * Return field name from uid.
 * @param {string} uid
 * @returns {string}
 */
zz.views.FEBase.prototype.getFieldByUid = function( uid ){

	return uid.split( '::' )[ 1 ];
};

/**
 * Return views value, converted to model type.
 * @param {Element} element
 * @returns {string}
 */
zz.views.FEBase.prototype.getFieldValue = function( element ){

	if( goog.isDef( element.value ) ){

		return element.value;

	}else{

		return goog.dom.getTextContent( element );
	}
};

/**
 * Set views value, converted to view type.
 * TODO (buntarb): We should use formatters here (?).
 * @param {Element} view
 * @returns {string}
 */
zz.views.FEBase.prototype.setFieldValue = function( element, value ){

	if( element.value ){

		element.value = value;

	}else{

		goog.dom.setTextContent( element, value );
	}
};

/**
 * Base subscriber for model changes.
 * @param {zz.models.Message} message
 * @final
 */
zz.views.FEBase.prototype.modelChanged = function( message ){

	var item = this.ram_.get( message.dataset.getUid( ) );
	if( item ){

		if( message.eventtype == zz.models.enums.EventType.DATAROW_CREATE ){

			item.controller.getView( ).renderDatarow( message );
		}
		if( message.eventtype == zz.models.enums.EventType.DATAROW_UPDATE ){

			item.controller.getView( ).updateDatarow( message );
		}
		if( message.eventtype == zz.models.enums.EventType.DATAROW_DELETE ){

			item.controller.getView( ).removeDatarow( message );
		}
	}
};

/**
 * @override
 */
zz.views.FEBase.prototype.createDom = function( controller ){

	var element = soy.renderAsElement( this.dataset_template_, {

		directives: this.getDirectives( controller ),
		fields: this.getFields( controller ),
		uid: controller.getModel( ).getUid( )
	} );
	this.setElementUid_( controller.getModel( ), controller, element );
	var datarow = controller.getModel( ).firstDatarow( );
	if( datarow ){

		do{

			var child = this.renderDatarowElement(

				this.getDirectives( controller ),
				this.getFields( controller ),
				datarow.getUid( ),
				datarow
			);
			goog.dom.appendChild( element, child );
			this.setElementUid_( datarow, controller, child );

		}while( datarow = controller.getModel( ).nextDatarow( ) );
	}
	return element;
};

/**
 * Handler for DATAROW_CREATE
 * @param {zz.models.Message} message
 * @returns {Element}
 */
zz.views.FEBase.prototype.renderDatarow = function( message ){

	var item = this.ram_.get( message.dataset.getUid( ) );
	var element = this.renderDatarowElement(

		this.getDirectives( item.controller ),
		this.getFields( item.controller ),
		message.datarow.getUid( ),
		message.datarow );

	goog.dom.appendChild( item.view, element );
	this.setElementUid_( message.datarow, item.controller, element );
	return element;
};

/**
 * Handler for DATAROW_DELETE
 * @param {zz.models.Message} message
 */
zz.views.FEBase.prototype.removeDatarow = function( message ){

	this.removeDatarowElement( message.datarow.getUid( ) );
};

/**
 * Handler for DATAROW_UPDATE
 * @param {zz.models.Message} message
 */
zz.views.FEBase.prototype.updateDatarow = function( message ){

	var item = this.ram_.get( this.getMessageUid( message ) );
	this.setFieldValue( item.view, message.new_value );
};

/**
 * Return new datarow element but not append it to DOM-tree.
 * @param directives
 * @param fields
 * @param uid
 * @param datarow
 * @returns {!Element}
 */
zz.views.FEBase.prototype.renderDatarowElement = function( directives, fields, uid, datarow ){

	return soy.renderAsElement( this.datarow_template_, {

		directives: directives,
		fields: fields,
		uid: uid,
		datarow: datarow
	} );
};

/**
 * Safety remove elements from DOM.
 * TODO (buntarb): Optimize with cycle.
 * @param {string} uid
 */
zz.views.FEBase.prototype.removeDatarowElement = function( uid ){

	goog.array.forEach( goog.dom.getChildren( this.ram_.get( uid ).view ), function( child ){

		if( this.getElementUid( child ) ){

			this.removeDatarowElement( this.getElementUid( child ) );
		}
	}, this );
	//goog.dom.getParentElement( this.ram_.get( uid ).view );
	goog.dom.removeNode( this.ram_.get( uid ).view );
	this.ram_.delete( uid );
};