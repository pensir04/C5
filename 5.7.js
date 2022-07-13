const btn = document.querySelector('.btn');
const page = document.querySelector('.page');
const limit = document.querySelector('.limit');
const result = document.querySelector('.result');
let cards = "";
result.innerHTML = localStorage.getItem("cards")
	? JSON.parse(localStorage.getItem("cards"))
	: null;

btn.addEventListener('click', () => {
	console.log('page', page.value);
	console.log('limit', limit.value);
	if (
		(page.value < 1 ||
		page.value > 10) &&
		(limit.value < 1 ||
		limit.value > 10)
		) {
		result.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
	} else if (
		page.value < 1 ||
		page.value > 10
		) {
		result.innerHTML = "Номер страницы вне диапазона от 1 до 10";
	} else if (
		limit.value < 1 ||
		limit.value > 10
		) {
		result.innerHTML = "Лимит вне диапазона от 1 до 10";
	} else {
		localStorage.clear();
		fetch(`https://picsum.photos/v2/list?page=${page.value}&limit=${limit.value}`)
		.then((response) => response.json())
		.then((data) => {
			cards = "";
			for (let item of data) {
			const card = `
			<div class="card">
				<img class="card-image" src="${item.download_url}"/>
				<p>${item.author}</p>
			</div>`;
			cards = cards + card;
			}
			result.innerHTML = cards; 
			localStorage.setItem("cards", JSON.stringify(cards));
		})
		.catch(() => {
			console.log('error');
		});
	}
});