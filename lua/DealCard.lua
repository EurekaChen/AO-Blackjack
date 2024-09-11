local crypto = require(".crypto");

function DealCard(deck)
    --好象包括了两端！
    --local randomCardIndex = crypto.random(1, #deck + 1,tostring(Seed))
    local randomCardIndex = crypto.random(1, #deck,tostring(Seed))
    local card = table.remove(deck, randomCardIndex)
    return card
end
