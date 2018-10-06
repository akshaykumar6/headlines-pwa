import { h, Component } from 'preact';
import axios from 'axios';
import style from './style';
import Item from '../../components/item';
import {countries} from 'country-data';

export default class Home extends Component {
	state = {
		articles: [],
		page: 1
	}

	componentDidMount(){
		this.fetchNews();
		let elm = document.getElementById('app');
		
		elm.onscroll = () => {
			if(Math.ceil(elm.scrollTop) + elm.clientHeight == elm.scrollHeight){
				console.log('User has scrolled to the bottom of the element');
				this.setState({
					page: this.state.page+1
				});
				this.fetchNews();
			}
		}
	}

	fetchNews(){
		let country = this.props.country || 'IN', 
		category = this.props.category || 'general',
		topics = this.props.topics || 'news';

		let API_BASE_URL = "https://newsapi.org/v2"
		let API_KEY = "a6a21e07f9ef4e5fb89b5f5eab675095"
		// let apiURL = `${API_BASE_URL}/top-headlines?pageSize=20&country=${country}`

		// if (category) {
		// 	apiURL+=`&category=${category}`
		// }

		let countryObj = countries[country.toUpperCase()];
		topics = `${countryObj.name},${topics}`
		let query = topics.split(',').join(' OR ');
		console.log('query ::',query);
		
		let apiURL = `${API_BASE_URL}/everything?pageSize=20&q=${encodeURI(query)}`;
		apiURL+=`&apiKey=${API_KEY}`
		apiURL+=`&page=${this.state.page}`


		axios.get(apiURL)
		.then((response) => {
			console.log(response.data); // ex.: { user: 'Your User'}
			console.log(response.status); // ex.: 200
			if (response.status == 200) {
				this.setState({
					articles: this.state.articles.concat(response.data.articles)
				})
			}
		})
		.catch(function(response){
			console.log(response.data);
		}); 
	}

	render(){
		console.log('render');
		console.log('this.props ::',this.props);
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
				<div id="news-container" class={style.newsContainer}>
					{items ? items : 
						<div class={style.loadingCnt}>
							<img src="/assets/newspaper.png" />
							<h3>Getting some fresh news for you...</h3>
						</div>
					}
				</div>
			</div>
		);
	}
}
