***
***
# NewsExplorer
Сервис, в котором можно найти новости по запросу и сохранить в личном кабинете.</br>
Ссылка на сервер: https://api.news-akr.students.nomoredomains.work

***
***

## Описание
Репозиторий для приложения проекта `NewsExplorer`, включающий бэкенд часть приложения со следующими возможностями: авторизации и регистрации пользователей,операции с карточками новостей.
***
## Используемые технологии:
Express, Mongoose, celebrate, joi, winston, validator, helmet, cors, dotenv.
***
## Доступные роуты:
`POST /signup` - создаёт пользователя с переданными в теле email, password и name,</br>
`POST /signin` - проверяет переданные в теле почту и пароль и возвращает JWT,</br>
`GET /users/me` - возвращает информацию о пользователе (email и имя),</br>
`GET /articles` - возвращает все сохранённые пользователем статьи,</br>
`POST /articles` - создаёт статью с переданными в теле keyword, title, text, date, source, link и image,</br>
`DELETE /articles/articleId` - удаляет сохранённую статью  по _id.</br>
***
## Доступные скрипты:
Находясь в папке проекта можно использовать:</br>
`npm run start` — запускает сервер   </br>
`npm run dev` — запускает сервер с hot-reload</br>

