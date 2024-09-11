--.crypto前面的.不能少
local crypto=require(".crypto")
function UpdateSeed(forSeed)
    assert(forSeed,"生成种子的数字不存在")
    assert(tonumber(forSeed), "参数不是数字")

    local forSeedNumber = tonumber(forSeed)

    -- 生成一系列伪随机数
    local randomFactor1 = math.random()
    local randomFactor2 = math.random()
    local randomFactor3 = math.random()
    local randomFactor4 = math.random()

    -- 给合高度和随机因子创建复随机种子
    local mathing = ((forSeedNumber * randomFactor1) / (Seed + randomFactor2) * randomFactor3) +
    randomFactor4

    -- 确保种子为32位整数范围
    Seed = math.floor(mathing * 2 ^ 32) % 2 ^ 32

    --没有crypto.SeedIsaac(Seed)
    --参数必须为字符串，否则出错
    crypto.cipher.issac.seedIsaac(tostring(Seed))

end