local crypto = require(".crypto");
local json = require("json");
Handlers.add(
    "Insurance",
    -- 玩家点击保险
    Handlers.utils.hasMatchingTag("Action", "Insurance"),
    function(msg)
        local playerAddr = msg.From
        local player = GetPlayerByAddr(playerAddr)

        --#region 检查Deal动作的有效性
        assert(player, '玩家不存在')
        assert(player.state, "牌局不存在")
        assert(player.balance >= player.state.hands[1].amount/2, "余额不够加倍")
        assert(GetPoint(player.state.dealerCards[1])==11, "庄家明牌必须是A才可以买保险" )
        --#endregion

        player.state.insurance=player.state.hands[1].amount/2;
        player.balance=player.balance-player.state.insurance;
        Handlers.utils.reply(json.encode(player))(msg)       
       
    end
)
