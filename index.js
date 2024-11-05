document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();//chặn sự kiện reset trang của submit
    // lấy giá trị từ ô input
    let name = document.querySelector("#name").value;
    // tạo object item
    let item = {
        id: new Date().toISOString(),
        name: name.trim(),
    };
    //Hiển thị lên UI dưới dạng div
    addItemToUI(item);//Hàm nhận item và hiển thị lên UI
    //Lưu lại vào localStorage
    addItemToLS(item);//Hàm sẽ lưu item vào localStorage
});

// Hàm nhận item và hiển thị lên UI
const addItemToUI = (item) => {
    const { id, name } = item;//destructuring
    let newCard = document.createElement("div");
    newCard.className = "border rounded d-flex justify-content-between align-items-center p-2 mb-3";
    newCard.innerHTML = `<span>${name}</span>
                <button class="btn btn-danger btn-sm btn-remove" data-id="${id}" >Remove</button>`;
    document.querySelector(".list").appendChild(newCard);
}

// getList: lấy ds các item từ localStorage xuông và biến thành mảng
const getList = () => {
    return JSON.parse(localStorage.getItem("list")) || [];
}

//addItemToLS: Hàm nhận vào item và lưu item vào ls
const addItemToLS = (item) => {
    let list = getList();//Lấy ds từ ls xuống, có thể là []
    //nhét item vào list
    list.push(item);//nhét item vào list
    // lưu List lên lại localStorage
    localStorage.setItem("list", JSON.stringify(list));//Lưu lại lên LS
};

// Hàm hiển thị các item trong list mỗi lần reset trang
const init = () => {
    let list = getList();//lấy danh sách về
    list.forEach((item) => {
        addItemToUI(item);
    });
};

init();

// trường hợp script của js nằm đầu
// document.addEventListener("DOMContentLoaded", () => {
//     init();
// })

// làm chức năng xóa từng item
document.querySelector(".list").addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-remove")) {
        let nameItem = event.target.previousElementSibling.textContent;
        let isConfirmed = confirm(`Bạn có chắc là muốn xóa item: ${nameItem} không?`);
        if (isConfirmed) {
            //xóa ui
            event.target.parentElement.remove();
            //xóa localStorage
            let idRemove = event.target.dataset.id;
            removeItemFromLS(idRemove);
        }
    };
});

// Hàm nhận vào id cần xóa thu được từ nút đã nhấn, tìm và xóa
const removeItemFromLS = (idRemove) => {
    let list = getList();//lấy danh sách từ localStorage
    list = list.filter((item) => item.id != idRemove);
    localStorage.setItem("list", JSON.stringify(list));//lưu lại lên file
}

// Xóa hết
document.querySelector("#btn-remove-all").addEventListener("click", (event) => {
    let isConfirmed = confirm(`Bạn có chắc chắn là xóa hết item không?`);
    if (isConfirmed) {
        // xóa ui
        document.querySelector(".list").innerHTML = "";
        // xóa ls
        localStorage.removeItem("list");
    }
})

// chức năng filter
document.querySelector("#filter").addEventListener("keyup", (event) => {
    let inputValue = event.target.value;
    let list = getList();
    list = list.filter((item) => item.name.includes(inputValue));
    //xóa danh sách ui cũ
    document.querySelector(".list").innerHTML = "";
    //thêm danh sách ui mới
    list.forEach((item) => {
        addItemToUI(item);
    })
})