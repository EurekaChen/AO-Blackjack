local crypto = require(".crypto");
local json = require("json");
Handlers.add(
    "Double",
    -- 玩家点击加倍
    Handlers.utils.hasMatchingTag("Action", "Double"),
    function(msg)
        local playerAddr = msg.From
        local player = GetPlayerByAddr(playerAddr)

        --#region 检查Deal动作的有效性
        assert(player, '玩家不存在')
        assert(player.state, "牌局不存在")
        assert(player.balance >= player.state.hands[1].amount, "余额不够加倍")
        --#endregion

        UpdateSeed(msg["Block-Height"])
        local card = DealCard(player.state.deck)

        if player.state.activeHandIndex == 1 then
            --加倍第一手牌
            --给玩家再发一张牌
            table.insert(player.state.hands[1].cards, card);

            --收取筹码
            player.balance = player.balance - player.state.hands[1].amount;
            player.state.hands[1].amount = player.state.hands[1].amount * 2;

            if #player.state.hands > 1 then
                --有分牌， 不管输赢都进入第二手
                player.state.activeHandIndex = 2;
                --给第二手发一张牌
                local hand2Card2 = DealCard(player.state.deck)
                table.insert(player.state.hands[2].cards, hand2Card2);
                local hand2Points = GetCardsPoints(player.state.hands[2].cards)
                if hand2Points >= 21 then
                    --21点或暴牌，给庄家发一张牌
                    local dealerCard2 = DealCard(player.state.dealerCards)
                    table.insert(player.state.dealerCards, dealerCard2)
                    --结算第二手
                    local judgeHand2 = Judge(player.state.hands[2].cards, player.state.dealerCards)
                    SettleBalance(player, player.state.hands[2], judgeHand2)
                    SettleInsurance(player);
                end
                -- 继续
                Handlers.utils.reply(json.encode(player))(msg)
            else
                --只有一手牌
                --给庄家发牌
                ToDealer(player.state)
                --判断输赢
                local judgeHand1 = Judge(player.state.hands[1].cards, player.state.dealerCards)
                SettleBalance(player, player.state.hands[1], judgeHand1)
                SettleInsurance(player);
                Handlers.utils.reply(json.encode(player))(msg)

                --结束该局
                player.state = nil
                return
            end
        else
            --第二手的牌加倍
            player.balance = player.balance - player.state.hands[2].amount;
            player.state.hands[2].amount = player.state.hands[2].amount * 2;
            --加倍后发一张牌
            local hand2Card2 = DealCard(player.state.deck)
            table.insert(player.state.hands[2].cards, hand2Card2);

            -- 直接给庄家发牌
            ToDealer(player.state)
            local judgeHand2 = Judge(player.state.hands[2].cards, player.state.dealerCards)

            SettleBalance(player, player.state.hands[2], judgeHand2)
            SettleInsurance(player);

            Handlers.utils.reply(json.encode(player))(msg)
            --牌局结束
            player.state = nil
        end
    end
)
