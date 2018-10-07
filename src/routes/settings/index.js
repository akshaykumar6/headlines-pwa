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
				<div>
					<Link class="btn" href="/">Save</Link>
				</div>
			</div>
		);
	}
}
