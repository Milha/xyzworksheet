const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPoeple = [
    'Mike',
    'goes',
    'to',
    'school',
    'every',
    'morning.'
];

// Store listitems
const listItems = [];

let dragStartInedx;

createList();

// Insert listitems into DOM
function createList() {
    [...richestPoeple]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
        const listItem = document.createElement('li');

        listItem.setAttribute('data-index', index);

        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines"></i>
        </div>
        `;

        listItems.push(listItem);

        draggable_list.appendChild(listItem);
    });

    addEventListener();
}

function dragStart() {
    // console.log('Event: ', 'dragstart');
    dragStartInedx =  this.closest('li').getAttribute('data-index');
    console.log(dragStartInedx);
}

function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
}

function dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
}

function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();

}

function dragDrop() {
    // console.log('Event: ', 'drop');
    const dragEndIndex = this.getAttribute('data-index');
    swapItems(dragStartInedx, dragEndIndex);

    this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

// Check the oreder of list items
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const presonName = listItem.querySelector('.draggable').innerText.trim();

        if(presonName !== richestPoeple[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.add('right');
        }
    });
}

function addEventListener() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}

check.addEventListener('click', checkOrder);
