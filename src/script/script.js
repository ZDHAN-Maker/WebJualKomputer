let initialProducts = [];

// Fungsi untuk menampilkan produk
function renderProducts() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; // Kosongkan gallery sebelum merender ulang produk

    initialProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" class="product-image" 
                 data-name="${product.name}" 
                 data-brand="${product.brand}" 
                 data-price="${product.price}" 
                 data-specs="${product.specs}">
        `;
        gallery.appendChild(productElement);
    });

    // Tambahkan event listener ke semua gambar produk
    document.querySelectorAll('.product-image').forEach(image => {
        image.addEventListener('click', function() {
            showProductPopup(this);
        });
    });
}

// Fungsi untuk menampilkan popup produk
function showProductPopup(productElement) {
    const productOverlay = document.getElementById('overlay');
    const productPopup = document.getElementById('popup');
    productOverlay.style.display = 'block';
    productPopup.style.display = 'block';

    document.getElementById('productName').value = productElement.dataset.name;
    document.getElementById('productBrand').value = productElement.dataset.brand;
    document.getElementById('productPrice').value = productElement.dataset.price;
    document.getElementById('productSpecs').value = productElement.dataset.specs;

    // Simpan elemen produk yang diklik untuk disunting
    window.currentProduct = productElement; // Menyimpan referensi ke elemen produk yang sedang diedit
}

window.onload = function() {
    const gallery = document.querySelector('.gallery');
    
    // Ambil data produk dari gambar yang ada di gallery
    const productElements = gallery.querySelectorAll('.product-image');
    productElements.forEach(productElement => {
        initialProducts.push({
            imageUrl: productElement.src,
            name: productElement.dataset.name,
            brand: productElement.dataset.brand,
            price: productElement.dataset.price,
            specs: productElement.dataset.specs
        });
    });

    // Cek apakah ada produk yang disimpan di localStorage
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        initialProducts = JSON.parse(storedProducts);
    }

    renderProducts();

    // Event listeners untuk tombol tambah produk
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductOverlay = document.getElementById('addProductOverlay');
    const addProductPopup = document.getElementById('addProductPopup');
    const cancelAddBtn = document.getElementById('cancelAddBtn');
    const confirmAddBtn = document.getElementById('confirmAddBtn');

    // Fungsi untuk menambahkan produk baru
    function addNewProduct() {
        const imageUrl = document.getElementById('newImageUrl').value || 'https://via.placeholder.com/300';
        const name = document.getElementById('newProductName').value;
        const brand = document.getElementById('newProductBrand').value;
        const price = document.getElementById('newProductPrice').value;
        const specs = document.getElementById('newProductSpecs').value;
        
        if (name && brand && price && specs) {
            const newProduct = { imageUrl, name, brand, price, specs };
            initialProducts.push(newProduct);
            
            // Simpan produk ke localStorage
            localStorage.setItem('products', JSON.stringify(initialProducts));

            renderProducts();
            closeAddProductPopup();
            alert('Produk berhasil ditambahkan!');
        } else {
            alert('Harap isi semua field!');
        }
    }

    // Fungsi untuk menutup popup tambah produk
    function closeAddProductPopup() {
        addProductOverlay.style.display = 'none';
        addProductPopup.style.display = 'none';
        
        // Reset form
        document.getElementById('newImageUrl').value = '';
        document.getElementById('newProductName').value = '';
        document.getElementById('newProductBrand').value = '';
        document.getElementById('newProductPrice').value = '';
        document.getElementById('newProductSpecs').value = '';
    }

    // Fungsi untuk menutup popup produk
    function closeProductPopup() {
        const productOverlay = document.getElementById('overlay');
        const productPopup = document.getElementById('popup');
        productOverlay.style.display = 'none';
        productPopup.style.display = 'none';
    }

    // Fungsi untuk menyimpan perubahan produk
    function saveProductChanges() {
        if (window.currentProduct) {
            const product = window.currentProduct;
            product.dataset.name = document.getElementById('productName').value;
            product.dataset.brand = document.getElementById('productBrand').value;
            product.dataset.price = document.getElementById('productPrice').value;
            product.dataset.specs = document.getElementById('productSpecs').value;
            
            // Simpan produk yang telah diperbarui ke localStorage
            initialProducts = initialProducts.map(p => {
                if (p.name === window.currentProduct.dataset.name) {
                    p.name = product.dataset.name;
                    p.brand = product.dataset.brand;
                    p.price = product.dataset.price;
                    p.specs = product.dataset.specs;
                }
                return p;
            });

            localStorage.setItem('products', JSON.stringify(initialProducts));

            closeProductPopup();
            alert('Perubahan berhasil disimpan!');
        }
    }

    // Event listeners
    addProductBtn.addEventListener('click', function() {
        addProductOverlay.style.display = 'block';
        addProductPopup.style.display = 'block';
    });
    
    cancelAddBtn.addEventListener('click', closeAddProductPopup);
    
    confirmAddBtn.addEventListener('click', addNewProduct);
    
    addProductOverlay.addEventListener('click', closeAddProductPopup);

    // Event listeners untuk tombol tutup dan simpan perubahan produk
    const closeBtn = document.getElementById('closeBtn');
    const saveBtn = document.getElementById('saveBtn');
    
    closeBtn.addEventListener('click', closeProductPopup);
    saveBtn.addEventListener('click', saveProductChanges);
    
    // Menutup popup ketika overlay diklik
    const productOverlay = document.getElementById('overlay');
    productOverlay.addEventListener('click', closeProductPopup);
    document.getElementById('deleteBtn').addEventListener('click', function() {
        if (currentProduct && confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            // Temukan indeks produk yang akan dihapus
            const productIndex = initialProducts.findIndex(product => 
                product.name === currentProduct.dataset.name &&
                product.brand === currentProduct.dataset.brand
            );
            
            if (productIndex !== -1) {
                // Hapus produk dari array
                initialProducts.splice(productIndex, 1);
                
                // Render ulang galeri
                renderProducts();
                
                // Tutup popup
                productOverlay.style.display = 'none';
                productPopup.style.display = 'none';
                
                alert('Produk berhasil dihapus!');
            }
        }
    });
};
