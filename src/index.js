import './scss/app.scss';
import MetalForm from './components/MetalForm/MetalForm';
import Dropdown from './components/Dropdown/Dropdown';
import Calculator from './components/Calculator/Calculator';
import CalculatorButton from './components/CalculatorButton/CalculatorButton';

new MetalForm({
	endpoint: 'http://localhost:3100/calculator'
});


