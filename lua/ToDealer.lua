--给庄家发牌
function ToDealer(state)
    local dealPoints = GetCardsPoints(state.dealerCards)
    -- 一般按软17点计算，按硬17点计算略微增加庄家优势
    -- while dealPoints < 17 or HasSoft17(state.dealerCards) do
    --     local card = DealCard(state.deck)
    --     table.insert(state.dealerCards, card)
    --     dealPoints = GetCardsPoints(state.dealerCards)
    -- end

    while dealPoints < 17 do
        local card = DealCard(state.deck)
        table.insert(state.dealerCards, card)
        dealPoints = GetCardsPoints(state.dealerCards)
    end
end
