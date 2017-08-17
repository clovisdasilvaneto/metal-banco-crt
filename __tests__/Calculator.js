"use strict";

export function CalculatorSwit(Calculator, dependencies){
	let dom = dependencies.dom;
	
	describe('Calculator', ()=> {
		it('should be a calculator instance', ()=>{
			let calculator = new Calculator();
			
			assert.equal(calculator instanceof Calculator, true);
		});
		
		it('should return the number in the calculator display', (done)=>{
			let calculator = new Calculator();
			
			dom.triggerEvent(calculator.element.querySelector('button[data-text="1"]'), 'click');
			
			calculator.once('stateSynced', ()=>{
				assert.equal(calculator.labelDisplay, '1');
				done();
			})
		});
		
		it('should remove the last digit in the calculator display', (done)=>{
			let calculator = new Calculator();
			
			dom.triggerEvent(calculator.element.querySelector('button[data-text="1"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="1"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="<"]'), 'click');
			
			calculator.once('stateSynced', ()=>{
				assert.equal(calculator.labelDisplay, '12');
				done();
			})
		});
		
		it('should remove the last digit and the last operator in the calculator display', (done)=>{
			let calculator = new Calculator();
			
			dom.triggerEvent(calculator.element.querySelector('button[data-text="1"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="+"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="1"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="<"]'), 'click');
			
			calculator.once('stateSynced', ()=>{
				assert.equal(calculator.labelDisplay, '12+');
				done();
			})
		});
		
		it('should ignore the first digit in the display if it was an operator', (done)=>{
			let calculator = new Calculator();
			
			dom.triggerEvent(calculator.element.querySelector('button[data-text="+"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="1"]'), 'click');
			
			calculator.once('stateSynced', ()=>{
				assert.equal(calculator.labelDisplay, '1');
				done();
			})
		});
		
		it('should ignore duplicated operators', (done)=>{
			let calculator = new Calculator();
			
			dom.triggerEvent(calculator.element.querySelector('button[data-text="1"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="+"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="+"]'), 'click');
			
			calculator.once('stateSynced', ()=>{
				assert.equal(calculator.labelDisplay, '1+');
				done();
			})
		});
		
		it('should ignore the first digit as operator and should ignore duplicated operators', (done)=>{
			let calculator = new Calculator();
			
			dom.triggerEvent(calculator.element.querySelector('button[data-text="+"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="1"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="+"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="-"]'), 'click');
			
			calculator.once('stateSynced', ()=>{
				assert.equal(calculator.labelDisplay, '1-');
				done();
			});
		});
		
		it('should sum two simple digits', (done)=>{
			let calculator = new Calculator();
			
			dom.triggerEvent(calculator.element.querySelector('button[data-text="1"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="+"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="="]'), 'click');
			
			calculator.once('stateSynced', ()=>{
				assert.equal(calculator.labelDisplay, '3');
				done();
			});
		});
		
		it('should return the digits in the calculator display with parentheses', (done)=>{
			let calculator = new Calculator();
			
			dom.triggerEvent(calculator.element.querySelector('button[data-text="1"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="+"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="+"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="("]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="+"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text=")"]'), 'click');
			
			calculator.once('stateSynced', ()=>{
				assert.equal(calculator.labelDisplay, '1+2+(2+2)');
				done();
			});
		});
		
		it('should return a warning on the calculator display', (done)=>{
			let calculator = new Calculator();
			
			dom.triggerEvent(calculator.element.querySelector('button[data-text="1"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="+"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="+"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="("]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="+"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="="]'), 'click');
			
			calculator.once('stateSynced', ()=> {
				assert.equal(calculator.warning, "Unmatched parenthesis");
				done();
			});
		});
		
		it('should return a warning on the calculator display with double parentheses without close', (done)=>{
			let calculator = new Calculator();
			
			dom.triggerEvent(calculator.element.querySelector('button[data-text="1"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="+"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="+"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="("]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="("]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="+"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text=")"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="="]'), 'click');
			
			calculator.once('stateSynced', ()=> {
				assert.equal(calculator.warning, "Unmatched parenthesis");
				done();
			});
		});
		
		it('should return a warning to insert a valid expression', (done)=>{
			let calculator = new Calculator();

			dom.triggerEvent(calculator.element.querySelector('button[data-text="1"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="("]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text=")"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="="]'), 'click');

			calculator.once('stateSynced', ()=> {
				assert.equal(calculator.warning, "Please type a valid expression");
				done();
			});
		});
		
		it('should return the sum of the inputs', (done)=>{
			let calculator = new Calculator();
			
			dom.triggerEvent(calculator.element.querySelector('button[data-text="1"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="+"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="="]'), 'click');
			
			calculator.once('stateSynced', ()=> {
				assert.equal(calculator.labelDisplay, "3");
				done();
			});
		});
		
		it('should return the subtraction of the inputs', (done)=>{
			let calculator = new Calculator();
			
			dom.triggerEvent(calculator.element.querySelector('button[data-text="1"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="-"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="="]'), 'click');
			
			calculator.once('stateSynced', ()=> {
				assert.equal(calculator.labelDisplay, "1");
				done();
			});
		});
		
		it('should return the division of the inputs', (done)=>{
			let calculator = new Calculator();
			
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="/"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="="]'), 'click');
			
			calculator.once('stateSynced', ()=> {
				assert.equal(calculator.labelDisplay, "1");
				done();
			});
		});
		
		it('should return the multiplication of the inputs', (done)=>{
			let calculator = new Calculator();
			
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="*"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="2"]'), 'click');
			dom.triggerEvent(calculator.element.querySelector('button[data-text="="]'), 'click');
			
			calculator.once('stateSynced', ()=> {
				assert.equal(calculator.labelDisplay, "4");
				done();
			});
		});
	});
}
