'use strict';

import templates from './MetalForm.soy.js';
import core from 'metal';
import Component from 'metal-component';
import Soy from 'metal-soy';
import EventEmitter from '../../Utils/EventEmitter';

class MetalForm extends Component {
	/**
	 * MetalForm component
	 */
	created(){
		let instance = this;

		instance.ApplicationEmitter = new EventEmitter();
		instance.ApplicationEmitter.on('LISTEN_DROPDOWN_EVENT', data => instance.dropdownData = data);
		instance.ApplicationEmitter.on('LISTEN_CALCULATOR_EVENT', data => instance.calculatorData = data);
	}
	
	/**
	 * Remove the form default behavior
	 * Set body event to verify the button show message
	 */
	attached(){
		let instance = this;
		
		instance.element.querySelector('form').addEventListener('submit', e => e.preventDefault());
		
		document.querySelector('body').addEventListener('click', (e)=> {
			if(e.target.classList.contains('get-quot')) return
			instance.element.querySelector('.submit-label').classList.remove('show-message');
		});
	}
	
	/**
	 * Check if has operators in the calculator display
	 * @param {Sring} text
	 * @returns {boolean}
	 */
	hasCalculatorOperators(text){
		return /[()+\-/*]/.test(text);
	}
	
	/**
	 * Check if has error in the form
	 * @returns {boolean || null}
	 */
	hasErrorInTheForm(){
		let instance = this,
				err;
		
		if(!instance.checkDropdownData()) err = true;
		if(!instance.checkCalculatorData()) err = true;
		
		return instance.error = err;
	}
	
	/**
	 * Calculate the form using the compound interest formula
	 * and show the result in the total input
	 */
	calculateForm(){
		let instance = this;

		if(instance.hasErrorInTheForm()) return;
		
		instance.debt = instance.calculateDebt({
			amount: instance.calculatorData,
			interest: instance.dropdownData.interest,
			months: instance.dropdownData.months
		});

		instance.element.querySelector('#input-total').placeholder = `R$: ${instance.debt}`;
		instance.element.querySelector('.get-quot').removeAttribute('disabled');
	}
	
	/**
	 * Calculate the debit using the compound interest formula
	 * @returns { string }
	 */
	calculateDebt({amount, interest, months}){
		let result;
		interest = interest / 100;
		result = (amount * Math.pow(1 + interest, months)).toLocaleString('pt-BR');
		
		if(result.split(',')[1].length > 2) result = result.substr(0, result.length-1);
		
		return result;
	}
	
	/**
	 * Check if the dropdown has item selected
	 * @returns {boolean}
	 */
	checkDropdownData(){
		let instance = this,
				isValid = true;
		
		if(!instance.dropdownData){
			instance.ApplicationEmitter.emit('LISTEN_DROPDOWN_ERROR', 'Please, select an item of the dropdown');
			isValid = false;
		}
		
		return isValid;
	}
	
	/**
	 * Check if the calculator has just numbers (integers or floats)
	 * @returns {boolean}
	 */
	checkCalculatorData(){
		let instance = this,
			data = instance.calculatorData,
			isValid = true;
		
		if(instance.hasCalculatorOperators(data) || !data || !parseFloat(data)){
			instance.ApplicationEmitter.emit('LISTEN_CALCULATOR_ERROR', "Please, type an exepression in your calculator and click in the button '='");
			isValid = false;
		}
		
		return isValid;
	}
	
	/**
	 * Send the count results to the server
	 */
	submitForm(){
		let instance = this;
		const	data = JSON.stringify({
			interest: instance.dropdownData.interest,
			loan: instance.calculatorData,
			numberOfMonths: instance.dropdownData.months,
			totalDebt: instance.debt
		});
		
		
		fetch(instance.endpoint, {
			method: "POST",
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: data
		}).then(resp => resp.json())
			.then(({status}) => instance.showFormMessage(status))
			.catch(err => instance.showFormMessage(`something wrong. Please contact the administrator.`, true))
	}
	
	/**
	 *  Show a vizual feedback in the form
	 * @param { String } text
	 * @param { Boolean } hasError
	 */
	showFormMessage(text, hasError){
		let instance = this;
		let element = instance.element.querySelector('.submit-label');
		
		element.textContent = text;
		element.classList.remove('danger');
		
		if(hasError) element.classList.add('danger');
		return element.classList.add('show-message');
	}
}

Soy.register(MetalForm, templates);

/**
 * MetalForm State Definition
 */
MetalForm.STATE = {
	/**
	 * The emitter of the application
	 * to communicate with the other components
	 */
	ApplicationEmitter: {
		value: false
	},
	/**
	 * The user debit calculated in this component
	 */
	debt: {
		value: null
	},
	
	/**
	 * Expression that is in the calculator display
	 */
	calculatorData: {
		value: null
	},
	
	/**
	 * Item selected in the dropdown component
	 */
	dropdownData: {
		value: null
	},
	
	/**
	 * Url of the server, that will save the form data
	 */
	endpoint: {
		value: 'http://localhost:3100/calculator'
	}
};

export default MetalForm;
