local json = require("json");

Handlers.add(
    "GetPlayers",
    Handlers.utils.hasMatchingTag("Action", "GetPlayers"),
    function(msg)      
        if msg.From==Owner then
            local allPlayers = json.encode(Players)    
            Handlers.utils.reply(allPlayers)(msg)
        end       
    end
)
