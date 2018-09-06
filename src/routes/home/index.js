import { h, Component } from 'preact';
import axios from 'axios';
import style from './style';
import Item from '../../components/item';
import {countries, callingCountries, lookup} from 'country-data';
import {supportedCountries} from '../../util/countries';

export default class Home extends Component {
	state = {
		articles: [],
		country: 'in',
		category: 'general'
	}

	countryOptions = Object.keys(supportedCountries).map((val) => {
		let country = countries[val.toUpperCase()];
		let isSelected = false;
		if (this.state.country == val) {
			isSelected = true;
		}
		return (<option value={val} selected={isSelected}>{country.emoji} - {country.name}</option>)
	})

	componentDidMount(){
		console.log('supportedCountries ::',supportedCountries);
		this.fetchNews();
	}

	fetchNews(){
		let country = this.state.country || 'IN', 
		category = this.state.category || 'general';

		let API_BASE_URL = "https://newsapi.org/v2"
		let API_KEY = "a6a21e07f9ef4e5fb89b5f5eab675095"
		let apiURL = `${API_BASE_URL}/top-headlines?pageSize=100&country=${country}`

		if (category) {
			apiURL+=`&category=${category}`
		}

		apiURL+=`&apiKey=${API_KEY}`

		axios.get(apiURL)
		.then((response) => {
			console.log(response.data); // ex.: { user: 'Your User'}
			console.log(response.status); // ex.: 200
			if (response.status == 200) {
				this.setState({
					articles: response.data.articles
				})
			}
		})
		.catch(function(response){
			console.log(response.data);
		}); 
	}

	handleChange = (e) => {
		let obj = this.state;
		obj[e.target.name] = e.target.value;
		this.setState(obj);
		this.fetchNews();
	}

	render(){
		console.log('render');
		console.log(this.state);
		let items = ""
		if (this.state.articles.length) {
			items = this.state.articles.map((element, index) => {
				return (
					<Item data={element} />
				);
			})
		}
		
		return(
			<div class={style.home}>
				<div>
					<div class={style.wd50}>
						<select class={style.homeSelect} name="country" value={this.state.country} onChange={this.handleChange}>
							{this.countryOptions}
						</select>
					</div>
					<div class={style.wd50}>
						<select class={style.homeSelect} name="category" value={this.state.category} onChange={this.handleChange}>
							<option value="general">General</option>
							<option value="business">Business</option>
							<option value="entertainment">Entertainment</option>
							<option value="health">Health</option>
							<option value="science">Science</option>
							<option value="sports">Sports</option>
							<option value="technology">Technology</option>
						</select>
					</div>
				</div>
				<div class={style.newsContainer}>
					{items}
				</div>
			</div>
		);
	}
}
