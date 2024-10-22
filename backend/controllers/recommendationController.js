const UserPurchase = require('../models/UserPurchase');
const Product = require('../models/Product');

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user's purchase history
    const userPurchases = await UserPurchase.find({ user: userId }).populate('product');

    // Get all products
    const allProducts = await Product.find();

    // Create a user profile based on purchased categories
    const userProfile = userPurchases.reduce((acc, purchase) => {
      if (!acc[purchase.product.category]) {
        acc[purchase.product.category] = 0;
      }
      acc[purchase.product.category] += purchase.quantity;
      return acc;
    }, {});

    // Calculate similarity scores
    const recommendations = allProducts.map(product => {
      let score = 0;
      
      // Category similarity
      if (userProfile[product.category]) {
        score += userProfile[product.category] * 2; // Give more weight to category matches
      }

      // Price similarity (inverse difference)
      const avgPurchasePrice = userPurchases.reduce((sum, p) => sum + p.product.price, 0) / userPurchases.length;
      const priceDiff = Math.abs(product.price - avgPurchasePrice);
      score += 1 / (1 + priceDiff);

      // Popularity factor
      score += product.numReviews * 0.1;

      return { product, score };
    });

    // Sort recommendations by score and remove products the user has already purchased
    const sortedRecommendations = recommendations
      .sort((a, b) => b.score - a.score)
      .filter(rec => !userPurchases.some(purchase => purchase.product._id.equals(rec.product._id)))
      .slice(0, 10); // Get top 10 recommendations

    res.json(sortedRecommendations.map(rec => rec.product));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};