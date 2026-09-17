// Read all products from MongoDB

async function getProducts(db) {
    const products = await db
        .collection("products")
        .find({})
        .toArray();

    return products;
}

module.exports = {
    getProducts
};