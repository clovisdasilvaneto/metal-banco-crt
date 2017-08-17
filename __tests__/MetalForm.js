"use strict";

export function MetalFormSwit(MetalForm, dependencies){
	let dom = dependencies.dom;
	
	describe('MetalForm', ()=> {
		it('should be a metal form component instance', () => {
			let metalForm = new MetalForm();
			
			assert.equal(metalForm instanceof MetalForm, true);
		});
		
		it("should return a valid debit value", () => {
			let metalForm = new MetalForm();
			
			assert.equal(metalForm.calculateDebt({
				amount: 1000,
				interest: 5,
				months: 12
			}), '1.795,85');
		});
		
		it("should return an error when the form wasn't filled", () => {
			let metalForm = new MetalForm();
			
			assert.equal(metalForm.hasErrorInTheForm(), true);
		});
		
		it("should return an error when any dropdown item was selected", () => {
			let metalForm = new MetalForm();
			
			dom.triggerEvent(metalForm.element.querySelector('button[data-text="1"]'), 'click');
			assert.equal(metalForm.hasErrorInTheForm(), true);
		});
		
		it('should return a valid debit value', () => {
			let metalForm = new MetalForm();
			
			dom.triggerEvent(metalForm.element.querySelector('button[data-text="1"]'), 'click');
			dom.triggerEvent(metalForm.element.querySelector('.dropdown-list .dropdown-list-item'), 'click');
			dom.triggerEvent(metalForm.element.querySelector('.calculate-interest'), 'click');
			
			assert.equal(typeof metalForm.debt, 'string');
			assert.equal(metalForm.hasErrorInTheForm(), undefined);
		});
	});
}
