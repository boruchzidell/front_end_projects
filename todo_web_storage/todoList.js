
class TodoList {
  constructor(listContainerElement) {
    this.list = document.querySelector(listContainerElement);

    this.listArray = localStorage.getItem('items')
      ? JSON.parse(localStorage.getItem('items'))
      : [];

    // Load data from storage
    this.listArray.forEach(this.addItemToList.bind(this));
  }

  addItemToList(name) {
    let li = document.createElement('li');
    li.textContent = name;

    this.list.appendChild(li);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  let todoList = new TodoList('#list');

  let getElement = (selector) => document.querySelector(selector);

  let item = getElement('#item');
  let button = getElement('#clear_list');


  document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    let todoItem = item.value;
    todoList.addItemToList(todoItem);
    todoList.listArray.push(todoItem);
    localStorage.setItem('items', JSON.stringify(todoList.listArray));

    this.reset();  // clear form
  });


  // Obliterate entire list
  button.addEventListener('click', function (e) {
    localStorage.clear();

    while (todoList.list.firstChild) {
      todoList.list.firstChild.remove();
    }
  });
});
