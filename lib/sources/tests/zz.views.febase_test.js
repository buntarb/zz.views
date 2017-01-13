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

goog.provide( 'zz.views.FEBaseTest' );

goog.require( 'goog.testing.jsunit' );
goog.setTestOnly( 'zz.views.FEBaseTest' );

goog.require( 'goog.ui.ControlRenderer' );
goog.require( 'goog.ui.IdGenerator' );
goog.require( 'zz.views.FEBase' );
goog.require( 'zz.environment.services.Environment' );
goog.require( 'zz.environment.services.MVCRegistry' );
goog.require( 'zz.views.templates.default' );
goog.require( 'zz.views.enums.FEBaseUidSeparator' );
goog.require( 'zz.views.enums.FEBaseElementAttributeCode' );
goog.require( 'zz.views.enums.FEBaseElementAttribute' );


var zz_views_FEBaseTest_members = [

    'env_',
    'mvcRegistry_'
];

var zz_views_FEBaseTest_methods = [

    /* by default must be a function */
    'model_soy_',
    'dataset_soy_',
    'datarow_soy_',

    'getEnvironment',
    'getMVCRegistry',
    'getInternalSeparator',
    'getExternalSeparator',
    'getFieldByUid',
    'getViewElementAttribute_',
    'getDataClassKeys_',
    'getAttributeCode_',
    'generateUid_',
    'setNode_',
    'getElementUid',
    'getElementValue',
    'setElementValue',
    'isHoverHandled',
    'isActionHandled',
    'getActionElement',
    'attachElement_',
    'detachElement_',
    'createDatarowElements_',
    'createModelElements_',
    'updateElementsClasses_',
    'createElementsControllers_',
    'createDom',
    'setState',
    'renderDatarow',
    'removeDatarow',
    'updateDatarow'
];

var zz_views_FEBaseTest_testSubj = new zz.views.FEBase( );

function test_zz_views_FEBaseTest_availableMembers( ){

    var checkIfIsFun = true;

    zz.tests.checkMembers(
        zz_views_FEBaseTest_members,
        zz_views_FEBaseTest_testSubj
    );
    zz.tests.checkMembers(
        zz_views_FEBaseTest_methods,
        zz_views_FEBaseTest_testSubj,
        checkIfIsFun,
        'Methods:'
    );
}

function test_zz_views_FEBaseTest_constructor( ){

    assertTrue(

        'Instance must be non-null and have the expected type',
        zz_views_FEBaseTest_testSubj instanceof zz.views.FEBase
    );
}

function test_zz_views_FEBaseTest_inheritance( ){

    assertTrue(

        'Instance must be non-null and have the expected class',
        zz_views_FEBaseTest_testSubj instanceof goog.ui.ControlRenderer
    );
}

function test_zz_views_FEBaseTest_env( ){

    assertTrue(

        'Property must have the expected type',
        zz_views_FEBaseTest_testSubj.env_ instanceof zz.environment.services.Environment
    );
}

function test_zz_views_FEBaseTest_mvcRegistry( ){

    assertTrue(

        'Property must have the expected type',
        zz_views_FEBaseTest_testSubj.mvcRegistry_ instanceof zz.environment.services.MVCRegistry
    );
}

function test_zz_views_FEBaseTest_model_soy( ){

    assertEquals(

        'Expected certain default value',
        zz.views.templates.default.model,
        zz_views_FEBaseTest_testSubj.model_soy_
    );
}

function test_zz_views_FEBaseTest_dataset_soy( ){

    assertEquals(

        'Expected certain default value',
        zz.views.templates.default.dataset,
        zz_views_FEBaseTest_testSubj.dataset_soy_
    );
}

function test_zz_views_FEBaseTest_datarow_soy( ){

    assertEquals(

        'Expected certain default value',
        zz.views.templates.default.datarow,
        zz_views_FEBaseTest_testSubj.datarow_soy_
    );
}

function test_zz_views_FEBaseTest_getEnvironment( ){

    assertEquals(

        'Expected certain value',
        zz_views_FEBaseTest_testSubj.env_,
        zz_views_FEBaseTest_testSubj.getEnvironment( )
    );
}

function test_zz_views_FEBaseTest_getMVCRegistry( ){

    assertEquals(

        'Expected certain value',
        zz_views_FEBaseTest_testSubj.mvcRegistry_,
        zz_views_FEBaseTest_testSubj.getMVCRegistry( )
    );
}

function test_zz_views_FEBaseTest_getInternalSeparator( ){

    assertEquals(

        'Expected certain value',
        zz.views.enums.FEBaseUidSeparator.INTERNAL,
        zz_views_FEBaseTest_testSubj.getInternalSeparator( )
    );
}

function test_zz_views_FEBaseTest_getExternalSeparator( ){

    assertEquals(

        'Expected certain value',
        zz.views.enums.FEBaseUidSeparator.EXTERNAL,
        zz_views_FEBaseTest_testSubj.getExternalSeparator( )
    );
}

function test_zz_views_FEBaseTest_getFieldByUid( ){

    var name = 'name';

    var uid = 'prefix_'
        + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
        + zz.views.enums.FEBaseElementAttributeCode.INPUT
        + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
        + name;

    assertEquals(

        'Expected certain value',
        name,
        zz_views_FEBaseTest_testSubj.getFieldByUid( uid )
    );

    uid = 'prefix_'
        + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
        + zz.views.enums.FEBaseElementAttributeCode.INPUT
        + zz_views_FEBaseTest_testSubj.getInternalSeparator( );

    assertTrue(

        'Expected certain type',
        typeof zz_views_FEBaseTest_testSubj.getFieldByUid( uid ) === 'string'
    );

    uid = 'prefix_'
        + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
        + 'NoInputAttributeCode'
        + zz_views_FEBaseTest_testSubj.getInternalSeparator( );

    assertFalse(

        'Expected certain value',
        zz_views_FEBaseTest_testSubj.getFieldByUid( uid )
    );

    uid = 'prefix_';

    assertFalse(

        'Expected certain value',
        zz_views_FEBaseTest_testSubj.getFieldByUid( uid )
    );
}

function test_zz_views_FEBaseTest_getViewElementAttribute( ){

    var elementName = 'span';
    var attrId = 'attrId';
    var attrClass = 'attrClass1 attrClass2';
    var attrNoExists = 'attrNoExists';
    var attrEmpty = 'attrEmpty';
    var dir = 'someDir';
    var attrs = [

        zz.views.enums.FEBaseElementAttribute.ACTION,
        zz.views.enums.FEBaseElementAttribute.FOCUS,
        zz.views.enums.FEBaseElementAttribute.BLUR,
        zz.views.enums.FEBaseElementAttribute.KEY,
        zz.views.enums.FEBaseElementAttribute.SCROLL,
        zz.views.enums.FEBaseElementAttribute.HOVER
    ];

    var i = 0;
    var attributes = {

        'id': attrId,
        'class': attrClass,
        attrEmpty: '',
        title: '',
        dir: dir
    };
    for( i = 0; i < attrs.length; i++ ){

        attributes[ attrs[ i ] ] = "";
    }

    var element = goog.dom.createDom(
        elementName,
        attributes
    );

    assertEquals(

        'Expected certain value',
        attrId,
        zz_views_FEBaseTest_testSubj.getViewElementAttribute_( element, 'id' )
    );

    assertEquals(

        'Expected certain value',
        attrClass,
        zz_views_FEBaseTest_testSubj.getViewElementAttribute_( element, 'class' )
    );

    assertFalse(

        'Expected certain value',
        zz_views_FEBaseTest_testSubj.getViewElementAttribute_( element, attrNoExists )
    );

    for( i = 0; i < attrs.length; i++ ){

        assertEquals(

            'Expected certain value',
            attrs[ i ],
            zz_views_FEBaseTest_testSubj.getViewElementAttribute_( element, attrs[ i ] )
        );
    }

    assertFalse(

        'Expected certain value',
        zz_views_FEBaseTest_testSubj.getViewElementAttribute_( element, attrEmpty )
    );

    assertFalse(

        'Expected certain value',
        zz_views_FEBaseTest_testSubj.getViewElementAttribute_( element, 'title' )
    );

    assertEquals(

        'Expected certain value',
        dir,
        zz_views_FEBaseTest_testSubj.getViewElementAttribute_( element, 'dir' )
    );
}

function test_zz_views_FEBaseTest_getDataClassKeys( ){

    var dataClass = 'c1:v1,c2:v2, c3:v3, :v4,:v5,c4, c5, c6 ,:, :, : , ,,';
    var expectedArray = [ 'c1', 'c2', 'c3', 'c4', 'c5', 'c6' ];

    assertArrayEquals(

        'Returned value is not correct',
        expectedArray,
        zz_views_FEBaseTest_testSubj.getDataClassKeys_( dataClass )
    );

    dataClass = '';

    assertTrue(

        'Expected certain type',
        goog.isArray( zz_views_FEBaseTest_testSubj.getDataClassKeys_( dataClass ) )
    );
}

function test_zz_views_FEBaseTest_getAttributeCode( ){

    var attrNoCode = 'attrNoCode';

    var attrNames = [

        zz.views.enums.FEBaseElementAttribute.UID,
        zz.views.enums.FEBaseElementAttribute.SET,
        zz.views.enums.FEBaseElementAttribute.ROW,
        zz.views.enums.FEBaseElementAttribute.MODEL,
        zz.views.enums.FEBaseElementAttribute.INPUT,
        zz.views.enums.FEBaseElementAttribute.FOCUS,
        zz.views.enums.FEBaseElementAttribute.BLUR,
        zz.views.enums.FEBaseElementAttribute.KEY,
        zz.views.enums.FEBaseElementAttribute.ACTION,
        zz.views.enums.FEBaseElementAttribute.SCROLL,
        zz.views.enums.FEBaseElementAttribute.CLASS,
        zz.views.enums.FEBaseElementAttribute.HOVER

    ];
    var attrCodes = [

        zz.views.enums.FEBaseElementAttributeCode.UID,
        zz.views.enums.FEBaseElementAttributeCode.SET,
        zz.views.enums.FEBaseElementAttributeCode.ROW,
        zz.views.enums.FEBaseElementAttributeCode.MODEL,
        zz.views.enums.FEBaseElementAttributeCode.INPUT,
        zz.views.enums.FEBaseElementAttributeCode.FOCUS,
        zz.views.enums.FEBaseElementAttributeCode.BLUR,
        zz.views.enums.FEBaseElementAttributeCode.KEY,
        zz.views.enums.FEBaseElementAttributeCode.ACTION,
        zz.views.enums.FEBaseElementAttributeCode.SCROLL,
        zz.views.enums.FEBaseElementAttributeCode.CLASS,
        zz.views.enums.FEBaseElementAttributeCode.HOVER

    ];

    var i = 0;
    var attrCodeMap = { };
    for( i = 0; i < attrNames.length; i++ ){

        attrCodeMap[ attrNames[ i ] ] = attrCodes[ i ];
    }

    for( var attr in attrCodeMap ){

        assertEquals(

            'Expected certain value',
            attrCodeMap[ attr ],
            zz_views_FEBaseTest_testSubj.getAttributeCode_( attr )
        );
    }

    assertFalse(

        'Expected certain value',
        zz_views_FEBaseTest_testSubj.getAttributeCode_( attrNoCode )
    );
}

function test_zz_views_FEBaseTest_generateUid( ){

    var idGenerator = goog.ui.IdGenerator.getInstance( );
    var nextUniqueId = 'nextUniqueId';
    stubs.replace(
        idGenerator,
        'getNextUniqueId',
        function( ){
            return nextUniqueId;
        }
    );

    var attr;
    var uid = 'uid';
    var opt_val = 'key:val';
    var attrNames = [

        zz.views.enums.FEBaseElementAttribute.SET,
        zz.views.enums.FEBaseElementAttribute.ROW
    ];

    var i = 0;
    for( i = 0; i < attrNames.length; i++ ){

        attr = attrNames[ i ];

        assertEquals(

            'Expected certain value',
            uid,
            zz_views_FEBaseTest_testSubj.generateUid_( uid, attr, opt_val )
        );
    }

    attrNames = [

        zz.views.enums.FEBaseElementAttribute.MODEL,
        zz.views.enums.FEBaseElementAttribute.INPUT
    ];

    for( i = 0; i < attrNames.length; i++ ){

        attr = attrNames[ i ];

        assertEquals(

            'Expected certain value',
            ( uid
                    + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
                    + zz_views_FEBaseTest_testSubj.getAttributeCode_( attr )
                    + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
                    + opt_val ),
            zz_views_FEBaseTest_testSubj.generateUid_( uid, attr, opt_val )
        );
    }

    attrNames = [

        zz.views.enums.FEBaseElementAttribute.ACTION,
        zz.views.enums.FEBaseElementAttribute.FOCUS,
        zz.views.enums.FEBaseElementAttribute.BLUR,
        zz.views.enums.FEBaseElementAttribute.KEY,
        zz.views.enums.FEBaseElementAttribute.SCROLL,
        zz.views.enums.FEBaseElementAttribute.HOVER
    ];

    for( i = 0; i < attrNames.length; i++ ){

        attr = attrNames[ i ];

        assertEquals(

            'Expected certain value',
            ( uid
                    + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
                    + zz_views_FEBaseTest_testSubj.getAttributeCode_( attr )
                    + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
                    + idGenerator.getNextUniqueId( ) ),
            zz_views_FEBaseTest_testSubj.generateUid_( uid, attr, opt_val )
        );
    }

    attr = zz.views.enums.FEBaseElementAttribute.CLASS;

    assertEquals(

        'Expected certain value',
        ( uid
            + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
            + zz_views_FEBaseTest_testSubj.getAttributeCode_( attr )
            + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
            + 'key' ),
        zz_views_FEBaseTest_testSubj.generateUid_( uid, attr, opt_val )
    );

    assertFalse(

        'Expected certain value',
        zz_views_FEBaseTest_testSubj.generateUid_( uid, 'noAttr', opt_val )
    );
}

function test_zz_views_FEBaseTest_setNode( ){

    var elementName = 'span';
    var enableFocusHandlingAttr = 'enableFocusHandling';
    var enableKeyHandlingAttr = 'enableKeyHandling';
    var attrs = [

        enableFocusHandlingAttr
        ,enableKeyHandlingAttr
    ];

    var i = 0;
    var attributes = { };
    for( i = 0; i < attrs.length; i++ ){

        attributes[ attrs[ i ] ] = false;
    }

    var modelUid = 'modelUid';
    var model = {

        getUid: function( ){

            return modelUid;
        }
    };

    var controller = {

        enableFocusHandling: function( element ){

            element.setAttribute( enableFocusHandlingAttr, true );
        },

        enableKeyHandling: function( element ){

            element.setAttribute( enableKeyHandlingAttr, true );
        }
    }

    var idGenerator = goog.ui.IdGenerator.getInstance( );
    var nextUniqueId = 'nextUniqueId';
    stubs.replace(
        idGenerator,
        'getNextUniqueId',
        function( ){
            return nextUniqueId;
        }
    );

    stubs.replace(
        zz_views_FEBaseTest_testSubj.mvcRegistry_,
        'set',
        function( uid ){

            assertTrue(
                'Must start with ' + modelUid,
                goog.string.startsWith( uid, modelUid )
            );
        }
    );

    goog.object.forEach( zz.views.enums.FEBaseElementAttribute, function( attribute ){

        if( zz.views.enums.FEBaseElementAttribute.UID !== attribute ){

            attributes[ attribute ] = false;
        }
    } );

    var element = goog.dom.createDom(
        elementName,
        attributes
    );

    goog.define( 'goog.DEBUG', false );

    zz_views_FEBaseTest_testSubj.setNode_( model, element, controller );

    goog.object.forEach( zz.views.enums.FEBaseElementAttribute, function( attribute ){

        if( attribute === zz.views.enums.FEBaseElementAttribute.UID
            || attribute === zz.views.enums.FEBaseElementAttribute.CLASS
            || attribute === zz.views.enums.FEBaseElementAttribute.CONTROLLER
            || attribute === zz.views.enums.FEBaseElementAttribute.VIEW){

            assertTrue(
                'Must have an attribute ' + attribute,
                element.hasAttribute( attribute )
            )
        } else {

            assertFalse(
                'Must not have an attribute ' + attribute,
                element.hasAttribute( attribute )
            )
        }
    } );

    goog.object.forEach( attrs, function( attribute ){

        assertTrue(
            'Must have an attribute ' + attribute,
            element.hasAttribute( attribute )
        );
    } );

    element = goog.dom.createDom(
        elementName,
        attributes
    );

    goog.define( 'goog.DEBUG', true );

    zz_views_FEBaseTest_testSubj.setNode_( model, element, controller );

    goog.object.forEach( zz.views.enums.FEBaseElementAttribute, function( attribute ){

        if( attribute === zz.views.enums.FEBaseElementAttribute.UID
            || attribute === zz.views.enums.FEBaseElementAttribute.CLASS
            || attribute === zz.views.enums.FEBaseElementAttribute.CONTROLLER
            || attribute === zz.views.enums.FEBaseElementAttribute.VIEW){

            assertTrue(
                'Must have an attribute ' + attribute,
                element.hasAttribute( attribute )
            )
        } else {

            assertTrue(
                'Must have an attribute ' + attribute,
                element.hasAttribute( attribute )
            )
        }
    } );

    goog.object.forEach( attrs, function( attribute ){

        assertTrue(
            'Must have an attribute ' + attribute,
            element.hasAttribute( attribute )
        );
    } );

    var predefinedId = 'predefinedId';

    attributes = { };
    attributes[ zz.views.enums.FEBaseElementAttribute.UID ] = predefinedId;

    element = goog.dom.createDom(
        elementName,
        attributes
    );

    zz_views_FEBaseTest_testSubj.setNode_( model, element, controller );

    assertTrue(
        'Must have an attribute ' + zz.views.enums.FEBaseElementAttribute.UID,
        element.hasAttribute( zz.views.enums.FEBaseElementAttribute.UID )
    )

    element.removeAttribute( zz.views.enums.FEBaseElementAttribute.UID );

    assertFalse(
        'Must have no attributes ',
        element.hasAttributes( )
    )
}

function test_zz_views_FEBaseTest_getElementUid( ){

    var predefinedId = 'predefinedId';
    var elementName = 'span';
    var attributes = { };

    var element = goog.dom.createDom(
        elementName,
        attributes
    );

    assertFalse(
        'Expected certain value',
        zz_views_FEBaseTest_testSubj.getElementUid( element )
    );

    attributes = { };
    attributes[ zz.views.enums.FEBaseElementAttribute.UID ] = '';

    element = goog.dom.createDom(
        elementName,
        attributes
    );

    assertFalse(
        'Expected certain value',
        zz_views_FEBaseTest_testSubj.getElementUid( element )
    );

    attributes = { };
    attributes[ zz.views.enums.FEBaseElementAttribute.UID ] = predefinedId;

    element = goog.dom.createDom(
        elementName,
        attributes
    );

    assertEquals(

        'Expected certain value',
        predefinedId,
        zz_views_FEBaseTest_testSubj.getElementUid( element )
    );
}

function test_zz_views_FEBaseTest_getElementValue( ){

    var elementName = 'span';
    var text = 'text';
    var value = 'value';

    var element = goog.dom.createDom(
        elementName,
        undefined,
        text
    );

    assertEquals(

        'Expected certain value',
        text,
        zz_views_FEBaseTest_testSubj.getElementValue( element )
    );

    zz_views_FEBaseTest_testSubj.setElementValue( element, value );

    assertEquals(

        'Expected certain value',
        value,
        zz_views_FEBaseTest_testSubj.getElementValue( element )
    );

    zz_views_FEBaseTest_testSubj.setElementValue( element, null );

    assertEquals(

        'Expected certain value',
        '',
        zz_views_FEBaseTest_testSubj.getElementValue( element )
    );

    zz_views_FEBaseTest_testSubj.setElementValue( element, undefined );

    assertEquals(

        'Expected certain value',
        '',
        zz_views_FEBaseTest_testSubj.getElementValue( element )
    );

    zz_views_FEBaseTest_testSubj.setElementValue( element );

    assertEquals(

        'Expected certain value',
        '',
        zz_views_FEBaseTest_testSubj.getElementValue( element )
    );
}

function test_zz_views_FEBaseTest_setElementValue( ){

    var elementName = 'span';
    var value = 'value';

    var element = goog.dom.createDom(
        elementName
    );

    zz_views_FEBaseTest_testSubj.setElementValue( element, value );

    assertEquals(

        'Expected certain value',
        value,
        zz_views_FEBaseTest_testSubj.getElementValue( element )
    );

    zz_views_FEBaseTest_testSubj.setElementValue( element, null );

    assertEquals(

        'Expected certain value',
        '',
        zz_views_FEBaseTest_testSubj.getElementValue( element )
    );

    zz_views_FEBaseTest_testSubj.setElementValue( element, undefined );

    assertEquals(

        'Expected certain value',
        '',
        zz_views_FEBaseTest_testSubj.getElementValue( element )
    );

    zz_views_FEBaseTest_testSubj.setElementValue( element );

    assertEquals(

        'Expected certain value',
        '',
        zz_views_FEBaseTest_testSubj.getElementValue( element )
    );
}

function test_zz_views_FEBaseTest_isHoverHandled( ){

    var elementName = 'span';

    var element = goog.dom.createDom(
        elementName
    );

    assertFalse(
        'Expected certain value',
        zz_views_FEBaseTest_testSubj.isHoverHandled( element )
    );

    var uid = 'prefix_'
        + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
        + 'someAttr'
        + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
        + 'suffix';

    var attributes = { };
    attributes[ zz.views.enums.FEBaseElementAttribute.UID ] = uid;

    element = goog.dom.createDom(
        elementName,
        attributes
    );

    assertFalse(
        'Expected certain value',
        zz_views_FEBaseTest_testSubj.isHoverHandled( element )
    );

    uid = 'prefix_'
        + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
        + zz.views.enums.FEBaseElementAttributeCode.HOVER
        + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
        + 'suffix';

    attributes = { };
    attributes[ zz.views.enums.FEBaseElementAttribute.UID ] = uid;

    element = goog.dom.createDom(
        elementName,
        attributes
    );

    assertTrue(
        'Expected certain value',
        zz_views_FEBaseTest_testSubj.isHoverHandled( element )
    );
}

function test_zz_views_FEBaseTest_isActionHandled( ){

    var elementName = 'span';

    var element = goog.dom.createDom(
        elementName
    );

    assertFalse(
        'Expected certain value',
        zz_views_FEBaseTest_testSubj.isActionHandled( element )
    );

    var uid = 'prefix_'
        + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
        + 'someAttr'
        + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
        + 'suffix';

    var attributes = { };
    attributes[ zz.views.enums.FEBaseElementAttribute.UID ] = uid;

    element = goog.dom.createDom(
        elementName,
        attributes
    );

    assertFalse(
        'Expected certain value',
        zz_views_FEBaseTest_testSubj.isActionHandled( element )
    );

    uid = 'prefix_'
        + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
        + zz.views.enums.FEBaseElementAttributeCode.ACTION
        + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
        + 'suffix';

    attributes = { };
    attributes[ zz.views.enums.FEBaseElementAttribute.UID ] = uid;

    element = goog.dom.createDom(
        elementName,
        attributes
    );

    assertTrue(
        'Expected certain value',
        zz_views_FEBaseTest_testSubj.isActionHandled( element )
    );
}

function test_zz_views_FEBaseTest_getActionElement( ){

    var controller = undefined;
    var elementName = 'span';

    var element = goog.dom.createDom(
        elementName
    );

    assertNull(
        'Expected certain value',
        zz_views_FEBaseTest_testSubj.getActionElement( controller, element )
    );

    var uid = 'prefix_'
        + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
        + 'someAttr'
        + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
        + 'suffix';

    var attributes = { };
    attributes[ zz.views.enums.FEBaseElementAttribute.UID ] = uid;

    element = goog.dom.createDom(
        elementName,
        attributes
    );

    assertNull(
        'Expected certain value',
        zz_views_FEBaseTest_testSubj.getActionElement( controller, element )
    );

    uid = 'prefix_'
        + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
        + zz.views.enums.FEBaseElementAttributeCode.ACTION
        + zz_views_FEBaseTest_testSubj.getInternalSeparator( )
        + 'suffix';

    attributes = { };
    attributes[ zz.views.enums.FEBaseElementAttribute.UID ] = uid;

    element = goog.dom.createDom(
        elementName,
        attributes
    );

    assertEquals(

        'Expected certain value',
        element,
        zz_views_FEBaseTest_testSubj.getActionElement( controller, element )
    );

    var childElement = goog.dom.createDom(
        elementName
    );

    element = goog.dom.createDom(
        elementName,
        attributes,
        childElement
    );

    assertEquals(

        'Expected certain value',
        element,
        zz_views_FEBaseTest_testSubj.getActionElement( controller, childElement )
    );
}

function test_zz_views_FEBaseTest_attachElement( ){

    var elementName = 'span'.toLowerCase( );

    var element = goog.dom.createDom(   // 1 on top level 0
        elementName,
        undefined,
        [                               // 3 on next level 1
            goog.dom.createDom(
                elementName,
                undefined,
                [                       // 2 on next level 2
                    goog.dom.createDom(
                        elementName,
                        undefined,
                        [               // 1 on next level 3
                            goog.dom.createDom(
                                elementName
                            )
                        ]
                    ),
                    goog.dom.createDom(
                        elementName,
                        undefined,
                        [
                            goog.dom.createDom(
                                elementName
                            )
                        ]
                    )
                ]
            ),
            goog.dom.createDom(
                elementName,
                undefined,
                [
                    goog.dom.createDom(
                        elementName,
                        undefined,
                        [
                            goog.dom.createDom(
                                elementName
                            )
                        ]
                    ),
                    goog.dom.createDom(
                        elementName,
                        undefined,
                        [
                            goog.dom.createDom(
                                elementName
                            )
                        ]
                    )
                ]
            ),
            goog.dom.createDom(
                elementName,
                undefined,
                [
                    goog.dom.createDom(
                        elementName,
                        undefined,
                        [
                            goog.dom.createDom(
                                elementName
                            )
                        ]
                    ),
                    goog.dom.createDom(
                        elementName,
                        undefined,
                        [
                            goog.dom.createDom(
                                elementName
                            )
                        ]
                    )
                ]
            )
        ]
    );

    var expectedCount = 1 + ( 1 * 3 ) + ( 3 * 2 ) + ( ( 3 * 2 ) * 1 ); // = 1 + 3 + 6 + 6 = 16
    var count = 0;

    stubs.replace(
        zz_views_FEBaseTest_testSubj,
        'setNode_',
        function( datarow, element, controller ){

            assertEquals(

                'Must be an Element',
                elementName,
                element.nodeName.toLowerCase( )
            );

            count++;
        }
    );

    zz_views_FEBaseTest_testSubj.attachElement_( undefined, element, undefined );

    assertEquals(

        'Not all elements were processed in the tree',
        expectedCount,
        count
    );
}

function test_zz_views_FEBaseTest_detachElement( ){

    var elementName = 'span'.toLowerCase( );
    var attributes = { };
    attributes[ zz.views.enums.FEBaseElementAttribute.CONTROLLER ] = true;
    var uid = 'id1'
        + zz.views.enums.FEBaseUidSeparator.EXTERNAL
        + 'id2'
        + zz.views.enums.FEBaseUidSeparator.EXTERNAL
        + 'id3';

    var countGetElementUid = 0;
    var countDisposed = 0;
    var countDeleted = 0;

    var node = {

        controller: {

            dispose: function( ){

                countDisposed++;
            }
        }
    }

    stubs.replace(
        zz_views_FEBaseTest_testSubj,
        'getElementUid',
        function( element ){

            assertEquals(

                'Must be an Element',
                elementName,
                element.nodeName.toLowerCase( )
            );

            countGetElementUid++;

            return uid;
        }
    );

    stubs.replace(
        zz_views_FEBaseTest_testSubj.mvcRegistry_,
        'get',
        function( uid ){

            return node;
        }
    );

    stubs.replace(
        zz_views_FEBaseTest_testSubj.mvcRegistry_,
        'delete',
        function( uid ){

            countDeleted++;
        }
    );

    var element = goog.dom.createDom(   // 1 on top level 0
        elementName,
        undefined,
        [                               // 3 on next level 1
            goog.dom.createDom(
                elementName,
                attributes,             // has controller attribute
                [                       // 2 on next level 2
                    goog.dom.createDom(
                        elementName,
                        undefined,
                        [               // 1 on next level 3
                            goog.dom.createDom(
                                elementName
                            )
                        ]
                    ),
                    goog.dom.createDom(
                        elementName,
                        undefined,
                        [
                            goog.dom.createDom(
                                elementName
                            )
                        ]
                    )
                ]
            ),
            goog.dom.createDom(
                elementName,
                attributes,             // has controller attribute
                [
                    goog.dom.createDom(
                        elementName,
                        undefined,
                        [
                            goog.dom.createDom(
                                elementName
                            )
                        ]
                    ),
                    goog.dom.createDom(
                        elementName,
                        undefined,
                        [
                            goog.dom.createDom(
                                elementName
                            )
                        ]
                    )
                ]
            ),
            goog.dom.createDom(
                elementName,
                attributes,             // has controller attribute
                [
                    goog.dom.createDom(
                        elementName,
                        undefined,
                        [
                            goog.dom.createDom(
                                elementName
                            )
                        ]
                    ),
                    goog.dom.createDom(
                        elementName,
                        undefined,
                        [
                            goog.dom.createDom(
                                elementName
                            )
                        ]
                    )
                ]
            )
        ]
    );

    var expectedCountGetElementUid = 16; // actually 19
    var expectedCountDisposed = 3; // is exact number of elements with controller attribute
    var expectedCountDeleted = expectedCountGetElementUid
        + ( expectedCountGetElementUid * uid.split( zz.views.enums.FEBaseUidSeparator.EXTERNAL).length );

    zz_views_FEBaseTest_testSubj.detachElement_( element );

    assertTrue(

        'Not all elements were processed in the tree',
        countGetElementUid >= expectedCountGetElementUid
    );

    assertEquals(

        'Not all elements were disposed',
        expectedCountDisposed,
        countDisposed
    );

    assertEquals(

        'Not all elements were deleted',
        expectedCountDeleted,
        countDeleted
    );
}

function test_zz_views_FEBaseTest_createDatarowElements( ){

    var expectedIndex = 5;
    var foundIndex = undefined;

    var datarow = {

        getUid: function( ){

            return expectedIndex;
        }
    };

    var dataset = {

        index: undefined,
        firstDatarow: function( ){

            this.index = 0;
        },
        currentDatarow: function( ){

            var self = this;
            return {

                getUid: function( ){

                    return self.index;
                }
            };
        },
        nextDatarow: function( ){

            this.index++;
            if( this.index > expectedIndex * 2 ){

                return false;
            }
            return true;
        },
        getUid: function( ){

            return null;
        }
    };

    stubs.replace(
        zz_views_FEBaseTest_testSubj.mvcRegistry_,
        'get',
        function( ){

            return {

                elements: [ goog.dom.createDom( 'span' ) ],
                controller: null
            };
        }
    );

    stubs.replace(
        soy,
        'renderAsElement',
        function( ){

            return null;
        }
    );

    stubs.replace(
        goog.dom,
        'insertChildAt',
        function( datasetElement, datarowElement, index ){

            foundIndex = index;
        }
    );

    stubs.replace(
        zz_views_FEBaseTest_testSubj,
        'setNode_',
        function( ){ }
    );

    zz_views_FEBaseTest_testSubj.createDatarowElements_( dataset, datarow );

    assertEquals(

        'Expected certain value',
        expectedIndex,
        foundIndex
    );
}

function test_zz_views_FEBaseTest_createModelElements( ){

    var isMvcRegistryGet = false;
    var isSoyRenderAsElement = false;
    var isGoogDomAppendChild = false;
    var isAttachElement = false;

    var datarow = {

        getUid: function( ){

            return null;
        }
    };

    var dataset = {

        getUid: function( ){

            return null;
        }
    };

    stubs.replace(
        zz_views_FEBaseTest_testSubj.mvcRegistry_,
        'get',
        function( ){

            isMvcRegistryGet = true;

            return {

                elements: [ goog.dom.createDom( 'span' ) ],
                controller: {

                    getModel: function( ){

                        return {

                            datafield: null
                        }
                    }
                }
            };
        }
    );

    stubs.replace(
        soy,
        'renderAsElement',
        function( ){

            isSoyRenderAsElement = true;
            return null;
        }
    );

    stubs.replace(
        goog.dom,
        'appendChild',
        function( ){

            isGoogDomAppendChild = true;
        }
    );

    stubs.replace(
        zz_views_FEBaseTest_testSubj,
        'attachElement_',
        function( ){

            isAttachElement = true;
        }
    );

    zz_views_FEBaseTest_testSubj.createModelElements_( dataset, datarow );

    assertEquals(

        'Expected using a chain of methods',
        true,
        isMvcRegistryGet && isSoyRenderAsElement && isGoogDomAppendChild && isAttachElement
    );
}

function test_zz_views_FEBaseTest_updateElementsClasses( ){

    var elementName = 'span'.toLowerCase( );
    var i = 1;
    var fieldCount = 4;

    var dataset = {

        datafield: { }
    };

    var datarow = {

        getUid: function( ){

            return 'datarowUid';
        }
    };

    for( i = 1; i <= fieldCount; i++ ){

        dataset.datafield[ 'field' + i ] = 'field' + i;

        if( i % 2 ){

            datarow[ 'field' + i ] = 'field' + i;
        }
    }

    i = 0;
    var j = 0;
    var elementsArray;
    var element;
    var nodes = { };

    for( var field in dataset.datafield ){

        var attributes = { };
        attributes[ zz.views.enums.FEBaseElementAttribute.CLASS ] = 'prefix'
            + field
            + zz.views.enums.FEBaseUidSeparator.CLASS_INTERNAL
            + 'className1'
            + zz.views.enums.FEBaseUidSeparator.CLASS_EXTERNAL
            + 'className2'
            + zz.views.enums.FEBaseUidSeparator.CLASS_EXTERNAL
            + 'className3';

        elementsArray = [ ];
        for( j = 0; j < 3; j++ ){

            element = goog.dom.createDom(
                elementName,
                attributes
            );
            if( i % 2 ){

                goog.dom.classlist.add( element, 'className1' );
            }

            elementsArray.push( element );
        }

        nodes[
            datarow.getUid( )
            + zz.views.enums.FEBaseUidSeparator.INTERNAL
            + zz.views.enums.FEBaseElementAttributeCode.CLASS
            + zz.views.enums.FEBaseUidSeparator.INTERNAL
            + field

        ] = {

            model: undefined,
            controller: undefined,
            elements: elementsArray
        };

        i++;
    }

    stubs.replace(
        zz_views_FEBaseTest_testSubj.mvcRegistry_,
        'get',
        function( uid ){

            return nodes[ uid ];
        }
    );

    zz_views_FEBaseTest_testSubj.updateElementsClasses_( dataset, datarow );

    for( i = 1; i <= fieldCount; i++ ){

        elementsArray = nodes[
            datarow.getUid( )
                + zz.views.enums.FEBaseUidSeparator.INTERNAL
                + zz.views.enums.FEBaseElementAttributeCode.CLASS
                + zz.views.enums.FEBaseUidSeparator.INTERNAL
                + 'field'
                + i

        ][ 'elements' ];

        for( j = 0; j < elementsArray.length; j++ ){

            element = elementsArray[ j ];

            if( i % 2 ){

                assertTrue(

                    'Element must contain class',
                    goog.dom.classlist.contains( element, 'className1' )
                );
            } else {

                assertFalse(

                    'Element must not contain class',
                    goog.dom.classlist.contains( element, 'className1' )
                );
            }
        }
    }
}

function test_zz_views_FEBaseTest_createElementsControllers( ){

    var elementName = 'span'.toLowerCase( );
    var i = 1;
    var fieldCount = 4;
    var rootControllers = { };

    var dataset = {

        datafield: { },
        getDatarowSchema: function( ){

            var datarowSchema = { };
            for( var f in this.datafield ){

                datarowSchema[ f ] = {

                    type: function( ){ }
                };
            }
            return datarowSchema;
        }
    };

    var datarow = {

        getUid: function( ){

            return 'datarowUid';
        }
    };

    var expectedRendered = 0;
    var factRendered = 0;

    for( i = 1; i <= fieldCount; i++ ){

        dataset.datafield[ 'field' + i ] = 'field' + i;

        rootControllers[ 'field' + i ] = new goog.ui.Component( );
        stubs.replace(
            rootControllers[ 'field' + i ],
            'render',
            function( ){

                factRendered++;
            }
        );
    }

    i = 0;
    var j = 0;
    var elementsArray;
    var element;
    var nodes = { };

    for( var field in dataset.datafield ){

        var attributes = { };
        attributes[ zz.views.enums.FEBaseElementAttribute.VIEW ] = 'viewName';
        attributes[ zz.views.enums.FEBaseElementAttribute.CONTROLLER ] = field;

        elementsArray = [ ];
        for( j = 0; j < 3; j++ ){

            element = goog.dom.createDom(
                elementName,
                attributes
            );

            elementsArray.push( element );
            expectedRendered++;
        }

        var controller = new goog.ui.Component( );

        nodes[
            datarow.getUid( )
                + zz.views.enums.FEBaseUidSeparator.INTERNAL
                + zz.views.enums.FEBaseElementAttributeCode.MODEL
                + zz.views.enums.FEBaseUidSeparator.INTERNAL
                + field

            ] = {

            model: undefined,
            controller: controller,
            elements: elementsArray
        };

        assertFalse(

            'Node controller must not have its child controllers before',
            controller.hasChildren( )
        );

        i++;
    }

    stubs.replace(
        zz_views_FEBaseTest_testSubj.mvcRegistry_,
        'get',
        function( uid ){

            return nodes[ uid ];
        }
    );

    stubs.replace(
        zz.environment.services.MVCRegistry,
        'getView',
        function( viewName ){

            return viewName; // no matter what it is
        }
    );

    stubs.replace(
        zz.environment.services.MVCRegistry,
        'getController',
        function( controllerName, field, view ){

            return rootControllers[ controllerName ];
        }
    );

    zz_views_FEBaseTest_testSubj.createElementsControllers_( dataset, datarow );

    for( i = 1; i <= fieldCount; i++ ){

        var node = nodes[
            datarow.getUid( )
                + zz.views.enums.FEBaseUidSeparator.INTERNAL
                + zz.views.enums.FEBaseElementAttributeCode.MODEL
                + zz.views.enums.FEBaseUidSeparator.INTERNAL
                + 'field'
                + i

        ];

        var nodeController = node.controller;

        assertTrue(

            'Node controller must have its child field controllers',
            nodeController.hasChildren( )
        );
        assertFalse(

            'Field controller must not have its child controllers and must be as is',
            rootControllers[ 'field' + i ].hasChildren( )
        );
    }

    assertEquals(

        'Expected certain number of elements are rendered',
        expectedRendered,
        factRendered
    );
}

function test_zz_views_FEBaseTest_createDom( ){

    var controller = {

        getModel: function( ){

            return this.model;
        },

        model: {

            getUid: function( ){

                return 'modelUid';
            },

            datarows : [ 1, 2, 3, 4 ],
            currentDatarow: -1,

            firstDatarow: function( ){

                this.currentDatarow = 0;
                return this.datarows[ this.currentDatarow ];
            },

            nextDatarow: function( ){

                this.currentDatarow++;
                if( this.currentDatarow >= this.datarows.length ){

                    return false;
                } else {

                    return this.datarows[ this.currentDatarow ];
                }
            }
        }
    };

    var expectedDatasetElement = { };
    var isSetNode = false;
    var countCreateDatarowElements = 0;
    var countCreateModelElements = 0;
    var countUpdateElementsClasses = 0;
    var countCreateElementsControllers = 0;

    var expectedCount = controller.model.datarows.length;

    stubs.replace(
        soy,
        'renderAsElement',
        function( ){

            return expectedDatasetElement;
        }
    );
    stubs.replace(
        zz_views_FEBaseTest_testSubj,
        'setNode_',
        function( ){

            isSetNode = true;
        }
    );
    stubs.replace(
        zz_views_FEBaseTest_testSubj,
        'createDatarowElements_',
        function( ){

            countCreateDatarowElements++;
        }
    );
    stubs.replace(
        zz_views_FEBaseTest_testSubj,
        'createModelElements_',
        function( ){

            countCreateModelElements++;
        }
    );
    stubs.replace(
        zz_views_FEBaseTest_testSubj,
        'updateElementsClasses_',
        function( ){

            countUpdateElementsClasses++;
        }
    );
    stubs.replace(
        zz_views_FEBaseTest_testSubj,
        'createElementsControllers_',
        function( ){

            countCreateElementsControllers++;
        }
    );

    var factDatasetElement = zz_views_FEBaseTest_testSubj.createDom( controller );

    assertTrue(

        'Must return element that was given by soy.renderAsElement',
        factDatasetElement === expectedDatasetElement
    );
    assertTrue(

        'Expected calling setNode_ in chain',
        isSetNode
    );
    assertEquals(

        'Expected creation datarows elements for each datarow',
        expectedCount,
        countCreateDatarowElements
    );
    assertEquals(

        'Expected creation model element for each datarow',
        expectedCount,
        countCreateModelElements
    );
    assertEquals(

        'Expected updating classes for each datarow',
        expectedCount,
        countUpdateElementsClasses
    );
    assertEquals(

        'Expected updating controllers for each datarow',
        expectedCount,
        countCreateElementsControllers
    );
}

function test_zz_views_FEBaseTest_renderDatarow( ){

    var message = {

        dataset: undefined,
        datarow: {

            getUid: function( ){ }
        }
    };

    var isCreateDatarowElements = false;
    var isCreateModelElements = false;
    var isUpdateElementsClasses = false;
    var isCreateElementsControllers = false;

    stubs.replace(
        zz_views_FEBaseTest_testSubj,
        'createDatarowElements_',
        function( ){

            isCreateDatarowElements = true;
        }
    );
    stubs.replace(
        zz_views_FEBaseTest_testSubj,
        'createModelElements_',
        function( ){

            isCreateModelElements = true;
        }
    );
    stubs.replace(
        zz_views_FEBaseTest_testSubj,
        'updateElementsClasses_',
        function( ){

            isUpdateElementsClasses = true;
        }
    );
    stubs.replace(
        zz_views_FEBaseTest_testSubj,
        'createElementsControllers_',
        function( ){

            isCreateElementsControllers = true;
        }
    );

    var expectedElement = 'someElement';

    stubs.replace(
        zz_views_FEBaseTest_testSubj.mvcRegistry_,
        'get',
        function( ){

            return {

                elements: [ expectedElement ]
            };
        }
    );

    var actualElement = zz_views_FEBaseTest_testSubj.renderDatarow( message );

    assertTrue(

        'Expected calling createDatarowElements_ in chain',
        isCreateDatarowElements
    );
    assertTrue(

        'Expected calling createModelElements_ in chain',
        isCreateModelElements
    );
    assertTrue(

        'Expected calling updateElementsClasses_ in chain',
        isUpdateElementsClasses
    );
    assertTrue(

        'Expected calling createElementsControllers_ in chain',
        isCreateElementsControllers
    );
    assertEquals(

        'Expected return certain datarow element',
        expectedElement,
        actualElement
    );
}

function test_zz_views_FEBaseTest_removeDatarow( ){

    var message = {

        datarow: {

            getUid: function( ){ }
        }
    };

    var childElement = goog.dom.createDom( 'span' );
    var parentElement = goog.dom.createDom(
        'span',
        undefined,
        [ childElement ]
    );

    assertTrue(

        'Parent element must have its child node before',
        parentElement.hasChildNodes( )
    );

    stubs.replace(
        zz_views_FEBaseTest_testSubj.mvcRegistry_,
        'get',
        function( ){

            return {

                elements: [ childElement ]
            };
        }
    );

    zz_views_FEBaseTest_testSubj.removeDatarow( message );

    assertFalse(

        'Parent element must not have its child node after',
        parentElement.hasChildNodes( )
    );
}

function test_zz_views_FEBaseTest_updateDatarow( ){

    var elementName = 'span';
    var oldValue = 'oldValue';
    var newValue = 'newValue';

    var message = {

        datarow: {

            getUid: function( ){

                return 'datarowUid';
            }
        },
        datafield: 'datafield',
        new_value: newValue
    };

    var attributes = { };
    attributes[ 'title' ] = 'value'; // we must use a valid attribute for span

    var modelNode = {

        elements: [
            goog.dom.createDom( elementName, attributes, oldValue )
            ,goog.dom.createDom( elementName, attributes, oldValue )
        ],
        controller: null
    };
    var inputNode = {

        elements: [
            goog.dom.createDom( elementName, attributes, oldValue )
            ,goog.dom.createDom( elementName, attributes, oldValue )
        ],
        controller: null
    };

    var className = 'className';
    attributes = { };
    attributes[ 'title' ] = 'class';
    attributes[ zz.views.enums.FEBaseElementAttribute.CLASS ] = 'prefix'
        + message.datafield
        + zz.views.enums.FEBaseUidSeparator.CLASS_INTERNAL
        + className
        + zz.views.enums.FEBaseUidSeparator.CLASS_EXTERNAL
        + 'suffix';

    var classNode = {

        elements: [
            goog.dom.createDom( elementName, attributes, oldValue )
            ,goog.dom.createDom( elementName, attributes, oldValue )
        ],
        controller: null
    };

    var nodes = { };
    nodes[
        message.datarow.getUid( ) +
            zz.views.enums.FEBaseUidSeparator.INTERNAL +
            zz.views.enums.FEBaseElementAttributeCode.MODEL +
            zz.views.enums.FEBaseUidSeparator.INTERNAL +
            message.datafield
    ] = modelNode;
    nodes[
        message.datarow.getUid( ) +
            zz.views.enums.FEBaseUidSeparator.INTERNAL +
            zz.views.enums.FEBaseElementAttributeCode.INPUT +
            zz.views.enums.FEBaseUidSeparator.INTERNAL +
            message.datafield
    ] = inputNode;
    nodes[
        message.datarow.getUid( ) +
            zz.views.enums.FEBaseUidSeparator.INTERNAL +
            zz.views.enums.FEBaseElementAttributeCode.CLASS +
            zz.views.enums.FEBaseUidSeparator.INTERNAL +
            message.datafield
    ] = classNode;

    var node;
    var elements;
    var element;
    var i = 0;
    for( node in nodes ){

        elements = nodes[ node ].elements;
        for( i = 0; i < elements.length; i++ ){

            element = elements[ i ];

            if( 'value' === element.getAttribute( 'title' ) ){

                assertEquals(

                    'Expected old value for element before',
                    oldValue,
                    goog.dom.getTextContent( element )
                );
            }
            if( 'class' === element.getAttribute( 'title' ) ){

                assertFalse(

                    'Element must not contain class before',
                    goog.dom.classlist.contains( element, className )
                );
            }
        }
    }

    stubs.replace(
        zz_views_FEBaseTest_testSubj.mvcRegistry_,
        'get',
        function( uid ){

            return nodes[ uid ];
        }
    );

    zz_views_FEBaseTest_testSubj.updateDatarow( message );

    for( node in nodes ){

        elements = nodes[ node ].elements;
        for( i = 0; i < elements.length; i++ ){

            element = elements[ i ];

            if( 'value' === element.getAttribute( 'title' ) ){

                assertEquals(

                    'Expected new value for element after',
                    newValue,
                    goog.dom.getTextContent( element )
                );
            }
            if( 'class' === element.getAttribute( 'title' ) ){

                assertTrue(

                    'Element must contain class after',
                    goog.dom.classlist.contains( element, className )
                );
            }
        }
    }

    message.new_value = undefined;

    zz_views_FEBaseTest_testSubj.updateDatarow( message );

    for( node in nodes ){

        elements = nodes[ node ].elements;
        for( i = 0; i < elements.length; i++ ){

            element = elements[ i ];

            if( 'value' === element.getAttribute( 'title' ) ){

                assertEquals(

                    'Expected empty value for element after',
                    '',
                    goog.dom.getTextContent( element )
                );
            }
            if( 'class' === element.getAttribute( 'title' ) ){

                assertFalse(

                    'Element must not contain class after',
                    goog.dom.classlist.contains( element, className )
                );
            }
        }
    }
}