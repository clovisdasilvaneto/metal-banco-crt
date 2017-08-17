"use strict";

export function DropdownSwit(Dropdown, dependencies){
	let dom = dependencies.dom;
	
	describe('Dropdown', ()=>{
		it('should be a dropdown instance', ()=>{
			let dropdown = new Dropdown();
			
			assert.equal(dropdown instanceof Dropdown, true);
		});
		
		it('should return the main actions elements of the dropdown', ()=> {
			let dropdown = new Dropdown(),
				searchInput = dropdown.element.querySelector('.dropdown-input'),
				dropdownList = dropdown.element.querySelector('.dropdown-list'),
				dropdownItem = dropdown.element.querySelector('.dropdown-list-item'),
				dropdownDisplay = dropdown.element.querySelector('.dropdown-display');
			
			assert.notEqual(searchInput, null);
			assert.notEqual(dropdownList, null);
			assert.notEqual(dropdownItem, null);
			assert.notEqual(dropdownDisplay, null);
		});
		
		it('should display the dropdown wrapper, when click in the dropdown display', (done)=> {
			let dropdown = new Dropdown(),
				dropdownWrapper;
			
			dom.triggerEvent(dropdown.element.querySelector('.dropdown-display'), 'click');
			dropdown.once('stateSynced', () => {
				dropdownWrapper = dropdown.element.querySelector('.dropdown-list-wrapper');
				assert.equal(dropdownWrapper.classList.contains('show'), true);
				
				done();
			});
		});
		
		it('should return the active plan in months display', (done)=> {
			let dropdown = new Dropdown();
			let dropdownTestedItem = dropdown.element.querySelector('.dropdown-list-item');
			
			dom.triggerEvent(dropdown.element.querySelector('.dropdown-display'), 'click');
			dom.triggerEvent(dropdown.element.querySelector('.dropdown-input'), 'click');
			dom.triggerEvent(dropdownTestedItem, 'click');
			
			dropdown.once('stateSynced', () => {
				assert.equal(dropdownTestedItem.getAttribute('data-id'), dropdown.activeDropdownItem.id);
				done();
			});
		});
		
		it('should return the item that corresponds the user search', (done)=> {
			let dropdown = new Dropdown();
			let dropdownTestedInput = dropdown.element.querySelector('.dropdown-input');
			
			dom.triggerEvent(dropdown.element.querySelector('.dropdown-display'), 'click');
			dom.triggerEvent(dropdownTestedInput, 'click');
			dropdownTestedInput.value = "init";
			dom.triggerEvent(dropdownTestedInput, 'keyup');
			
			dropdown.once('stateSynced', () => {
				assert.notEqual(dropdown.element.querySelectorAll('.dropdown-list-item').length, 0);
				
				done();
			});
		});
		
		it('should select the first item when the user press the key ENTER', (done)=> {
			let dropdown = new Dropdown();
			let dropdownTestedInput = dropdown.element.querySelector('.dropdown-input');
			
			dom.triggerEvent(dropdown.element.querySelector('.dropdown-display'), 'click');
			dom.triggerEvent(dropdownTestedInput, 'keydown', {
				keyCode: 13
			});
			
			dropdown.once('stateSynced', () => {
				assert.equal(dropdown.activeDropdownItem instanceof Object, true);
				
				done();
			});
		});
		
		it('should hide the dropdown wrapper when the user press the key ESC', (done)=> {
			let dropdown = new Dropdown();
			let dropdownTestedInput = dropdown.element.querySelector('.dropdown-input');
			
			dom.triggerEvent(dropdown.element.querySelector('.dropdown-display'), 'click');
			dom.triggerEvent(dropdownTestedInput, 'keydown', {
				keyCode: 27
			});
			
			dropdown.once('stateSynced', () => {
				assert.equal(dropdown.activeDropdownItem, false);
				
				done();
			});
		});
		
		it('should return the item that corresponds the user search', (done)=> {
			let dropdown = new Dropdown();
			let dropdownTestedInput = dropdown.element.querySelector('.dropdown-input');
			
			dom.triggerEvent(dropdown.element.querySelector('.dropdown-display'), 'click');
			dom.triggerEvent(dropdownTestedInput, 'click');
			dropdownTestedInput.value = "gold";
			dom.triggerEvent(dropdownTestedInput, 'keyup');
			dom.triggerEvent(dropdownTestedInput, 'keydown', {
				keyCode: 13
			});
			
			dropdown.once('stateSynced', () => {
				assert.equal(dropdown.activeDropdownItem instanceof Object, true);
				
				done();
			});
		});
	});
	
}
