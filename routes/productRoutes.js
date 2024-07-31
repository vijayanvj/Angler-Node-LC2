
const express = require('express');
const multer = require('multer');
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


router.post('/products', authMiddleware, adminMiddleware, upload.single('image'), createProduct);
router.get('/products', authMiddleware, getProducts);
router.put('/products/:id', authMiddleware, adminMiddleware, upload.single('image'), updateProduct);
router.delete('/products/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
