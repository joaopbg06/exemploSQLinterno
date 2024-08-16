
const itemInput = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const itemList = document.getElementById('item-list');
const removeSelect = document.getElementById('remove-select');
const removeButton = document.getElementById('remove-button');

function addItem() {
    const itemText = itemInput.value.trim();

    if (itemText !== '') {

        const items = itemText.split('\n').map(item => item.trim()).filter(item => item !== '');

        items.forEach(item => {

            const li = document.createElement('li');
            li.textContent = item;


            itemList.appendChild(li);


            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            removeSelect.appendChild(option);
        });


        itemInput.value = '';
    }
}


function removeItem() {
    const selectedOption = removeSelect.options[removeSelect.selectedIndex];

    if (selectedOption) {
        const itemText = selectedOption.value;

        const items = Array.from(itemList.children);
        const itemToRemove = items.find(item => item.textContent === itemText);

        if (itemToRemove) {
            itemList.removeChild(itemToRemove);
        }


        removeSelect.removeChild(selectedOption);
    }
}


addButton.addEventListener('click', addItem);
removeButton.addEventListener('click', removeItem);
