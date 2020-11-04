const start = "50.4503, 30.5241, 10";

var options = {
	scrollWheelZoom: false,
	tap: !L.Browser.mobile,
	dragging: !L.Browser.mobile,
	touchZoom: true
};

function map(nodeid, data) {

	// helper routines

	function parse(coords) {

		var coords = coords.split(",");
		var x = parseFloat(coords[0]);
		var y = parseFloat(coords[1]);
		var z = parseInt(coords[2]);

		return [[x, y], z];
	}

	// get data

	var coords = parse(start)[0];
	var zoom = parse(start)[1];
	var map = L.map(nodeid, options).setView(coords, zoom);

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
	$(".leaflet-control-attribution").hide();

	// add legend

	var legend = L.control({
		position: "topright"
	});

	legend.onAdd = function (map) {

		var div = L.DomUtil.create("div", "info legend");
		div.innerHTML = "<select id='region'>" +
			"<option value='48.451, 31.179, 6'>Вся Украина</option>" +
			"<option value='46.4855, 30.7434, 10'>Одесская область</option>" +
			"<option value='48.4662, 34.9956, 10'>Днепропетровская область</option>" +
			"<option value='51.4931, 31.2947, 10'>Черниговская область</option>" +
			"<option value='49.9915, 36.2808, 10'>Харьковская область</option>" +
			"<option value='50.2601, 28.6692, 10'>Житомирская область</option>" +
			"<option value='49.5900, 34.5508, 10'>Полтавская область</option>" +
			"<option value='46.6509, 32.6355, 10'>Херсонская область</option>" +
			"<option selected value='50.4503, 30.5241, 10'>Киевская область</option>" +
			"<option value='47.8536, 35.1778, 10'>Запорожская область</option>" +
			"<option value='48.5866, 39.3592, 10'>Луганская область</option>" +
			"<option value='47.9827, 37.7615, 10'>Донецкая область</option>" +
			"<option value='49.2323, 28.4680, 10'>Винницкая область</option>" +
			"<option value='45.2910, 34.5630, 10'>АР Крым</option>" +
			"<option value='48.5108, 32.2656, 10'>Кировоградская область</option>" +
			"<option value='46.9662, 32.0035, 10'>Николаевская область</option>" +
			"<option value='50.9013, 34.8046, 10'>Сумская область</option>" +
			"<option value='49.8360, 24.0193, 10'>Львовская область</option>" +
			"<option value='49.4314, 32.0429, 10'>Черкасская область</option>" +
			"<option value='49.4199, 26.9794, 10'>Хмельницкая область</option>" +
			"<option value='50.7391, 25.3334, 10'>Волынская область</option>" +
			"<option value='50.6198, 26.2518, 10'>Ровенская область</option>" +
			"<option value='48.9091, 24.7007, 10'>Ивано-Франковская область</option>" +
			"<option value='49.5560, 25.5919, 10'>Тернопольская область</option>" +
			"<option value='48.6189, 22.2750, 10'>Закарпатская область</option>" +
			"<option value='48.2867, 25.9377, 10'>Черновицкая область</option>" +
			"</select>";

		return div;
	};

	// show regions

	legend.addTo(map);

	// render markers

	$(data).each((index, data) => {

		var name_lang = data["name_" + lang];
		var address_lang = data["address_" + lang];
		var coords = data.coords;
		var gmap = data.gmap;
		// var gmap = `https://www.google.com/maps/place/${coords[0]},${coords[1]}`;
		
		var popup = `<h2>${name_lang}</h2><br><a href='${data.website}' target=_blank>${data.website}</a><br><a href='${gmap}' target=_blank>${address_lang}</a>`;

		L.marker(coords).addTo(map).bindPopup(popup);
	});

	// focus map

	$("#region").on("change", (event) => {

		var coords = parse(event.target.value)[0];
		var zoom = parse(event.target.value)[1];

		map.setView(coords, zoom, {
			animation: true
		});
	});

}

function list(nodeid, data) {
	
	$(data).each((index, data) => {

		var name_lang = data["name_" + lang];
		var address_lang = data["address_" + lang];
		var gmap = data.gmap;
		
		var item = `<item><h3>▍${name_lang}</h3><br><a href='${data.website}' target=_blank>${data.website}</a><br><a href='${gmap}' target=_blank>${address_lang}</a><item>`;

		$(nodeid).append(item);
	});
}

if ($("#map").length) {
	
	$.getJSON("/storage/map.json", (data) => {

		map("map", data);
		list("list", data);
	});
}