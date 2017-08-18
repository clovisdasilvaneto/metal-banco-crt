'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';
import templates from './Calculator.soy.js';
import { labels, operators } from './CalculatorUtils';
import Emitter from '../../Utils/EventEmitter';

class Calculator extends Component {
	/**
		Calculator component
	 */
	created(){
		let instance = this;
		
		instance.labels.forEach(label => instance.setCalculatorButtonsEvents(label));
		instance.operators.forEach(operator => instance.setCalculatorButtonsEvents(operator));
		instance.Listener.on('LISTEN_CALCULATOR_ERROR', err => instance.warning = err);
	}
	
	/**
	 * Add events for all buttons in the calculator component
	 * located in CalculatorUtils
	 */
	setCalculatorButtonsEvents(button){
		let instance = this;
		
		if(button.isClearButton){
			button.clickFn = instance.delegateDeleteButton.bind(instance);
		}else if(button.isResultButtom){
			button.clickFn = instance.resultOfDisplayExpressions.bind(instance);
		}else {
			button.clickFn = instance.appendIntoDisplay.bind(instance);
		}
	}
	
	/**
	 * Remove digits in the calculator display
	 * to update labelDisplay
	 * and emit the listener to the others components
	 */
	delegateDeleteButton(){
		let instance = this;
		
		instance.labelDisplay = instance.removeLastDigit;
		instance.warning = false;
		instance.emitListener(instance.labelDisplay);
	}
	
	/**
	 * Append digits in the calculator display
	 */
	appendIntoDisplay(e){
		const text = e.target.dataset.text;
		
		let instance = this,labelDisplay = instance.labelDisplay,
				lastDigtOfLabelDisplay = labelDisplay[labelDisplay.length-1];
		
		if(instance.hasOperator(text) && instance.isLastDigitAnOperator(lastDigtOfLabelDisplay)){
			lastDigtOfLabelDisplay = '';
			instance.labelDisplay = instance.removeLastDigit;
		}
		
		if(instance.checkCalculatorExpressions(text, lastDigtOfLabelDisplay)){
			instance.labelDisplay += text;
		}

		instance.warning = false;
		return instance.emitListener(instance.labelDisplay);
	}
	
	/**
	 * Check if is not a digit or
	 * if is a digit, check if the digit
	 * comes after a number or an expression
	 */
	checkCalculatorExpressions(text, lastDigtOfLabelDisplay){
		let instance = this,labelDisplay = instance.labelDisplay;

		if((!instance.hasOperator(text)) ||
			(!instance.hasDoublePeriod(labelDisplay, text)) &&
			(!instance.isFirstDigitAnOperator(labelDisplay+text) &&
				instance.hasOperator(text) &&
				!instance.isLastDigitAnOperator(lastDigtOfLabelDisplay))) return true;
	}
	
	/**
	 *
	 */
	hasDoublePeriod(calculatorExpression, input){
		const numbers = calculatorExpression+input;
		const regex = /^([0-9])*\.([0-9])*\./;
		const lastNumber = numbers.split(/[+\-\/*]/);
		return regex.test(lastNumber[lastNumber.length-1]);
	}
	
	/**
	 * Emit event to the others components
	 */
	emitListener(data){
		return this.Listener.emit('LISTEN_CALCULATOR_EVENT', data);
	}
	
	/**
	 * Remove the calculator digits
	 */
	get removeLastDigit(){
		let textDisplay = this.labelDisplay;

		return textDisplay.substr(0, textDisplay.length - 1);
	}
	
	/**
	 * Process the result of the expressions in the calculator display
	 */
	resultOfDisplayExpressions(){
		let instance = this,
				textDisplay = instance.labelDisplay;
		
		if(!textDisplay) return;
		
		if(instance.isLastDigitAnOperator(textDisplay[textDisplay.length-1])){
			textDisplay = instance.removeLastDigit;
		}
		
		if(instance.hasDifferentNumberOfParentheses(textDisplay)) return instance.warning = "Unmatched parenthesis";
		
		try {
			instance.warning = false;
			instance.labelDisplay = Math.abs(eval(textDisplay)).toString();
			return instance.emitListener(instance.labelDisplay);
		}catch(e) {
			return instance.warning = "Please type a valid expression";
		}
	}
	
	/**
	 * Check if has different number of parentheses
	 * in the calculator display
	 */
	hasDifferentNumberOfParentheses(textDisplay){
		let instance = this,
				openParentheses = instance.countDigitOccurrences(textDisplay, '('),
				closedParentheses = instance.countDigitOccurrences(textDisplay, ')');
		
		if(openParentheses != closedParentheses) return true;
	}
	
	/**
	 * Count the number of occurrences of a determinate digit
	 */
	countDigitOccurrences(text, s1){
		return text.split(s1).length - 1;
	}
	
	/**
	 * Check if the last digit is an operator
	 */
	isLastDigitAnOperator(text){
		const regex = /[+-\/*.]$/;
		return regex.test(text);
	}
	
	/**
	 * Check if the first digit is an operator
	 */
	isFirstDigitAnOperator(text){
		const regex = /^[+-\/*.]/;
		return regex.test(text);
	}
	
	/**
	 * Check if has operator in the param
	 */
	hasOperator(text){
		const regex = /[+-\/*.]/;
		return regex.test(text);
	}
}

Soy.register(Calculator, templates);


/**
 * Alert Component definition.
 */
Calculator.STATE = {
	/**
	 * Array of labels that are calculator buttons
	 */
	labels: {
		value: labels
	},
	
	/**
	 * Message of warning of the calculator
	 */
	warning: {
		value: ''
	},
	
	/**
	 * Array of operators that are calculator buttons
	 */
	operators: {
		value: operators
	},
	
	/**
	 * Label where will stay the user numeric expression
	 */
	labelDisplay: {
		value: ''
	},
	
	/**
	 * Listener for the others components
	 */
	Listener: {
		value: new Emitter()
	}
};

export default Calculator;
