"use strict";

export function CalculatorButtonSwit(CalculatorButton, dependencies){
	describe('CalculatorButton', ()=>{
		it('should be a calculator button instance', ()=>{
			let button = new CalculatorButton({
				text: '1'
			});
			
			assert.equal(button instanceof CalculatorButton, true);
		});
		
		it('should return the button text', ()=> {
			let button = new CalculatorButton({
				text: '2'
			});
			
			assert.strictEqual(button.element.textContent, '2');
			assert.strictEqual(button.element.dataset.text, '2');
		});
		
		it('should return the button class and text', ()=>{
			let button = new CalculatorButton({
				text: '2',
				buttonClass: 'calculator-button--double-size'
			});
			
			assert.strictEqual(button.text, '2');
			assert.strictEqual(button.element.dataset.text, '2');
			assert.strictEqual(button.element.classList.contains('calculator-button--double-size'), true);
		});
	});
}
