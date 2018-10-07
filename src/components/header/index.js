import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<span>
			<Link className="home" href="/">Headlines</Link>
		</span>

		<nav>
			<Link activeClassName={style.active} href="/settings" title="Preferences">
				<img src="/assets/preferences-icon.svg" />
			</Link>
		</nav>
	</header>
);

export default Header;
