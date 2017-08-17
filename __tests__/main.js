"use strict";

import dom from 'metal-dom';
import Dropdown from '../src/components/Dropdown/Dropdown';
import CalculatorButton from '../src/components/CalculatorButton/CalculatorButton';
import Calculator from '../src/components/Calculator/Calculator';
import MetalForm from '../src/components/MetalForm/MetalForm';
import { MetalFormSwit } from './MetalForm';
import { CalculatorButtonSwit } from './CalculatorButton';
import { DropdownSwit } from './Dropdown';
import { CalculatorSwit } from './Calculator';

const dependencies = {
	dom: dom
};

CalculatorSwit(Calculator, dependencies);
CalculatorButtonSwit(CalculatorButton, dependencies);
DropdownSwit(Dropdown, dependencies);
MetalFormSwit(MetalForm, dependencies);
