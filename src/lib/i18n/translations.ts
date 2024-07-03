import lang from './lang.json';
import rule_en from './rule_en.html?raw';
import rule_zh from './rule_zh.html?raw';

export default {
	en: {
		lang,
		top: {
			rule: {
				title: 'Standard Rule',
				content: rule_en,
				close: 'Close'
			},
			settings: 'Settings',
			title: 'AO Standard Blackjack',
			connect: 'Connect Wallet',
			disconnect: 'Disconnect'
		},
		table: 'table_en'
	},
	zh: {
		lang,
		top: {
			rule: {
				title: '标准21点规则',
				content: rule_zh,
				close: '关闭'
			},
			settings: '设置',
			title: 'AO 标准21点',
			connect: '连接钱包',
			disconnect: '断开钱包'
		},
		table: 'table_zh'
	}
};
