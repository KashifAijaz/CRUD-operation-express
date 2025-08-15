const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let allProducts = [];

// ✅ CREATE - Add product
app.post('/addProduct', (req, res) => {
    const product = { id: Date.now().toString(), ...req.body }; // Auto ID generate
    allProducts.push(product);
    res.send({
        message: 'Product added successfully!',
        addedProduct: product
    });
});

// ✅ READ - Get all products
app.get('/products', (req, res) => {
    res.send(allProducts);
});

// ✅ UPDATE - Update by ID
app.put('/updateProduct/:id', (req, res) => {
    const id = req.params.id;
    const index = allProducts.findIndex(p => p.id === id);

    if (index !== -1) {
        allProducts[index] = { ...allProducts[index], ...req.body };
        res.send({
            message: 'Product updated successfully!',
            updatedProduct: allProducts[index]
        });
    } else {
        res.status(404).send({ message: 'Product not found!' });
    }
});

// ✅ DELETE - Delete by ID
app.delete('/deleteProduct/:id', (req, res) => {
    const id = req.params.id;
    const index = allProducts.findIndex(p => p.id === id);

    if (index !== -1) {
        allProducts.splice(index, 1);
        res.send({ message: 'Product deleted successfully!' });
    } else {
        res.status(404).send({ message: 'Product not found.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
