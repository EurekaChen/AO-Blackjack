local json = require("json");
Handlers.add(
    "Stand",
    -- 玩家点了Stand按钮
    Handlers.utils.hasMatchingTag("Action", "Stand"),
    function(msg)
        local playerAddr = msg.From
        local player = GetPlayerByAddr(playerAddr)

        --#region 检查Deal动作的有效性
        assert(player, '钱包地址为' .. playerAddr .. '的玩家不存在')

        --如果没有状态，也不继续
        assert(player.state, "玩家没有开始玩牌")
        --#endregion

        --如果当前为第1手牌，并且有两手牌（做过Split），转到第二手等待要牌：
        if player.state.activeHandIndex == 1 and #player.state.hands > 1 then
            player.state.activeHandIndex = 2          
            Handlers.utils.reply(json.encode(player))(msg)
        else
            -- 亮庄家的底牌
            UpdateSeed(msg["Block-Height"])
            local holeCard = DealCard(player.state.deck)
            table.insert(player.state.dealerCards, holeCard)

            -- 给庄家发牌
            ToDealer(player.state)

            for _, hand in ipairs(player.state.hands) do
                local isSplit = #player.state.hands > 1
                local winLose = Judge(hand.cards, player.state.dealerCards, isSplit)
                SettleBalance(player, hand, winLose)
            end
                        
            SettleInsurance(player);
            
            Handlers.utils.reply(json.encode(player))(msg)
            --结束牌局
            player.state = nil
        end
    end
)
