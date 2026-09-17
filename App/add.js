module.exports = async function addProducts(collection) {
    const products = [
        {
            id: 1,
            name: "Laptop",
            description: "A laptop with 17 inch screen.",
            price: 1299.99,
            units: 10
        },
        {
            id: 2,
            name: "Ted Bear",
            description: "Pink Ted Bear for 3-5 years old kids.",
            price: 12.99,
            units: 15
        },

        {
            id: 3,
            name: "Book Mark",
            description: "3D design, animal or flower pictures.",
            price: 15.99,
            units: 32
        }
    ]

    await collection.insertMany(products);

    console.log("3 products added");
};