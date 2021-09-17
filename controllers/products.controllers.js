const {
  insert,
  getProducts,
  updateProduct,
  deleteProduct,
} = require('../init/query');

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

const deleteProductController = async (req, res) => {
  let ids = req.query.id.split(',');
  const int_ids = ids.map((id) => parseInt(id));
  try {
    let response = await deleteProduct(int_ids);
  } catch (error) {
    return res.status(error).send(`Error code: ${error}`);
  }
  return res.status(200).send(`Delete product id: ${req.query.id}`);
};

module.exports = {
  getAllProducts,
  postProduct,
  getProductById,
  updateProductController,
  deleteProductController,
};
