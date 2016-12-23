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

goog.require( 'zz.views.FEBase' );

//goog.require( 'goog.events.EventTarget' );


var testSubj;
//var storageElement;
//var model;
//var controller;
//var elements;

function setUp( ){

    testSubj = new zz.views.FEBase( );
//    model = 'model';
//    controller = 'controller';
//    elements = [ 'element1', 'element2' ];
//    storageElement = {
//
//        model: model,
//        controller: controller,
//        elements: elements
//    };
}


function testConstructor( ){

    assertTrue(

        'Instance must be non-null and have the expected type',
        testSubj instanceof zz.views.FEBase
    );
}

//function testInheritance( ){
//
//    assertTrue(
//
//        'Instance must be non-null and have the expected type',
//        testSubj instanceof goog.events.EventTarget
//    );
//}
//
//function testStorage( ){
//
//    assertTrue(
//
//        'Property must to have a type of Object',
//        goog.isObject( testSubj.storage_ )
//    );
//}
//
//function testControllers( ){
//
//    assertTrue(
//
//        'Property must to have a type of Object',
//        goog.isObject( zz.environment.services.MVCRegistry.controllers_ )
//    );
//}
//
//function testViews( ){
//
//    assertTrue(
//
//        'Property must to have a type of Object',
//        goog.isObject( zz.environment.services.MVCRegistry.views_ )
//    );
//}
//
//function testSet( ){
//
//    var uid = 'uid1';
//    testSubj.set( uid, model, controller, elements );
//
//    assertObjectEquals(
//
//        'Instance must have an element in the storage_ property that is equals the object with properties from passed parameters',
//        storageElement,
//        testSubj.storage_[ uid ]
//    )
//
//    var elements2 = [ 'element3' ];
//    testSubj.set( uid, undefined, undefined, elements2 );
//
//    assertObjectNotEquals(
//
//        'The element in the storage_ property must had to change after recall with the same uid',
//        storageElement,
//        testSubj.storage_[ uid ]
//    )
//
//    storageElement.elements = storageElement.elements.concat( elements2 );
//
//    assertObjectEquals(
//
//        'The element in the storage_ property must had to change properly after recall with the same uid',
//        storageElement,
//        testSubj.storage_[ uid ]
//    )
//}
//
//function testGet( ){
//
//    var uid = 'uid2';
//    testSubj.set( uid, model, controller, elements );
//
//    assertObjectEquals(
//
//        'Must have to return existed element',
//        storageElement,
//        testSubj.get( uid )
//    )
//
//    assertFalse(
//
//        'Expected false for not existed uid',
//        testSubj.get( 'notExistedUID' )
//    );
//}
//
//function testDelete( ){
//
//    var uid = 'uid3';
//    testSubj.set( uid, model, controller, elements );
//    var element = testSubj.get( uid );
//    var result = testSubj.delete( uid );
//
//    assertNotContains(
//
//        'Must have to does not contain deleted element',
//        element,
//        testSubj.storage_
//    );
//
//    assertTrue(
//
//        'Expected true for return value',
//        result
//    );
//
//    result = testSubj.delete( 'notExistedUID' );
//
//    assertFalse(
//
//        'Expected false for return value if uid is not exists',
//        result
//    );
//}
//
//function testSetView( ){
//
//    var name = undefined;
//    var ctor = undefined;
//    var expectedError = 'Error: Invalid view name: ' + name;
//    var funWrapper = function( ){
//
//        zz.environment.services.MVCRegistry.setView( name, ctor );
//    };
//
//    var exception = assertThrows(
//
//        'Expected exception',
//        funWrapper
//    );
//
//    assertEquals(
//
//        'Expected properly exception',
//        expectedError,
//        exception.toString( )
//    );
//
//    name = 'viewName';
//    expectedError = 'Error: Invalid view constructor function: ' + ctor;
//
//    exception = assertThrows(
//
//        'Expected exception',
//        funWrapper
//    );
//
//    assertEquals(
//
//        'Expected properly exception',
//        expectedError,
//        exception.toString( )
//    );
//
//    ctor = { };
//    expectedError = 'Error: Invalid view constructor function: ' + ctor.toString( );
//
//    exception = assertThrows(
//
//        'Expected exception',
//        funWrapper
//    );
//
//    assertEquals(
//
//        'Expected properly exception',
//        expectedError,
//        exception.toString( )
//    );
//
//    ctor = function( ){ this.p = 1; };
//
//    assertNotThrows(
//
//        'Expected no exceptions',
//        funWrapper
//    );
//
//    assertObjectEquals(
//
//        'Must have to register view',
//        ctor,
//        zz.environment.services.MVCRegistry.views_[ name ]
//    );
//}
//
//function testSetController( ){
//
//    var name = undefined;
//    var ctor = undefined;
//    var expectedError = 'Error: Invalid controller name: ' + name;
//    var funWrapper = function( ){
//
//        zz.environment.services.MVCRegistry.setController( name, ctor );
//    };
//
//    var exception = assertThrows(
//
//        'Expected exception',
//        funWrapper
//    );
//
//    assertEquals(
//
//        'Expected properly exception',
//        expectedError,
//        exception.toString( )
//    );
//
//    name = 'controllerName';
//    expectedError = 'Error: Invalid controller constructor function: ' + ctor;
//
//    exception = assertThrows(
//
//        'Expected exception',
//        funWrapper
//    );
//
//    assertEquals(
//
//        'Expected properly exception',
//        expectedError,
//        exception.toString( )
//    );
//
//    ctor = { };
//    expectedError = 'Error: Invalid controller constructor function: ' + ctor.toString( );
//
//    exception = assertThrows(
//
//        'Expected exception',
//        funWrapper
//    );
//
//    assertEquals(
//
//        'Expected properly exception',
//        expectedError,
//        exception.toString( )
//    );
//
//    ctor = function( ){ this.p = 1; };
//
//    assertNotThrows(
//
//        'Expected no exceptions',
//        funWrapper
//    );
//
//    assertObjectEquals(
//
//        'Must have to register controller',
//        ctor,
//        zz.environment.services.MVCRegistry.controllers_[ name ]
//    );
//}
//
//function testGetView( ){
//
//    var name = 'noName';
//    var ctor = function( ){ this.p = 1; };
//    ctor[ 'getInstance' ] = function( ){
//
//        return this;
//    };
//
//    assertNull(
//
//        'Expected null',
//        zz.environment.services.MVCRegistry.getView( name )
//    );
//
//    name = 'viewName2';
//    zz.environment.services.MVCRegistry.setView( name, ctor );
//
//    assertObjectEquals(
//
//        'Expect object that was passed by setView',
//        ctor,
//        zz.environment.services.MVCRegistry.getView( name )
//    );
//}
//
//function testGetController( ){
//
//    var name = 'noName';
//    var model = 'model';
//    var view = 'view';
//    var ctor = function( model, view ){
//
//        return {
//
//            model: model,
//            view: view
//        };
//    };
//
//    assertNull(
//
//        'Expected null',
//        zz.environment.services.MVCRegistry.getController( name )
//    );
//
//    name = 'controllerName2';
//    zz.environment.services.MVCRegistry.setController( name, ctor );
//
//    assertObjectEquals(
//
//        'Expect object that was passed by setController',
//        ctor( model, view ),
//        zz.environment.services.MVCRegistry.getController( name, model, view )
//    );
//}