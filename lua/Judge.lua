function Judge(playerCards, dealerCards, isSplit)
    local playerPoints = GetCardsPoints(playerCards)
    local dealerPoints = GetCardsPoints(dealerCards);
    -- 玩家爆牌(未分牌时爆牌会直接结算)
    if playerPoints > 21 then
        return Result.Lose;
    -- 庄家爆牌或庄家的牌大
    elseif dealerPoints > 21 or playerPoints > dealerPoints then
        return Result.Win;
    -- 玩家的牌大
    elseif dealerPoints > playerPoints then
        return Result.Lose;
    -- 都是黑杰克但分过牌，玩家黑杰克不算
    elseif IsBlackjack(dealerCards) and IsBlackjack(playerCards) and isSplit then
        return Result.Lose
    else
    --其余情况：平局
        return Result.Tie
    end
end