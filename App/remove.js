module.exports = async function removeProduct(collection) {
    const result = await collection.deleteOne({
        id: 3
    });

    console.log(`${result.deletedCount} product deleted`);
};