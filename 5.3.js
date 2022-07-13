function useRequest(url, callback) {
  // body...
  let xhr = new XMLHttpRequest();
  xhr.open("get", url, true);
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    } 
  };

  xhr.onerror = function() {

    console.log('Ошибка запроса');
  };

  
  xhr.send();
}

const number = document.querySelector('.inp')
const btnNode = document.querySelector('.btn');
const resultNode = document.querySelector('.result');

function displayResult(apiData) {
  let cards = '';
  if (number.value < 1 || number.value > 10) {
    cards = 'Число вне диапазона от 1 до 10';
  } else {
    apiData.forEach((item) => {
      const cardBlock = `
        <div class="card">
          <img src="${item.download_url}"
          class="card-image"/>
          <p>${item.author}</p>
        </div>
      `;
      cards = cards + cardBlock;
    });
  }
  resultNode.innerHTML = cards;
}

btnNode.addEventListener('click', () => {
  useRequest(`https://picsum.photos/v2/list?limit=${number.value}`, 
    displayResult
    );
});
