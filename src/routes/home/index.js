import { h, Component } from 'preact';
import axios from 'axios';
import style from './style';
import Item from '../../components/item';
import {countries} from 'country-data';

const API_BASE_URL = "https://newsapi.org/v2"
const API_KEY = "a6a21e07f9ef4e5fb89b5f5eab675095"
const categories = ['business','entertainment','health','science','sports','technology']

export default class Home extends Component {
	state = {
		articles: [],
		page: 1,
		isFetching: false
	}

	componentDidMount(){
		this.fetchHeadlines();
		let elm = document.getElementById('news-container');
		
		elm.onscroll = () => {
			if(Math.ceil(elm.scrollTop) + elm.clientHeight == elm.scrollHeight){
				// console.log('User has scrolled to the bottom of the element');
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
		topics = this.props.topics || 'news',
		language = this.props.language;
		
		let countryObj = countries[country.toUpperCase()];
		topics = `${countryObj.name},${topics}`
		if (category !== 'general') {
			topics += `,${category}`;
		}
		let query = this.getTopic(topics);
		// console.log('query ::',query);
		let apiURL = `${API_BASE_URL}/everything?pageSize=10&q=${encodeURI(query)}`;
		apiURL+=`&apiKey=${API_KEY}`
		apiURL+=`&page=${this.state.page}`
		if (language) {
			apiURL+=`&language=${language}`
		}
		this.setState({isFetching: true})
		axios.get(apiURL)
		.then((response) => {
			if (response.status == 200) {
				this.setState({
					isFetching: false,
					articles: this.state.articles.concat(response.data.articles)
				})
			}
		})
		.catch(function(response){
			console.log(response.data);
		}); 
	}

	getTopic(topicsString){
		let topicsArray = topicsString.split(/[ ,]+/);;
		if (topicsArray.length < 4) {
			topicsArray = topicsArray.concat(categories);	
		}
		// console.log('topicsArray ::',topicsArray);
		
		return topicsArray[Math.floor(Math.random()*topicsArray.length)];
	}

	fetchHeadlines(){
		let country = this.props.country || 'IN', 
		category = this.props.category || 'general';
		let headlinesURL = `${API_BASE_URL}/top-headlines?pageSize=20&country=${country}&category=${category}&apiKey=${API_KEY}`
		
		axios.get(headlinesURL)
		.then((response) => {
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
							<img src="/assets/images/newspaper.png" />
							<h3>Getting some fresh news for you...</h3>
						</div>
					}
					{ this.state.isFetching ?
						<div class={style.loadingMoreCnt}>
							<h3>Fetching some more...</h3>
						</div> : ''
					}
					
				</div>
			</div>
		);
	}
}
