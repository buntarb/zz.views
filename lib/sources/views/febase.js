// Copyright 2016 Artem Lytvynov <buntarb@gmail.com>. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @license Apache-2.0
 * @copyright Artem Lytvynov <buntarb@gmail.com>
 */

goog.provide( 'zz.views.FEBase' );

goog.require( 'goog.dom' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.array' );
goog.require( 'goog.events' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.ControlRenderer' );
goog.require( 'zz.environment.services.MVCRegistry' );
goog.require( 'zz.views.enums.FEBaseUidSeparator' );
goog.require( 'zz.views.enums.FEBaseElementAttribute' );
goog.require( 'zz.views.enums.FEBaseElementAttributeCode' );
goog.require( 'zz.views.enums.FEBaseEventType' );
goog.require( 'zz.views.templates.default' );
goog.require( 'zz.i18n.services.DecimalFormatter' );

/**
 * The default implementation of base view.
 * @param {Function} model_template
 * @param {Function} opt_dataset_template
 * @param {Function} opt_datarow_template
 * @extends {goog.ui.ControlRenderer}
 * @constructor
 */
zz.views.FEBase = function( model_template, opt_dataset_template, opt_datarow_template ){

	goog.base( this, 'constructor' );

	/**
	 * Application environment.
	 * @type {zz.environment.services.Environment}
	 * @private
	 */
	this.env_ = zz.environment.services.Environment.getInstance( );

	/**
	 * Application MVC registry.
	 * @type {zz.environment.services.MVCRegistry}
	 * @private
	 */
	this.mvcRegistry_ = zz.environment.services.MVCRegistry.getInstance( );

	/**
	 * Model template function.
	 * @type {Function}
	 * @private
	 */
	this.model_soy_ = model_template || zz.views.templates.default.model;

	/**
	 * Dataset template function.
	 * @type {Function}
	 * @private
	 */
	this.dataset_soy_ = opt_dataset_template || zz.views.templates.default.dataset;

	/**
	 * Datarow template function.
	 * @type {Function}
	 * @private
	 */
	this.datarow_soy_ = opt_datarow_template || zz.views.templates.default.datarow;
};

/**
 * Base inheritance.
 */
goog.inherits( zz.views.FEBase, goog.ui.ControlRenderer );
goog.addSingletonGetter( zz.views.FEBase );

/**********************************************************************************************************************/

/**
 * Return internal {@code uid} separator
 * @return {string}
 */
zz.views.FEBase.prototype.getInternalSeparator = function( ){

	return zz.views.enums.FEBaseUidSeparator.INTERNAL;
};

/**
 * Return external {@code uid} separator
 * @return {string}
 */
zz.views.FEBase.prototype.getExternalSeparator = function( ){

	return zz.views.enums.FEBaseUidSeparator.EXTERNAL;
};

/**
 * Return data field name by {@code uid}.
 * @param {string} uid
 * @return {string}
 */
zz.views.FEBase.prototype.getFieldByUid = function( uid ){

	var set = uid.split( this.getInternalSeparator( ) );
	if( ~set.indexOf( zz.views.enums.FEBaseElementAttributeCode.INPUT ) ){

		return set[ set.indexOf( zz.views.enums.FEBaseElementAttributeCode.INPUT ) + 1 ];
	}
};

/**
 * Returns element attribute if set, false otherwise.
 * @param {Element} element
 * @param {string} attribute
 * @returns {string|boolean}
 * @private
 */
zz.views.FEBase.prototype.getViewElementAttribute_ = function( element, attribute ){

	var val = element.getAttribute( attribute );
	if( !goog.isDefAndNotNull( val ) ){

		return false;
	}
	if( val === "" ){

		if( attribute === zz.views.enums.FEBaseElementAttribute.ACTION ||
			attribute === zz.views.enums.FEBaseElementAttribute.FOCUS ||
			attribute === zz.views.enums.FEBaseElementAttribute.BLUR ||
			attribute === zz.views.enums.FEBaseElementAttribute.SCROLL ||
			attribute === zz.views.enums.FEBaseElementAttribute.HOVER ){

			return attribute;

		}else {

			return false;
		}
	}
	return val;
};

/**
 * Returns data-class keys.
 * @param {string} dataClass
 * @private
 */
zz.views.FEBase.prototype.getDataClassKeys_ = function( dataClass ){

	var keys = [ ];
	goog.array.forEach(
		dataClass.split( zz.views.enums.FEBaseUidSeparator.CLASS_EXTERNAL ),
		function( pair ){

			if( pair.split( zz.views.enums.FEBaseUidSeparator.CLASS_INTERNAL )[ 0 ].length ){

				keys[ keys.length ] =
					pair.split( zz.views.enums.FEBaseUidSeparator.CLASS_INTERNAL )[ 0 ];
			}
		} );
	return keys;
};

/**
 * Returns attribute code by attribute name.
 * @param {string} attribute
 * @return {string}
 * @private
 */
zz.views.FEBase.prototype.getAttributeCode_ = function( attribute ){

	if( attribute === zz.views.enums.FEBaseElementAttribute.UID ){

		return zz.views.enums.FEBaseElementAttributeCode.UID;
	}
	if( attribute === zz.views.enums.FEBaseElementAttribute.SET ){

		return zz.views.enums.FEBaseElementAttributeCode.SET;
	}
	if( attribute === zz.views.enums.FEBaseElementAttribute.ROW ){

		return zz.views.enums.FEBaseElementAttributeCode.ROW;
	}
	if( attribute === zz.views.enums.FEBaseElementAttribute.MODEL ){

		return zz.views.enums.FEBaseElementAttributeCode.MODEL;
	}
	if( attribute === zz.views.enums.FEBaseElementAttribute.INPUT ){

		return zz.views.enums.FEBaseElementAttributeCode.INPUT;
	}
	if( attribute === zz.views.enums.FEBaseElementAttribute.FOCUS ){

		return zz.views.enums.FEBaseElementAttributeCode.FOCUS;
	}
	if( attribute === zz.views.enums.FEBaseElementAttribute.BLUR ){

		return zz.views.enums.FEBaseElementAttributeCode.BLUR;
	}
	if( attribute === zz.views.enums.FEBaseElementAttribute.ACTION ){

		return zz.views.enums.FEBaseElementAttributeCode.ACTION;
	}
	if( attribute === zz.views.enums.FEBaseElementAttribute.SCROLL ){

		return zz.views.enums.FEBaseElementAttributeCode.SCROLL;
	}
	if( attribute === zz.views.enums.FEBaseElementAttribute.CLASS ){

		return zz.views.enums.FEBaseElementAttributeCode.CLASS;
	}
	if( attribute === zz.views.enums.FEBaseElementAttribute.HOVER ){

		return zz.views.enums.FEBaseElementAttributeCode.HOVER;
	}
};

/**
 * Generate final {@code uid} for given attribute.
 * @param {string} uid
 * @param {string} attr
 * @param {string} opt_val
 * @returns {string}
 * @private
 */
zz.views.FEBase.prototype.generateUid_ = function( uid, attr, opt_val ){

	if( attr === zz.views.enums.FEBaseElementAttribute.SET ||
		attr === zz.views.enums.FEBaseElementAttribute.ROW ){

		return uid;
	}
	if( attr === zz.views.enums.FEBaseElementAttribute.MODEL ||
		attr === zz.views.enums.FEBaseElementAttribute.INPUT ){

		return uid +

			this.getInternalSeparator( ) +
			this.getAttributeCode_( attr ) +
			this.getInternalSeparator( ) + opt_val;
	}
	if( attr === zz.views.enums.FEBaseElementAttribute.ACTION ||
		attr === zz.views.enums.FEBaseElementAttribute.FOCUS ||
		attr === zz.views.enums.FEBaseElementAttribute.BLUR ||
		attr === zz.views.enums.FEBaseElementAttribute.SCROLL ||
		attr === zz.views.enums.FEBaseElementAttribute.HOVER ){

		return uid +

			this.getInternalSeparator( ) +
			this.getAttributeCode_( attr ) +
			this.getInternalSeparator( ) +
			goog.events.getUniqueId( '' );
	}
	if( attr === zz.views.enums.FEBaseElementAttribute.CLASS ){

		var arr = [ ];
		goog.array.forEach( this.getDataClassKeys_( opt_val ), function( key ){

			arr[ arr.length ] = uid +

				this.getInternalSeparator( ) +
				this.getAttributeCode_( attr ) +
				this.getInternalSeparator( ) +
				key;

		}, this );
		return arr.join( this.getExternalSeparator( ) );
	}
};

/**
 * Setting up new MVC Node to MVC registry.
 * @param {zz.models.Dataset|zz.models.Datarow} model
 * @param {Element} element
 * @param {zz.controllers.FEBase} controller
 */
zz.views.FEBase.prototype.setNode_ = function( model, element, controller ){

	if( !this.getViewElementAttribute_( element,
			zz.views.enums.FEBaseElementAttribute.UID ) ){

		var arr = [ ];
		var uid;
		var attr;
		goog.object.forEach( zz.views.enums.FEBaseElementAttribute, function( attribute ){

			if( attr = this.getViewElementAttribute_( element, attribute ) ){

				if( attribute === zz.views.enums.FEBaseElementAttribute.FOCUS ){

					// TODO (buntarb): Move it to controller.
					controller

						.getHandler( )
						.listen(

							element, [

								goog.events.EventType.FOCUS,
								goog.events.EventType.BLUR ],

							controller.handleClientEvent );
				}
				if( !goog.DEBUG && (
					attribute !== zz.views.enums.FEBaseElementAttribute.CLASS &&
					attribute !== zz.views.enums.FEBaseElementAttribute.CONTROLLER &&
					attribute !== zz.views.enums.FEBaseElementAttribute.VIEW ) ){

					element.removeAttribute( attribute );
				}
				if( attribute !== zz.views.enums.FEBaseElementAttribute.CONTROLLER &&
					attribute !== zz.views.enums.FEBaseElementAttribute.VIEW ){

					arr[ arr.length ] =
						this.generateUid_( model.getUid( ), attribute, attr );
				}
			}
		}, this );
		if( arr.length ){

			uid = arr.join( this.getExternalSeparator( ) );
			element.setAttribute(

				zz.views.enums.FEBaseElementAttribute.UID,
				uid );

			this.mvcRegistry_.set( uid, model, controller, [ element ] );
			// TODO (buntarb): Could be optimized.
			if( uid.split( this.getExternalSeparator( ) ).length > 1 ){

				goog.array.forEach( uid.split( this.getExternalSeparator( ) ), function( id ){

					this.mvcRegistry_.set( id, model, controller, [ element ] );

				}, this );
			}
		}
	}
};

/**********************************************************************************************************************/

/**
 * Return element uid if setted, false otherwise.
 * @param {Element} element
 * @returns {string|boolean}
 */
zz.views.FEBase.prototype.getElementUid = function( element ){

	var val = element.getAttribute( zz.views.enums.FEBaseElementAttribute.UID );
	return val === "" ? false : !goog.isDefAndNotNull( val ) ? false : val;
};

/**
 * Return views value, converted to model type.
 * @param {Element} element
 * @returns {string}
 */
zz.views.FEBase.prototype.getElementValue = function( element ){

	if( goog.isDef( element.value ) ){

		return element.value;

	}else{

		return goog.dom.getTextContent( element );
	}
};

/**
 * Set views value, converted to view type.
 * @param {Element} element
 * @param {*} value
 * @returns {string}
 */
zz.views.FEBase.prototype.setElementValue = function( element, value ){

	if( goog.isDef( element.value ) ){

		element.value = value;

	}else{

		goog.dom.setTextContent( element, value );
	}
};

/**
 * Determine should element be handled for mouseover event or not.
 * @param {Element} element
 * @returns {boolean}
 */
zz.views.FEBase.prototype.isHoverHandled = function( element ){

	// TODO (buntarb): Add RegExp here.
	return !!~this.getElementUid( element ).indexOf(

		this.getInternalSeparator( ) +
		zz.views.enums.FEBaseElementAttributeCode.HOVER +
		this.getInternalSeparator( ) );
};

/**
 * Determine should element be handled for mouseup event or not.
 * @param {Element} element
 * @returns {boolean}
 */
zz.views.FEBase.prototype.isActionHandled = function( element ){

	// TODO (buntarb): Add RegExp here.
	if( element.getAttribute && this.getElementUid( element ) ){

		return !!~this.getElementUid( element ).indexOf(

			this.getInternalSeparator( ) +
			zz.views.enums.FEBaseElementAttributeCode.ACTION +
			this.getInternalSeparator( ) );
	}
	return false;
};

/**
 * Return action filred element from DOM-tree.
 * @param {zz.controllers.FEBase} controller
 * @param {Element} element
 * @return {Node}
 */
zz.views.FEBase.prototype.getActionElement = function( controller, element ){

	if( this.isActionHandled( element ) ){

		return element;

	}else{

		// TODO (buntarb): Optimize it with bind.
		var self = this;
		var actionAncestor = goog.dom.getAncestor( element, function( node ){

			return self.isActionHandled( node );
		} );
	}
	return actionAncestor || null;
};

/**
 * Attach elements recursively.
 * @param {zz.models.Datarow} datarow
 * @param {Element} element
 * @param {zz.controllers.FEBase} controller
 * @private
 */
zz.views.FEBase.prototype.attachElement_ = function( datarow, element, controller ){

	this.setNode_( datarow, element, controller );
	goog.array.forEach( goog.dom.getChildren( element ), function( childElement ){

		// TODO (buntarb): can be optimazed.
		this.attachElement_( datarow, childElement, controller );

	}, this );
};

/**
 * Detach elements recursively.
 * @param {Element} element
 * @private
 */
zz.views.FEBase.prototype.detachElement_ = function( element ){

	goog.array.forEach( goog.dom.getChildren( element ), function( childElement ){

		if( !childElement.hasAttribute( zz.views.enums.FEBaseElementAttribute.CONTROLLER ) ){

			// TODO (buntarb): can be optimazed.
			this.detachElement_( childElement );

		}else{

			if( childElement.children.length ){

				var uid = this.getElementUid( childElement.children[ 0 ] );
				var node = this.mvcRegistry_.get( uid );
				node.controller.dispose( );
				this.detachElement_( childElement );
			}
		}
	}, this );
	var uid = this.getElementUid( element );
	if( uid ){

		this.mvcRegistry_.delete( uid );
		var uids = uid.split( this.getExternalSeparator( ) );
		if( uids.length > 1 ){

			goog.array.forEach( uids, function( uid ){

				this.mvcRegistry_.delete( uid );

			}, this );
		}
	}
};

/**
 * Creating datarows elements.
 * @param {zz.models.Dataset} dataset
 * @param {zz.models.Datarow} datarow
 * @private
 */
zz.views.FEBase.prototype.createDatarowElements_ = function( dataset, datarow ){

	var cancel = false;
	var index = 0;
	var datasetElement = this.mvcRegistry_.get( dataset.getUid( ) ).elements[ 0 ];
	var datarowElement = soy.renderAsElement( this.datarow_soy_, {

		uid: datarow.getUid( )
	} );
	dataset.firstDatarow( );
	do{

		if( dataset.currentDatarow( ).getUid( ) === datarow.getUid( ) ){

			cancel = true;

		}else{

			index++;
		}

	}while( !cancel && dataset.nextDatarow( ) );
	goog.dom.insertChildAt( datasetElement, datarowElement, index );
	this.setNode_(

		datarow,
		datarowElement,
		this.mvcRegistry_.get( dataset.getUid( ) ).controller );
};

/**
 * Creating model elements.
 * @param {zz.models.Dataset} dataset
 * @param {zz.models.Datarow} datarow
 * @private
 */
zz.views.FEBase.prototype.createModelElements_ = function( dataset, datarow ){

	var datarowElement = this.mvcRegistry_.get( datarow.getUid( ) ).elements[ 0 ];
	var modelElement = soy.renderAsElement( this.model_soy_, {

		uid: datarow.getUid( ),
		key: this.mvcRegistry_.get( dataset.getUid( ) ).controller.getModel( ).datafield,
		value: datarow,
		dataset: dataset
	} );
	goog.dom.appendChild( datarowElement, modelElement );
	this.attachElement_(

		datarow,
		modelElement,
		this.mvcRegistry_.get( dataset.getUid( ) ).controller );
};

/**
 * Update elements classes.
 * @param {zz.models.Dataset} dataset
 * @param {zz.models.Datarow} datarow
 * @private
 */
zz.views.FEBase.prototype.updateElementsClasses_ = function( dataset, datarow ){

	goog.object.forEach( dataset.datafield, function( field ){

		var node = this.mvcRegistry_.get(

			datarow.getUid( ) +
			this.getInternalSeparator( ) +
			zz.views.enums.FEBaseElementAttributeCode.CLASS +
			this.getInternalSeparator( ) +
			field );

		if( node ){

			goog.array.forEach( node.elements, function( element ){

				var dataClass = element.getAttribute( zz.views.enums.FEBaseElementAttribute.CLASS );
				if( ~dataClass.indexOf( field + zz.views.enums.FEBaseUidSeparator.CLASS_INTERNAL ) ){

					var className = dataClass.split(
						field + zz.views.enums.FEBaseUidSeparator.CLASS_INTERNAL )[ 1 ]
						.split( zz.views.enums.FEBaseUidSeparator.CLASS_EXTERNAL )[ 0 ];
					if( datarow[ field ] ){

						goog.dom.classlist.add( element, className );

					}else{

						goog.dom.classlist.remove( element, className );
					}
				}
			}, this );
		}

	}, this );
};

/**
 * Create elements child controllers.
 * @param {zz.models.Dataset} dataset
 * @param {zz.models.Datarow} datarow
 * @private
 */
zz.views.FEBase.prototype.createElementsControllers_ = function( dataset, datarow ){

	goog.object.forEach( dataset.datafield, function( field ){

		if( goog.isFunction( dataset.getDatarowSchema( )[ field ].type ) ){

			var node = this.mvcRegistry_.get(

				datarow.getUid( ) +
				this.getInternalSeparator( ) +
				zz.views.enums.FEBaseElementAttributeCode.MODEL +
				this.getInternalSeparator( ) +
				field );

			if( node ){

				goog.array.forEach( node.elements, function( element ){

					var viewName = element.getAttribute( zz.views.enums.FEBaseElementAttribute.VIEW );
					var controllerName = element.getAttribute( zz.views.enums.FEBaseElementAttribute.CONTROLLER );
					if( viewName && viewName.length && controllerName && controllerName.length ){

						var view = zz.environment.services.MVCRegistry
							.getView( viewName );

						var controller = zz.environment.services.MVCRegistry
							.getController( controllerName, datarow[ field ], view );

						if( view && controller ){

							node.controller.addChild( controller, false );
							controller.render( element );
						}
					}
				}, this );
			}
		}
	}, this );
};

/**
 * @override
 */
zz.views.FEBase.prototype.createDom = function( controller ){

	// Creating dataset element.
	var datasetElement = soy.renderAsElement( this.dataset_soy_, {

		uid: controller.getModel( ).getUid( )
	} );
	this.setNode_( controller.getModel( ), datasetElement, controller );

	// Process existing data.
	var datarow = controller.getModel( ).firstDatarow( );
	if( datarow ){

		do{

			// Creating datarows elements.
			this.createDatarowElements_( controller.getModel( ), datarow );

			// Creating model element.
			this.createModelElements_( controller.getModel( ), datarow );

			// Update classes
			this.updateElementsClasses_( controller.getModel( ), datarow );

			// Update controllers
			this.createElementsControllers_( controller.getModel( ), datarow );

		}while( datarow = controller.getModel( ).nextDatarow( ) );
	}
	return datasetElement;
};

/**
 * @override
 */
zz.views.FEBase.prototype.setState = function( controller, state, enable ){ };

/**
 * Handler for DATAROW_CREATE
 * @param {zz.models.Message} message
 * @returns {Element}
 */
zz.views.FEBase.prototype.renderDatarow = function( message ){

	// Creating datarows elements.
	this.createDatarowElements_( message.dataset, message.datarow );

	// Creating model element.
	this.createModelElements_( message.dataset, message.datarow );

	// Update classes
	this.updateElementsClasses_( message.dataset, message.datarow );

	// Update controllers
	this.createElementsControllers_( message.dataset, message.datarow );

	// Return datarow element.
	return this.mvcRegistry_.get( message.datarow.getUid( ) ).elements[ 0 ];
};

/**
 * Handler for DATAROW_DELETE
 * @param {zz.models.Message} message
 */
zz.views.FEBase.prototype.removeDatarow = function( message ){

	var datarowElement = this.mvcRegistry_.get( message.datarow.getUid( ) ).elements[ 0 ];
	this.detachElement_( datarowElement );
	goog.dom.removeNode( datarowElement );
};

/**
 * Handler for DATAROW_UPDATE
 * @param {zz.models.Message} message
 */
zz.views.FEBase.prototype.updateDatarow = function( message ){

	var node;

	// Update models
	node = this.mvcRegistry_.get(

		message.datarow.getUid( ) +
		this.getInternalSeparator( ) +
		zz.views.enums.FEBaseElementAttributeCode.MODEL +
		this.getInternalSeparator( ) +
		message.datafield );

	if( node ){

		goog.array.forEach( node.elements, function( element ){

			this.setElementValue( element, message.new_value );

		}, this );
	}

	// Update inputs
	node = this.mvcRegistry_.get(

		message.datarow.getUid( ) +
		this.getInternalSeparator( ) +
		zz.views.enums.FEBaseElementAttributeCode.INPUT +
		this.getInternalSeparator( ) +
		message.datafield );

	if( node ){

		goog.array.forEach( node.elements, function( element ){

			this.setElementValue( element, message.new_value );

		}, this );
	}

	// Update classes
	node = this.mvcRegistry_.get(

		message.datarow.getUid( ) +
		this.getInternalSeparator( ) +
		zz.views.enums.FEBaseElementAttributeCode.CLASS +
		this.getInternalSeparator( ) +
		message.datafield );

	if( node ){

		goog.array.forEach( node.elements, function( element ){

			var dataClass = element.getAttribute( zz.views.enums.FEBaseElementAttribute.CLASS );
			var className = dataClass.split(
				message.datafield + zz.views.enums.FEBaseUidSeparator.CLASS_INTERNAL )[ 1 ]
				.split( zz.views.enums.FEBaseUidSeparator.CLASS_EXTERNAL )[ 0 ];
			if( message.new_value ){

				goog.dom.classlist.add( element, className );

			}else{

				goog.dom.classlist.remove( element, className );
			}
		}, this );
	}
};