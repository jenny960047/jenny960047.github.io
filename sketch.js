// Reference: https://www.youtube.com/watch?v=ecT42O6I_WI&list=PLRqwX-V7Uu6a-SQiI4RtIwuOrLJGnel0r&index=6&t=0s


// 初始化變數
let lat = ""; // 緯度
let lon = ""; // 經度
let mainWeather = ""; // 天氣分類
let city = ""; // 城市
let gifUrl = ""; // GIF 的 URL
let gifImg; // createImg 生成的 GIF 元素
let catchLocation = {}; // 位置資料
let catchWeather = {}; // 天氣資料
let catchGif = {}; // GIF 資料


function preload() {
  // 呼叫抓取位置資料的 API 並儲存緯度、經度
  let urlLocation = "https://api.ipdata.co/?api-key=5d64acf1dca8e68b0caacff98505ca3c488e7d742fe6b5c36f70f362";
  loadJSON(urlLocation, (data) => {
    catchLocation = data;
    lat = catchLocation.latitude;
    lon = catchLocation.longitude;
    
  // 使用經緯度參數，呼叫抓取天氣資料的 API ，並儲存天氣分類和城市
    let urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3eb0d5ee8021921f14f70c2407dda644`;
    loadJSON(urlWeather, (weatherData) => {
      catchWeather = weatherData;
      mainWeather = catchWeather.weather[0].main;
      city = catchWeather.name;
      console.log(city); // 測試用

  // 呼叫 GIF 函式
    loadGifBasedOnWeather();
    });
  });
}

// GIF 函式
function loadGifBasedOnWeather() {
  // 根據天氣決定標籤陣列是什麼
  let tags = [];
  if (mainWeather === "Clear") {
    tags = ["yes", "yeah"];
  } else {
    tags = ["no", "not yet"];
  }

  // 在陣列中隨機選擇一個標籤
  let randomTag = random(tags);

  // 呼叫 API 抓取(隨機標籤) GIF 的 API 並顯示圖片
  let urlGif = `https://api.giphy.com/v1/gifs/random?api_key=FzSgv2eC48G7Y5uXg9O5itIOrP0lkFo9&tag=${randomTag}&rating=g`;
  loadJSON(urlGif, (gifData) => {
    catchGif = gifData; 
    if (catchGif.data && catchGif.data.images.original.url) {
      gifUrl = catchGif.data.images.original.url; 
      gifImg = createImg(gifUrl, "Weather GIF");

      // 設定 GIF 為全螢幕大小
      gifImg.style("position", "absolute");
      gifImg.style("top", "0");
      gifImg.style("left", "0");
      gifImg.style("width", "100%");
      gifImg.style("height", "100%");
      gifImg.style("object-fit", "contain");
    }
  });
}


function setup() {
  createCanvas(windowWidth, windowHeight); // 建立畫布，大小為視窗尺寸
}


function draw() {
  background(0);
  
  // 如果地點資料或天氣資料尚未獲得，顯示載入中
  if (!catchLocation.latitude || !catchWeather) {
    text("Loading...", width/2, height/2);
  }
}