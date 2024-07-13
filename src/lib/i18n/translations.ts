import lang from './lang.json';
import rule_en from './rule_en.html?raw';
import rule_zh from './rule_zh.html?raw';

import about_en from './about_en.html?raw';
import about_zh from './about_zh.html?raw';

export default {
	en: {
		lang,
		top: {
			rule: {
				title: 'AO Classic Blackjack Rule',
				content: rule_en,
				close: 'Close'
			},
			about: {
				title: 'About AO Classic Blackjack',
				content: about_en,
				close: 'Close'
			},
			settings: 'Settings',
			title: 'AO Classic Blackjack',
			installWallet:"Install Wallet",
			connect: 'Connect Wallet',
			disconnect: 'Disconnect'
		},
		table: 'table_en'
	},
	zh: {
		lang,
		top: {
			rule: {
				title: 'AO经典21点规则',
				content: rule_zh,
				close: '关闭'
			},
			about: {
				title: '关于AO经典21点',
				content: about_zh,
				close: '关闭'
			},
			settings: '设置',
			title: 'AO经典21点',
			installWallet:"请先安装钱包",
			connect: '连接钱包',
			disconnect: '断开钱包'
		},
		table: 'table_zh'
	}
};
