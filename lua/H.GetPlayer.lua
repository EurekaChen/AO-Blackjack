local json = require('json')

Handlers.add(
    "GetPlayer",
    Handlers.utils.hasMatchingTag("Action", "GetPlayer"),
    function(msg)
        local addr = msg.Data
        local player = GetPlayerByAddr(addr)
        -- 找到才返回消息！
        if player then
            Handlers.utils.reply(json.encode(player))(msg)           
        end
    end
)
