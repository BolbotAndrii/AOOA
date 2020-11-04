// anchor scroll

$("a").on("click", (event) => {
	// var fixed = $("#menu");
	var self = event.currentTarget;

	if (self.hash !== "") {
		var hash = self.hash;
		var coords = $(hash).offset().top;
		// var coords = $(hash).offset().top - $(fixed).outerHeight();

		history.pushState({}, "", hash);
		$("html, body").animate({ scrollTop: coords }, 500);

		return false;
	}
});


if  ( typeof mini !== "undefined" && typeof board !== "undefined" && typeof xl !== "undefined" ) {
	const templateMini = $("#mini").html();
	const miniContainer = $("#mini");

	const templateBoard = $("#board").html();
	const boardContainer = $("#board");

	const templateXl = $("#xl").html();
	const XLContainer = $("#xl");

	function showItems(data, template, insertInto) {
		let output = "";

		$(data).each((index, data) => {
			let item = template;
			item = item.replace(/\$src/g, data.src);
			item = item.replace("$name", data.name);
			item = item.replace("$age", data.age);
			item = item.replace("$complexity", data.complexity);
			item = item.replace("$task", data.task);
			item = item.replace("$material", data.material);
			item = item.replace(/\$view/g, data.view);
			item = item.replace(/\$url/g, data.url);
			output += item;
		});

		insertInto.empty().append(output);
	}

	showItems(mini, templateMini, miniContainer);
	showItems(board, templateBoard, boardContainer);
	showItems(xl, templateXl, XLContainer);	
}

const tabs = document.getElementsByClassName('tab');
const items = document.getElementsByClassName('item_mini');

const showElements = (type) => {
	for ( let i = 0 ; i < items.length ; i++ ) {
		let item = items[i];
		if ( !item.classList.contains(type)) {
			item.classList.add('disactive');
		} else {
			item.classList.remove('disactive');
		} 
		if (type === 'all') {
			item.classList.remove('disactive');
		} 	
	}
}

function onSubmit(token) {
	document.getElementById("contact_form").submit();
}

const currentTab = (index) => {
	for(let i = 0; i < tabs.length; i++) {
		if (i === index ) {
			tabs[index].classList.add('active')
		} else {
			tabs[i].classList.remove('active')
		}
	}
}

for (let i = 0; i < tabs.length; i++) {
	currentTab(0);
	tabs[i].addEventListener('click', (e) => {
		e.preventDefault();
		showElements(tabs[i].dataset.filter);	
		currentTab(i);	
	}, false);
	
}

$('.filter_btn').click((e) => {
	e.preventDefault();
	$('.catalog_tabs').slideToggle('fast');
});

const showHideCountItems = ( container, item, limit ) => {
	const countItems = $(item).length;
	const wrapper = $(container);

	limit = window.innerWidth < 480 ? 1 : limit;

	if (countItems > limit) {
		var btn = document.createElement('a');
		btn.classList.add('show_more');
		switch (lang) {
			case 'ua':
				btn.innerHTML = "Більше головоломок";
				break;
			case 'ru':
				btn.innerHTML = "Больше головоломок";
				break;
			case 'en':
				btn.innerHTML = "More puzzles";
				break;
		}
		wrapper.append(btn);
	}

	$( item ).slice(limit).hide();

	$(btn).click( (e) => {
		e.preventDefault();
		$(item).slice(limit).slideToggle('fast');
		
		if ( !wrapper.hasClass('open') ) {
			wrapper.addClass('open');
			switch (lang) {
				case 'ua':
					btn.innerHTML = "Приховати";
					break;
				case 'ru':
					btn.innerHTML = "Скрыть";
					break;
				case 'en':
					btn.innerHTML = "Hide";
					break;

		
			}
		}
		else {
			wrapper.removeClass('open');
			switch (lang) {
				case 'ua':
					btn.innerHTML = "Більше головоломок";
					break;
				case 'ru':
					btn.innerHTML = "Больше головоломок";
					break;
				case 'en':
					btn.innerHTML = "More puzzles";
					break;
			}
		}
	});
}

showHideCountItems( '.catalog_mini', '.item_mini', 8 );
showHideCountItems( '.catalog_board_game', '.item_board', 3 );
showHideCountItems( '.catalog_xl', '.item_xl', 6 );

// mobile menu
const toggleBodyFixed = () => {
	var body = $('body');
	if (body.attr('style')) {
		body.removeAttr('style');
	} else {
		body.attr('style', 'position: fixed');
	}
}

$('.gamburger').click( () => {
	$('.top_nav').css('top', $('header').height() + "px");
	$('.top_nav').toggleClass('active');
	toggleBodyFixed();
});

// active lang button
const currentLang = () => {
	let langMob = document.getElementsByClassName('lang_mob')[0].children;
	let langDesc = document.getElementsByClassName('lang')[0].children;
	
	for ( let i = 0; i < langDesc.length ; i++ ) {
		const item = langDesc[i].getAttribute('href').replace(/\//g, '');
		if ( item === lang ) {
			langDesc[i].classList.add('active');
			langMob[i].classList.add('active');
		}	
	}
} 
currentLang();