import lang from './lang.json';
import rule_en from './rule_en.html?raw';
import rule_zh from './rule_zh.html?raw';

import about_en from './about_en.html?raw';
import about_zh from './about_zh.html?raw';
import { bufferToString } from 'arweave/web/lib/utils';

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
			pleaseConnect: 'Please connect your wallet first',
			pleaseConnectContent:
				'AO Classic Blackjack game is based on Arweave AO, please connect your wallet first',
			queryEgc: 'Retrieving EGC balance...',
			queryPlayer: 'Querying player information...',
			welcomeBack: '🎉Welcome back👋',
			addr: 'Wallet address',
			playerName: 'Player name',
			walletBalance: 'Wallet balance',
			tableBalance: 'Table balance',
			pleaseAdd: 'Not enough chips for the minimum limit, please add more chips',
			continue: '🎮Continue last game🎮',
			fail: 'Failed to connect wallet',
			refresh: 'Data request failed, please refresh and try again',
			pleaseInstall: 'Please install wallet first',
			pleaseInstallContent:
				'AO Blackjack game is based on Arweave AO, you need to install Arweave wallet first!',
			installLink: 'Wallet download link',
			addChip: 'Add chips',
			player: 'Player'
		},
		action: {
			clear: 'Clear',
			deal: 'Deal',
			aoDealing: 'AO dealing',
			balanceLack: 'Your table EGC balance is insufficient',
			double: 'Double',
			doubleBet: 'Double bet',
			aoDoubling: 'AO doubling',
			aoHiting: 'AO hitting',
			hit: 'Hit',
			aoInsurancing: 'AO insuring',
			insurance: 'Insurance',
			newHand: 'New hand',
			repeat: 'Repeat',
			aoSpliting: 'AO splitting',
			split: 'Split',
			aoStanding: 'AO standing',
			stand: 'Stand',
			outRange: 'Bet amount is out of range',
			back: 'Back'
		},
		indicator: {
			win: 'You win',
			lose: 'You lose',
			tie: 'Tie',
			blackjack: 'Blackjack',
			bust: 'You bust',
			waiting: 'Waiting',
			querying: 'Querying'
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
			queryPlayer: '正在查询玩家信息...',
			welcomeBack: '🎉欢迎回来👋',
			addr: '钱包地址',
			playerName: '玩家名称',
			walletBalance: '钱包余额',
			tableBalance: '在桌筹码',
			pleaseAdd: '筹码不够最低限额，请增加筹码',
			continue: '🎮继续上一局牌🎮',
			fail: '连接钱包失败',
			refresh: '数据请求失败，请刷新重试',
			pleaseInstall: '请先安装钱包',
			pleaseInstallContent: 'AO 21点游戏基于Arweave AO,需要首先安装Arweave钱包！',
			installLink: '钱包下载链接',
			addChip: '增加筹码',
			player: '玩家'
		},
		action: {
			clear: '清 除',
			deal: '发 牌',
			aoDealing: 'AO发牌中',
			balanceLack: '您的在桌EGC余额不够',
			double: '加 倍',
			doubleBet: '加倍下注',
			aoDoubling: 'AO加倍中',
			aoHiting: 'AO要牌中',
			hit: '要 牌',
			aoInsurancing: 'AO买保险',
			insurance: '保 险',
			newHand: '重新开始',
			repeat: '再次下注',
			aoSpliting: 'AO拆牌中',
			split: '拆 牌',
			aoStanding: 'AO停牌中',
			stand: '停 牌',
			outRange: '下注额不在区间中',
			back: '返回',
			waiting: '请稍候',
			querying: '获取数据中'
		},
		indicator: {
			win: '您赢了',
			lose: '您输了',
			tie: '平 手',
			blackjack: '黑杰克',
			bust: '您爆了'
		},
		table: 'table_zh'
	}
};
