'use strict';

import templates from './CalculatorButton.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

class CalculatorButton extends Component {
}

Soy.register(CalculatorButton, templates);

/**
 * CalculatorButton State Definition
 */
CalculatorButton.STATE = {
	/**
	 * Text present in button
	 */
	text: {
		value: ''
	},
	/**
	 * The action that the button will do
	 */
	click: {
		value: false
	}
};

export default CalculatorButton;
