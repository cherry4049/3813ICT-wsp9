// express server for product CRUD operations

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { getDatabase } = require("./create");
const { getProducts } = require("./read");
const { addProduct } = require("./add");
const { updateProduct } = require("./update");
const { removeProduct } = require("./remove");

const app = express();

app.use(cors());
app.use(bodyParser.json());

let db;

getDatabase()
    .then(database => {
        db = database;

        app.listen(3000, () => {
            console.log("Server running on http://localhost:3000");
        });
    })
    .catch(error => {
        console.error(error);
    });

// Get all products
app.get("/products", async (req, res) => {
    try {
        const products = await getProducts(db);

        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Post a new product
app.post("/products", async (req, res) => {
    try {
        const product = req.body;

        const result = await addProduct(db, product);

        res.status(201).json({
            message: "Product added",
            id: result.insertedId
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Delete a product
app.delete("/products/:id", async (req, res) => {
    try {
        const result = await removeProduct(db, req.params.id);

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Put/update a product
app.put("/products/:id", async (req, res) => {
    try {
        const result = await updateProduct(
            db,
            req.params.id,
            req.body
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product updated"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});
