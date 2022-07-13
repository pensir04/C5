const btn = document.querySelector('.btn');
const value1 = document.querySelector('.input1');
const value2 = document.querySelector('.input2');
const result = document.querySelector('.result');

btn.addEventListener('click', () => {
	console.log('value1', value1.value);
	console.log('value2', value2.value);
	if (
		value1.value < 100 ||
		value1.value > 300 ||
		value2.value < 100 ||
		value2.value > 300
	)	{
		result.innerHTML = "Одно из чисел вне диапазона от 100 до 300";
	} else {
		fetch(`https://picsum.photos/${value1.value}/${value2.value}`)
		.then((response) => {
			console.log('response', response);
			console.log('response.url', response.url);
			return response;
		})
		.then((data) => {
			console.log('data', data);
			result.innerHTML = `<div class="result"><img src="${data.url}"/></div>`;
			document.body.append(result);
		})	
		.catch(() => {
			console.log('error');
		});

	}
});
