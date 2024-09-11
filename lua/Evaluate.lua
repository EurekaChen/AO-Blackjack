local crypto = require(".crypto");
local json = require("json");

function GetPoint(card)
    local rank = string.sub(card, 1, 1)
    if rank == "T" or rank == "J" or rank == "Q" or rank == "K" then
        return 10
    elseif rank == "A" then
        return 11 --默认先返回11
    else
        return tonumber(rank)
    end
end

-- 一个辅助函数，用于计算一手牌总值，将A视为1或11
function GetCardsPoints(cards)
    local total = 0
    local aceCount = 0

    for _, card in ipairs(cards) do
        local point = GetPoint(card)
        total = total + point
        if point == 11 then
            aceCount = aceCount + 1
        end
    end

    -- 如果点数大于21则调整A计为1
    while total > 21 and aceCount > 0 do
        total = total - 10
        aceCount = aceCount - 1
    end
    return total
end

function IsBust(cards)
    if GetCardsPoints(cards) > 21 then
        return true
    else
        return false
    end
end

function IsBlackjack(cards)
    if (not cards) then
        return false;
    end
    --必须是两张牌
    if #cards ~= 2 then
        return false
    end
    --有一张A和一张10
    if GetPoint(cards[1]) == 11 and GetPoint(cards[2]) == 10 then
        return true
    end
    --有一张10和一张A
    if GetPoint(cards[1]) == 10 and GetPoint(cards[2]) == 11 then
        return true
    end
    return false;
end

function HasSoft17(cards)
    local total = 0
    local aceCount = 0
    for _, card in ipairs(cards) do
        local point = GetPoint(card)
        total = total + point
        if point == "11" then
            aceCount = aceCount + 1
        end
    end
    while total > 21 and aceCount > 0 do
        total = total - 10
        aceCount = aceCount - 1
    end
    --当有A并且A作为11计算时为Soft17
    return aceCount > 0 and total == 17
end
