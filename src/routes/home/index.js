import { h, Component } from 'preact';
import axios from 'axios';
import style from './style';

export default class Home extends Component {
	state = {
		articles: [],
		country: 'IN',
		category: 'general'
	}

	componentDidMount(){
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
					<a className={style.newsItem} href={element.url} target="_blank">
						<img src={element.urlToImage} class={style.bannerImg} />
						<div class={style.newsContent}>
							<h3>{element.title}</h3>
							<p>{element.description}</p>
							<span>{element.author} | {element.publishedAt}</span>
						</div>
					</a>
				);
			})
		}
		
		return(
			<div class={style.home}>
				<div>
					<input name="country" value={this.state.country} onChange={this.handleChange}></input>
					<select name="category" value={this.state.category} onChange={this.handleChange}>
						<option value="business">business</option>
						<option value="entertainment">entertainment</option>
						<option value="general">general</option>
						<option value="health">health</option>
						<option value="science">science</option>
						<option value="sports">sports</option>
						<option value="technology">technology</option>
					</select>
				</div>
				{items}
			</div>
		);
	}
}
