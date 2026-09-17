// Remove a product from MongoDB

const { ObjectId } = require("mongodb");

async function removeProduct(db, id) {
    const result = await db
        .collection("products")
        .deleteOne({
            _id: new ObjectId(id)
        });
    
    return result;
}

module.exports = {
    removeProduct
}