local crypto = require(".crypto");
local json = require("json");



Handlers.add(
    "Deal",
    -- 玩家下注并点击了Deal按钮
    Handlers.utils.hasMatchingTag("Action", "Deal"),
    function(msg)
        local playerAddr = msg.From --msg.Tags.Sender
        local amount = tonumber(msg.Tags.Amount)

        local player = GetPlayerByAddr(playerAddr)

        --#region 检查Deal动作的有效性
        assert(player, '钱包地址为' .. playerAddr .. '的玩家不存在')

        --如果超出范围，也不给发牌
        --按理说从client发过来的amount就在范围里
        --但如果有人用程序直接发过来，我还是给它拒绝了。
        assert(amount >= 5 and amount <= 5000, '金额必须大于10或小于5000')

        --如果已经在玩牌，也不给发牌
        assert(not player.state, "玩家上一牌局还未结束")
        --#endregion

        -- 创建一副牌
        local deck = CreateDeck()

        -- 注：不用洗牌的方式以免透露牌面信息，而是采用剩余牌里随机抽取的方式！
        -- shuffleDeck(deck)

        -- 给玩家发牌
        UpdateSeed(msg["Block-Height"])
        -- UpdateSeed(msg.Timestamp)
        local playerCards = {}
        local playerCard1 = DealCard(deck)
        table.insert(playerCards, playerCard1)
        local playerCard2 = DealCard(deck)
        table.insert(playerCards, playerCard2)

        -- 给庄家发牌
        local dealerCards = {}
        local dealcard1 = DealCard(deck)
        table.insert(dealerCards, dealcard1)

        -- 发牌即收筹码
        player.balance = player.balance - amount;

        -- 创建玩家状态
        player.state = {
            --可能会拆分成两手牌，这是第一手。
            hands = { { cards = playerCards, amount = amount } },
            -- 当前在玩的那手牌索（注意js的话要减1）
            activeHandIndex = 1,
            -- 庄家的牌
            dealerCards = dealerCards,
            -- 在玩的一副扑克（可以考虑增加多副扑克）
            deck = deck,
            --初始下注量, 只在发牌是产生，而手牌数量可能加倍。
            originalAmount = amount,
            -- 买保险（通常为赌注一半）
            insurance = 0
        }

        --看玩家的牌是否为黑杰克
        if IsBlackjack(player.state.hands[1].cards) then
            local dealPoint = GetPoint(dealcard1)
            -- 庄家有可能黑杰克，也不再保险
            if dealPoint == 11 or dealPoint == 10 then
                local dealCard2 = DealCard(player.state.deck)
                table.insert(player.state.dealerCards, dealCard2)
                if IsBlackjack(player.state.dealerCards) then
                    --平局
                    player.balance = player.balance + player.state.hands[1].amount
                    player.state.hands[1].amount = 0;
                else
                    --玩家赢
                    player.balance = player.balance + player.state.hands[1].amount * 2.5
                    player.state.hands[1].amount = 0;
                end
            else
                --直接赢牌
                local dealCard2 = DealCard(player.state.deck)
                table.insert(player.state.dealerCards, dealCard2)
                player.balance = player.balance + player.state.hands[1].amount * 2.5
                player.state.hands[1].amount = 0;
            end

            Handlers.utils.reply(json.encode(player))(msg)
            --牌局结束
            player.state = nil;
        else
            Handlers.utils.reply(json.encode(player))(msg)
        end
    end
)
