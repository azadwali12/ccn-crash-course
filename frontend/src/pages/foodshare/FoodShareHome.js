import React from 'react';

const stats = [
    { label: 'Food Wasted Yearly in Pakistan', value: '36 Million Tons' },
    { label: 'Households Facing Food Insecurity', value: '~36%' },
    { label: 'Meals Wasted at Weddings & Events Daily', value: '~500,000' },
    { label: 'Avg. Discount for Beneficiaries', value: 'Up to 80%' },
];

const FoodShareHome = () => {
    return (
        <div style={styles.page}>
            {/* ── Hero ── */}
            <section style={styles.hero}>
                <h1 style={styles.heroTitle}>🍛 FoodShare Pakistan</h1>
                <p style={styles.heroSubtitle}>
                    Turning Pakistan's food waste into affordable meals for families and shelter
                    houses — one plate at a time.
                </p>
                <div style={styles.heroBtns}>
                    <a href="/foodshare/donor-signup" style={{ ...styles.btn, ...styles.btnPrimary }}>
                        Donate Surplus Food
                    </a>
                    <a href="/foodshare/beneficiary-signup" style={{ ...styles.btn, ...styles.btnSecondary }}>
                        Get Affordable Food
                    </a>
                </div>
            </section>

            {/* ── Problem Statement ── */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>The Problem</h2>
                <p style={styles.text}>
                    Pakistan wastes an enormous amount of food every year — at weddings,
                    restaurants, hotels, and supermarkets — while millions of families cannot
                    afford three meals a day. FoodShare Pakistan bridges that gap by collecting
                    surplus food from donors and redistributing it to low-income families and
                    shelter houses at heavily discounted prices.
                </p>
            </section>

            {/* ── Stats ── */}
            <section style={{ ...styles.section, background: '#f0fdf4', maxWidth: '100%', padding: '56px 24px' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <h2 style={styles.sectionTitle}>By the Numbers</h2>
                    <div style={styles.statsGrid}>
                        {stats.map((s) => (
                            <div key={s.label} style={styles.statCard}>
                                <div style={styles.statValue}>{s.value}</div>
                                <div style={styles.statLabel}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How It Works Summary ── */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>How It Works</h2>
                <div style={styles.stepsRow}>
                    {[
                        {
                            icon: '🏪',
                            title: 'Donors List Surplus Food',
                            desc: 'Restaurants, caterers, and event organizers list leftover food on our platform.',
                        },
                        {
                            icon: '✅',
                            title: 'We Verify & Package',
                            desc: 'Our team verifies food quality, packages it hygienically, and assigns a subsidised price.',
                        },
                        {
                            icon: '🚚',
                            title: 'Affordable Delivery',
                            desc: 'Registered families and shelter houses order food at up to 80% off market price.',
                        },
                    ].map((step) => (
                        <div key={step.title} style={styles.stepCard}>
                            <div style={styles.stepIcon}>{step.icon}</div>
                            <h3 style={styles.stepTitle}>{step.title}</h3>
                            <p style={styles.text}>{step.desc}</p>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: 24 }}>
                    <a href="/foodshare/how-it-works" style={{ ...styles.btn, ...styles.btnOutline }}>
                        Learn More →
                    </a>
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section style={styles.ctaBanner}>
                <h2 style={{ fontSize: 28, marginBottom: 12 }}>Ready to Make a Difference?</h2>
                <p style={{ fontSize: 16, marginBottom: 28, opacity: 0.9 }}>
                    Join hundreds of donors and thousands of families already using FoodShare Pakistan.
                </p>
                <div style={styles.heroBtns}>
                    <a href="/foodshare/listings" style={{ ...styles.btn, ...styles.btnPrimary }}>
                        Browse Listings
                    </a>
                    <a href="/foodshare/how-it-works" style={{ ...styles.btn, ...styles.btnSecondary }}>
                        How It Works
                    </a>
                </div>
            </section>
        </div>
    );
};

const styles = {
    page: { fontFamily: 'Segoe UI, sans-serif', color: '#1a1a1a' },
    hero: {
        background: 'linear-gradient(135deg, #166534 0%, #15803d 100%)',
        color: '#fff',
        padding: '72px 24px',
        textAlign: 'center',
    },
    heroTitle: { fontSize: 48, fontWeight: 800, margin: '0 0 16px' },
    heroSubtitle: {
        fontSize: 20,
        maxWidth: 640,
        margin: '0 auto 32px',
        lineHeight: 1.6,
        opacity: 0.9,
    },
    heroBtns: { display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' },
    btn: {
        display: 'inline-block',
        padding: '14px 28px',
        borderRadius: 8,
        fontWeight: 700,
        fontSize: 15,
        textDecoration: 'none',
        cursor: 'pointer',
    },
    btnPrimary: { background: '#facc15', color: '#14532d' },
    btnSecondary: { background: '#fff', color: '#166534' },
    btnOutline: {
        border: '2px solid #166534',
        color: '#166534',
        background: 'transparent',
    },
    section: { padding: '56px 24px', maxWidth: 1100, margin: '0 auto' },
    sectionTitle: { fontSize: 30, fontWeight: 700, marginBottom: 20, color: '#14532d' },
    text: { fontSize: 16, lineHeight: 1.7, color: '#374151' },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 24,
    },
    statCard: {
        background: '#fff',
        border: '1px solid #bbf7d0',
        borderRadius: 12,
        padding: '28px 20px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    },
    statValue: { fontSize: 32, fontWeight: 800, color: '#16a34a', marginBottom: 8 },
    statLabel: { fontSize: 14, color: '#6b7280' },
    stepsRow: { display: 'flex', gap: 24, flexWrap: 'wrap' },
    stepCard: {
        flex: '1 1 280px',
        background: '#f9fafb',
        borderRadius: 12,
        padding: 28,
        border: '1px solid #e5e7eb',
    },
    stepIcon: { fontSize: 40, marginBottom: 12 },
    stepTitle: { fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#14532d' },
    ctaBanner: {
        background: '#14532d',
        color: '#fff',
        textAlign: 'center',
        padding: '64px 24px',
    },
};

export default FoodShareHome;
