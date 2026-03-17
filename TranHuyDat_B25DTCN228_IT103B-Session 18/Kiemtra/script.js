const products = [
  {
    id: "SP001",
    name: "Laptop Dell XPS 15",
    price: 32900000,
  },
  {
    id: "SP002",
    name: "iPhone 15 Pro Max",
    price: 28900000,
  },
  {
    id: "SP003",
    name: "Samsung Galaxy S24 Ultra",
    price: 5990000,
  },
  {
    id: "SP004",
    name: "Tai nghe AirPods Pro 2",
    price: 2990000,
  },
];

const formatMoney = (money) => {
  return money.toLocaleString("vi-VN") + "VNĐ";
};

let currentID = 4;

const form = document.querySelector("#product-form");
const tbody = document.querySelector("#product-tbody");

const renderProducts = (products) => {
  return products
    .map((p) => {
      return `
          <tr data-id=${p.id}>
                <td>${index + 1}</td>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${formatMoney(p.price)}</td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-edit">Sửa</button>
                    <button class="btn-delete">Xóa</button>
                  </div>
                </td>
              </tr>
        `;
    })
    .join("");
};

const updateUI = () => {
  tbody.innerHTML = renderProducts(products);
};

const validateForm = (id, name, price) => {
  if (!id || !name || !price || isNaN(price)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Không được để trống",
    });
    return false;
  }
  return true;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.querySelector("#product-code").value.trim();
  const name = document.querySelector("#product-name").value.trim();
  const price = +document.querySelector("#product-price").value.trim();
  if (!validateForm(id, name, price)) return;

  const newProduct = { id, name, price };
  products.push(newProduct);
  updateUI();
  form.reset();
});

updateUI();
