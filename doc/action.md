# 游戏动作

# 客户端动作
不发送到AO,简单在Action组件中实现
## 清除筹码
## DoubleChip加倍筹码
## NewHand重新开始
## DoubleRepeat加倍下注
## Repeat重复
---

# AO动作
发送到AO
## Deal发牌
点击后AO进行发牌，返回发牌MsgID
根据MsgId获取到发牌后状态信息aOState
根据aoState显示UI

玩家牌，庄家牌
黑杰克（结算）

## Hit要牌
要到牌没爆牌
要到牌并爆牌

## Insurance保险
添加保险
返回成功
（这个比较独立可单独设计）

## Stand停牌
直接停牌
检查牌

## Split拆分
进行拆分
返回拆分结果

## Double加倍
进行加倍
并停牌

# 显示动作组合
## 一开始
【空】,无按钮
## 点击任意筹码后，或下注后
【加倍+发牌+清除】
## 点击发牌后
【停牌+要牌+加倍】(发牌后的)+可拆牌时【拆牌】+【保险】
【canDouble仅在发牌和拆分之后可以】
### 黑杰克（直接结束）
## 牌局结束后
【重新开始+再次下注+加倍下注】
## 加倍后

# 还原AOState状态
state=nil,初始状态
aoPlayer.State.activeHandIndex==2

