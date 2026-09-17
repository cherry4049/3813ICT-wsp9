// Update a product in MongoDB

const { ObjectId } = require("mongodb");

async function updateProduct(db, id, product) {
    delete product._id;

    const result = await db
        .collection("products")
        .updateOne(
            {
                _id: new ObjectId(id)
            },
            {
                $set: product
            }
        );
    
    return result;
}

module.exports = {
    updateProduct
};