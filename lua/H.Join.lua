local json = require('json')
Handlers.add(
    "Join",
    Handlers.utils.hasMatchingTag("Action", "Join"),
    function(msg)
        --local data = { name = data.name, addr = data.addr,balance=100 }
        local data = json.decode(msg.Data)

        --赠送100
        data.balance = data.balance or 100;
        
        local found = false
        for _, member in ipairs(Players) do
            if member.addr == data.addr then
                found = true
                break
            end
        end

        -- 不存在钱包地址，则新加入，如果已经存在，则无需再加入。
        if not found then
            table.insert(Players, data)
            Handlers.utils.reply("success")(msg)
        else
            Handlers.utils.reply("exist")(msg)
        end
    end
)
