local json = require("json");

Handlers.add(
    "Split",
    -- 玩家点了Stand按钮
    Handlers.utils.hasMatchingTag("Action", "Split"),
    function(msg)
        local playerAddr = msg.From
        local player = GetPlayerByAddr(playerAddr)

        --#region 检查分牌动作的有效性
        assert(player, '钱包地址为' .. playerAddr .. '的玩家不存在')

        --如果没有状态，也不继续
        assert(player.state, "玩家没有开始玩牌")

        --assert(false,player.state.hands[1].cards[2])
        --检查两张牌是否相同，相同才可以分
        local card1 = player.state.hands[1].cards[1]
        local card2 = player.state.hands[1].cards[2]
        local card1Point = GetPoint(card1)
        local card2Point = GetPoint(card2)
        assert(card1Point == card2Point, "两张牌不相同，不能拆分")
        --检查余额是否足够
        assert(player.balance > player.state.hands[1].amount, "拆牌余额不够")
        --#endregion

        -- 拆牌
        local hand2Card1 = table.remove(player.state.hands[1].cards)

        -- 发第1手的一张牌
        local hand1Card2 = DealCard(player.state.deck)
        table.insert(player.state.hands[1].cards, hand1Card2)

        --第二手
        local hand2Card2 = DealCard(player.state.deck)
        local hand2Cards = { hand2Card1, hand2Card2 }

        local splitAmount = player.state.hands[1].amount
        player.balance = player.balance - splitAmount

        local hand2 = { cards = hand2Cards, amount = splitAmount }
        table.insert(player.state.hands, hand2)

        --如果拆的是A对，将直接结束
        if card1Point == 11 then
            --结束标记
            player.state.activeHandIndex = 0;
            ToDealer(player.state)

            local judge = Judge(player.state.hands[1].cards, player.state.dealerCards, true)
            SettleBalance(player, player.state.hands[1], judge)

            --判断第二手：
            local judge = Judge(player.state.hands[2].cards, player.state.dealerCards, true)
            SettleBalance(player, player.state.hands[2], judge)
            -- 保险
            SettleInsurance(player);
            Handlers.utils.reply(json.encode(player))(msg)
            player.state = nil
            return
        end

        -- 发送发牌消息
        if GetCardsPoints(player.state.hands[1].cards) == 21 then
            --第一手结束，到第二手
            player.state.activeHandIndex = 2;
            if GetCardsPoints(player.state.hands[2].cards) == 21 then
                ToDealer(player.state)
                --判断第一手：
                local judge = Judge(player.state.hands[1].cards, player.state.dealerCards, true)
                SettleBalance(player, player.state.hands[1], judge)

                --判断第二手：
                local judge = Judge(player.state.hands[2].cards, player.state.dealerCards, true)
                SettleBalance(player, player.state.hands[2], judge)
                SettleInsurance(player);
                -- 表示第2手牌也结束了
                player.state.activeHandIndex = 0;
            end
        end

        Handlers.utils.reply(json.encode(player))(msg)

        -- 让牌局结束
        if player.state.activeHandIndex == 0 then
            player.state = nil
        end
    end
)
