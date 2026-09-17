// Add a product to MongoDB

async function addProduct(db, product) {
    const existingProduct = await db
        .collection("products")
        .findOne({
            id: product.id
        });
    
    if (existingProduct) {
        throw Error("Product ID already exists")
    }

    const result = await db
        .collection("products")
        .insertOne(product);

    return result;
}

module.exports = {
    addProduct
};