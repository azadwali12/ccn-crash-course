import React, { useState } from 'react';

const BUSINESS_TYPES = [
    'Restaurant',
    'Bakery',
    'Wedding / Event Hall',
    'Catering Service',
    'Hotel',
    'Supermarket / Grocery Store',
    'Other',
];

const CITIES = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Other'];

const initialForm = {
    businessName: '',
    businessType: '',
    ownerName: '',
    cnic: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    avgSurplusKg: '',
    surplusFrequency: '',
    agree: false,
};

const DonorSignup = () => {
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!form.businessName.trim()) e.businessName = 'Business name is required.';
        if (!form.businessType) e.businessType = 'Please select a business type.';
        if (!form.ownerName.trim()) e.ownerName = 'Owner / manager name is required.';
        if (!/^\d{13}$/.test(form.cnic.replace(/-/g, '')))
            e.cnic = 'Enter a valid 13-digit CNIC (e.g. 42101-1234567-1).';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
        if (!/^03\d{9}$/.test(form.phone)) e.phone = 'Enter a valid Pakistani mobile number (e.g. 03001234567).';
        if (!form.city) e.city = 'Please select your city.';
        if (!form.address.trim()) e.address = 'Address is required.';
        if (!form.agree) e.agree = 'You must agree to the terms to proceed.';
        return e;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        // In a real app this would POST to /api/foodshare/donors
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div style={styles.successBox}>
                <div style={styles.successIcon}>🎉</div>
                <h2 style={styles.successTitle}>Registration Received!</h2>
                <p style={styles.successText}>
                    Thank you, <strong>{form.businessName}</strong>! Our team will verify your details
                    within 24 hours and contact you at <strong>{form.email}</strong>.
                </p>
                <a href="/foodshare" style={styles.backLink}>← Back to FoodShare Home</a>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>🏪 Donor Registration</h1>
                <p style={styles.subtitle}>
                    Register your business to start donating surplus food and reduce waste while
                    helping families in need.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                    <fieldset style={styles.fieldset}>
                        <legend style={styles.legend}>Business Information</legend>

                        <Field label="Business Name *" error={errors.businessName}>
                            <input
                                style={fieldStyle(errors.businessName)}
                                name="businessName"
                                value={form.businessName}
                                onChange={handleChange}
                                placeholder="e.g. Al-Noor Restaurant"
                            />
                        </Field>

                        <Field label="Business Type *" error={errors.businessType}>
                            <select
                                style={fieldStyle(errors.businessType)}
                                name="businessType"
                                value={form.businessType}
                                onChange={handleChange}
                            >
                                <option value="">— Select —</option>
                                {BUSINESS_TYPES.map((t) => <option key={t}>{t}</option>)}
                            </select>
                        </Field>

                        <Field label="Owner / Manager Name *" error={errors.ownerName}>
                            <input
                                style={fieldStyle(errors.ownerName)}
                                name="ownerName"
                                value={form.ownerName}
                                onChange={handleChange}
                                placeholder="Full name"
                            />
                        </Field>

                        <Field label="CNIC Number *" error={errors.cnic}>
                            <input
                                style={fieldStyle(errors.cnic)}
                                name="cnic"
                                value={form.cnic}
                                onChange={handleChange}
                                placeholder="42101-1234567-1"
                                maxLength={15}
                            />
                        </Field>
                    </fieldset>

                    <fieldset style={styles.fieldset}>
                        <legend style={styles.legend}>Contact Details</legend>

                        <Field label="Email Address *" error={errors.email}>
                            <input
                                style={fieldStyle(errors.email)}
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                            />
                        </Field>

                        <Field label="Mobile Number *" error={errors.phone}>
                            <input
                                style={fieldStyle(errors.phone)}
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="03001234567"
                                maxLength={11}
                            />
                        </Field>

                        <Field label="City *" error={errors.city}>
                            <select
                                style={fieldStyle(errors.city)}
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                            >
                                <option value="">— Select City —</option>
                                {CITIES.map((c) => <option key={c}>{c}</option>)}
                            </select>
                        </Field>

                        <Field label="Full Address *" error={errors.address}>
                            <textarea
                                style={{ ...fieldStyle(errors.address), resize: 'vertical', minHeight: 72 }}
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Street, area, city"
                            />
                        </Field>
                    </fieldset>

                    <fieldset style={styles.fieldset}>
                        <legend style={styles.legend}>Surplus Food Details (Optional)</legend>

                        <Field label="Average Surplus per Day (kg)">
                            <input
                                style={fieldStyle()}
                                name="avgSurplusKg"
                                type="number"
                                min="0"
                                value={form.avgSurplusKg}
                                onChange={handleChange}
                                placeholder="e.g. 20"
                            />
                        </Field>

                        <Field label="How often do you have surplus?">
                            <select
                                style={fieldStyle()}
                                name="surplusFrequency"
                                value={form.surplusFrequency}
                                onChange={handleChange}
                            >
                                <option value="">— Select —</option>
                                <option>Daily</option>
                                <option>A few times a week</option>
                                <option>Weekends only</option>
                                <option>Occasionally (events)</option>
                            </select>
                        </Field>
                    </fieldset>

                    <label style={styles.checkboxRow}>
                        <input
                            type="checkbox"
                            name="agree"
                            checked={form.agree}
                            onChange={handleChange}
                            style={{ marginRight: 8 }}
                        />
                        <span>
                            I agree to FoodShare Pakistan's{' '}
                            <a href="/foodshare/terms" style={styles.link}>Terms & Conditions</a>{' '}
                            and confirm the food listed will meet safety standards.
                        </span>
                    </label>
                    {errors.agree && <div style={styles.error}>{errors.agree}</div>}

                    <button type="submit" style={styles.submitBtn}>
                        Register as Donor →
                    </button>
                </form>
            </div>
        </div>
    );
};

/* ── Helper components ── */
const Field = ({ label, error, children }) => (
    <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 6, color: '#374151' }}>
            {label}
        </label>
        {children}
        {error && <div style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>{error}</div>}
    </div>
);

const fieldStyle = (error) => ({
    width: '100%',
    padding: '10px 12px',
    borderRadius: 8,
    border: `1px solid ${error ? '#fca5a5' : '#d1d5db'}`,
    fontSize: 14,
    boxSizing: 'border-box',
    outline: 'none',
    background: error ? '#fff7f7' : '#fff',
});

const styles = {
    page: {
        fontFamily: 'Segoe UI, sans-serif',
        background: '#f9fafb',
        minHeight: '100vh',
        padding: '40px 16px',
    },
    card: {
        background: '#fff',
        borderRadius: 16,
        padding: '40px 36px',
        maxWidth: 680,
        margin: '0 auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    },
    title: { fontSize: 28, fontWeight: 800, color: '#14532d', marginBottom: 8 },
    subtitle: { fontSize: 15, color: '#6b7280', marginBottom: 32, lineHeight: 1.6 },
    fieldset: { border: '1px solid #e5e7eb', borderRadius: 10, padding: '20px 20px 8px', marginBottom: 24 },
    legend: { fontWeight: 700, color: '#15803d', fontSize: 14, padding: '0 8px' },
    checkboxRow: {
        display: 'flex',
        alignItems: 'flex-start',
        fontSize: 14,
        color: '#374151',
        marginBottom: 8,
        cursor: 'pointer',
        lineHeight: 1.5,
    },
    link: { color: '#16a34a', textDecoration: 'underline' },
    error: { color: '#dc2626', fontSize: 12, marginBottom: 12 },
    submitBtn: {
        marginTop: 24,
        width: '100%',
        background: '#16a34a',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        padding: '14px 0',
        fontWeight: 700,
        fontSize: 16,
        cursor: 'pointer',
    },
    successBox: {
        fontFamily: 'Segoe UI, sans-serif',
        textAlign: 'center',
        padding: '80px 24px',
        maxWidth: 540,
        margin: '0 auto',
    },
    successIcon: { fontSize: 72, marginBottom: 16 },
    successTitle: { fontSize: 30, fontWeight: 800, color: '#14532d', marginBottom: 12 },
    successText: { fontSize: 16, color: '#374151', lineHeight: 1.7, marginBottom: 32 },
    backLink: { color: '#16a34a', fontWeight: 700, textDecoration: 'none', fontSize: 15 },
};

export default DonorSignup;
