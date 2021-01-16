<h1>Стартовые шаблоны для адаптивной вёрстки сайтов</h1>

<p>Автор сборки: <a href="https://webdesign-master.ru" target="_blank">https://webdesign-master.ru</a></p>

<h3>Получить нужный стартер:</h3>

<p>Для получения нужного стартера у вас должна быть устрановлена среда Unix shell и Git. Если вы пользователь MacOS или Linux, команды клонирования Git будут доступны по-умолчанию. Если вы пользователь Windows, рекомендую использовать WSL. Инструкция по установке WSL и окружения для веб-разработки: <a href="https://webdesign-master.ru/blog/tools/wsl-nodejs-new.html">https://webdesign-master.ru/blog/tools/wsl-nodejs-new.html</a></p>

<h4>Получить _optimized_gulp_sass:</h4>
<code>git clone https://github.com/agragregra/start_html; cp -r start_html/_optimized_gulp_sass .; rm -rf start_html</code>

<h4>Получить _clean_html:</h4>
<code>git clone https://github.com/agragregra/start_html; cp -r start_html/_clean_html .; rm -rf start_html</code>

<h4>Получить _clean_sass:</h4>
<code>git clone https://github.com/agragregra/start_html; cp -r start_html/_clean_sass .; rm -rf start_html</code>

<h4>Получить _optimized_html:</h4>
<code>git clone https://github.com/agragregra/start_html; cp -r start_html/_optimized_html .; rm -rf start_html</code>

<h4>Получить _optimized_gulp_sass_jade:</h4>
<code>git clone https://github.com/agragregra/start_html; cp -r start_html/_optimized_gulp_sass_jade .; rm -rf start_html</code>

<br><br>

<p>Чистые, готовые к бою HTML5 шаблоны (CSS и SASS), предназначенные для ускорения разработки современных адаптивных сайтов. Шаблоны содержат наиболее используемые и актуальные компоненты.
Шаблоны поддерживаются и регулярно обновляются, перед стартом проекта - рекомендую скачать новую версию.</p>

<h2>Что вошло в последнюю сборку:</h2>

<ul>
	<li>Стартовая структура файлов, принятая большинством Front-End разработчиков.</li>
	<li>index.html - индексный HTML файл, с первоначальной валидной разметкой;</li>
	<li>Прелоадер для страниц (_clean_html & _clean_sass);</li>
	<li>
		<h4>Стартовые CSS (SASS) файлы:</h4>
		<ul>
			<li>fonts.css (sass) - файл для подключения шрифтов с примером;</li>
			<li>main.css (sass) - основные пользовательские стили;</li>
			<li>media.css - файл медиа запросов для адаптивной вёрстки с первоначальной Desktop First и Mobile First структурой;</li>
			<li>Подключенная и готовая к использованию библиотека миксинов <a href="http://bourbon.io/" target="_blank">Bourbon</a> (_clean_sass).</li>
		</ul>
	</li>
	<li>/fonts - Шрифт Roboto (eot, woff, ttf);</li>
	<li>img/favicon - подключенные в index.html Apple-совместимые по размеру фавиконки (для примера).</li>
	<li>mail.php - PHP скрипт для отправки заявок с сайта с примерной структурой;</li>
	<li>
		<h4>js/common.js - пользовательский файл скриптов, включающий:</h4>
		<ul>
		 	<li>Структуру для настройки Google Analytics и Yandex.Metrika целей;</li>
		 	<li>Фоллбек для SVG изображений, подключаемых тегом img;</li>
		 	<li>Начальный скрипт для AJAX отправки форм с сайта;</li>
		 	<li>Плавный скролл страниц в браузере Chrome (/plugins-scroll);</li>
		 	<li>Отключение Drag изображений на страницах.</li>
		</ul>
	</li>
	<li>
		<h4>Включены следующие базовые jQuery плагины (/libs):</h4>
		<ul>
			<li><a href="http://daneden.github.io/animate.css/" target="_blank">Animate.css</a> / <a href="http://webdesign-master.ru" target="_blank">animate-css.js</a> / <a href="http://imakewebthings.com/waypoints/" target="_blank">Waypoints</a> - плагины для простого добавления анимации на страницы при скролле;</li>
			<li><a href="http://getbootstrap.com/" target="_blank">Bootstrap</a> - Полная и облегченная (bootstrap-grid.min.css) версия Bootstrap.
				<br>В index.html подключена облегченная - только сетка, без JS и компонентов.</li>
			<li><a href="https://github.com/aFarkas/html5shiv" target="_blank">html5shiv</a> - HTML5 в IE;</li>
			<li><a href="https://jquery.com" target="_blank">jQuery</a> первой ветки;</li>
			<li><a href="http://modernizr.com" target="_blank">modernizr</a>;</li>
			<li><a href="https://github.com/scottjehl/Respond" target="_blank">Respond.js</a></li>
		</ul>
	</li>
</ul>
