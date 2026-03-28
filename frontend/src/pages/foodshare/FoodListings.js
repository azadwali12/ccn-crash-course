import React, { useState } from 'react';

const MOCK_LISTINGS = [
    {
        id: 1,
        title: 'Biryani (Chicken) — 40 Portions',
        donor: 'Al-Madina Banquet Hall, Karachi',
        originalPrice: 'Rs. 350/portion',
        discountedPrice: 'Rs. 70/portion',
        discount: '80%',
        expiresIn: '4 hours',
        category: 'Cooked Meal',
        available: 40,
        city: 'Karachi',
    },
    {
        id: 2,
        title: 'Assorted Bread Loaves — 60 pcs',
        donor: 'Sunrise Bakery, Lahore',
        originalPrice: 'Rs. 120/loaf',
        discountedPrice: 'Rs. 30/loaf',
        discount: '75%',
        expiresIn: '8 hours',
        category: 'Bakery',
        available: 60,
        city: 'Lahore',
    },
    {
        id: 3,
        title: 'Dal Makhni + Rice — 25 Portions',
        donor: 'Punjab Palace Restaurant, Islamabad',
        originalPrice: 'Rs. 250/portion',
        discountedPrice: 'Rs. 50/portion',
        discount: '80%',
        expiresIn: '3 hours',
        category: 'Cooked Meal',
        available: 25,
        city: 'Islamabad',
    },
    {
        id: 4,
        title: 'Mixed Vegetables (Fresh) — 20 kg',
        donor: 'Green Valley Supermarket, Karachi',
        originalPrice: 'Rs. 200/kg',
        discountedPrice: 'Rs. 60/kg',
        discount: '70%',
        expiresIn: '24 hours',
        category: 'Fresh Produce',
        available: 20,
        city: 'Karachi',
    },
    {
        id: 5,
        title: 'Pulao & Korma — 80 Portions',
        donor: 'Royal Marquee Wedding Hall, Lahore',
        originalPrice: 'Rs. 400/portion',
        discountedPrice: 'Rs. 80/portion',
        discount: '80%',
        expiresIn: '5 hours',
        category: 'Cooked Meal',
        available: 80,
        city: 'Lahore',
    },
    {
        id: 6,
        title: 'Packaged Milk (close to best-before) — 30 L',
        donor: 'MegaMart, Rawalpindi',
        originalPrice: 'Rs. 160/L',
        discountedPrice: 'Rs. 50/L',
        discount: '69%',
        expiresIn: '48 hours',
        category: 'Dairy',
        available: 30,
        city: 'Rawalpindi',
    },
];

const CATEGORIES = ['All', 'Cooked Meal', 'Bakery', 'Fresh Produce', 'Dairy'];
const CITIES = ['All Cities', 'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi'];

const FoodListings = () => {
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [cityFilter, setCityFilter] = useState('All Cities');
    const [ordered, setOrdered] = useState({});

    const filtered = MOCK_LISTINGS.filter((item) => {
        const catMatch = categoryFilter === 'All' || item.category === categoryFilter;
        const cityMatch = cityFilter === 'All Cities' || item.city === cityFilter;
        return catMatch && cityMatch;
    });

    const handleOrder = (id) => {
        setOrdered((prev) => ({ ...prev, [id]: true }));
    };

    return (
        <div style={styles.page}>
            <h1 style={styles.pageTitle}>🛒 Available Surplus Food</h1>
            <p style={styles.pageSubtitle}>
                All listings are from verified donors. Prices are subsidised for registered
                beneficiaries.
            </p>

            {/* Filters */}
            <div style={styles.filters}>
                <div style={styles.filterGroup}>
                    <label style={styles.filterLabel}>Category</label>
                    <select
                        style={styles.select}
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        {CATEGORIES.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <div style={styles.filterGroup}>
                    <label style={styles.filterLabel}>City</label>
                    <select
                        style={styles.select}
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                    >
                        {CITIES.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <p style={styles.noResults}>No listings found for the selected filters.</p>
            ) : (
                <div style={styles.grid}>
                    {filtered.map((item) => (
                        <div key={item.id} style={styles.card}>
                            <div style={styles.badge}>{item.category}</div>
                            <h3 style={styles.cardTitle}>{item.title}</h3>
                            <p style={styles.donor}>📍 {item.donor}</p>
                            <div style={styles.priceRow}>
                                <span style={styles.originalPrice}>{item.originalPrice}</span>
                                <span style={styles.discountedPrice}>{item.discountedPrice}</span>
                                <span style={styles.discountTag}>-{item.discount}</span>
                            </div>
                            <div style={styles.meta}>
                                <span>⏳ Expires in {item.expiresIn}</span>
                                <span>📦 {item.available} available</span>
                            </div>
                            {ordered[item.id] ? (
                                <div style={styles.orderedMsg}>✅ Order Placed! Pickup details sent.</div>
                            ) : (
                                <button style={styles.orderBtn} onClick={() => handleOrder(item.id)}>
                                    Reserve & Order
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    page: { fontFamily: 'Segoe UI, sans-serif', padding: '40px 24px', maxWidth: 1100, margin: '0 auto' },
    pageTitle: { fontSize: 32, fontWeight: 800, color: '#14532d', marginBottom: 8 },
    pageSubtitle: { fontSize: 16, color: '#6b7280', marginBottom: 32 },
    filters: { display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 },
    filterGroup: { display: 'flex', flexDirection: 'column', gap: 6 },
    filterLabel: { fontSize: 13, fontWeight: 600, color: '#374151' },
    select: {
        padding: '8px 14px',
        borderRadius: 8,
        border: '1px solid #d1d5db',
        fontSize: 14,
        cursor: 'pointer',
    },
    noResults: { color: '#6b7280', fontSize: 16, textAlign: 'center', marginTop: 48 },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 24,
    },
    card: {
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: 24,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    badge: {
        display: 'inline-block',
        background: '#dcfce7',
        color: '#15803d',
        borderRadius: 20,
        padding: '3px 12px',
        fontSize: 12,
        fontWeight: 600,
        alignSelf: 'flex-start',
    },
    cardTitle: { fontSize: 17, fontWeight: 700, color: '#111827', margin: 0 },
    donor: { fontSize: 13, color: '#6b7280', margin: 0 },
    priceRow: { display: 'flex', alignItems: 'center', gap: 10 },
    originalPrice: { fontSize: 14, color: '#9ca3af', textDecoration: 'line-through' },
    discountedPrice: { fontSize: 18, fontWeight: 800, color: '#16a34a' },
    discountTag: {
        background: '#fef9c3',
        color: '#854d0e',
        borderRadius: 6,
        padding: '2px 8px',
        fontSize: 13,
        fontWeight: 700,
    },
    meta: { display: 'flex', gap: 16, fontSize: 13, color: '#6b7280' },
    orderBtn: {
        marginTop: 6,
        background: '#16a34a',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '12px 0',
        fontWeight: 700,
        fontSize: 15,
        cursor: 'pointer',
        width: '100%',
    },
    orderedMsg: {
        marginTop: 6,
        background: '#f0fdf4',
        color: '#15803d',
        border: '1px solid #bbf7d0',
        borderRadius: 8,
        padding: '12px 0',
        fontWeight: 700,
        fontSize: 14,
        textAlign: 'center',
    },
};

export default FoodListings;
