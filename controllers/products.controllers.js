const { insert, getProducts, updateProduct } = require('../init/insert');

const getAllProducts = async (req, res) => {
  const id = req.params.id;
  const products = await getProducts(id);
  console.log(products);
  return res.status(200).send(`Products \n: ${JSON.stringify(products)}`);
};

const postProduct = (req, res) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imglink: req.body.url,
  };
  console.log(product);
  insert(product);
  return res.send('POST Product');
};

const getProductById = (req, res) => {
  return res.status(200).send(`GET product id: ${req.params.id}`);
};

const updateProductController = async (req, res) => {
  let status;
  const id = req.params.id;
  const product = {
    id: id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    img_link: req.body.img_link,
  };
  try {
    let response = await updateProduct(product);
    console.log(response);
  } catch (error) {
    return res.status(error).send(`No data with id: ${id}`);
  }

  return res.status(200).send(`Updated product id: ${req.params.id}`);
};

const deleteProduct = (req, res) => {
  return res.status(200).send(`Delete product id: ${req.params.id}`);
};

module.exports = {
  getAllProducts,
  postProduct,
  getProductById,
  updateProductController,
  deleteProduct,
};
