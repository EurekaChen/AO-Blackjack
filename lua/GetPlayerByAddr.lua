function GetPlayerByAddr(addr)
    for _, player in ipairs(Players) do
        if player.addr == addr then
            return player
        end
    end
end

