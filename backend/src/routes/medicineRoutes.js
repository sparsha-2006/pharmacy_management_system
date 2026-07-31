const express = require('express');
const router = express.Router();
const MedicineController = require('../controllers/medicineController');
const { validateAddMedicine, validateGetMedicineList } = require('../middleware/validation');
// API 1: Add Medicine
router.post('/', validateAddMedicine, MedicineController.addMedicine);
// API 3: Get Medicine List
router.get('/', validateGetMedicineList, MedicineController.getMedicineList);
module.exports = router;
