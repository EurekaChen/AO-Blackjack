local json = require('json')
function SettleBalance(player, hand, result)
    if result == Result.Win then
        player.balance = player.balance + 2 * hand.amount
        hand.amount = 0;
        return
    end

    if result == Result.Lose then
        hand.amount = 0
        return
    end

    if result == Result.Tie then
        player.balance = player.balance + hand.amount
        hand.amount = 0
    end
end

function SettleInsurance(player)
    if player.state.insurance > 0 then
        if IsBlackjack(player.state.dealCards) then
            player.balance = player.balance + player.state.insurance * 2;
            player.state.insurance = 0;
        else
            player.state.insurance = 0;
        end
    end
end
