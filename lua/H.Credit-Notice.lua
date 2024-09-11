Handlers.add(
    "Credit-Notice",
     Handlers.utils.hasMatchingTag("Action", "Credit-Notice"),
     function(msg)       
        -- local addr=msg.Tags.From  from应该是币的进程了
        local addr=msg.Tags.Sender
        local quantity = tonumber(msg.Tags.Quantity)
        for _, player in ipairs(Players) do
            if player.addr == addr then 
                -- 创建时已经赠送100，这里不再赠送                         
                player.balance = player.balance + quantity/100
                break
            end
        end    
        local reply="收到"..addr.."筹码："..quantity/100           
        Handlers.utils.reply(reply)(msg)
     end
)