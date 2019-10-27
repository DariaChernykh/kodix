import axios from 'axios';
import 'babel-polyfill';
import './../sass/styles.scss';

const blockContainer = document.querySelector('.results__block');

const checkStatus = (status) => {
  switch(status){
    case 'pednding':
      return 'Ожидается';
    case 'out_of_stock':
      return 'Нет в наличии';
    case 'in_stock':
      return 'В наличии';
  }
};

const getData = () => {
  return axios(`https://rawgit.com/Varinetz/e6cbadec972e76a340c41a65fcc2a6b3/raw/90191826a3bac2ff0761040ed1d95c59f14eaf26/frontend_test_table.json`);
};

getData().then((response) => {
  const items = response.data.map((value) => {
    return `<div class="results__item">
                    <div class="results__item-cell results__item-title">${value.title}
                      <div class="results__item-desc results__item-desc_inner">${value.description}</div> 
                    </div>
                    <div class="results__item-cell results__item-year">${value.year}</div>
                    <div class="results__item-cell results__item-color">
                      <span class="results__item-color-round results__item-color-round_${value.color}"></span>
                    </div>
                    <div class="results__item-cell results__item-status">${checkStatus(value.status)}</div>
                    <div class="results__item-cell results__item-price">${value.price} руб.</div>
                    <div class="results__item-desc results__item-desc_outer">${value.description}</div> 
                    <div class="results__item-cell results__item-button">
                        <button class="del-button">Удалить</button>
                    </div>
                </div>`.trim()
  });

  blockContainer.insertAdjacentHTML('beforeend', items.join(``));

  blockContainer.addEventListener('click', (evt)=> {
    if (evt.target.className === 'del-button') {
      const row = evt.target.parentElement.parentElement;
      row.parentElement.removeChild(row);
    }
  });

  const toggleLableVisability = (input) => {
    const label = input.previousElementSibling;
    return input.value ? label.style.visibility = 'visible' : label.style.visibility = 'hidden';
  };

  const inputs = document.querySelectorAll('.filters__input');
  [...inputs].forEach(input => {
    toggleLableVisability(input);

    input.addEventListener('change', (evt) => {
      toggleLableVisability(evt.target);
    })
  });

}).catch((err) => {throw err;});

