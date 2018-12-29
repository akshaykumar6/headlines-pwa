import { h, Component } from 'preact';
import style from './style';
import {countries} from 'country-data';
import {supportedCountries} from '../../util/countries';
import { Link } from 'preact-router/match';

export default class Settings extends Component {
	
	constructor(props) {
		super();
		this.props = props;
		this.countryOptions = Object.keys(supportedCountries).map((val) => {
			let country = countries[val.toUpperCase()];
			let isSelected = false;
			if (this.props.country == val) {
				isSelected = true;
			}
			return (<option value={val} selected={isSelected}>{country.emoji} - {country.name}</option>)
		});
	}

	render() {
		return (
			<div class={style.settings}>
				<h2>Preferences</h2>
				<div class={style.wd50}>
					<label>Favourite Topics : </label>
					<textarea class={style.topicsSelect} placeholder="Enter the topics you want to follow..." rows='4' name="topics" value={this.props.topics} onChange={this.props.handleChange}>
						{this.props.topics}
					</textarea>
				</div>
				<div class={style.wd50}>
					<label>Country : </label>
					<select class={style.homeSelect} name="country" value={this.props.country} onChange={this.props.handleChange}>
						{this.countryOptions}
					</select>
				</div>
				<div class={style.wd50}>
					<label>Preferred Category : </label>
					<select class={style.homeSelect} name="category" value={this.props.category} onChange={this.props.handleChange}>
						<option value="general">General</option>
						<option value="business">Business</option>
						<option value="entertainment">Entertainment</option>
						<option value="health">Health</option>
						<option value="science">Science</option>
						<option value="sports">Sports</option>
						<option value="technology">Technology</option>
					</select>
				</div>
				<div class={style.wd50}>
					<label>Language : </label>
					<select class={style.homeSelect} name="language" value={this.props.language} onChange={this.props.handleChange}>
						<option value="">Any</option>
						<option value="ar">Arabic</option>
						<option value="de">German</option>
						<option value="en">English</option>
						<option value="fr">French</option>
						<option value="he">Hebrew</option>
						<option value="it">Italian</option>
						<option value="nl">Dutch</option>
						<option value="no">Norwegian</option>
						<option value="pt">Portuguese</option>
						<option value="ru">Russian</option>
						<option value="se">Sami</option>
						{/* <option value="ud">ud</option> */}
						<option value="zh">Chinese</option>
					</select>
				</div>
				<div class={style.formActions}>
					<Link class="btn" href="/">Save</Link>
				</div>
				<div class={style.footer}>
					<a href="https://github.com/akshaykumar6/headlines-pwa/issues" target="_blank">Feedback</a> | <a href="https://github.com/akshaykumar6/headlines-pwa" target="_blank">Github</a> | 
					Developed by <a href="https://akshaykumar6.github.io" target="_blank">Akshay Sharma</a> | powered by <a href="https://newsapi.org/" target="_blank">NewsAPI.org</a>
				</div>
			</div>
		);
	}
}
