```mermaid
flowchart TD
    A((开始)) 
    --> 游戏界面
    --> 点击增加筹码
    -->Start[[跳出筹码页面]]
    -->获取钱包筹码余额
    -->Enough{是否大于等于5}
    --否-->提示筹码不够
   
    
    Enough--是-->显示筹码输入
    -->用户输入筹码
    -->点击带入筹码
    -->Deposit
    -->打开钱包签名
    -->confirm{确定签名}
    --否-->显示您已经取消

    confirm--是-->检查DepositResult
    -->获取Quanity
    -->检查数量
    -->显示存入成功

   