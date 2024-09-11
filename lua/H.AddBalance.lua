local json = require('json')

Handlers.add(
    "AddBalance",
    Handlers.utils.hasMatchingTag("Action", "AddBalance"),
    function(msg)
        local addr = msg.Tags.Addr;
        local amount = msg.Tags.Amount;
        local player = GetPlayerByAddr(addr)    
        if player then
            player.balance=player.balance+tonumber(amount);
            Handlers.utils.reply(json.encode(player))(msg)           
        end
    end
)
