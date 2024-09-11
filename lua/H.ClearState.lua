local json = require('json')

Handlers.add(
    "ClearState",
    Handlers.utils.hasMatchingTag("Action", "ClearState"),
    function(msg)
        local addr = msg.Data
        local player = GetPlayerByAddr(addr)
        -- 找到才返回消息！
        if player then
            player.state=nil;
            Handlers.utils.reply(json.encode(player))(msg)           
        end
    end
)
