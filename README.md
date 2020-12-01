# gulp-project

![GitHub release](https://img.shields.io/github/release/digikid/gulp-project.svg)
[![dependencies Status](https://david-dm.org/digikid/gulp-project/status.svg)](https://david-dm.org/digikid/gulp-project)
[![devDependencies Status](https://david-dm.org/digikid/gulp-project/dev-status.svg)](https://david-dm.org/digikid/gulp-project?type=dev)

Автоматизированная сборка HTML-проекта.

## Содержание

- [Основные возможности](#about)
- [Подготовка к работе](#start)
- [Инициализация и запуск](#build)
- [Структура проекта](#structure)
- [Настройки](#settings)
- - [Список основных параметров](#main-settings)
- - [Запуск с параметрами командной строки](#command-line)
- - [Пресеты и комбинирование параметров](#presets)
- [Работа с файлами](#process)
- - [HTML-файлы](#html)
- - [SASS-файлы](#sass)
- - [JS-файлы](#js)
- - [Инициализация Swiper](#swiper)
- - [Изображения](#images)
- - [Конвертация SVG в Base64](#svg-base64)
- - [Иконки Icomoon](#icomoon)
- - [Шаблоны (Handlebars, Mustache)](#templates)
- - [Подключение библиотек и плагинов](#vendor)
- [Загрузка файлов на сервер](#deploy)
- [Создание ZIP-архивов](#zip)
- [Аудит страниц (Lighthouse)](#lighthouse)

<a name="about"></a>

## Основные возможности

- Компиляция SASS / SCSS, добавление браузерных префиксов и группировка медиа-запросов.
- Компиляция JS кода в стандарт ES5 через Babel (опционально).
- Компиляция Pug файлов c поддержкой импорта данных из JSON файлов.
- Линтинг SASS и JS файлов с помощью Stylelint и ESLint.
- Генерация карт кода (sourcemaps) (опционально).
- Оптимизация и сжатие растровых (JPG, PNG, GIF) и векторных (SVG) изображений.
- Конвертация SVG-файлов в Base64 и последующий импорт в CSS.
- Конвертация изображений в формат WebP (опционально).
- Импорт данных из HTML и JSON файлов, итерация массивов и доступ до глобальных настроек в HTML файлах.
- Автоматический импорт иконок Icomoon в SASS из файла selection.json.
- Слежение за файлами (watch) и автоматическая перекомпиляция файлов.
- Автоматическая компиляция страницы со списком HTML файлов и перечня используемых библиотек и компонентов  (опционально).
- Создание ZIP-архивов с исходными и скомпилированными файлами (опционально).
- Загрузка файлов на сервер по FTP (опционально).
- Генерация отчетов Lighthouse на локальном сервере.
- Режим отладки.

<a name="start"></a>

## Подготовка к работе

Для запуска проекта необходимо наличие [Node.js](https://nodejs.org/). Если необходимо, установите его с [официального сайта](https://nodejs.org/).

Сборка осуществляется с использованием последней версии [Gulp](https://gulpjs.com/). Перед началом работы убедитесь, что Gulp установлен с помощью команды:

```shell
gulp -v
```

Для установки Gulp воспользуйтесь командой:

```shell
npm install --global gulp-cli
```

Если ранее вы уже устанавливали Gulp глобально, удалите его ([подробнее](https://medium.com/gulpjs/gulp-sips-command-line-interface-e53411d4467)) и установите пакет [gulp-cli](https://www.npmjs.com/package/gulp-cli):

```shell
npm rm --global gulp
npm install --global gulp-cli
```

<a name="build"></a>

## Инициализация и запуск

```shell
# Перейдите в папку с проектом
cd /path/to/project/

# Установите необходимые зависимости
npm ci

# Запустите сборку
gulp
```

<a name="structure"></a>

## Структура проекта

```
gulp-project                        # Корневая директория
├── gulp                            # Файлы Gulp
│   ├── helpers                     # Вспомогательные функции
│   ├── tasks                       # Задачи
│   │   ├── bootstrap.js            # Сборка Bootstrap
│   │   ├── browser.js              # Запуск браузера после загрузки файлов на сервер
│   │   ├── build.js                # Запуск сборки
│   │   ├── clean.js                # Очистка временных файлов директорий
│   │   ├── clear-cache.js          # Очистка кэша
│   │   ├── common.js               # Формирование списка страниц проекта
│   │   ├── compress.js             # Конкатенация и минификация файлов
│   │   ├── default.js              # Задача по умолчанию
│   │   ├── deploy.js               # Загрузка файлов на сервер и открытие браузера
│   │   ├── dev.js                  # Запуск сборки в dev режиме
│   │   ├── html.js                 # Компиляция HTML файлов
│   │   ├── icomoon.js              # Импорт иконок Icomoon
│   │   ├── images.js               # Пакетное сжатие и преобразование изображений
│   │   ├── js.js                   # Компиляция JS-файлов
│   │   ├── reload.js               # Перезагрузка браузера
│   │   ├── sass.js                 # Компиляция SASS/SCSS файлов в CSS
│   │   ├── steady.js               # Копирование статических файлов
│   │   ├── upload.js               # Запуск FTP-соединения и передача файлов на сервер
│   │   ├── steady.js               # Копирование статических файлов
│   │   ├── vendor.js               # Копирование файлов библиотек и плагинов
│   │   ├── watch.js                # Слежение за изменениями файлов
│   │   ├── webserver.js            # Запуск Browsersync
│   │   └── zip.js                  # Создание zip-архивов с исходными и выходными файлами
│   ├── config.js                   # Глобальные настройки проекта
│   └── defaults.js                 # Пресеты и значения командных параметров по умолчанию
├── src                             # Исходные файлы
|   ├── common                      # Список страниц проекта
|   ├── data                        # JSON-файлы для хранения данных
|   ├── fonts                       # Шрифты
|   ├── icomoon                     # Исходные файлы Icomoon
|   ├── html                        # Файлы HTML
|   │   ├── includes                # Включаемые файлы
|   |   └── home.html               # Главная страница
|   ├── images                      # Изображения
|   ├── javascripts                 # Файлы JavaScript
|   │   ├── base                    # Глобальные файлы (по умолчанию компилируются в один файл)
|   │   ├── components              # Компоненты (по умолчанию компилируются в отдельные файлы)
|   │   ├── partials                # Вспомогательные функции
|   │   ├── import                  # Импорт модулей для Browserify / Babel
|   │   └── polyfills               # Полифиллы для браузеров
|   ├── pug                         # Файлы Pug
|   │   ├── includes                # Включаемые файлы
|   │   ├── layouts                 # Шаблоны страниц и компонентов
|   │   └── partials                # Миксины и вспомогательные функции
|   ├── styles                      # Файлы SASS
|   │   ├── base                    # Глобальные файлы (по умолчанию компилируются в один файл)
|   │   ├── components              # Компоненты (по умолчанию компилируются в отдельные файлы)
|   │   ├── icons                   # Иконки
|   │   ├── partials                # Миксины и вспомогательные функции
|   │   ├── vendor                  # Исходные файлы библиотек и плагинов
|   |   ├── _config.scss            # Глобальные настройки
|   |   ├── _icons.scss             # Иконки
|   |   └── _partials.scss          # Импорт вспомогательных файлов
|   ├── swiper                      # JSON-файлы с параметрами Swiper
|   ├── templates                   # Папка для шаблонов (Handlebars, Mustache и пр.)
|   ├── vectors                     # SVG-файлы для встраивания в CSS
|   ├── vendor                      # Библиотеки и плагины
|   ├── ├── css                     # Файлы CSS
|   ├── └── js                      # Файлы JavaScript
├── .browserslistrc                 # Список поддерживаемых браузеров
├── .editorconfig                   # Настройки IDE
├── .eslintrc                       # Настройки ESLint
├── .gitignore                      # Игнорируемые файлы в git
├── .stylelintignore                # Игнорируемые файлы Stylelint
├── .stylelintrc                    # Настройки Stylelint
├── CHANGELOD.md                    # История версий
├── config.js                       # Пользовательские настройки
├── gulpfile.js                     # Основной файл Gulp
├── package-lock.json               # Требуется для запуска команды `npm ci`
├── package.json                    # Файл package.json
└── README.md                       # Документация
```

<a name="settings"></a>

## Настройки

Список настроек проекта в порядке убывания приоритета:

- Параметры командной строки (задаются пользователем).
- Пользовательские настройки и пресеты: `/config.js`.
- Глобальные настройки: `/gulp/config.js`.
- Настройки командной строки по умолчанию `/gulp/defaults.js`.

<a name="main-settings"></a>

### Список основных параметров

Параметр   | Тип     | По умолчанию | Описание
---------- | --------| ------------ | -------------------------------------------------------------------------
merge      | object  | false        | Объединять файлы из директорий `/base` и `/components` в один файл
minify     | object  | false        | Минифицировать файлы
sourcemaps | boolean | false        | Генерировать карты кода для CSS / JS файлов
compress   | boolean | false        | Объединить и минифицировать CSS / JS файлы (production mode)
babel      | boolean | false        | Компиляция JS кода в стандарт ES5
main       | boolean | false        | Выборочная сборка файлов, указанных в параметре `config.paths.deploy.main`
force      | boolean | false        | Пропустить задачу сборки перед загрузкой файлов на сервер
webp       | boolean | false        | Конвертировать все изображения в формат WebP
index      | boolean | false        | Генерировать страницу со списком файлов проекта
zip        | boolean | false        | Создать zip-архив с файлами проекта
debug      | boolean | false        | Режим отладки (debug mode)
preset     | string  | 'global'     | Название активного пресета
open       | string  | 'index'      | Стартовая страница в браузере (задается без расширения .html)
host       | string  | 'default'    | Ключ объекта с настройками FTP для загрузки файлов (`config.ftp`)
mode       | string  | 'dev'        | Название режима, доступно глобально в HTML / JS файлах как @@mode

<a name="command-line"></a>

### Запуск с параметрами командной строки

Параметры можно передать с помощью командной строки:

```shell
gulp --[param1] value1 --[param2] value2
```

Для параметров с типом object значения передаются через символ запятой `,` одной строкой: (пример: `--minify css,js`).

```shell
gulp --merge css,js
```

Пример запуска с параметрами:

```shell
gulp --babel --minify js --open catalog
```

В этом случае сборка будет запущена со следующими параметрами:

```
config = {
    babel: true,
    minify: {
        css: false, // наследуется из параметров по умолчанию
        js: true
    },
    open: `catalog`
}
```
<a name="presets"></a>

### Пресеты и комбинирование параметров

Если вы хотите переопределить стандартное значение параметров без использования командной строки, вы можете создать пресеты в файле конфигурации `/config.js` путем добавления в него объекта `presets`, содержащего нужные параметры.

Пресеты, используемые по умолчанию, доступны в файле `/gulp/defaults.js`.

#### Глобальный пресет

Параметры из глобального пресета выполняются всегда и могут быть переопределены только напрямую из командной строки.

```
config.presets = {
    global: {
        index: true,
        open: `home`
    }
}
```

#### Пользовательский пресет

Параметры из пользовательского пресета применяются, если:

- Название пресета соответствует названию текущей задачи (`build` для дефолтной задачи, `compress`, `lighthouse` и т.д);
- Название пресета передано как параметр командной строки `--preset`.

Благодаря пресетам можно удобно задавать разные настройки в зависимости от запускаемой задачи или создавать собственные комбинации настроек.

```
config.presets = {
    deploy: {
        babel: true,
        compress: true,
        mode: `build`
    }
}
```

Данный пресет эквивалентен запуску сборки с параметрами:

```shell
gulp deploy --babel --compress --mode build
```
Пример пользовательского пресета, запускаемого из командной строки:

```
config.presets = {
    myPreset: {
        debug: true,
        minify: {
            css: true,
            js: true
        }
    }
}
```

Этот пресет будет запущен при явном указании параметра `preset`:

```shell
gulp --preset myPreset
```

<a name="process"></a>

## Работа с файлами

Для удобной работы с HTML и JS-файлами вы можете использовать операторы [gulp-file-include](https://www.npmjs.com/package/gulp-file-include):

- @@​include
- @@​if
- @@​for
- @@​loop

Документация и примеры использования можно найти [здесь](https://www.npmjs.com/package/gulp-file-include).

<a name="html"></a>

### HTML-файлы

HTML-файлы размещены в директории с исходными файлами `/src/html`.

Для более удобной организации файлов в директории `/src/html/includes/` созданы вложенные папки. Структура папок является условной и может быть изменена вами на свое усмотрение.

<a name="sass"></a>

### SASS-файлы

Глобальный файл настроек SASS находится в папке `/src/styles/_config.scss`.

Вы можете создавать собственные переменные, миксины и функции и размещать их в файле `/src/styles/partials/_custom.css`, после этого они будут доступны глобально.

- Все файлы из директории `/src/styles/base` компилируются в один CSS файл, название которого задается в параметре `config.files.css`.
- Все файлы из директории `/src/styles/components` компилируются в отдельные CSS файлы с сохранением названия.

Для изменения поведения по умолчанию используйте параметр `config.merge.css`.

<a name="js"></a>

### JS-файлы

- Все файлы из директории `/src/javascripts/base` компилируются в один файл, название которого задается в глобальных параметрах `config.files.js`.
- Все файлы из директории `/src/javascripts/components` компилируются в отдельные JS файлы с сохранением названия.

Для изменения поведения по умолчанию используйте параметр `config.merge.js`.

:warning: **Обратите внимание**
>При включенном параметре `config.babel` все библиотеки, импортируемые через параметр `config.paths.vendor`, игнорируются.
Чтобы подключить их, добавьте соответствующие импорты в файле `src/javascripts/import/modules.js`.

<a name="swiper"></a>

### Инициализация Swiper

Каждый экземпляр Swiper инициализируется с уникальным ID и сохраняется в глобальный JS-объект `window.swipers`.

1. В директории `/src/data` создайте JSON-массив с данными для слайдов (например, `slider.json`). Название файла должно соответствовать ID свайпера.

**Пример файла `slider.json`:**

```json
[
    {
        "id": 1,
        "title": "One",
        "text": "I am first slide"
    }, {
        "id": 2,
        "title": "Two",
        "text": "I am second slide"
    }, {
        "id": 3,
        "title": "Three",
        "text": "I am third slide"
    }
]
```

2. В директории `/src/html/includes/items` создайте HTML-файл с разметкой для отдельного слайда (`slide.html`).

**Пример файла `slide.html`:**

```html
<div class="slide slide--@@id">
    <div class="slide__title">@@title</div>
    <div class="slide__text">@@text</div>
</div>
```

3. В директории `/src/swiper` создайте JSON файл, содержащий параметры для свайпера. Название файла должно соответствовать ID свайпера.

**Пример файла `slider.json`:**

```json
{
    "slidesPerView": 1,
    "spaceBetween": 15,
    "loop": true,
    "breakpoints": {
        "768": {
            "slidesPerView": 2
        },
        "1200": {
            "slidesPerView": 4,
            "spaceBetween": 25
        }
    }
}
```

4. В нужном файле импортируйте файл `swiper.html`, передав ему ID свайпера и название шаблона слайда:

```html
@@include('components/swiper.html', {
    "id": "slider",
    "template": "slide"
})
```

После инициализации вы можете получить экземпляр Swiper через глобальный объект `window.swipers['slider'].swiper`.

<a name="images"></a>

### Изображения

Переместите изображения в директорию `/src/images`.
Настройки компрессии задаются в параметре `config.plugins.imagemin`.
Для конвертации всех изображений в формат WebP установите параметр `config.webp` в значение `true`.

<a name="svg-base64"></a>

### Конвертация SVG в Base64

Для конвертации SVG файлов в Base64 и встраивания в CSS переместите их в директорию `/src/vectors`.

<a name="icomoon"></a>

### Добавление иконок Icomoon

Для добавления иконок в проект распакуйте содержимое ZIP-архива с сайта [icomoon.io](https://icomoon.io/app/) в директорию `/src/icomoon`. После этого автоматически сгенерируются CSS-классы иконок и вы сможете использовать их.

Массив из CSS-классов иконок сохраняется в глобальную переменную `@@​icons`, которая доступна в HTML.

<a name="templates"></a>

### Шаблоны (Handlebars, Mustache)

Если вы используете JS-компиляторы для HTML (Handlebars, Mustache и т.п), для хранения шаблонов предусмотрена директория `/src/templates`.

Все файлы из неё копируются без изменения в папку с выходными файлами.

<a name="vendor"></a>

### Подключение библиотек и плагинов

>Если нужной библиотеки нет в репозитории npm или вам по какой то причине не нужно добавлять её в список зависимостей, вы можете добавить файлы вручную в директорию `/src/vendor`. SASS файлы для библиотек размещаются в директории `/src/styles/vendor`.

Для импорта сторонних библиотек сначала установите их как зависимости через стандартную команду:

```shell
npm i package-name
```

После этого в параметре `config.paths.vendor` укажите абсолютный путь до нужных файлов из директории `/node_modules` (по аналогии с файлом `/gulp/config.js`).

:warning: **Обратите внимание**
>При включенном параметре `config.babel` все библиотеки, импортируемые через параметр `config.paths.vendor`, игнорируются.
Чтобы подключить их, добавьте соответствующие импорты в файле `src/javascripts/import/modules.js`.

<a name="deploy"></a>

## Загрузка файлов на сервер

Перед загрузкой файлов на сервер необходимо задать параметр  `config.ftp`.

```
config: {
    ftp: {
        default: {
            host: 'XXX.XX.XX.XX',
            user: 'username',
            password: '******',
            dest: `/httpdocs/domain.com/${pjson.name}/`,
            uri: `http://domain.com/${pjson.name}`
        }
    }
}
```

Для установления FTP соединения и загрузки файлов на сервер запустите команду:

```shell
gulp deploy
```

**Выборочная загрузка**

Если со времени последней загрузки изменялись только основные файлы проекта (HTML, CSS и JS), вы можете загрузить только их, минуя загрузку статических файлов (шрифты, изображения и т.п.) с помощью команды:

```shell
gulp deploy --main
```

Типы основных файлов определяются в параметре `config.paths.deploy.main`.

**Production mode**

Для загрузки файлов в режиме production mode запустите команду:

```shell
gulp deploy --compress
```

Компрессия + последующая компиляция JS файлов в стандарт ES5 (для поддержки устаревших браузеров):

```shell
gulp deploy --compress --babel
```

Для комбинирования параметров вы можете использовать пресет `config.presets.deploy`.

<a name="zip"></a>

## Создание ZIP-архивов

Для создания ZIP-архивов установите параметр `config.zip` в значение `true`.
Названия файлов задаются в глобальных параметре `config.files.zip`.

```shell
gulp --zip
```

<a name="lighthouse"></a>

## Аудит страниц (Lighthouse)

>[Google Lighthouse](https://github.com/GoogleChrome/lighthouse) – это инструмент аудита с открытым исходным кодом, который помогает разработчикам повысить производительность и доступность своих веб-проектов.

Отчеты Google Lighthouse генерируются на локальном сервере для каждой страницы проекта после запуска команды:

```shell
gulp lighthouse
```

В зависимости от количества HTML страниц в проекте, выполнение задачи может занять продолжительное время.

## Лицензия

[The MIT License (MIT)](LICENSE)
