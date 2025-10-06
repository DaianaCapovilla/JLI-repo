
document.addEventListener("DOMContentLoaded", () => {
  const categoryLinks = document.querySelectorAll("#filterCategory a");
  const collectionLinks = document.querySelectorAll("#filterCollection a");
  const inStockSwitch = document.getElementById("inStockSwitch");
  const products = document.querySelectorAll("#productList .product");

  let selectedCategory = "";
  let selectedCollection = "";
  let inStockOnly = false;

  // Función para filtrar productos
  function filterProducts() {
    products.forEach(product => {
      const matchesCategory = selectedCategory === "" || product.dataset.category.includes(selectedCategory);
      const matchesCollection = selectedCollection === "" || product.dataset.collection === selectedCollection;
      const matchesStock = !inStockOnly || product.dataset.stock === "true";

      if (matchesCategory && matchesCollection && matchesStock) {
        product.parentElement.style.display = "block";
      } else {
        product.parentElement.style.display = "none";
      }
    });
  }

  // Filtrar por categoría
  categoryLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      selectedCategory = link.dataset.category;
      filterProducts();
    });
  });

  // Filtrar por colección
  collectionLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      selectedCollection = link.dataset.collection;
      filterProducts();
    });
  });

  // Filtrar por stock
  inStockSwitch.addEventListener("change", () => {
    inStockOnly = inStockSwitch.checked;
    filterProducts();
  });

  // Inicializa mostrando todos los productos
  filterProducts();
});