// ... (previous imports)
const recommendationRoutes = require('./routes/recommendationRoutes');

// ... (other middleware and routes)
app.use('/api/recommendations', recommendationRoutes);