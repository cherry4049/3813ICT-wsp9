module.exports = async function updateProduct(collection) {
    const result = await collection.updateOne(
        { id: 1 },
        {
            $set: {
                price: 999.99,
                units: 8
            }
        }
    );

    console.log(`${result.modifiedCount} product updated`);
};