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
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.ControlRenderer' );
goog.require( 'zz.environment.services.MVCTree' );
goog.require( 'zz.environment.enums.ViewElementAttribute' );
goog.require( 'zz.environment.enums.ViewElementAttributeCode' );
goog.require( 'zz.i18n.services.DecimalFormatter' );
goog.require( 'zz.views.enums.FEBaseEventType' );
goog.require( 'zz.views.templates.default' );

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
	 * Application MVC Tree.
	 * @type {zz.environment.services.MVCTree}
	 * @private
	 */
	this.mvcTree_ = zz.environment.services.MVCTree.getInstance( );

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

/**
 * Return element uid if setted, false otherwise.
 * @param {Element} element
 * @returns {string|boolean}
 */
zz.views.FEBase.prototype.getElementUid = function( element ){

	var val = element.getAttribute( zz.environment.enums.ViewElementAttribute.UID );
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
 * @param {Element} view
 * @returns {string}
 */
zz.views.FEBase.prototype.setElementValue = function( element, value ){

	if( element.value ){

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

		this.mvcTree_.getInternalSeparator( ) +
		zz.environment.enums.ViewElementAttributeCode.HOVER +
		this.mvcTree_.getInternalSeparator( ) );
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

			this.mvcTree_.getInternalSeparator( ) +
			zz.environment.enums.ViewElementAttributeCode.ACTION +
			this.mvcTree_.getInternalSeparator( ) );
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
		if( goog.dom.contains( controller.getElement( ), actionAncestor ) ){

			return actionAncestor;
		}
	}
	return null;
};

/**
 * Attach elements recursively.
 * @param {zz.models.Datarow} datarow
 * @param {Element} element
 * @param {zz.comtrollers.FEBase} controller
 * @private
 */
zz.views.FEBase.prototype.attachElement_ = function( datarow, element, controller ){

	this.mvcTree_.setNode( datarow, element, controller );
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

		if( !childElement.hasAttribute( zz.environment.enums.ViewElementAttribute.CONTROLLER ) ){

			// TODO (buntarb): can be optimazed.
			this.detachElement_( childElement );

		}else{

			if( childElement.children.length ){

				var uid = this.getElementUid( childElement.children[ 0 ] );
				var node = this.mvcTree_.getNode( uid );
				node.controller.dispose( );
				this.detachElement_( childElement );
			}
		}
	}, this );
	var uid = this.getElementUid( element );
	if( uid ){

		this.mvcTree_.deleteNode( uid );
		var uids = uid.split( this.mvcTree_.getExternalSeparator( ) );
		if( uids.length > 1 ){

			goog.array.forEach( uids, function( uid ){

				this.mvcTree_.deleteNode( uid );

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

	var datasetElement = this.mvcTree_.getNode( dataset.getUid( ) ).elements[ 0 ];
	var datarowElement = soy.renderAsElement( this.datarow_soy_, {

		uid: datarow.getUid( )
	} );
	goog.dom.appendChild( datasetElement, datarowElement );
	this.mvcTree_.setNode(

		datarow,
		datarowElement,
		this.mvcTree_.getNode( dataset.getUid( ) ).controller );
};

/**
 * Creating model elements.
 * @param {zz.models.Dataset} dataset
 * @param {zz.models.Datarow} datarow
 * @private
 */
zz.views.FEBase.prototype.createModelElements_ = function( dataset, datarow ){

	var datarowElement = this.mvcTree_.getNode( datarow.getUid( ) ).elements[ 0 ];
	var modelElement = soy.renderAsElement( this.model_soy_, {

		uid: datarow.getUid( ),
		key: this.mvcTree_.getNode( dataset.getUid( ) ).controller.getModel( ).datafield,
		value: datarow
	} );
	goog.dom.appendChild( datarowElement, modelElement );
	this.attachElement_(

		datarow,
		modelElement,
		this.mvcTree_.getNode( dataset.getUid( ) ).controller );
};

/**
 * Update elements classes.
 * @param {zz.models.Dataset} dataset
 * @param {zz.models.Datarow} datarow
 * @private
 */
zz.views.FEBase.prototype.updateElementsClasses_ = function( dataset, datarow ){

	goog.object.forEach( dataset.datafield, function( field ){

		var node = this.mvcTree_.getNode(

			datarow.getUid( ) + this.mvcTree_.getInternalSeparator( ) +
			zz.environment.enums.ViewElementAttributeCode.CLASS + this.mvcTree_.getInternalSeparator( ) +
			field );

		if( node ){

			goog.array.forEach( node.elements, function( element ){

				var dataClass = element.getAttribute( zz.environment.enums.ViewElementAttribute.CLASS );
				if( ~dataClass.indexOf( field + ':' ) ){

					var className = dataClass.split( field + ':' )[ 1 ].split( ',' )[ 0 ];
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

			var node = this.mvcTree_.getNode(

				datarow.getUid( ) + this.mvcTree_.getInternalSeparator( ) +
				zz.environment.enums.ViewElementAttributeCode.MODEL + this.mvcTree_.getInternalSeparator( ) +
				field );

			if( node ){

				goog.array.forEach( node.elements, function( element ){

					var viewName = element.getAttribute( zz.environment.enums.ViewElementAttribute.VIEW );
					var controllerName = element.getAttribute( zz.environment.enums.ViewElementAttribute.CONTROLLER );
					if( viewName && viewName.length && controllerName && controllerName.length ){

						var view = zz.environment.services.MVCTree

							.registry
							.getView( viewName );

						var controller = zz.environment.services.MVCTree

							.registry
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
	this.mvcTree_.setNode( controller.getModel( ), datasetElement, controller );

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
	return this.mvcTree_.getNode( message.datarow.getUid( ) ).elements[ 0 ];;
};

/**
 * Handler for DATAROW_DELETE
 * @param {zz.models.Message} message
 */
zz.views.FEBase.prototype.removeDatarow = function( message ){

	var datarowElement = this.mvcTree_.getNode( message.datarow.getUid( ) ).elements[ 0 ];
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
	node = this.mvcTree_.getNode(

		message.datarow.getUid( ) + this.mvcTree_.getInternalSeparator( ) +
		zz.environment.enums.ViewElementAttributeCode.MODEL + this.mvcTree_.getInternalSeparator( ) +
		message.datafield );

	if( node ){

		goog.array.forEach( node.elements, function( element ){

			this.setElementValue( element, message.new_value );

		}, this );
	}

	// Update inputs
	node = this.mvcTree_.getNode(

		message.datarow.getUid( ) + this.mvcTree_.getInternalSeparator( ) +
		zz.environment.enums.ViewElementAttributeCode.INPUT + this.mvcTree_.getInternalSeparator( ) +
		message.datafield );

	if( node ){

		goog.array.forEach( node.elements, function( element ){

			this.setElementValue( element, message.new_value );

		}, this );
	}

	// Update classes
	node = this.mvcTree_.getNode(

		message.datarow.getUid( ) + this.mvcTree_.getInternalSeparator( ) +
		zz.environment.enums.ViewElementAttributeCode.CLASS + this.mvcTree_.getInternalSeparator( ) +
		message.datafield );

	if( node ){

		goog.array.forEach( node.elements, function( element ){

			var dataClass = element.getAttribute( zz.environment.enums.ViewElementAttribute.CLASS );
			// TODO (buntarb): Move it to service.
			var className = dataClass.split( message.datafield + ':' )[ 1 ].split( ',' )[ 0 ];
			if( message.new_value ){

				goog.dom.classlist.add( element, className );

			}else{

				goog.dom.classlist.remove( element, className );
			}
		}, this );
	}
};