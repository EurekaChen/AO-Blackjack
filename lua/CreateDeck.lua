-- 创建新的一副牌
function CreateDeck()
    local suits = { "h", "d", "c", "s" }
    local values = { "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A" }
    local deck = {}
    for _, suit in ipairs(suits) do
        for _, value in ipairs(values) do
            table.insert(deck, value .. suit)
        end
    end
    return deck
end

