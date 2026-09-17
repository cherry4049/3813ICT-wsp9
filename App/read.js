module.exports = async function readProducts(collection) {
    const products = await collection.find({}).toArray();

    console.log("Products: ");

    console.log(products);
};