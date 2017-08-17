import Component from 'metal-component';
import Soy from 'metal-soy';
import dom from 'metal-dom';
import Emitter from '../../Utils/EventEmitter';
import templates from './Dropdown.soy.js';
import { ITEMS_DATA } from './DropdownUtils'


class Dropdown extends Component {
	/**
	 * Dropdown component.
	 */
	created(){
		let instance = this;
		
		instance.cashItemsData = ITEMS_DATA;
		instance.Listener.on('LISTEN_DROPDOWN_ERROR', err => instance.warning = err);
	}
	
	/**
	 * Set the click event when the body was pressed
	 */
	attached(){
		const showItems = this.showItems;
		document.querySelector('body').addEventListener('click', showItems.bind(this));
	}
	
	/**
	 * Show the dropdowns items
	 * @param {Object} e
	 */
	showItems(e){
		let instance = this,
			active,
			elementClass = e.target.className;
		
		if((elementClass.indexOf('dropdown-display') != -1) || (elementClass.indexOf('dropdown-input') != -1)){
			active = true;
			setTimeout(() => instance.element.querySelector('.dropdown-input').focus(), 200);
		}else {
			instance.focusOut();
		}
		
		instance.shown = active;
	}
	
	/**
	 * Change the selected item in the dropdown
	 * @param {Object} e
	 */
	changeActivePlan(e){
		let instance = this;
		const item = e.target;
		const data = instance.cashItemsData.filter(obj => obj.id == item.getAttribute('data-id'));
		
		item.classList.add('dropdown-list-item--selected');
		
		if(data.length) {
			instance.bindSelectedItemClass(data[0]);
			instance.setState({activeDropdownItem: data[0]});
			instance.emitListener(data[0]);
		}
	}
	
	/**
	 * Clear the input and remove the input focus
	 */
	focusOut(){
		let instance = this;
		const item = instance.element.querySelector('.dropdown-input');
		
		item.value = '';
		instance.items = instance.cashItemsData;
	}
	
	/**
	 * Search items through of the input interaction
	 * @param {Object} e
	 */
	searchItem(e){
		const item = e.target;
		let instance = this;
		instance.items = instance.cashItemsData.filter(obj => obj.name.toLowerCase().indexOf(item.value.toLowerCase()) != -1);
	}
	
	/**
	 * Emit an event to the other components present in the application
	 * @param {Object} data
	 */
	emitListener(data){
		let instance = this;
		instance.warning = false;
		instance.Listener.emit('LISTEN_DROPDOWN_EVENT', data);
	}
	
	/**
	 * Check the key code of the keyboard interactions
	 * @param {Object} e
	 */
	bindKeyCode(e){
		let instance = this;
		if(e.keyCode == 27) return instance.bindESCKey();
		if(e.keyCode == 13) return instance.bindENTERKey(instance.items[0]);
	}
	
	/**
	 * Leave of the dropdown search and
	 * hide the list of items
	 */
	bindESCKey(){
		let instance = this;
		instance.element.querySelector('.dropdown-input').blur();
		instance.shown = false;
	}
	
	/**
	 * Select the first item present in the sarch
	 * if the user didn't search any item
	 * select the first default item
	 */
	bindENTERKey(data){
		let instance = this;
		
		instance.setState({activeDropdownItem: data});
		instance.emitListener(data);
		instance.bindSelectedItemClass(data);
		instance.shown = false;
	}
	
	/**
	 * Change the selected item property
	 * to add the class selected in the component
	 * @param {Object} data
	 */
	bindSelectedItemClass(data){
		let instance = this;
		instance.cashItemsData.forEach(item => item.id == data.id ? item.selected = true : delete item.selected);
	}
}
Soy.register(Dropdown, templates);

/**
 * Dropdown state definition
 */
Dropdown.STATE = {
	/**
	 * To show the dropdown items
	 */
	shown: {
		value: false
	},
	
	/**
	 * Active item selected in the dropdown
	 */
	activeDropdownItem: {
		value: false
	},
	
	/**
	 * List of items to the dropdown items list
	 */
	items: {
		value: ITEMS_DATA
	},
	
	/**
	 * Message of warning of the calculator
	 */
	warning: {
		value: ''
	},
	
	/**
	 * Listener for the others components
	 */
	Listener: {
		value: new Emitter()
	}
};


export default Dropdown;
