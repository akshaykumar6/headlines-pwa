import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<span>
			<Link className="home" href="/">Headlines</Link>
		</span>

		<nav>
			<Link activeClassName={style.active} href="/settings">Settings</Link>
		</nav>
	</header>
);

export default Header;
