const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fetchCoupons() {
    const { data, error } = await supabase
        .from('coupons')
        .select('*');

    if (error) {
        console.error('Error fetching coupons:', error);
        return;
    }

    displayCoupons(data);
}

function displayCoupons(coupons) {
    const couponList = document.getElementById('coupon-list');
    couponList.innerHTML = '';

    coupons.forEach(coupon => {
        const couponCard = document.createElement('div');
        couponCard.className = 'bg-white rounded-lg shadow-md p-4';
        couponCard.innerHTML = `
            <h2 class="text-xl font-semibold mb-2">${coupon.title}</h2>
            <p class="text-gray-600 mb-2">${coupon.description}</p>
            <p class="text-green-600 font-bold mb-2">Diskon: ${coupon.discount}</p>
            <p class="text-gray-500">Berakhir: ${coupon.expiry_date}</p>
            <div class="flex items-center justify-between mt-4">
                <span id="coupon-code-${coupon.id}" class="text-blue-500 font-mono">${coupon.code}</span>
                <button onclick="copyCouponCode('${coupon.id}')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Salin
                </button>
            </div>
        `;
        couponList.appendChild(couponCard);
    });
}

function copyCouponCode(couponId) {
    const couponCodeElement = document.getElementById(`coupon-code-${couponId}`);
    const couponCode = couponCodeElement.textContent;

    navigator.clipboard.writeText(couponCode)
        .then(() => {
            alert('Kode kupon berhasil disalin!');
        })
        .catch(err => {
            console.error('Gagal menyalin kode kupon:', err);
        });
}

fetchCoupons();