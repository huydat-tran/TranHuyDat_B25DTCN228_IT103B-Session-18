let products = [
  {
    id: 1,
    name: "Iphone 15",
    price: 20000000,
    quantity: 5,
    category: "phone",
    description: "",
  },
];
let currentID = 2;

const form = document.querySelector("#productForm");
const tbody = document.querySelector("#productTable");

const saveToLocal = () => {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("currentID", currentID);
};

const loadFromLocal = () => {
  const data = localStorage.getItem("products");
  const id = localStorage.getItem("currentID");

  if (data) products = JSON.parse(data);
  if (id) currentID = +id;
};

let updateUI = () => {
  tbody.innerHTML = renderList(products);
};

const formatMoney = (money) => {
  return money.toLocaleString("vi-VN") + " VNĐ";
};

const renderList = (products) => {
  if (!Array.isArray(products)) return "";

  return products
    .map((p) => {
      return `
          <tr data-id="${p.id}">
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td class="price">${formatMoney(p.price)}</td>
        <td class="${p.quantity < 10 ? "low-stock" : ""}">
          ${p.quantity}
        </td>
   
        <td class="ellipsis description"    >${p.description}</td>
        <td>
          <button class="btn-edit" >Sửa</button>
          <button class="btn-delete" >Xóa</button>
        </td>
      </tr>
        `;
    })
    .join("");
};

const validateForm = (name, price, quantity, category) => {
  if (!name || !category || price === "" || quantity === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Không được để trống",
    });
    return false;
  }
  if (price < 1000) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Giá tiền phải lớn hơn 1000",
    });
    return false;
  }
  return true;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#productName").value.trim();
  const price = +document.querySelector("#productPrice").value.trim();
  const category = document.querySelector("#productCategory").value.trim();
  const quantity = +document.querySelector("#productQuantity").value.trim();
  const description = document
    .querySelector("#productDescription")
    .value.trim();

  if (!validateForm(name, price, quantity, category)) return;

  const product = {
    id: currentID++,
    name,
    price,
    category,
    quantity,
    description,
  };

  products.push(product);

  saveToLocal();
  updateUI();
  Swal.fire({
    title: "Success!!",
    text: "Đã thêm thành công",
    imageUrl:
      "https://tse4.mm.bing.net/th/id/OIP.1T3xv8d4MU6JTfgxMmgyQgHaHa?pid=Api&h=220&P=0",
    imageWidth: 400,
    imageHeight: 300,
    imageAlt: "Custom image",
  });
  form.reset();
});

updateUI();
