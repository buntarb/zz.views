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
 * @fileoverview Provide zz.environment.enums.ViewElementAttribute.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.views.enums.FEBaseElementAttribute' );
goog.provide( 'zz.views.enums.FEBaseElementAttributeCode' );

/**
 * Constants for supported views elements attributes.
 * @enum {string}
 */
zz.views.enums.FEBaseElementAttribute = {

	UID: 'data-uid',
	SET: 'data-set',
	ROW: 'data-row',
	SCROLL: 'data-scroll',
	HOVER: 'data-hover',
	FOCUS: 'data-focus',
	BLUR: 'data-blur',
	KEY: 'data-key',
	INPUT: 'data-input',
	ACTION: 'data-action',
	CLASS: 'data-class',
	MODEL: 'data-model',
	VIEW: 'data-view',
	CONTROLLER: 'data-controller'
};

/**
 * Codes for supported views elements attributes.
 * @enum {string}
 */
zz.views.enums.FEBaseElementAttributeCode = {

	UID: '0',
	SET: '1',
	ROW: 'a',
	MODEL: 'b',
	INPUT: 'c',
	FOCUS: 'd',
	BLUR: '4',
	KEY: 'g',
	ACTION: 'e',
	SCROLL: 'f',
	HOVER: '5',
	CLASS: '8',
	VIEW: '2',
	CONTROLLER: '3'
};