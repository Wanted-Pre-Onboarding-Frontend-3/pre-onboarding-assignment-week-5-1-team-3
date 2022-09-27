import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { RecoilRoot } from 'recoil';
import GlobalStyles from './styles/globalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RecoilRoot>
			<GlobalStyles />

			<App />
		</RecoilRoot>
	</React.StrictMode>,
);
