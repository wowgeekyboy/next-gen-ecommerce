const Product = require('../models/Product');

exports.updateProductInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { $inc: { countInStock: -quantity } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Emit real-time update
    req.io.emit('inventoryUpdate', { productId: id, newStock: product.countInStock });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};