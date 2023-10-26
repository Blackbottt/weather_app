const body = document.body;
const main_data = document.getElementById("main-data");
const main_data_city = document.getElementById("city");
const main_data_temp = document.getElementById("temp");
const main_data_conditions = document.getElementById("conditions");
const sub_data = document.getElementById("sub-data");
const real_feel = document.getElementById("real_feel");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind_speed");
const visibility = document.getElementById("visibility");
const forecast_data = document.getElementById("forecast-data");
const day = document.getElementById("day");
const icon = document.getElementById("icon");
const high_low_temps = document.getElementById("high-low-temp");
const right_arrow = document.getElementById("right-arrow");
const right = document.getElementById("right");
const left_arrow = document.getElementById("left-arrow");
const left = document.getElementById("left");
const carouselDiv = document.getElementById("carousel");
const main_page = document.getElementById("main-page"); //act as carousal btn
const sub_page = document.getElementById("sub-page"); //act as carousal btn
const map_btn = document.getElementById("map-btn");
const convert_btn = document.getElementById("convert-btn");
const page_one = document.getElementById("page-one");
const page_two = document.getElementById("page-two");
var weather_data;
var isDegreeFlag = false; //flag used by the icon below
var isMapFlag = false; //flag used by the icon below
//acts as my icon
    convert_btn.innerHTML = "&deg C";
// get user location with HTML5 geolocation API...
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    var error_mssge = document.createElement("p");
    error_mssge.innerHTML = "Geolocation is not supported by this browser.";
    main - data.insertBefore(error_mssge, city);
  }
};
// add user location to weather data fetch...
const showPosition = (position) => {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  getWeatherReport(latitude, longitude);
};
// embed weather data in html
const setData = (data, unitFlag) => {
    // console.log("setData: ", data);
  var weather_icon = data.weather[0]["icon"];
  if (!unitFlag) {
    console.log("setData: ", main_data_temp);
    main_data_temp.innerHTML = data.main.temp + " &degC";
    real_feel.innerHTML = data.main.feels_like + " &degC";
    high_low_temps.innerHTML =
      data.main.temp_max + "&degC / " + data.main.temp_min + "&degC";
  } else {
    main_data_temp.innerHTML = tempToFahrenheit(data.main.temp) + " &degF";
    real_feel.innerHTML = tempToFahrenheit(data.main.feels_like) + " &degF";
    high_low_temps.innerHTML =
      tempToFahrenheit(data.main.temp_max) +
      "&degF / " +
      tempToFahrenheit(data.main.temp_min) +
      "&degF";
  }
  main_data_city.innerHTML = data.name;
  main_data_conditions.innerHTML = data.weather[0]["description"];
  humidity.innerHTML = data.main.humidity;
  wind_speed.innerHTML = data.wind.speed + " K/Hr";
  visibility.innerHTML = data.visibility / 1000 + " KM";
  day.innerHTML = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  icon.setAttribute("src", weather_icon);
};
// fetch weather data and input it in the HTML...
const getWeatherReport = async (lat, lon) => {
  const weather_data_fetching = await fetch(
    `https://weather-proxy.freecodecamp.rocks/api/current?lon=${lon}&lat=${lat}`
  );
  weather_data = await weather_data_fetching.json();
  // console.log("WR: ", weather_data);
  setData(weather_data, isDegreeFlag);
};
// litsens on button converting temp
const tempConverter = (e) => {
  if (isDegreeFlag) {
    convert_btn.innerHTML = "&deg F"; //acts as my icon
    isDegreeFlag = false;
  } else {
    convert_btn.innerHTML = "&deg C"; //acts as my icon
    isDegreeFlag = true;
  }
  setData(weather_data, isDegreeFlag);
};
const tempToFahrenheit = (valNum) => {
  valNum = parseFloat(valNum);
  return (valNum * 1.8 + 32).toFixed(2);
};
//carousel
const carousel = (e) => {
  var page_1 = page_one.classList;
  var page_2 = page_two.classList;
  var page_1_btn = main_page.classList;
  var page_2_btn = sub_page.classList;
  var arrow_right = right_arrow.classList;
  var arrow_left = left_arrow.classList;
//   var carousel = carouselDiv.classList;

  if (e.type == "load") {
    page_2.add("inactive");
    arrow_left.add("inactive");
    page_1_btn.add("active");
  } else {
    console.log("Seek: ", e.target.id);
    if (
      e.target.id == "right" ||
      e.target.id == "right-arrow" ||
      e.target.id == "sub-page"
    ) {
      page_2.remove("inactive");
      page_1_btn.remove("active");
      page_1.add("inactive");
      page_2_btn.add("active");
      arrow_left.remove("inactive");
      arrow_right.add("inactive");
    } else if (
      e.target.id == "left" ||
      e.target.id == "left-arrow" ||
      e.target.id == "main-page"
    ) {
      page_1.remove("inactive");
      page_2_btn.remove("active");
      page_2.add("inactive");
      page_1_btn.add("active");
      arrow_left.add("inactive");
      arrow_right.remove("inactive");
    }
  }
};
// ask user for location
getLocation();
window.addEventListener("load", carousel);
right_arrow.addEventListener("click", carousel);
left_arrow.addEventListener("click", carousel);
carouselDiv.addEventListener("click", carousel);
main_page.addEventListener("click", carousel);
sub_page.addEventListener("click", carousel);
convert_btn.addEventListener("click", tempConverter);
