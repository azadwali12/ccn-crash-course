import React from 'react';

const donorSteps = [
    {
        step: '01',
        icon: '📝',
        title: 'Register as a Donor',
        desc: 'Sign up with your business name, CNIC/NTN, and location. Verification takes less than 24 hours.',
    },
    {
        step: '02',
        icon: '📸',
        title: 'List Your Surplus Food',
        desc: 'Photograph and describe the leftover food — type, quantity, and pickup window. Our app auto-suggests a subsidised price.',
    },
    {
        step: '03',
        icon: '🚗',
        title: 'We Collect or You Drop Off',
        desc: 'Our logistics partner picks up from your venue, or you can drop it at the nearest FoodShare hub.',
    },
    {
        step: '04',
        icon: '📊',
        title: 'Track Your Impact',
        desc: 'See how many meals your donation provided. Get a tax-deductible CSR certificate each quarter.',
    },
];

const beneficiarySteps = [
    {
        step: '01',
        icon: '🏠',
        title: 'Register as a Beneficiary',
        desc: 'Apply as an individual family or an NGO/shelter house. Income verification is required for individuals.',
    },
    {
        step: '02',
        icon: '📱',
        title: 'Browse & Order',
        desc: 'Open the app or website, browse real-time listings near you, and place your order within the pickup window.',
    },
    {
        step: '03',
        icon: '🏪',
        title: 'Pick Up from Hub',
        desc: 'Collect your order from the nearest FoodShare distribution hub within the specified time.',
    },
    {
        step: '04',
        icon: '⭐',
        title: 'Rate & Feedback',
        desc: 'Share your experience to help us improve quality and hold donors accountable.',
    },
];

const businessModel = [
    { label: 'Revenue Source', value: 'Small platform fee charged to donors (5–10% of listing value)' },
    { label: 'Beneficiary Pricing', value: 'Food sold at 70–80% below market to cover logistics only' },
    { label: 'NGO/Shelter Pricing', value: 'Free or near-free (subsidised by donor fees)' },
    { label: 'Logistics', value: 'Partnership with local delivery services; hubs at mosques/community centers' },
    { label: 'Quality Control', value: 'Trained volunteers inspect every batch; cold chain for perishables' },
    { label: 'Monetisation Plan', value: 'B2B waste-management contracts with large hotels & supermarkets by Year 2' },
];

const HowItWorks = () => (
    <div style={styles.page}>
        <h1 style={styles.pageTitle}>⚙️ How FoodShare Pakistan Works</h1>
        <p style={styles.pageSubtitle}>
            A transparent two-sided marketplace connecting food donors with families in need.
        </p>

        {/* Donor Flow */}
        <section style={styles.section}>
            <h2 style={styles.sectionTitle}>For Food Donors 🏪</h2>
            <p style={styles.text}>
                Restaurants, wedding halls, caterers, bakeries, and supermarkets can donate surplus
                food in four easy steps.
            </p>
            <div style={styles.stepsGrid}>
                {donorSteps.map((s) => (
                    <div key={s.step} style={styles.stepCard}>
                        <div style={styles.stepNumber}>{s.step}</div>
                        <div style={styles.stepIcon}>{s.icon}</div>
                        <h3 style={styles.stepTitle}>{s.title}</h3>
                        <p style={styles.stepDesc}>{s.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Beneficiary Flow */}
        <section style={{ ...styles.section, background: '#f0fdf4', padding: '56px 24px', maxWidth: '100%' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                <h2 style={styles.sectionTitle}>For Families & Shelters 🏠</h2>
                <p style={styles.text}>
                    Low-income families and NGO-run shelter houses get access to quality food at a
                    fraction of the market price.
                </p>
                <div style={styles.stepsGrid}>
                    {beneficiarySteps.map((s) => (
                        <div key={s.step} style={{ ...styles.stepCard, background: '#fff' }}>
                            <div style={styles.stepNumber}>{s.step}</div>
                            <div style={styles.stepIcon}>{s.icon}</div>
                            <h3 style={styles.stepTitle}>{s.title}</h3>
                            <p style={styles.stepDesc}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Business Model */}
        <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Business Model 📈</h2>
            <table style={styles.table}>
                <tbody>
                    {businessModel.map((row) => (
                        <tr key={row.label}>
                            <td style={styles.tdLabel}>{row.label}</td>
                            <td style={styles.tdValue}>{row.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>

        {/* Impact Goals */}
        <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Year-1 Impact Goals 🎯</h2>
            <div style={styles.goalsGrid}>
                {[
                    { icon: '🍽️', value: '1,00,000', label: 'Meals Redistributed' },
                    { icon: '🏪', value: '500+', label: 'Registered Donors' },
                    { icon: '👨‍👩‍👧', value: '10,000+', label: 'Beneficiary Families' },
                    { icon: '🏘️', value: '50+', label: 'Shelter Houses Served' },
                ].map((g) => (
                    <div key={g.label} style={styles.goalCard}>
                        <div style={styles.goalIcon}>{g.icon}</div>
                        <div style={styles.goalValue}>{g.value}</div>
                        <div style={styles.goalLabel}>{g.label}</div>
                    </div>
                ))}
            </div>
        </section>

        <div style={styles.ctaRow}>
            <a href="/foodshare/donor-signup" style={{ ...styles.btn, background: '#16a34a', color: '#fff' }}>
                Join as Donor
            </a>
            <a href="/foodshare/beneficiary-signup" style={{ ...styles.btn, background: '#facc15', color: '#14532d' }}>
                Register as Beneficiary
            </a>
        </div>
    </div>
);

const styles = {
    page: { fontFamily: 'Segoe UI, sans-serif', color: '#1a1a1a' },
    pageTitle: { fontSize: 36, fontWeight: 800, color: '#14532d', margin: '40px 24px 8px' },
    pageSubtitle: { fontSize: 17, color: '#6b7280', margin: '0 24px 40px' },
    section: { padding: '40px 24px', maxWidth: 1100, margin: '0 auto' },
    sectionTitle: { fontSize: 26, fontWeight: 700, color: '#14532d', marginBottom: 12 },
    text: { fontSize: 15, color: '#374151', lineHeight: 1.7, marginBottom: 28 },
    stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 },
    stepCard: {
        background: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: 24,
    },
    stepNumber: { fontSize: 11, fontWeight: 800, color: '#16a34a', letterSpacing: 2, marginBottom: 6 },
    stepIcon: { fontSize: 36, marginBottom: 10 },
    stepTitle: { fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 8 },
    stepDesc: { fontSize: 14, color: '#6b7280', lineHeight: 1.6, margin: 0 },
    table: { width: '100%', borderCollapse: 'collapse' },
    tdLabel: {
        fontWeight: 700,
        color: '#14532d',
        padding: '12px 16px',
        borderBottom: '1px solid #e5e7eb',
        width: '35%',
        fontSize: 14,
        verticalAlign: 'top',
    },
    tdValue: {
        padding: '12px 16px',
        borderBottom: '1px solid #e5e7eb',
        color: '#374151',
        fontSize: 14,
        lineHeight: 1.6,
    },
    goalsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 },
    goalCard: {
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: 12,
        padding: 24,
        textAlign: 'center',
    },
    goalIcon: { fontSize: 36, marginBottom: 8 },
    goalValue: { fontSize: 28, fontWeight: 800, color: '#16a34a', marginBottom: 6 },
    goalLabel: { fontSize: 13, color: '#6b7280' },
    ctaRow: {
        display: 'flex',
        gap: 16,
        justifyContent: 'center',
        padding: '40px 24px 64px',
        flexWrap: 'wrap',
    },
    btn: {
        display: 'inline-block',
        padding: '14px 32px',
        borderRadius: 8,
        fontWeight: 700,
        fontSize: 15,
        textDecoration: 'none',
        cursor: 'pointer',
    },
};

export default HowItWorks;
