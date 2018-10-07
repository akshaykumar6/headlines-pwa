import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Settings from '../routes/settings';

export default class App extends Component {
	
	state = {
		country: localStorage.getItem('country') || 'in',
		topics: localStorage.getItem('topics'),
		category: localStorage.getItem('category') || 'general'
	}

	handleChange = (e) => {
		let obj = this.state;
		obj[e.target.name] = e.target.value;
		localStorage.setItem(e.target.name, e.target.value);
		this.setState(obj);
	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		// console.log('this.state ::',this.state);
		
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" {...this.state} handleChange={this.handleChange} />
					<Settings path="/settings" {...this.state} handleChange={this.handleChange} />
				</Router>
			</div>
		);
	}
}
