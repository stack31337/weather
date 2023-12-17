document.addEventListener("DOMContentLoaded", () => {
          const apiKey = 'API_KEY'; // OpenWeatherMap API Keyiniz
        
// Fonksiyon: Şehir adına göre hava durumu al
const getWeatherByCity = async (city) => {
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
          try {
            const response = await fetch(apiUrl);
            const data = await response.json();
        
            const location = document.querySelector('#searched-location-weather .location');
            location.textContent = `${data.name}, ${data.sys.country}`;
        
            const temperature = document.querySelector('#searched-location-weather .temperature');
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
        
            const description = document.querySelector('#searched-location-weather .description');
            description.textContent = translateWeatherDescription(data.weather[0].description); // Hava durumu açıklamasını Türkçeleştirme
        
            const icon = document.querySelector('#searched-location-weather .icon');
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            const iconImg = document.createElement('img');
            iconImg.src = iconUrl;
            icon.innerHTML = ''; // Önceki iconları temizle
            icon.appendChild(iconImg);
          } catch (error) {
            console.log('Hata:', error.message);
          }
        };
        
        // Anlık konumun hava durumunu al
        const getWeatherByLocation = async (latitude, longitude) => {
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        
          try {
            const response = await fetch(apiUrl);
            const data = await response.json();
        
            const location = document.querySelector('.location');
            location.textContent = `${data.name}, ${data.sys.country}`;
        
            const temperature = document.querySelector('.temperature');
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
        
            const description = document.querySelector('.description');
            description.textContent = translateWeatherDescription(data.weather[0].description); // Hava durumu açıklamasını Türkçeleştirme
        
            const icon = document.querySelector('.icon');
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            const iconImg = document.createElement('img');
            iconImg.src = iconUrl;
            icon.innerHTML = ''; // Önceki ikonları temizle
            icon.appendChild(iconImg);
        
          } catch (error) {
            console.log('Hata:', error.message);
          }
        };
        
        // Hava durumu açıklamalarını Türkçeleştiren fonksiyon
        const translateWeatherDescription = (description) => {
          const translations = {
                    'clear sky': 'Açık Hava',
                    'few clouds': 'Az Bulutlu',
                    'scattered clouds': 'Parçalı Bulutlu',
                    'broken clouds': 'Parçalı Bulutlu',
                    'shower rain': 'Sağanak Yağış',
                    'rain': 'Yağmurlu',
                    'thunderstorm': 'Gök Gürültülü Fırtına',
                    'snow': 'Karlı',
                    'mist': 'Sisli',
                    'moderate rain': 'Orta Şiddetli Yağmur',
                    'heavy intensity rain': 'Yoğun Yağış',
                    'light rain': 'Hafif Yağmur',
                    'overcast clouds': 'Bulutlu',
                    'light intensity drizzle': 'Hafif Yağmurlu',
                    'light intensity shower rain': 'Hafif Sağanak Yağış',
                    'light snow': 'Hafif Kar Yağışlı',
                    'light shower snow': 'Hafif Kar Yağışlı',
                    'thunderstorm with light rain': 'Hafif Yağmurlu Gök Gürültülü Fırtına',
                    'thunderstorm with rain': 'Yağmurlu Gök Gürültülü Fırtına',
                    'thunderstorm with heavy rain': 'Yoğun Yağışlı Gök Gürültülü Fırtına',
                    'light thunderstorm': 'Hafif Gök Gürültülü Fırtına',
                    'heavy thunderstorm': 'Yoğun Gök Gürültülü Fırtına',
                    'ragged thunderstorm': 'Gök Gürültülü Fırtına',
            // İhtiyacınıza göre diğer hava durumu açıklamalarını da ekleyebilirsiniz
          };
        
          return translations[description] || description;
        };
        
          // Sayfa yüklendiğinde anlık konumun hava durumu
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const { latitude, longitude } = position.coords;
              getWeatherByLocation(latitude, longitude);
            });
          }
        
          // Form submit olduğunda şehir adına göre hava durumu
          const form = document.querySelector('form');
          form.addEventListener('submit', (e) => {
            e.preventDefault();
            const cityInput = document.querySelector('#city');
            const city = cityInput.value;
            if (city.trim() !== '') {
              getWeatherByCity(city);
              cityInput.value = ''; // Inputu temizle
            }
          });
        });
        