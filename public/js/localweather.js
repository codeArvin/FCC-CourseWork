$(document).ready(function(){
	var ipUrl = "http://ipinfo.io",
		country, region, city, icon,
		lat, lon, weather, units, temp,
		humidity, pressure, wind_speed,
		wind_deg, visiblity, img, unitsLabel,
		getUnits, convertWindDirction, 
		getLocation, getWeather;
		
	getUnits = function (country) {
		var imperialCountry = ["US", "BS", "BZ", "KY", "PW"];
		
		if (imperialCountry.indexOf(country) === -1) {
			units = 'metric';
		} else {
			units = 'imperial';
		}
		
		return units;
	};
	
	convertWindDirction = function (dir) {
		var Dir = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
			eightPoint = Math.floor(dir/45);
			
		return Dir[eightPoint];
	};
	
	getLocation = function () {
		$.get(ipUrl, function(data){
			city = data.city;
			country = data.country;
			lat = data.loc.split(",")[0];
			lon = data.loc.split(",")[1];
			region = data.region;
			units = getUnits(country);
			
			if (units === 'imperial') {
				unitsLabel = 'F';
			} else {
				unitsLabel = 'C';
			}
			
			getWeather(lat, lon, units);
		}, 'json');
	};
	
	getWeather = function (lat, lon, units) {
		var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + 
							"&units=" + units + "&appid=a94fa3260c2f8d0a6140005e991f988b";
		
		$.get(url, function(data){
			weather = data["weather"][0].main;
			icon = data["weather"][0].icon;
			temp = data["main"].temp;
			pressure = data["main"].pressure;
			humidity = data["main"].humidity;
			visiblity = data["visibility"];
			wind_speed = data["wind"].speed;
			wind_deg = data["wind"].deg;
			wind_deg = convertWindDirction(wind_deg);
			img = "http://openweathermap.org/img/w/" + icon + ".png";
			
			$('.icon').attr('src', img);
			$('.temp').html(temp + unitsLabel);
			$('.country').html(city + ", " + region + ", " + country);
			$('.location').html("lat:" + lat + " " + "lon:" + lon);
			$('.weather').html("weather: " + weather);
			$('.humidity').html("humidity: " + humidity + "%");
			$('.pressure').html("pressure: " + pressure + "hpa");
			$('.wind').html("speed: " + wind_speed + "m/s " + "dirction: " + wind_deg);
			$('.visiblity').html("visibility: " + visiblity + "m");
		}, 'jsonp')
	};
	
	getLocation();
});


