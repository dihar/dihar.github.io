# \<style-updater\>

style updater allows update custom properties when some events fire 

## Install with bower

```
bower i style-updater -S
``` 

## Demo and docs

[Component page](https://dihar.github.io/components/style-updater)

## Examples

1. Import component

	```html
		<link rel="import" href="path/to/folder/style-updater.html">
	```
2. Create wrapper \<div\> to area, you like listen

	```html
		<div class="wrapper" is="style-updater">
			<some-component></some-component>
			<some-component></some-component>
			<some-component></some-component>
			<some-component></some-component>
		</div>
	```
3. Add target attribute. It`s can be any css selector. Target find elements, wich styles will be update

	```html
		<div class="wrapper" is="style-updater" target="some-component">
			<some-component></some-component>
			<some-component></some-component>
			<some-component></some-component>
			<some-component></some-component>
		</div>
	```
4. And add listeners, like "element-selector:event, element-selector2:event2:event3". You can use any css selectors and keyword 'this'.

	```html
		<div class="wrapper" is="style-updater" target="some-component" events="this:mousemove, some-component:click|touchend">
			<some-component></some-component>
			<some-component></some-component>
			<some-component></some-component>
			<some-component></some-component>
		</div>
	```
5. Now you can use custom properties like native styles, wich will be changes 'on-life'

	```html
		<dom-module id="shared styles">
			<template>
				<style>
					some-component{
						--some-component-color: #fff;
					}
					some-component:hover{
						--some-component-color: #777;
					}
					some-component:cheched + some-component{
						--some-component-color: #aaa;
					}
				</style>
			</template>
		</dom-module>
		<style is="shared styles"></style>
		<div class="wrapper" is="style-updater" target="some-component" events="this:mousemove, some-component:click">
			<some-component></some-component>
			<some-component></some-component>
			<some-component></some-component>
			<some-component></some-component>
		</div>
	```
6. I'm waiting yours pull-requests =)

# simple-controller-behavior

this behavior create add to element simple dispatcher, which can find, watch and controll elements

## Examples

1. Import component

	```html
		<link rel="import" href="path/to/folder/simple-controller-behavior.html">
	```
2. Add controller to behaviors

	```javascript
		behaviors:[
		  DiharBehaviors.SimpleControllerBehavior
		],
	```
3. Add property 'list' with structure like

	```javascript
		properties: {
			list: {
				type: Array,
				value: function(){
					return [
			          {						
			            name: 'button',
			            selector: '.main-button',
			            required: false,
			            several: false,
			            listeners: {
			              toControler: 'buttonHandler'
			            },
			            initial: {
			              disabled: true
			            }
			          },
			          {
			            name: 'checkbox',
			            selector: '.main-checkbox',
			            required: true,
			            several: true,
			            listeners: {
			              tap: 'changeCheck'
			            },
			            initial: {
			              checked: true,
			              disabled: false
			            }
			          }
		           ];			
				}
			}
		}
	```
4. When alement is attached run `var states = activateController()`, in `states` available all data from controller
5. You can add some elements with `addElementToController(config)`, where `config` is object like `list` (see step 3.) item
6. You can add initial states in `list` property if `several: true`, like:

	```
		initial: {
		  disabled: [
			true, false, true
		  ]
		}
	```
	if elements count more than in Array, other elements take value of first item of Array

### Thank You!