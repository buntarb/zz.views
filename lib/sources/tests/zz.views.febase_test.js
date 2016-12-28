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
goog.require( 'goog.ui.ControlRenderer' );
goog.require( 'zz.environment.services.Environment' );
goog.require( 'zz.environment.services.MVCRegistry' );
goog.require( 'zz.views.templates.default.model' );


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
        zz_views_FEBaseTest_testSubj.model_soy_,
        zz.views.templates.default.model
    );
}