const formElem = document.getElementById("form");
const titleElem = document.getElementById("title");
const authorElem = document.getElementById("author");
const isbnElem = document.getElementById("isbn");

class UI {
	constructor() {
		this.allElementsAreValid = true;
		this.submitNumbers = 0;
	}

	showError(elem, message) {
		elem.parentElement.classList.add("error");
		const smallElem = elem.parentElement.querySelector("small");
		smallElem.innerHTML = message;
	}

	showSuccess(elem) {
		elem.parentElement.classList.remove("error");
		elem.parentElement.classList.add("success");
	}

	showSubmitSuccessMessage() {
		if (this.allElementsAreValid && this.submitNumbers == 0) {
			let successMessage = document.createElement("p");
			successMessage.classList.add("success");
			successMessage.innerHTML = "Book added";
			let divFirstInput = document.getElementById("first-input");
			formElem.insertBefore(successMessage, divFirstInput);

			setTimeout(() => {
				successMessage.remove();
			}, 3000);
			this.submitNumbers++;
		}
	}

	addNewBook() {
		const titlu = document.getElementById("title").value;
		const autor = document.getElementById("author").value;
		const isbn = document.getElementById("isbn").value;
		const booksTable = document.getElementById("book");

		const book = new Book(titlu, autor, isbn, booksTable);
		book.addToTable();
	}

	clearFields() {
		formElem.reset();
		titleElem.parentElement.classList.remove("success");
		authorElem.parentElement.classList.remove("success");
		isbnElem.parentElement.classList.remove("success");
	}
}

formElem.addEventListener("submit", (e) => {
	e.preventDefault();

	const ui = new UI();
	console.log(ui.allElementsAreValid);

	if (titleElem.value === "") {
		ui.showError(titleElem, "Title is required");
		ui.allElementsAreValid = false;
	} else {
		ui.showSuccess(titleElem);
	}

	if (authorElem.value === "") {
		ui.showError(authorElem, "Author is required");
		ui.allElementsAreValid = false;
	} else {
		ui.showSuccess(authorElem);
	}

	if (isbnElem.value === "") {
		ui.showError(isbnElem, "ISBN is required");
		ui.allElementsAreValid = false;
	} else {
		ui.showSuccess(isbnElem);
		ui.addNewBook();
	}

	ui.showSubmitSuccessMessage();
	ui.clearFields();
});

class Book {
	constructor(title, author, isbn, table) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
		this.details = `<tr>
                     <td>${this.title}</td>
                     <td>${this.author}</td>
                     <td>${this.isbn}</td>
                     <td><i class="far fa-trash-alt"></i></td>
                  </tr>`;
		this.table = table;
		this.addToTable = function () {
			this.table.innerHTML += this.details;
		};
	}
}


// partea acesta nu am reusit sa o fac sa mearga in clasa UI


let tableBody = document.querySelector("table");
tableBody.addEventListener("click", deleteRow);
	function deleteRow(e) {
		const rowToRemove = e.target.parentNode.parentNode;
		rowToRemove.remove(rowToRemove);
	}
 