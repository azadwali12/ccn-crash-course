/**
 * FoodShare Pakistan – Express API Routes
 *
 * Base path: /api/foodshare
 *
 * Routes:
 *   GET  /listings          – list available surplus food
 *   POST /donors            – register a new food donor
 *   POST /beneficiaries     – register a new beneficiary (family / shelter)
 */

const express = require('express');
const router = express.Router();

/* ── In-memory data stores (replace with DB queries in production) ── */
const listings = [
    {
        id: 1,
        title: 'Biryani (Chicken) — 40 Portions',
        donor: 'Al-Madina Banquet Hall',
        city: 'Karachi',
        category: 'Cooked Meal',
        originalPrice: 350,
        discountedPrice: 70,
        discount: '80%',
        available: 40,
        expiresIn: '4 hours',
    },
    {
        id: 2,
        title: 'Assorted Bread Loaves — 60 pcs',
        donor: 'Sunrise Bakery',
        city: 'Lahore',
        category: 'Bakery',
        originalPrice: 120,
        discountedPrice: 30,
        discount: '75%',
        available: 60,
        expiresIn: '8 hours',
    },
    {
        id: 3,
        title: 'Dal Makhni + Rice — 25 Portions',
        donor: 'Punjab Palace Restaurant',
        city: 'Islamabad',
        category: 'Cooked Meal',
        originalPrice: 250,
        discountedPrice: 50,
        discount: '80%',
        available: 25,
        expiresIn: '3 hours',
    },
    {
        id: 4,
        title: 'Mixed Vegetables (Fresh) — 20 kg',
        donor: 'Green Valley Supermarket',
        city: 'Karachi',
        category: 'Fresh Produce',
        originalPrice: 200,
        discountedPrice: 60,
        discount: '70%',
        available: 20,
        expiresIn: '24 hours',
    },
    {
        id: 5,
        title: 'Pulao & Korma — 80 Portions',
        donor: 'Royal Marquee Wedding Hall',
        city: 'Lahore',
        category: 'Cooked Meal',
        originalPrice: 400,
        discountedPrice: 80,
        discount: '80%',
        available: 80,
        expiresIn: '5 hours',
    },
    {
        id: 6,
        title: 'Packaged Milk (close to best-before) — 30 L',
        donor: 'MegaMart',
        city: 'Rawalpindi',
        category: 'Dairy',
        originalPrice: 160,
        discountedPrice: 50,
        discount: '69%',
        available: 30,
        expiresIn: '48 hours',
    },
];

const donors = [];
const beneficiaries = [];

/* ─────────────────────────────────────────────
   GET /api/foodshare/listings
   Query params: city, category
───────────────────────────────────────────── */
router.get('/listings', (req, res) => {
    const { city, category } = req.query;
    let result = listings;

    if (city) result = result.filter((l) => l.city.toLowerCase() === city.toLowerCase());
    if (category) result = result.filter((l) => l.category.toLowerCase() === category.toLowerCase());

    res.json({ success: true, count: result.length, data: result });
});

/* ─────────────────────────────────────────────
   POST /api/foodshare/donors
   Body: { businessName, businessType, ownerName, cnic, email, phone, city, address }
───────────────────────────────────────────── */
router.post('/donors', (req, res) => {
    const { businessName, businessType, ownerName, cnic, email, phone, city, address } = req.body;

    if (!businessName || !businessType || !ownerName || !cnic || !email || !phone || !city || !address) {
        return res.status(400).json({ success: false, message: 'All required fields must be provided.' });
    }

    // Basic CNIC format check (13 digits, optional dashes)
    const cnicDigits = cnic.replace(/-/g, '');
    if (!/^\d{13}$/.test(cnicDigits)) {
        return res.status(400).json({ success: false, message: 'Invalid CNIC format.' });
    }

    const duplicate = donors.find((d) => d.cnic.replace(/-/g, '') === cnicDigits);
    if (duplicate) {
        return res.status(409).json({ success: false, message: 'A donor with this CNIC is already registered.' });
    }

    const newDonor = {
        id: donors.length + 1,
        businessName,
        businessType,
        ownerName,
        cnic,
        email,
        phone,
        city,
        address,
        registeredAt: new Date().toISOString(),
        status: 'pending_verification',
    };

    donors.push(newDonor);

    res.status(201).json({
        success: true,
        message: 'Donor registration received. Verification within 24 hours.',
        donorId: newDonor.id,
    });
});

/* ─────────────────────────────────────────────
   POST /api/foodshare/beneficiaries
   Body: { name, type, cnic, email, phone, city, address, incomeRange? }
───────────────────────────────────────────── */
router.post('/beneficiaries', (req, res) => {
    const { name, type, cnic, email, phone, city, address } = req.body;

    if (!name || !type || !cnic || !email || !phone || !city || !address) {
        return res.status(400).json({ success: false, message: 'All required fields must be provided.' });
    }

    const cnicDigits = cnic.replace(/-/g, '');
    if (!/^\d{13}$/.test(cnicDigits)) {
        return res.status(400).json({ success: false, message: 'Invalid CNIC format.' });
    }

    const duplicate = beneficiaries.find((b) => b.cnic.replace(/-/g, '') === cnicDigits);
    if (duplicate) {
        return res.status(409).json({ success: false, message: 'A beneficiary with this CNIC is already registered.' });
    }

    const newBeneficiary = {
        id: beneficiaries.length + 1,
        name,
        type,
        cnic,
        email,
        phone,
        city,
        address,
        incomeRange: req.body.incomeRange || null,
        familyMembers: req.body.familyMembers || null,
        registeredAt: new Date().toISOString(),
        status: 'pending_verification',
    };

    beneficiaries.push(newBeneficiary);

    res.status(201).json({
        success: true,
        message: 'Beneficiary application submitted. Eligibility review within 48 hours.',
        beneficiaryId: newBeneficiary.id,
    });
});

module.exports = router;
