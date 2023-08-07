const getProducts='SELECT * FROM products ORDER BY id ASC';
const getProductsById='SELECT * FROM products WHERE id = $1';


module.exports={
    getProducts,
    getProductsById,
    
}