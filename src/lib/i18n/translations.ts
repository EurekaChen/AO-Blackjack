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
			installWallet: 'Install Wallet',
			connect: 'Connect Wallet',
			disconnect: 'Disconnect'
		},
		connect: {
			pleaseConnect: '请先连接钱包',
			pleaseConnectConnect: 'AO经典21点游戏基于 Arweave AO，需先连接钱包',
			getEgc: '正在获取的EGC余额...'
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
			installWallet: '请先安装钱包',
			connect: '连接钱包',
			disconnect: '断开钱包'
		},
		connect: {
			pleaseConnect: '请先连接钱包',
			pleaseConnectContent: 'AO经典21点游戏基于 Arweave AO，请先连接钱包',
			queryEgc: '正在获取的EGC余额...',
			queryPlayer:'正在查询玩家信息...',
			welcomeBack:'🎉欢迎回来👋',
			addr:'钱包地址',
			playerName:'玩家名称',
			walletBalance:'钱包余额',
			tableBalance:'在桌筹码',
			pleaseAdd:'筹码不够最低限额，请增加筹码',
			continue:'🎮继续上一局牌🎮',
			fail:'连接钱包失败',			
			refresh:'数据请求失败，请刷新重试',
			pleaseInstall:'请先安装钱包',
			pleaseInstallContent:'AO 21点游戏基于Arweave AO,需要首先安装Arweave钱包！',
			installLink:'钱包下载链接',
			addChip:"增加筹码",
			player:"玩家"

		},
		table: 'table_zh'
	}
};
