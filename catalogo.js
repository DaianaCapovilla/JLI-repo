document.addEventListener("DOMContentLoaded", () => {

    // --- 1. LÓGICA DE FILTRADO ---
    const categoryLinks = document.querySelectorAll("#filterCategory a");
    const collectionLinks = document.querySelectorAll("#filterCollection a");
    const inStockSwitch = document.getElementById("inStockSwitch");
    const products = document.querySelectorAll("#productList .product");

    const urlParams = new URLSearchParams(window.location.search);
    let selectedCategory = urlParams.get('categoria') || "";
    let selectedCollection = urlParams.get('coleccion') || "";
    let inStockOnly = urlParams.get('stock') === 'true';

    // Actualizamos el switch si la URL lo indica y si el switch existe
    if (inStockOnly && inStockSwitch) {
        inStockSwitch.checked = true;
    }
    
    function filterProducts() {
        products.forEach(product => {
            const matchesCategory = selectedCategory === "" || product.dataset.category.includes(selectedCategory);
            const matchesCollection = selectedCollection === "" || product.dataset.collection === selectedCollection;
            const matchesStock = !inStockOnly || product.dataset.stock === "true";

            // El .parentElement es la columna (ej. "col-lg-3") que queremos ocultar
            if (matchesCategory && matchesCollection && matchesStock) {
                product.parentElement.style.display = "block"; 
            } else {
                product.parentElement.style.display = "none";
            }
        });
    }

    // Listener para filtros de categoría
    categoryLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            selectedCategory = link.dataset.category;
            filterProducts();
        });
    });

    // Listener para filtros de colección (si existen)
    if (collectionLinks.length > 0) {
        collectionLinks.forEach(link => {
            link.addEventListener("click", e => {
                e.preventDefault();
                selectedCollection = link.dataset.collection;
                filterProducts();
            });
        });
    }

    // Listener para filtro de stock (si existe)
    if (inStockSwitch) {
        inStockSwitch.addEventListener("change", () => {
            inStockOnly = inStockSwitch.checked;
            filterProducts();
        });
    }
    
    // Llamada inicial para filtrar productos al cargar la página
    filterProducts();


    // --- 2. LÓGICA DEL MODAL (ABRIR AL CLIC) ---
    const productImages = document.querySelectorAll("#productList .product img");
    const modalElement = document.getElementById('imageModal');
    
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        const modalImage = document.getElementById('modalImage');
        const modalName = document.getElementById('modalName');
        const modalDescription = document.getElementById('modalDescription');

        productImages.forEach(img => {
            img.style.cursor = "pointer";
            img.addEventListener("click", () => {
                modalImage.src = img.src;
                modalName.textContent = img.nextElementSibling.textContent; // El <figcaption>
                modalDescription.textContent = img.dataset.description;
                modal.show();
            });
        });
    }

    // --- 3. LÓGICA DEL MODAL (BOTÓN WHATSAPP) ---
    const btnConsultar = document.getElementById("btnConsultar");

    if (btnConsultar) {
        btnConsultar.addEventListener("click", () => {
            const nombreProducto = document.getElementById("modalName").textContent.trim();
            const numero = "5493487531836";
            const mensaje = `Hola, quiero consultar por ${nombreProducto}`;
            
            // CORRECCIÓN: Cambié "https." por "https://"
            const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
        
            window.open(url, "_blank");
        });
    }

});