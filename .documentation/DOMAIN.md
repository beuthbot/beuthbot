# Domain



## Message

| Name            | Type      | About | Required |
| --------------- | --------- | ----- | ------------------ |
| text | String | The actual text for the bot. |:white_check_mark:|
| telegramId | Int | The telegram id of the user. |  |

##### Example JSON of Message

```json
{
   "text": "Wie wird das Wetter morgen?",
   "telegramId": 12345
}
```



## User

| Property    | Type         | About                                 | Required           |
| ----------- | ------------ | ------------------------------------- | ------------------ |
| id          | Integer      | The database id of the BeuthBot user. | :white_check_mark: |
| telegramId | Integer      | The telegram id of the user.          |                    |
| nickname    | String       | Some nickname                         |                    |
| details     | [Sring: Any] | A dictionary of details.              |                    |

#### Example JSON of Message

```json
{
   "id": 12345,
   "telegramId": 12345,
   "nickname": "Al",
   "details": {
      "home": "Bonn",
      "birthday": "23.06.1912",
      ...
   }
}
```



## Answere

```json
{
   "text": "Wie wird das Wetter morgen?",
   "answere": "Morgen gibt es Sonnenschein bei 29 Grad.",
   "history" : [
      "WeatherService",
      "registry",
      "gateway"
   ]
}
```



## Error

```
{
   "error": "no data received."
}
```



## Messages for `database_microservice`

| Detailname             | Detail Key | Entity Key |
| ---------------------- | --------------- | ---------------------- |
| allergic | `detail-allergic` | `allergen` |
| home      | `detail-home` | `city` |
| birthday | `detail-birthday` | `date` |
| meal-preference | `detail-meal-preference` | `meal-preference` |
|  | `all-details` | ___Means all details.___ |



### Example `database-set` #1

> "Merke dir, dass ich gegen Krebstiere alergisch bin."

```json
{
   "user": {
      "id": 12345,
      "telegram-id": 12345,
      "nickname": "Al",
      "details": {
         "home": "Bonn",
         "birthday": "23.06.1912",
         ...
      }
   },
   "intent":{
      "name":"database-set",
      "confidence":0.9998944998
   },
   "entities":[
      ...,
      {
         "start":26,
         "end":36,
         "value":"krebstiere",
         "entity":"allergen",
         "confidence":0.9999893608,
         "extractor":"CRFEntityExtractor"
      },
      {
         "start":37,
         "end":51,
         "value":"alergisch bin.",
         "entity":"detail-allergic",
         "confidence":0,
         "extractor":"CRFEntityExtractor"
      },
      ...
   ],
   "text":"Merke dir, dass ich gegen Krebstiere alergisch bin.",
   ...
}
```



### Example `database-set` #2

> "Merke dir, dass ich in Bonn meinen Wohnort habe"

```json
{
   "user": {
      "id": 12345,
      "telegram-id": 12345,
      "nickname": "Al",
      "details": {
         "home": "Bonn",
         "birthday": "23.06.1912",
         ...
      }
   },
   "intent":{
      "name":"database-set",
      "confidence":0.9983537197
   },
   "entities":[
      {
         "start":23,
         "end":27,
         "value":"bonn",
         "entity":"city",
         "confidence":0.9990027178,
         "extractor":"CRFEntityExtractor"
      },
      {
         "start":28,
         "end":35,
         "value":"wohnort",
         "entity":"detail-home",
         "confidence":0.9985565221,
         "extractor":"CRFEntityExtractor"
      }
   ],
   "text":"Merke dir, dass ich in Bonn meinen Wohnort habe",
   ...
}
```



### Example `database-remove`

> "Lösche meinen Wohnort"

```json
{
   "user": {
      "id": 12345,
      "telegramId": 12345,
      "nickname": "Al",
      "details": {
         "home": "Bonn",
         "birthday": "23.06.1912",
         ...
      }
   },
   "intent":{
      "name":"database-remove",
      "confidence":0.9089648724
   },
   "entities":[
      ...,
      {
         "start":14,
         "end":21,
         "value":"wohnort",
         "entity":"detail-home",
         "confidence":0.9926926028,
         "extractor":"CRFEntityExtractor"
      },
      ...
   ],
   "text":"Lösche meinen Wohnort",
   ...
}
```



### Example `database-get`

> "Was weisst du alles über micht"

```json
{
   "user": {
      "id": 12345,
      "telegramId": 12345,
      "nickname": "Al",
      "details": {
         "home": "Bonn",
         "birthday": "23.06.1912",
         ...
      }
   },
   "intent":{
      "name":"database-get",
      "confidence":0.7800256014
   },
   "entities":[
      {
         "start":14,
         "end":19,
         "value":"alles",
         "entity":"all-details",
         "confidence":0.9931243294,
         "extractor":"CRFEntityExtractor"
      }
   ],
   "text":"Was weisst du alles über micht",
   ...
}
```

