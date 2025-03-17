import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ukwhbprucranksyqayft.supabase.co';
//gunakan variabel lingkungan atau cara yang lebih aman untuk menyimpan kunci api
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrd2hicHJ1Y3JhbmtzeXFheWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMDk1NjEsImV4cCI6MjA1Nzc4NTU2MX0.19IRc8a2TZG4PPImaF_f10_I3jC8ge1_tPw8aVGR9Ho'; //Jangan simpan API key di kode client side.

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchCoupons() {
    const { data, error } = await supabase.from('coupons').select('*');

    if (error) {
        console.error('Error fetching coupons:', error);
        return;
    }

    displayCoupons(data);
}

function displayCoupons(coupons) {
    const couponList = document.getElementById('coupon-list');
    if (!couponList) return; // Tambahkan pemeriksaan untuk memastikan elemen ada

    couponList.innerHTML = '';

    coupons.forEach((coupon) => {
        const couponCard = document.createElement('div');
        couponCard.className = 'bg-white rounded-lg shadow-md p-4';
        couponCard.innerHTML = `
            <h2 class="text-xl font-semibold mb-2">${coupon.title}</h2>
            <p class="text-gray-600 mb-2">${coupon.description}</p>
            <p class="text-green-600 font-bold mb-2">Diskon: ${coupon.discount}</p>
            <p class="text-gray-500">Berakhir: ${coupon.expiry_date}</p>
            <div class="flex items-center justify-between mt-4">
                <span id="coupon-code-${coupon.id}" class="text-blue-500 font-mono">${coupon.code}</span>
                <button data-coupon-id="${coupon.id}" class="copy-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Salin
                </button>
            </div>
        `;
        couponList.appendChild(couponCard);
    });
    // Menambahkan event listener setelah elemen dibuat
    document.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', function() {
            const couponId = this.dataset.couponId;
            copyCouponCode(couponId);
        });
    });
}

function copyCouponCode(couponId) {
    const couponCodeElement = document.getElementById(`coupon-code-${couponId}`);
    if (!couponCodeElement) return;

    const couponCode = couponCodeElement.textContent;

    navigator.clipboard
        .writeText(couponCode)
        .then(() => {
            alert('Kode kupon berhasil disalin!');
        })
        .catch((err) => {
            console.error('Gagal menyalin kode kupon:', err);
            alert('Gagal menyalin kode kupon.');
        });
}

fetchCoupons();
