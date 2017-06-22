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

goog.require( 'goog.labs.userAgent.browser' );
goog.require( 'goog.dom' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.array' );
goog.require( 'goog.events' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.IdGenerator' );
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

	/**
	 * Filters for datafields.
	 * @type {Object}
	 * @private
	 */
	this.datafield_filters_ = {};
};

/**
 * Base inheritance.
 */
goog.inherits( zz.views.FEBase, goog.ui.ControlRenderer );
goog.addSingletonGetter( zz.views.FEBase );

/**
 * Returns application environment.
 * @return {zz.environment.services.Environment}
 */
zz.views.FEBase.prototype.getEnvironment = function( ){

	return this.env_;
};

/**
 * Returns application MVC registry.
 * @return {zz.environment.services.MVCRegistry}
 */
zz.views.FEBase.prototype.getMVCRegistry = function( ){

	return this.mvcRegistry_;
};

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
 * Return data field name by {@code uid}. Deprecated. Use
 * {@code zz.views.FEBase#getInputKeyByUid} instead.
 * @param {string} uid
 * @return {string|boolean}
 * @deprecated
 */
zz.views.FEBase.prototype.getFieldByUid = function( uid ){

	var set = uid.split( this.getInternalSeparator( ) );
	if( ~set.indexOf( zz.views.enums.FEBaseElementAttributeCode.INPUT ) ){

		return set[ set.indexOf( zz.views.enums.FEBaseElementAttributeCode.INPUT ) + 1 ];
	}
    return false;
};

/**
 * Return data field name by {@code uid}.
 * @param {string} uid
 * @return {string|boolean}
 */
zz.views.FEBase.prototype.getInputKeyByUid = function( uid ){

	var set = uid.split( this.getInternalSeparator( ) );
	if( ~set.indexOf( zz.views.enums.FEBaseElementAttributeCode.INPUT ) ){

		return set[ set.indexOf( zz.views.enums.FEBaseElementAttributeCode.INPUT ) + 1 ];
	}
	return false;
};

/**
 * Return data field name by {@code uid}.
 * @param {string} uid
 * @return {string|boolean}
 */
zz.views.FEBase.prototype.getModelKeyByUid = function( uid ){

	var set = uid.split( this.getInternalSeparator( ) );
	if( ~set.indexOf( zz.views.enums.FEBaseElementAttributeCode.MODEL ) ){

		return set[ set.indexOf( zz.views.enums.FEBaseElementAttributeCode.MODEL ) + 1 ];
	}
	return false;
};

/**
 * Returns element attribute if set, false otherwise.
 * @param {Element} element
 * @param {string} attribute
 * @return {string|boolean}
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
			attribute === zz.views.enums.FEBaseElementAttribute.KEY ||
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
 * @return {Array.<string>}
 * @private
 */
zz.views.FEBase.prototype.getDataClassKeys_ = function( dataClass ){

	var keys = [ ];
	goog.array.forEach(
		dataClass.split( zz.views.enums.FEBaseUidSeparator.CLASS_EXTERNAL ),
		function( pair ){

            var key = pair.split( zz.views.enums.FEBaseUidSeparator.CLASS_INTERNAL )[ 0 ];

            if( key.length ){

                key = goog.string.trim( key );

                if( key.length ){

                    keys[ keys.length ] = key;
                }
			}
		}
    );
	return keys;
};

/**
 * Returns attribute code by attribute name.
 * @param {string} attribute
 * @return {string|boolean}
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
	if( attribute === zz.views.enums.FEBaseElementAttribute.KEY ){

		return zz.views.enums.FEBaseElementAttributeCode.KEY;
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
    return false;
};

/**
 * Generate final {@code uid} for given attribute.
 * @param {string} uid
 * @param {string} attr
 * @param {string} opt_val
 * @return {string|boolean}
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
		attr === zz.views.enums.FEBaseElementAttribute.KEY ||
		attr === zz.views.enums.FEBaseElementAttribute.SCROLL ||
		attr === zz.views.enums.FEBaseElementAttribute.HOVER ){

		return uid +

			this.getInternalSeparator( ) +
			this.getAttributeCode_( attr ) +
			this.getInternalSeparator( ) +
			goog.ui.IdGenerator.getInstance( ).getNextUniqueId( );
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
    return false;
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

					controller.enableFocusHandling( element );
				}
				if( attribute === zz.views.enums.FEBaseElementAttribute.KEY ){

					controller.enableKeyHandling( element );
				}
				if( goog.labs.userAgent.browser.isIE( ) &&
					attribute === zz.views.enums.FEBaseElementAttribute.INPUT ){

					controller.enableIEContenteditableChangeEvent( element );
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

/**
 * Return element uid if setted, false otherwise.
 * @param {Element} element
 * @return {string|boolean}
 */
zz.views.FEBase.prototype.getElementUid = function( element ){

	var val = element.getAttribute( zz.views.enums.FEBaseElementAttribute.UID );
	return val === "" ? false : !goog.isDefAndNotNull( val ) ? false : val;
};

/**
 * Formatting model value to view form.
 * @param {*} modelValue
 * @returns {*}
 */
zz.views.FEBase.prototype.defaultFormat = function( modelValue ){

	return modelValue;
};

/**
 * Parse model value from view form.
 * @param {*} viewValue
 * @returns {*}
 */
zz.views.FEBase.prototype.defaultParse = function( viewValue ){

	return viewValue;
};

/**
 * Set format/parse functions for datafields by field name.
 * @param key
 * @param formatterFn
 * @param parseFn
 */
zz.views.FEBase.prototype.setDatafieldFilter =
	function( key, formatterFn, parseFn ){

	this.datafield_filters_[ key ] = {

		format: formatterFn,
		parse: parseFn
	};
};

/**
 * Set views value, converted to view type.
 * @param {Element} element
 * @param {string} key
 * @param {*} value
 * @return {string}
 */
zz.views.FEBase.prototype.setElementValue = function( element, key, value ){

	var formatedValue = this.datafield_filters_[ key ] ?
		this.datafield_filters_[ key ].format( value ) :
		this.defaultFormat( value );

	if( goog.isDef( element.value ) ){

		if( element.value !== formatedValue ){

			element.value = formatedValue;
		}
	}else{

		if( goog.dom.isElement( formatedValue ) ||
			goog.dom.isNodeLike( formatedValue ) ||
			goog.dom.isNodeList( formatedValue ) ){

			if( formatedValue.outerHTML !== element.innerHTML ){

				goog.dom.removeChildren( element );
				goog.dom.append( element, formatedValue );
			}

		}else{

			if( goog.dom.getTextContent( element ) !== formatedValue ){

				goog.dom.setTextContent( element, formatedValue );
			}
		}
	}
};

/**
 * Return views value, converted to model type.
 * @param {Element} element
 * @return {string}
 */
zz.views.FEBase.prototype.getElementValue = function( element ){

	var uid = this.getElementUid( element );
	var key = this.getModelKeyByUid( uid ) || this.getInputKeyByUid( uid );
	var value;
	if( goog.isDef( element.value ) ){

		value = element.value;

	}else{

		var children = goog.dom.getChildren( element );
		if( !children.length ){

			value = goog.dom.getTextContent( element );

		}else{

			value = children;
		}
	}
	return this.datafield_filters_[ key ] ?
		this.datafield_filters_[ key ].parse( value ) :
		this.defaultParse( value );
};

/**
 * Determine should element be handled for mouseover event or not.
 * @param {Element} element
 * @return {boolean}
 */
zz.views.FEBase.prototype.isHoverHandled = function( element ){

    // TODO (buntarb): Add RegExp here.
    if( this.getElementUid( element ) ){

        return !!~this.getElementUid( element ).indexOf(

            this.getInternalSeparator( ) +
                zz.views.enums.FEBaseElementAttributeCode.HOVER +
                this.getInternalSeparator( ) );
    }
    return false;
};

/**
 * Determine should element be handled for mouseup event or not.
 * @param {Element} element
 * @return {boolean}
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
                if( node ){

                    node.controller.dispose( );
                }
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
    var node = this.mvcRegistry_.get( dataset.getUid( ) );
    if( node ){

        var datasetElement = node.elements[ 0 ];
        if(datasetElement){

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
                node.controller );
        }
    }
};

/**
 * Creating model elements.
 * @param {zz.models.Dataset} dataset
 * @param {zz.models.Datarow} datarow
 * @private
 */
zz.views.FEBase.prototype.createModelElements_ = function( dataset, datarow ){

	var datarowNode = this.mvcRegistry_.get( datarow.getUid( ) );
    if( datarowNode ){

        var datarowElement = datarowNode.elements[ 0 ];
        if( datarowElement ){

            var datasetNode = this.mvcRegistry_.get( dataset.getUid( ) );
            if( datasetNode ){

                var modelElement = soy.renderAsElement( this.model_soy_, {

                    uid: datarow.getUid( ),
                    key: datasetNode.controller.getModel( ).datafield,
                    value: datarow,
                    dataset: dataset
                } );
                goog.dom.appendChild( datarowElement, modelElement );
                this.attachElement_(

                    datarow,
                    modelElement,
                    datasetNode.controller );
            }
        }
    }
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

						var viewConstructor = goog.global;
						goog.array.forEach( viewName.split( '.' ), function( key ){

							if( !key.length ){

								throw new Error(
									'zz.views.FEBase error. View class name is invalid: ' + viewName );
							}
							viewConstructor = viewConstructor[ key ];
						} );
						if( !goog.isFunction( viewConstructor ) ){

							throw new Error(
								'zz.views.FEBase error. View constructor is invalid: ' + viewName );
						}
						var controllerConstructor = goog.global;
						goog.array.forEach( controllerName.split( '.' ), function( key ){

							if( !key.length ){

								throw new Error(
									'Controller class name is invalid: ' + controllerName );
							}
							controllerConstructor = controllerConstructor[ key ];
						} );
						if( !goog.isFunction( controllerConstructor ) ){

							throw new Error(
								'zz.views.FEBase error. Controller constructor is invalid: ' + controllerName );
						}
						var view = viewConstructor.getInstance( );
						var controller = controllerConstructor( datarow[ field ], view );
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
 * @return {Element|undefined}
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
    var node = this.mvcRegistry_.get( message.datarow.getUid( ) );
    var element;
    if( node ){

        element = node.elements[ 0 ];
    }
    return element;
};

/**
 * Handler for DATAROW_DELETE
 * @param {zz.models.Message} message
 */
zz.views.FEBase.prototype.removeDatarow = function( message ){

	var node = this.mvcRegistry_.get( message.datarow.getUid( ) );
    if( node ){

        var datarowElement = node.elements[ 0 ];
        if( datarowElement ){

            this.detachElement_( datarowElement );
            goog.dom.removeNode( datarowElement );
        }
    }
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

			this.setElementValue( element, message.datafield, message.new_value );

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

			this.setElementValue( element, message.datafield, message.new_value );

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