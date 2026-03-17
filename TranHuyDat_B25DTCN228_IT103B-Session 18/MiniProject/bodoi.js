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
const cancelBtn = document.querySelector("#cancelBtn");
const deleteAll = document.querySelector("#clearAllBtn");
const searchInput = document.querySelector("#searchInput");
const filterCategory = document.querySelector("#filterCategory");

let editId = null;

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

let updateUI = (data = products) => {
  tbody.innerHTML = renderList(data);
  updateStats(data);
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

  if (editId !== null) {
    const product = products.find((p) => p.id === editId);

    product.name = name;
    product.price = price;
    product.category = category;
    product.quantity = quantity;
    product.description = description;

    editId = null;
    document.querySelector("#submitBtn").textContent = "➕ Thêm Sản Phẩm";

    Swal.fire({
      title: "Success!!",
      text: "Đã sửa thành công",
      imageUrl:
        "https://tse4.mm.bing.net/th/id/OIP.1T3xv8d4MU6JTfgxMmgyQgHaHa?pid=Api&h=220&P=0",
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: "Custom image",
    });
  } else {
    const product = {
      id: currentID++,
      name,
      price,
      category,
      quantity,
      description,
    };

    products.push(product);

    Swal.fire({
      title: "Success!!",
      text: "Đã thêm thành công",
      imageUrl:
        "https://tse4.mm.bing.net/th/id/OIP.1T3xv8d4MU6JTfgxMmgyQgHaHa?pid=Api&h=220&P=0",
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: "Custom image",
    });
  }
  saveToLocal();
  updateUI();
  form.reset();
});

const editProduct = (id) => {
  const product = products.find((p) => p.id === id);

  document.querySelector("#productName").value = product.name;
  document.querySelector("#productPrice").value = product.price;
  document.querySelector("#productQuantity").value = product.quantity;
  document.querySelector("#productCategory").value = product.category;
  document.querySelector("#productDescription").value = product.description;

  editId = id;
  document.querySelector("#submitBtn").textContent = "Cập nhập";
  cancelBtn.style.display = "inline-block";
};

const deleteProduct = (id) => {
  products = products.filter((p) => p.id !== id);
  Swal.fire({
    title: "Success!!",
    text: "Xóa thành công",
    imageUrl:
      "https://facts.net/wp-content/uploads/2023/10/22-astounding-facts-about-johnny-sins-1696433310.jpg",
    imageWidth: 400,
    imageHeight: 300,
    imageAlt: "Custom image",
  });
  updateUI();
  saveToLocal();
};

tbody.addEventListener("click", (e) => {
  const tr = e.target.closest("tr");

  if (!tr) return;

  const id = +tr.dataset.id;

  if (e.target.classList.contains("btn-edit")) editProduct(id);
  if (e.target.classList.contains("btn-delete")) deleteProduct(id);
});

cancelBtn.addEventListener("click", () => {
  editId = null;
  form.reset();
  document.querySelector("#submitBtn").textContent = "➕ Thêm Sản Phẩm";
});

deleteAll.addEventListener("click", (e) => {
  if (products.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Không có gì để xóa",
    });
    return;
  }

  if (!confirm("Bạn có chắc là muốn xóa hết dữ liệu không")) return;

  products = [];
  localStorage.removeItem("products");
  localStorage.removeItem("currentID");

  updateUI();
  Swal.fire({
    title: "Success!!",
    text: "Xóa thành công",
    imageUrl:
      "https://facts.net/wp-content/uploads/2023/10/22-astounding-facts-about-johnny-sins-1696433310.jpg",
    imageWidth: 400,
    imageHeight: 300,
    imageAlt: "Custom image",
  });
});

const handleFilter = () => {
  const keyword = searchInput.value.toLowerCase().trim();
  const category = filterCategory.value;

  let result = products;

  // search
  if (keyword) {
    result = result.filter((p) => p.name.toLowerCase().includes(keyword));
  }

  // filter category
  if (category && category !== "all") {
    result = result.filter((p) => p.category === category);
  }

  updateUI(result);
};

searchInput.addEventListener("input", handleFilter);
filterCategory.addEventListener("change", handleFilter);

const updateStats = (data = products) => {
  const totalProducts = data.length;
  const totalQuantity = data.reduce((sum, p) => sum + p.quantity, 0);

  const totalValue = data.reduce((sum, p) => sum + p.price * p.quantity, 0);

  document.querySelector("#totalProducts").textContent = totalProducts;
  document.querySelector("#totalQuantity").textContent = totalQuantity;
  document.querySelector("#totalValue").textContent = formatMoney(totalValue);
};

loadFromLocal();
updateUI();
