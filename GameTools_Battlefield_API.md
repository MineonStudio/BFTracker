# GameTools Battlefield Stats API 文档

> **Base URL:** `https://api.gametools.network`  
> **认证方式:** 无需 API Key，免费公开使用  
> **请求方式:** HTTP GET / POST  
> **响应格式:** JSON  
> **API 版本:** v1.3.0  
> **整理日期:** 2026-04-16

---

## 目录

- [Battlefield 6](#bf6)
- [Battlefield 2042](#bf2042)
- [Battlefield V](#bfv)
- [Battlefield 1](#bf1)
- [Battlefield 4](#bf4)
- [Battlefield 3](#bf3)
- [Battlefield 2](#bf2)
- [Battlefield Hardline](#bfh)
- [全局查询（跨游戏）](#bfglobal)
- [BFBan 封禁检测](#bfban)
- [BF-EAC 封禁检测](#bfeac)

---

## Battlefield 6

### `GET /bf6/availabletags/`

**说明:** get list of available server/experience tags

**请求参数:** 无

**响应 200:** get list of available server/experience tags

---

### `GET /bf6/detailedserver/`

**说明:** Get a list of servers from portal based on given name

**请求示例:**
```
GET https://api.gametools.network/bf6/detailedserver/?name=<name>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | searching based on servername |
| `experiencename` | string | null | 可选 | the name of the experience within portal.battlefield.com. |
| `serverid` | string | null | 可选 | Using a more permanent id of the server |
| `return_ownername` | boolean | 可选 | return_ownername will make it return the info a bit slower but returns the owner's name, use /bf2042/feslid/ if you want it seperate，默认: `True` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** serverinfo based on given name

---

### `GET /bf6/experience/`

**说明:** Gets some basic info about a experience made in portal

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `experienceid` | string | 可选 | Experience id |

**响应 200:** Successful Response

---

### `GET /bf6/gameevents/`

**说明:** Get list of game events

**请求参数:** 无

**响应 200:** Get list of dlc's that can be bought

---

### `GET /bf6/licenserequirements/`

**说明:** Get the license requirements for different maps in Portal

**请求参数:** 无

**响应 200:** Successful Response

---

### `POST /bf6/multiple/`

**说明:** Get for multiple players via grpc (max 128 players at a time)

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `categories` | array | 可选 | Which category to get the stats for, singleplayer or multiplayer，默认: `['multiplayer']` |
| `raw` | boolean | 可选 | If it needs to return the raw stats，默认: `False` |
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `seperation` | boolean | 可选 | If it also needs to return the stats seperated by gamemode and season，默认: `False` |

**请求体 (JSON):**

**响应 200:** stats of a player based on given name

---

### `GET /bf6/player/`

**说明:** Get id of a player within bf6

**请求示例:**
```
GET https://api.gametools.network/bf6/player/?name=<name>&playerid=<playerid>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to search for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `nucleus_id` | integer | null | 可选 | Platform specific id of the player (oid) |

**响应 200:** playerlist based on given name

---

### `GET /bf6/playground/`

**说明:** Gets some basic info about a experience made in portal

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `experienceid` | string | 可选 | Experience id |
| `playgroundid` | string | 可选 | Same as experience id, for backwards compatibility with 2042 |
| `experiencecode` | string | 可选 | Experience code |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** Successful Response

---

### `GET /bf6/profile/`

**说明:** Get profile from the given player for bf6

**请求示例:**
```
GET https://api.gametools.network/bf6/profile/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `nucleus_id` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses (both ps4, ps5 and xboxone and xboxseries are as if they are the same platform for stats)，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `True` |

**响应 200:** playerlist based on given name

---

### `GET /bf6/progressiontypes/`

**说明:** Get the available progression types for Portal

**请求参数:** 无

**响应 200:** Get the available progression types for Portal

---

### `GET /bf6/servers/`

**说明:** Get a list of servers from portal based on given name

**请求示例:**
```
GET https://api.gametools.network/bf6/servers/?name=<name>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | searching based on servername |
| `experiencename` | string | null | 可选 | the name of the experience within portal.battlefield.com. |
| `experiencecode` | string | null | 可选 | search by the experience code |
| `playground_id` | string | null | 可选 | search by the playground id |
| `region` | string | 可选 | The regions available are: all (all regions), eu, asia, nam (north america), sam (south america), afr (Africa) or oc (Oceana).，默认: `all` |
| `maps` | string | 可选 | The available maps are: 'Siege of Cairo', 'Empire State', 'Iberian Offensive', 'Liberation Peak', 'Manhattan Bridge', 'Operation Firestorm', 'Saints Quarter', 'New Sobek City' and 'Mirak Valley' |
| `modes` | string | 可选 | The available modes are: 'Breakthrough Large', 'Breakthrough', 'Conquest', 'Custom', 'Rush' and 'Conquest large' |
| `platform` | string | 可选 | For platform there is pc, xboxone and ps4, ps5, xboxseries and steam |
| `owners` | string | null | 可选 | to filter by serverowner, send a array like this: owners=[{"nucleusid":2800753812,"personaid":794397421,"platformid":1}] or owners=[{"nucleusid":2800753812,"personaid":794397421,"platform":"pc"}] (query formatted ofc) |

**响应 200:** serverlist based on given name

---

### `GET /bf6/shared_playground/`

**说明:** Gets some basic info about a experience made in portal

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `experiencecode` | string | 可选 | Experience code |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** Successful Response

---

### `GET /bf6/stats/`

**说明:** Get stats from the given player for bf6

**请求示例:**
```
GET https://api.gametools.network/bf6/stats/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `categories` | array | 可选 | Which category to get the stats for, singleplayer or multiplayer，默认: `['multiplayer']` |
| `raw` | boolean | 可选 | If it needs to return the raw stats，默认: `False` |
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `seperation` | boolean | 可选 | If it also needs to return the stats seperated by gamemode and season，默认: `False` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `nucleus_id` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses (both ps4, ps5 and xboxone and xboxseries are as if they are the same platform for stats)，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `True` |

**响应 200:** stats of a player based on given name

---

### `GET /bf6/status/`

**说明:** Get the player- / serveramount for all regions for Battlefield 6 portal.

**请求参数:** 无

**响应 200:** a list of how many people are playing the game in that region

---

### `GET /bf6/statusarray/`

**说明:** Get the player- / serveramount for all regions from database gathered every hour for Battlefield 6 portal.

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |
| `region` | string | 可选 | Region to get historic values for，默认: `all` |
| `type` | string | 可选 | Type of historic data to return，默认: `amounts` |

**响应 200:** start and end time are EPOCH UTC timestamps, the arrays below it are from start to end time every hour as a value

---

### `GET /bf6/storecatalog/`

**说明:** Get list of dlc's that can be bought

**请求参数:** 无

**响应 200:** Get list of dlc's that can be bought

---

### `GET /bf6/translations/`

**说明:** translation files used for portal and serveritems (warning: a lot of data)

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** id to translated text

---

## Battlefield 2042

### `GET /bf2042/availabletags/`

**说明:** get list of available server/experience tags

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** get list of available server/experience tags

---

### `GET /bf2042/constraints/`

**说明:** get the global limits for portal

**请求参数:** 无

**响应 200:** get the global limits for portal

---

### `GET /bf2042/detailedserver/`

**说明:** Get a list of servers from portal based on given name

**请求示例:**
```
GET https://api.gametools.network/bf2042/detailedserver/?name=<name>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | searching based on servername |
| `experiencename` | string | null | 可选 | the name of the experience within portal.battlefield.com. |
| `serverid` | string | null | 可选 | Using a more permanent id of the server |
| `return_ownername` | boolean | 可选 | return_ownername will make it return the info a bit slower but returns the owner's name, use /bf2042/feslid/ if you want it seperate，默认: `True` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** serverinfo based on given name

---

### `POST /bf2042/feslid/`

**说明:** Ask for the info about the username/avatar seperately

**请求参数:** 无

**请求体 (JSON):**

**响应 200:** if the experience code exists

---

### `GET /bf2042/feslid/`

**说明:** Ask for the info about the username/avatar seperately (get request for CORS)

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `platformid` | integer | 可选 | platform id (1 == pc, 2, ps4 and 3 xboxone) |
| `personaid` | integer | 可选 | ID of the playe |
| `nucleusid` | integer | 可选 | Platform specific id of the player (oid) |

**响应 200:** if the experience code exists

---

### `GET /bf2042/inventory/`

**说明:** playercard info, no info added about it yet

**请求示例:**
```
GET https://api.gametools.network/bf2042/inventory/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `nucleus_id` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses (both ps4, ps5 and xboxone and xboxseries are as if they are the same platform for stats)，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `True` |

**响应 200:** playercard info, no info added about it yet

---

### `GET /bf2042/mixinfo/`

**说明:** Get info about a submenu entry (via mixId)

**请求示例:**
```
GET https://api.gametools.network/bf2042/mixinfo/?mixid=<mixid>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `mixid` | string | **必填** | MixId of a menuitem |

**响应 200:** Get info about a submenu entry

---

### `POST /bf2042/multiple/`

**说明:** Get for multiple players via grpc (max 128 players at a time)

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `raw` | boolean | 可选 | If it needs to return the raw stats，默认: `False` |
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |

**请求体 (JSON):**

**响应 200:** stats of a player based on given name

---

### `GET /bf2042/offers/`

**说明:** Get the offers available in the store  (warning: a lot of data)

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** Get the offers available in the store

---

### `GET /bf2042/player/`

**说明:** Get id of a player within bf2042

**请求示例:**
```
GET https://api.gametools.network/bf2042/player/?name=<name>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | **必填** | Name of the player to search for |

**响应 200:** playerlist based on given name

---

### `GET /bf2042/playground/`

**说明:** Gets some basic info about a experience made in portal

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `playgroundid` | string | 可选 | Playground id |
| `experiencecode` | string | 可选 | Experience code |
| `blockydata` | boolean | 可选 | Wheter to add blockly data. If you use the experiencecode instead of playgroundID, playgroundID, owner and blockydata cant be gathered!，默认: `True` |
| `return_ownername` | boolean | 可选 | return_ownername will make it return the info a bit slower but returns the owner's name, use /bf2042/feslid/ if you want it seperate，默认: `True` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** serverinfo based on given name

---

### `GET /bf2042/progressiontypes/`

**说明:** Get the available progression types for Portal

**请求参数:** 无

**响应 200:** Get the available progression types for Portal

---

### `GET /bf2042/scheduledblueprint/`

**说明:** all currently available portal settings (warning: a lot of data)

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** all currently available portal settings

---

### `GET /bf2042/scheduledcollections/`

**说明:** All current menuitems of the game

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** All current menuitems of the game

---

### `GET /bf2042/serverarray/`

**说明:** Get the servers playeramount over time

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |
| `gameid` | string | null | 可选 | Id of the server to get historic values for |
| `serverid` | string | null | 可选 | A more permanent id of the server to get historic values for |
| `servername` | string | null | 可选 | Name of the server to get historic values for |

**响应 200:** Successful Response

---

### `GET /bf2042/servers/`

**说明:** Get a list of servers from portal based on given name

**请求示例:**
```
GET https://api.gametools.network/bf2042/servers/?name=<name>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | searching based on servername |
| `experiencename` | string | null | 可选 | the name of the experience within portal.battlefield.com. |
| `region` | string | 可选 | The regions available are: all (all regions), eu, asia, nam (north america), sam (south america), afr (Africa) or oc (Oceana).，默认: `all` |
| `maps` | string | 可选 | The available maps are: 'Arica Harbor', 'Valparaiso', 'Battle of the Bulge', 'El Alamein', 'Caspian Border', 'Noshahr Canals', 'Orbital', 'Hourglass', 'Kaleidoscope', 'Breakaway', 'Discarded', 'Manifest' and 'Renewal' |
| `modes` | string | 可选 | The available modes are: 'Breakthrough Large', 'Breakthrough', 'Conquest', 'Custom', 'Rush' and 'Conquest large' |
| `limit` | integer | 可选 | the max amount of servers it will gather, give it a number between 1 and 250.，默认: `10` |
| `platform` | string | 可选 | For platform there is pc, xboxone and ps4, ps5 and xboxseries |
| `owners` | string | null | 可选 | to filter by serverowner, send a array like this: owners=[{"nucleusid":2800753812,"personaid":794397421,"platformid":1}] or owners=[{"nucleusid":2800753812,"personaid":794397421,"platform":"pc"}] (query formatted ofc) |
| `has_password` | boolean | null | 可选 | If you want to filter out servers with/without a password |

**响应 200:** serverlist based on given name

---

### `GET /bf2042/stats/`

**说明:** Get stats from the given player for bf2042

**请求示例:**
```
GET https://api.gametools.network/bf2042/stats/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `raw` | boolean | 可选 | If it needs to return the raw stats，默认: `False` |
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `nucleus_id` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses (both ps4, ps5 and xboxone and xboxseries are as if they are the same platform for stats)，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `True` |

**响应 200:** stats of a player based on given name

---

### `GET /bf2042/statsarray/`

**说明:** Get changes in players' stats over time, this gets saved every time you use the standard stats command in the api or gamestats bot (stats are per day, max 1 month)

**请求示例:**
```
GET https://api.gametools.network/bf2042/statsarray/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `nucleus_id` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses (both ps4, ps5 and xboxone and xboxseries are as if they are the same platform for stats)，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `True` |

**响应 200:** start and end time are EPOCH UTC timestamps, the arrays below it are from start to end time every day as a value

---

### `GET /bf2042/status/`

**说明:** Get the player- / serveramount for all regions for Battlefield 2042 portal.

**请求参数:** 无

**响应 200:** a list of how many people are playing the game in that region

---

### `GET /bf2042/statusarray/`

**说明:** Get the player- / serveramount for all regions from database gathered every hour for Battlefield 2042 portal.

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |
| `region` | string | 可选 | Region to get historic values for，默认: `all` |
| `type` | string | 可选 | Type of historic data to return，默认: `amounts` |

**响应 200:** start and end time are EPOCH UTC timestamps, the arrays below it are from start to end time every hour as a value

---

### `GET /bf2042/storecatalog/`

**说明:** Get list of dlc's that can be bought

**请求参数:** 无

**响应 200:** Get list of dlc's that can be bought

---

### `GET /bf2042/translations/`

**说明:** translation files used for portal and serveritems (warning: a lot of data)

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** id to translated text

---

## Battlefield V

### `GET /bfv/all/`

**说明:** Get all stats for website

**请求示例:**
```
GET https://api.gametools.network/bfv/all/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** stats of a player based on given name

---

### `GET /bfv/classes/`

**说明:** Get class stats from the given player for bf5

**请求示例:**
```
GET https://api.gametools.network/bfv/classes/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** classlist of the given player

---

### `GET /bfv/constraints/`

**说明:** get the global limits for bfv servers

**请求参数:** 无

**响应 200:** if the api works

---

### `GET /bfv/detailedserver/`

**说明:** Get detailed info about 1 server

**请求示例:**
```
GET https://api.gametools.network/bfv/detailedserver/?name=<name>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | 可选 | Name of the server you want to search for |
| `gameid` | string | null | 可选 | Id of the server you want to search for |
| `platform` | string | 可选 | Platform of the server you want to search for，默认: `pc` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** detailed serverinfo based on given name

---

### `POST /bfv/multiple/`

**说明:** Get for multiple players via grpc (max 64 players at a time)

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `raw` | boolean | 可选 | If it needs to return the raw stats，默认: `False` |
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |

**请求体 (JSON):**

**响应 200:** stats of a player based on given name

---

### `GET /bfv/players/`

**说明:** get a list of players of a given server, use "," between gameids to request multiple (when you request multiple you wont get platoon info of players, max 10 servers per server)

**请求示例:**
```
GET https://api.gametools.network/bfv/players/?name=<name>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | 可选 | Name of the server you want to search for |
| `gameid` | string | null | 可选 | Id of the server you want to search for |

**响应 200:** playerlist based on given name

---

### `GET /bfv/playground/`

**说明:** Get info about a experience of a server

**请求示例:**
```
GET https://api.gametools.network/bfv/playground/?playgroundid=<playgroundid>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `playgroundid` | string | **必填** | - |

**响应 200:** if the experience code exists

---

### `GET /bfv/playgroundsbyowner/`

**说明:** Get info about a experience of a servers from a playerid

**请求示例:**
```
GET https://api.gametools.network/bfv/playgroundsbyowner/?player_id=<player_id>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `player_id` | integer | **必填** | - |

**响应 200:** if the playerid exists

---

### `GET /bfv/scheduledblueprint/`

**说明:** all currently available server settings

**请求参数:** 无

**响应 200:** if the api works

---

### `GET /bfv/serverarray/`

**说明:** Get the servers playeramount over time

**请求示例:**
```
GET https://api.gametools.network/bfv/serverarray/?platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |
| `gameid` | string | null | 可选 | Id of the server to get historic values for |
| `serverid` | string | null | 可选 | A more permanent id of the server to get historic values for |
| `servername` | string | null | 可选 | Name of the server to get historic values for |
| `platform` | string | 可选 | Platform to get historic values for，默认: `pc` |

**响应 200:** Successful Response

---

### `GET /bfv/servers/`

**说明:** Get a list of servers based on given name

**请求示例:**
```
GET https://api.gametools.network/bfv/servers/?name=<name>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | **必填** | Name of the server you want to search for |
| `platform` | string | 可选 | Platform of the server you want to search for，默认: `pc` |
| `limit` | integer | 可选 | Number of servers to return，默认: `10` |
| `region` | string | 可选 | -，默认: `all` |
| `player_filters` | string | 可选 | - |
| `map_filters` | string | 可选 | - |
| `server_type_filters` | string | 可选 | - |
| `is_password_protected` | boolean | 可选 | - |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** serverlist based on given name

---

### `GET /bfv/stats/`

**说明:** Get stats from the given player for bf5

**请求示例:**
```
GET https://api.gametools.network/bfv/stats/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** stats of a player based on given name

---

### `GET /bfv/statsarray/`

**说明:** Get changes in players' stats over time, this gets saved every time you use the standard stats command in the api or gamestats bot (stats are per day, max 1 month)

**请求示例:**
```
GET https://api.gametools.network/bfv/statsarray/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |

**响应 200:** start and end time are EPOCH UTC timestamps, the arrays below it are from start to end time every day as a value

---

### `GET /bfv/status/`

**说明:** Get the player- / serveramount for all regions.

**请求示例:**
```
GET https://api.gametools.network/bfv/status/?platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `platform` | string | 可选 | Platform to get amounts for，默认: `pc` |

**响应 200:** a list of how many people are playing the game in that region

---

### `GET /bfv/statusarray/`

**说明:** Get the player- / serveramount for all regions from database gathered every hour.

**请求示例:**
```
GET https://api.gametools.network/bfv/statusarray/?platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |
| `region` | string | 可选 | Region to get historic values for，默认: `all` |
| `platform` | string | 可选 | Platform to get historic values for，默认: `pc` |
| `type` | string | 可选 | Type of historic data to return，默认: `amounts` |

**响应 200:** start and end time are EPOCH UTC timestamps, the arrays below it are from start to end time every hour as a value

---

### `GET /bfv/sus/`

**说明:** Get sus weapon stats from the given player for bf5

**请求示例:**
```
GET https://api.gametools.network/bfv/sus/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** vehiclelist of the given player

---

### `GET /bfv/vehicles/`

**说明:** Get vehicle stats from the given player for bf5

**请求示例:**
```
GET https://api.gametools.network/bfv/vehicles/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** vehiclelist of the given player

---

### `GET /bfv/weapons/`

**说明:** Get weapon stats from the given player for bf5

**请求示例:**
```
GET https://api.gametools.network/bfv/weapons/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** weaponlist of the given player

---

## Battlefield 1

### `GET /bf1/all/`

**说明:** Get all stats for website

**请求示例:**
```
GET https://api.gametools.network/bf1/all/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** stats of a player based on given name

---

### `GET /bf1/classes/`

**说明:** Get class stats from the given player for bf1

**请求示例:**
```
GET https://api.gametools.network/bf1/classes/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** classlist of the given player

---

### `GET /bf1/detailedserver/`

**说明:** Get detailed info about 1 server

**请求示例:**
```
GET https://api.gametools.network/bf1/detailedserver/?name=<name>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | 可选 | Name of the server you want to search for |
| `gameid` | string | null | 可选 | Id of the server you want to search for |
| `platform` | string | 可选 | Platform of the server you want to search for，默认: `pc` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** detailed serverinfo based on given name

---

### `GET /bf1/gamemode/`

**说明:** Get gamemode stats from the given player for bf1

**请求示例:**
```
GET https://api.gametools.network/bf1/gamemode/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** gamemodes of the given player

---

### `POST /bf1/multiple/`

**说明:** Get for multiple players via blaze (max 64 players at a time)

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `raw` | boolean | 可选 | If it needs to return the raw stats，默认: `False` |
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |

**请求体 (JSON):**

**响应 200:** stats of a player based on given name

---

### `GET /bf1/player/`

**说明:** Get id of a player within bf1

**请求示例:**
```
GET https://api.gametools.network/bf1/player/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |

**响应 200:** General stats of the given player

---

### `GET /bf1/players/`

**说明:** get a list of players of a given server, use "," between gameids to request multiple (when you request multiple you wont get platoon info of players, max 10 servers per server)

**请求示例:**
```
GET https://api.gametools.network/bf1/players/?name=<name>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the server you want to search for |
| `gameid` | string | null | 可选 | Id of the server you want to search for |

**响应 200:** playerlist based on given name

---

### `GET /bf1/progress/`

**说明:** Get progress of the medals of the given player for bf1

**请求示例:**
```
GET https://api.gametools.network/bf1/progress/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** progress of the given player

---

### `GET /bf1/seederplayers/`

**说明:** get a list of players of a given server from the "playerlist sender.exe" or the seeding systems' automated message system.

**请求示例:**
```
GET https://api.gametools.network/bf1/seederplayers/?name=<name>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the server you want to search for |
| `id` | string | null | 可选 | unique sender id |
| `gameid` | integer | null | 可选 | Id of the server you want to search for |

**响应 200:** playerlist based on given ID

---

### `GET /bf1/serverarray/`

**说明:** Get the servers playeramount over time

**请求示例:**
```
GET https://api.gametools.network/bf1/serverarray/?platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |
| `gameid` | string | null | 可选 | Id of the server to get historic values for |
| `serverid` | string | null | 可选 | A more permanent id of the server to get historic values for |
| `servername` | string | null | 可选 | Name of the server to get historic values for |
| `platform` | string | 可选 | Platform to get historic values for，默认: `pc` |

**响应 200:** Successful Response

---

### `GET /bf1/servers/`

**说明:** Get a list of servers based on given name

**请求示例:**
```
GET https://api.gametools.network/bf1/servers/?name=<name>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | **必填** | Name of the server you want to search for |
| `platform` | string | 可选 | Platform of the server you want to search for，默认: `pc` |
| `limit` | integer | 可选 | Number of servers to return，默认: `10` |
| `region` | string | 可选 | -，默认: `all` |
| `gamemode_filters` | string | 可选 | - |
| `map_filters` | string | 可选 | - |
| `player_filters` | string | 可选 | - |
| `server_type_filters` | string | 可选 | - |
| `is_password_protected` | boolean | null | 可选 | - |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** serverlist based on given name

---

### `GET /bf1/stats/`

**说明:** Get stats from the given player for bf1

**请求示例:**
```
GET https://api.gametools.network/bf1/stats/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** stats of a player based on given name

---

### `GET /bf1/statsarray/`

**说明:** Get changes in players' stats over time, this gets saved every time you use the standard stats command in the api or gamestats bot (stats are per day, max 1 month)

**请求示例:**
```
GET https://api.gametools.network/bf1/statsarray/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |

**响应 200:** start and end time are EPOCH UTC timestamps, the arrays below it are from start to end time every day as a value

---

### `GET /bf1/status/`

**说明:** Get the player- / serveramount for all regions.

**请求示例:**
```
GET https://api.gametools.network/bf1/status/?platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `platform` | string | 可选 | Platform to get amounts for，默认: `pc` |

**响应 200:** a list of how many people are playing the game in that region

---

### `GET /bf1/statusarray/`

**说明:** Get the player- / serveramount for all regions from database gathered every hour.

**请求示例:**
```
GET https://api.gametools.network/bf1/statusarray/?platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |
| `region` | string | 可选 | Region to get historic values for，默认: `all` |
| `platform` | string | 可选 | Platform to get historic values for，默认: `pc` |
| `type` | string | 可选 | Type of historic data to return，默认: `amounts` |

**响应 200:** start and end time are EPOCH UTC timestamps, the arrays below it are from start to end time every hour as a value

---

### `GET /bf1/sus/`

**说明:** Get sus weapon stats from the given player for bf1

**请求示例:**
```
GET https://api.gametools.network/bf1/sus/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** vehiclelist of the given player

---

### `GET /bf1/vehicles/`

**说明:** Get vehicle stats from the given player for bf1

**请求示例:**
```
GET https://api.gametools.network/bf1/vehicles/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** vehiclelist of the given player

---

### `GET /bf1/weapons/`

**说明:** Get weapon stats from the given player for bf1

**请求示例:**
```
GET https://api.gametools.network/bf1/weapons/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** weaponlist of the given player

---

## Battlefield 4

### `GET /bf4/all/`

**说明:** Get all stats for website

**请求示例:**
```
GET https://api.gametools.network/bf4/all/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |

**响应 200:** stats of a player based on given name

---

### `GET /bf4/detailedserver/`

**说明:** Get detailed info about 1 server

**请求示例:**
```
GET https://api.gametools.network/bf4/detailedserver/?name=<name>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | 可选 | Name of the server you want to search for |
| `gameid` | string | null | 可选 | Id of the server you want to search for |
| `platform` | string | 可选 | Platform of the server you want to search for，默认: `pc` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** detailed serverinfo based on given name

---

### `GET /bf4/serverarray/`

**说明:** Get the servers playeramount over time

**请求示例:**
```
GET https://api.gametools.network/bf4/serverarray/?platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |
| `gameid` | string | null | 可选 | Id of the server to get historic values for |
| `serverid` | string | null | 可选 | A more permanent id of the server to get historic values for |
| `servername` | string | null | 可选 | Name of the server to get historic values for |
| `platform` | string | 可选 | Platform to get historic values for，默认: `pc` |

**响应 200:** Successful Response

---

### `GET /bf4/servers/`

**说明:** Get a list of servers based on given name

**请求示例:**
```
GET https://api.gametools.network/bf4/servers/?name=<name>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | **必填** | Name of the server you want to search for |
| `platform` | string | 可选 | Platform of the server you want to search for，默认: `pc` |
| `limit` | integer | 可选 | Number of servers to return，默认: `10` |
| `region` | string | 可选 | -，默认: `all` |
| `gamemode_filters` | string | 可选 | - |
| `player_filters` | string | 可选 | - |
| `server_type_filters` | string | 可选 | - |
| `is_password_protected` | boolean | 可选 | - |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** serverlist based on given name

---

### `GET /bf4/stats/`

**说明:** Get stats from the given player for bf4

**请求示例:**
```
GET https://api.gametools.network/bf4/stats/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |

**响应 200:** stats of a player based on given name

---

### `GET /bf4/statsarray/`

**说明:** Get changes in players' stats over time, this gets saved every time you use the standard stats command in the api or gamestats bot (stats are per day, max 1 month)

**请求示例:**
```
GET https://api.gametools.network/bf4/statsarray/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |

**响应 200:** start and end time are EPOCH UTC timestamps, the arrays below it are from start to end time every day as a value

---

### `GET /bf4/status/`

**说明:** Get the player- / serveramount for all regions.

**请求示例:**
```
GET https://api.gametools.network/bf4/status/?platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `platform` | string | 可选 | Platform to get amounts for，默认: `pc` |

**响应 200:** a list of how many people are playing the game in that region

---

### `GET /bf4/statusarray/`

**说明:** Get the player- / serveramount for all regions from database gathered every hour.

**请求示例:**
```
GET https://api.gametools.network/bf4/statusarray/?platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |
| `region` | string | 可选 | Region to get historic values for，默认: `all` |
| `platform` | string | 可选 | Platform to get historic values for，默认: `pc` |
| `type` | string | 可选 | Type of historic data to return，默认: `amounts` |

**响应 200:** start and end time are EPOCH UTC timestamps, the arrays below it are from start to end time every hour as a value

---

### `GET /bf4/vehicles/`

**说明:** Get weapon stats from the given player for bf4

**请求示例:**
```
GET https://api.gametools.network/bf4/vehicles/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |

**响应 200:** vehiclelist of the given player

---

### `GET /bf4/weapons/`

**说明:** Get weapon stats from the given player for bf4

**请求示例:**
```
GET https://api.gametools.network/bf4/weapons/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |

**响应 200:** weaponlist of the given player

---

## Battlefield 3

### `GET /bf3/all/`

**说明:** Get all stats for website

**请求示例:**
```
GET https://api.gametools.network/bf3/all/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |

**响应 200:** stats of a player based on given name

---

### `GET /bf3/detailedserver/`

**说明:** Get detailed info about 1 server

**请求示例:**
```
GET https://api.gametools.network/bf3/detailedserver/?name=<name>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the server you want to search for |
| `gameid` | string | null | 可选 | Id of the server you want to search for |

**响应 200:** detailed serverinfo based on given name

---

### `GET /bf3/serverarray/`

**说明:** Get the servers playeramount over time

**请求示例:**
```
GET https://api.gametools.network/bf3/serverarray/?platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |
| `gameid` | string | null | 可选 | - |
| `serverid` | string | null | 可选 | - |
| `servername` | string | null | 可选 | - |
| `platform` | string | 可选 | -，默认: `pc` |

**响应 200:** Successful Response

---

### `GET /bf3/servers/`

**说明:** Get a list of servers based on given name

**请求示例:**
```
GET https://api.gametools.network/bf3/servers/?name=<name>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | **必填** | Name of the server you want to search for |
| `gamemode_filters` | string | 可选 | - |
| `map_filters` | string | 可选 | - |
| `player_filters` | string | 可选 | - |

**响应 200:** serverlist based on given name

---

### `GET /bf3/stats/`

**说明:** Get stats from the given player for bf3

**请求示例:**
```
GET https://api.gametools.network/bf3/stats/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |

**响应 200:** stats of a player based on given name

---

### `GET /bf3/status/`

**说明:** Get the player- / serveramount for all regions.

**请求参数:** 无

**响应 200:** a list of how many people are playing the game in that region

---

### `GET /bf3/statusarray/`

**说明:** Get the player- / serveramount for all regions from database gathered every hour.

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |
| `region` | string | 可选 | Region to get historic values for，默认: `all` |

**响应 200:** start and end time are EPOCH UTC timestamps, the arrays below it are from start to end time every hour as a value

---

### `GET /bf3/vehicles/`

**说明:** Get weapon stats from the given player for bf3

**请求示例:**
```
GET https://api.gametools.network/bf3/vehicles/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |

**响应 200:** vehiclelist of the given player

---

### `GET /bf3/weapons/`

**说明:** Get weapon stats from the given player for bf3

**请求示例:**
```
GET https://api.gametools.network/bf3/weapons/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |

**响应 200:** weaponlist of the given player

---

## Battlefield 2

### `GET /bf2/classes/`

**说明:** Get class/kit stats for the given player

**请求示例:**
```
GET https://api.gametools.network/bf2/classes/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `platform` | string | 可选 | Platform/service the player uses，默认: `bf2hub` |

**响应 200:** Class/kit stats of the given player

---

### `GET /bf2/leaderboard/`

**说明:** Get leaderboard of bf2

**请求示例:**
```
GET https://api.gametools.network/bf2/leaderboard/?platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `platform` | string | 可选 | Platform/service to use for the leaderboard，默认: `bf2hub` |

**响应 200:** Get leaderboard of bf2

---

### `GET /bf2/serverarray/`

**说明:** Get the servers playeramount over time

**请求示例:**
```
GET https://api.gametools.network/bf2/serverarray/?name=<name>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | **必填** | IP:port or hostname/servername of the server you want to search for |
| `type` | string | 可选 | Type of server property you want to search for，默认: `hostname` |
| `service` | string | 可选 | Platform/service to get amounts for，默认: `bf2hub` |
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |

**响应 200:** Successful Response

---

### `GET /bf2/servers/`

**说明:** Get a list of servers based on given name or ip:port

**请求示例:**
```
GET https://api.gametools.network/bf2/servers/?name=<name>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | **必填** | IP:port or hostname/servername of the server you want to search for |
| `type` | string | 可选 | Type of server property you want to search for，默认: `hostname` |
| `service` | string | 可选 | Service/platform the server uses，默认: `bf2hub` |

**响应 200:** serverlist based on given name

---

### `GET /bf2/stats/`

**说明:** Get general stats for the given player

**请求示例:**
```
GET https://api.gametools.network/bf2/stats/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `platform` | string | 可选 | Platform/service the player uses，默认: `bf2hub` |

**响应 200:** General stats of the given player

---

### `GET /bf2/status/`

**说明:** Get the current player-/server amount

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `service` | string | 可选 | Platform/service to get amounts from，默认: `all` |

**响应 200:** List of regions with current server and player amount (older Battlefield titles only return the "all"-region)

---

### `GET /bf2/statusarray/`

**说明:** Get historic player-/server amounts (gathered every hour)

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `service` | string | 可选 | Platform/service to get amounts for，默认: `bf2hub` |
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |

**响应 200:** Historical player amounts (list of values, list of respective timestamps as well as timestamps for start and end time)

---

### `GET /bf2/vehicles/`

**说明:** Get vehicle stats for the given player

**请求示例:**
```
GET https://api.gametools.network/bf2/vehicles/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `platform` | string | 可选 | Platform/service the player uses，默认: `bf2hub` |

**响应 200:** Vehicle stats of the given player

---

### `GET /bf2/weapons/`

**说明:** Get weapon stats for the given player

**请求示例:**
```
GET https://api.gametools.network/bf2/weapons/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `platform` | string | 可选 | Platform/service the player uses，默认: `bf2hub` |

**响应 200:** Weapon stats of the given player

---

## Battlefield Hardline

### `GET /bfh/all/`

**说明:** Get all stats for website

**请求示例:**
```
GET https://api.gametools.network/bfh/all/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |

**响应 200:** stats of a player based on given name

---

### `GET /bfh/detailedserver/`

**说明:** Get detailed info about 1 server

**请求示例:**
```
GET https://api.gametools.network/bfh/detailedserver/?name=<name>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the server you want to search for |
| `gameid` | string | null | 可选 | Id of the server you want to search for |

**响应 200:** detailed serverinfo based on given name

---

### `GET /bfh/serverarray/`

**说明:** Get the servers playeramount over time

**请求示例:**
```
GET https://api.gametools.network/bfh/serverarray/?platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |
| `gameid` | string | null | 可选 | - |
| `serverid` | string | null | 可选 | - |
| `servername` | string | null | 可选 | - |
| `platform` | string | 可选 | -，默认: `pc` |

**响应 200:** Successful Response

---

### `GET /bfh/servers/`

**说明:** Get a list of servers based on given name

**请求示例:**
```
GET https://api.gametools.network/bfh/servers/?name=<name>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | **必填** | Name of the server you want to search for |
| `gamemode_filters` | string | 可选 | - |
| `map_filters` | string | 可选 | - |
| `player_filters` | string | 可选 | - |

**响应 200:** serverlist based on given name

---

### `GET /bfh/stats/`

**说明:** Get stats from the given player for bfh

**请求示例:**
```
GET https://api.gametools.network/bfh/stats/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |

**响应 200:** stats of a player based on given name

---

### `GET /bfh/status/`

**说明:** Get the player- / serveramount for all regions.

**请求参数:** 无

**响应 200:** a list of how many people are playing the game in that region

---

### `GET /bfh/statusarray/`

**说明:** Get the player- / serveramount for all regions from database gathered every hour.

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |
| `region` | string | 可选 | Region to get historic values for，默认: `all` |

**响应 200:** start and end time are EPOCH UTC timestamps, the arrays below it are from start to end time every hour as a value

---

### `GET /bfh/vehicles/`

**说明:** Get weapon stats from the given player for bfh

**请求示例:**
```
GET https://api.gametools.network/bfh/vehicles/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |

**响应 200:** vehiclelist of the given player

---

### `GET /bfh/weapons/`

**说明:** Get weapon stats from the given player for bfh

**请求示例:**
```
GET https://api.gametools.network/bfh/weapons/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `format_values` | boolean | 可选 | If precentage values have to be returned as string, example: '50%' (enabled by default for backwards compatability)，默认: `True` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |

**响应 200:** weaponlist of the given player

---

## 全局查询（跨游戏）

### `GET /bfglobal/detailedplatoon/`

**说明:** Get info about the given platoon

**请求示例:**
```
GET https://api.gametools.network/bfglobal/detailedplatoon/?id=<id>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `id` | string | **必填** | Id of the platoon to search for |
| `platform` | string | 可选 | Platform to get amounts for，默认: `pc` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** platooinfo based on given id

---

### `GET /bfglobal/ea_desktop_backend/`

**说明:** check which tokens are still valid for the backend

**请求参数:** 无

**响应 200:** Successful Response

---

### `GET /bfglobal/games/`

**说明:** Get the games a user has

**请求示例:**
```
GET https://api.gametools.network/bfglobal/games/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `include_emblem` | boolean | 可选 | Include the player's emblem in the result，默认: `False` |
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |

**响应 200:** Get a list of games a player has

---

### `GET /bfglobal/platoons/`

**说明:** Search for a platoon

**请求示例:**
```
GET https://api.gametools.network/bfglobal/platoons/?name=<name>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | **必填** | Name of the platoon to search for |
| `platform` | string | 可选 | Platform to get amounts for，默认: `pc` |
| `lang` | string | null | 可选 | -，默认: `en-us` |

**响应 200:** platoonlist based on given name

---

### `GET /bfglobal/player/`

**说明:** Get the other ids of a user

**请求示例:**
```
GET https://api.gametools.network/bfglobal/player/?name=<name>&playerid=<playerid>&platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | null | 可选 | Name of the player to get stats for |
| `playerid` | integer | null | 可选 | ID of the player to get stats for |
| `oid` | integer | null | 可选 | Platform specific id of the player (oid) |
| `platform` | string | 可选 | Platform the player uses，默认: `pc` |
| `skip_battlelog` | boolean | 可选 | If it needs to skip the battlelog player search，默认: `False` |

**响应 200:** Successful Response

---

### `GET /bfglobal/search/`

**说明:** Search for a player

**请求示例:**
```
GET https://api.gametools.network/bfglobal/search/?name=<name>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `name` | string | **必填** | Name of the player to search for |

**响应 200:** players based on given name

---

### `GET /bfglobal/statusarray/`

**说明:** Get the player- / serveramount for all regions from database gathered every hour.

**请求示例:**
```
GET https://api.gametools.network/bfglobal/statusarray/?platform=<platform>
```

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |
| `platform` | string | 可选 | Platform to get amounts for，默认: `pc` |

**响应 200:** start and end time are EPOCH UTC timestamps, the arrays below it are from start to end time every hour as a value

---

### `GET /bfglobal/totalstatusarray/`

**说明:** Total server and playeramount for all games combined

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `days` | integer | 可选 | Number of days to get historic values for，默认: `7` |

**响应 200:** start and end time are EPOCH UTC timestamps, the arrays below it are from start to end time every hour as a value

---

## BFBan 封禁检测

### `GET /bfban/banned_players/`

**说明:** Get all banned players ids from bfban (used internally, cached for 1 hour)

**请求参数:** 无

**响应 200:** personaids of banned players

---

### `GET /bfban/checkban/`

**说明:** check if list of player is banned in bfban

**请求参数:**

| 参数名 | 类型 | 是否必填 | 说明 |
|--------|------|----------|------|
| `names` | string | 可选 | - |
| `userids` | string | 可选 | - |
| `personaids` | string | 可选 | - |

**响应 200:** playerlist based on given example

---

### `POST /bfban/checkban/`

**说明:** check if list of player is banned in bfban

**请求参数:** 无

**请求体 (JSON):**

**响应 200:** playerlist based on given example

---

## BF-EAC 封禁检测

### `GET /bfeac/banned_players`

**说明:** Get all banned player ids from bfeac (used internally, cached for 1 hour)

**请求参数:** 无

**响应 200:** personaids of banned players

---
