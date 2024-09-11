local crypto = require(".crypto");
local json = require("json");
Handlers.add(
    "Hit",
    -- 玩家点击Hit要牌
    Handlers.utils.hasMatchingTag("Action", "Hit"),
    function(msg)
        local playerAddr = msg.From
        local player = GetPlayerByAddr(playerAddr)

        --#region 检查Deal动作的有效性
        assert(player, '玩家不存在')
        assert(player.state, "牌局不存在")
        --#endregion

        UpdateSeed(msg["Block-Height"])
        local card = DealCard(player.state.deck)

        if player.state.activeHandIndex < 2 then
            --发第一手的牌
            table.insert(player.state.hands[1].cards, card);
            local hand1Points = GetCardsPoints(player.state.hands[1].cards)
            if hand1Points >= 21 then
                --爆牌或21点
                if #player.state.hands > 1 then
                    --有分牌，马上转第二手，并等待玩家动作
                    player.state.activeHandIndex = 2;
                    Handlers.utils.reply(json.encode(player))(msg)                    
                else
                    --只有一手牌
                    --给庄家发一张牌
                    local dealCard2 = DealCard(player.state.deck);
                    table.insert(player.state.dealerCards, dealCard2);
                    local judgeHand1 = Judge(player.state.hands[1].cards, player.state.dealerCards)
                    
                    SettleBalance(player, player.state.hands[1], judgeHand1)
                    SettleInsurance(player);

                    Handlers.utils.reply(json.encode(player))(msg)
                    -- 牌局结束
                    player.state = nil
                    return
                end
            else
                --还没爆牌，也没21点，直接返回。（可以继续要牌）
                Handlers.utils.reply(json.encode(player))(msg)
                return
            end
        else
            --发第二手牌
            local dealPlayerCard = DealCard(player.state.deck)
            table.insert(player.state.hands[2].cards, dealPlayerCard)
            local hand2Points = GetCardsPoints(player.state.hands[2].cards)
            if hand2Points >= 21 then
                --爆牌或21点
                --分牌后黑杰克算21点，庄家正常发牌
                ToDealer(player.state)               

                local judgeHand2 = Judge(player.state.hands[2].cards, player.state.dealerCards,true)
                SettleBalance(player, player.state.hands[2], judgeHand2)

                local judgeHand1 = Judge(player.state.hands[1].cards, player.state.dealerCards,true)
                SettleBalance(player, player.state.hands[1], judgeHand1)

                SettleInsurance(player);
                Handlers.utils.reply(json.encode(player))(msg)
                --牌局结束
                player.state = nil
                return
            else
                --还没爆牌，也没21点（可以继续要牌）
                Handlers.utils.reply(json.encode(player))(msg)
                return
            end
            -- 这句应不可达吧！
            return json.encode(player)
        end
    end
)
