local function toggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    SendAngularMessage("setVisible", shouldShow)
end

RegisterCommand("show-nui", function()
    toggleNuiFrame(true)
    debugPrint("Show NUI frame")
end)

RegisterNUICallback("hideFrame", function(_, cb)
    toggleNuiFrame(false)
    debugPrint("Hide NUI frame")
    cb({})
end)

RegisterNUICallback("getClientData", function(data, cb)
    debugPrint("Data sent by Angular", json.encode(data))

    -- Lets send back client coords to the Angular app for use
    local curCoords = GetEntityCoords(PlayerPedId())

    local retData <const> = { x = curCoords.x, y = curCoords.y, z = curCoords.z }
    cb(retData)
end)
