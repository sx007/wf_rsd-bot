<p align="center">
<img src="https://i.imgur.com/AnO1ep8.jpg" alt="Logo Clan + Discord" />
</p>

<p align="center">
<a href="http://nodejs.org"><img src="https://img.shields.io/badge/dynamic/json?color=red&url=https://raw.githubusercontent.com/sx007/wf_rsd-bot_v11/master/package.json&query=$.engines.node&label=Node.js" alt="Node.js"></a>
<a href="https://discord.js.org"><img src="https://img.shields.io/badge/dynamic/json?color=orange&url=https://raw.githubusercontent.com/sx007/wf_rsd-bot_v11/master/package.json&query=$.dependencies[%22discord.js%22]&label=Discord.js" alt="Discord.js"></a>
<a href="https://discord.js.org"><img src="https://img.shields.io/badge/dynamic/json?color=yellow&url=https://raw.githubusercontent.com/sx007/wf_rsd-bot_v11/master/package.json&query=$.dependencies.request&label=Request" alt="Request"></a>
<a href="https://github.com/sx007/wf_rsd-bot_v11/blob/master/changelog.md"><img src="https://img.shields.io/badge/dynamic/json?color=brightgreen&url=https://raw.githubusercontent.com/sx007/wf_rsd-bot_v11/master/package.json&query=$.version&label=Version" alt="Version"></a>
<a href="https://discord.gg/PR57GzV"><img src="https://discordapp.com/api/guilds/307431674671792129/widget.png" alt="Discord server"></a>
<a href="https://creativecommons.org/licenses/by/4.0/deed.ru"><img src="https://img.shields.io/badge/dynamic/json?color=%23373737&url=https://raw.githubusercontent.com/sx007/wf_rsd-bot_v11/master/package.json&query=$.license&label=License" alt="Creative Commons Attribution"></a>
</p>
Данная версия бота не поддерживается автором.
======

## Вступление:
> Данный бот создан исключительно в личных (некоммерческих) целях.

<a href="https://vk.com/wf_rsd">Группа VK</a> клана

## Техническая информация
Данный бот написан на основе __Node.js__ и библиотек для __Discord.js__ v11. 

# Про бота
Данный бот изначально был создан для ведения статистики по серверу Discord клана. 

Появляются новые люди на сервере, покидают, назначаются права. __Журнал аудита__ на сервере хранит информацию примерно `30 дней`. Порой, чтобы узнать кто выдал права пользователю приходилось в журнале выискивать пользователя. А если он уже больше месяца, то не узнать кто выдал права. Поэтому захотелось долгосрочную статистику вести.
***
На нашем сервере Discord есть текстовый канал __#system__, в котором отправляются системные сообщения из __Журнала аудита__. Права на сервере разделены на две части: `Администратор и модераторы` и `Прочие права` (их несколько).

# Что умеет бот:
* `Кто-то зашёл на сервер:` Новый пользователь заходит на сервер и информация об этом отправляется на канал __system__.
* `Кто-то покинул сервер:` Пользователь выходит с сервера и информация об этом отправляется на канал __system__.
* `Кто-то подключился к голосовому каналу:` Когда пользователь подключается к голосовому каналу информация об этом отправляется на канал __system__.
* `Кто-то отключился от голосового канала:` Когда пользователь отключается от голосового канала информация об этом отправляется на канал __system__.
* `Кто-то перешел из голосового канала в другой:` Когда пользователь подключается к другому голосовому каналу информация об этом отправляется на канал __system__.
* `Пользователь сменил ник:` Когда пользователь меняет ник на сервере информация об этом отправляется на канал __system__.
* `Пользователю назначили права:` Когда пользователю назначают права информация об этом отправляется на канал __system__.
* `У пользователю убирают права:` Когда у пользователя удаляют права информация об этом отправляется на канал __system__.

__Команды бота:__  `!название_команды`

* `!привет`: Пришлёт в ответ `привет!`.
* `!команды`: Пришлёт список команд, которые умеет бот.
* `!клан`: Пришлёт информацию о ежемесячном рейтинге клана.
* `!боец`: Пришлёт краткую игровую статистику по указанном бойцу.
* `!скажи [что сказать]`: Данная команда доступна лишь __Администратору__ и __Модераторам__. В ответ данной команды придет фраза, которую надо сказать.
* `!удалить [количество]`: Данная команда доступна лишь __Администратору__ и __Модераторам__. Указываем сколько надо сообщений выше удалить в текстовом канале.
* `!кик [кого выгнать с сервера]`: Данная команда доступна лишь __Администратору__ и __Модераторам__. Указываем ник пользователя, которого надо кикнуть с сервера.

## Наглядный пример:

| Вид сообщения | Изображение |
| --- | --- |
| `Кто-то зашёл на сервер` | <img src="https://i.imgur.com/NJaGooE.png" alt="Кто-то зашёл на сервер" /> |
| `Кто-то покинул сервер` | <img src="https://i.imgur.com/QBALS1H.png" alt="Кто-то покинул сервер" /> |
| `Кто-то подключился к голосовому каналу` | <img src="https://i.imgur.com/He63XdT.png" alt="Кто-то подключился к голосовому каналу" /> |
| `Кто-то отключился от голосового канала` | <img src="https://i.imgur.com/qeaACAH.png" alt="Кто-то отключился от голосового канала" /> |
| `Кто-то перешел из голосового канала в другой` | <img src="https://i.imgur.com/Wen8GCx.png" alt="Кто-то перешел из голосового канала в другой" /> |
| `Пользователь сменил ник` | <img src="https://i.imgur.com/6L7FfHV.png" alt="Пользователь сменил ник" /> |
| `Пользователю назначили права` | <img src="https://i.imgur.com/QoFbsSH.png" alt="Пользователю назначили права" /> |
| `У пользователю убирают права` | <img src="https://i.imgur.com/3TPquma.png" alt="У пользователю убирают права" /> |
| Команда `!клан` | <img src="https://i.imgur.com/PvyUnwY.png" alt="Ежемесячный рейтинг клана" /> |
| Команда `!боец` | <img src="https://i.imgur.com/yqZUFUG.png" alt="Игровая статистика бойца" /> |
