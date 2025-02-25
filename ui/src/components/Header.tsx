import { useLocation } from 'preact-iso';

export function Header() {
	const { url } = useLocation();

	return (
		<header>
			<nav>
				<a href="/" class={url == '/' && 'active'}>
					No Money
				</a>
				<div style={{flex: 1}}></div>
				<a href="/get-started" class={url == '/get-started' && 'active'}>
					Get Started
				</a>
			</nav>
		</header>
	);
}
