
// Global cart state
let cartItems = JSON.parse(localStorage.getItem('cart')) || [
    {
        id: "pizza-margherita",
        name: "Pizza Margherita",
        price: 39.90,
        quantity: 1
    },
    {
        id: "acai-500ml",
        name: "Açaí 500ml",
        price: 16.90,
        quantity: 1
    }
];
localStorage.setItem('cart', JSON.stringify(cartItems));
// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    // Payment method selection
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    const creditCardForm = document.getElementById('credit-card-form');
    const pixQr = document.getElementById('pix-qr');
    const cashChange = document.getElementById('cash-change');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', (e) => {
            // Hide all forms first
            creditCardForm.classList.add('hidden');
            pixQr.classList.add('hidden');
            cashChange.classList.add('hidden');
            
            // Show selected form
            if (e.target.value === 'credit-card') {
                creditCardForm.classList.remove('hidden');
            } else if (e.target.value === 'pix') {
                pixQr.classList.remove('hidden');
            } else if (e.target.value === 'cash') {
                cashChange.classList.remove('hidden');
            }
        });
    });

    // Confirm payment button
    const confirmBtn = document.getElementById('confirm-payment');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            const selectedMethod = document.querySelector('input[name="payment"]:checked');
            if (!selectedMethod) {
                showToast('Selecione uma forma de pagamento', 'error');
                return;
            }

            // Validate credit card if selected
            if (selectedMethod.value === 'credit-card') {
                const cardNumber = document.getElementById('card-number').value;
                const cardName = document.getElementById('card-name').value;
                const cardExpiry = document.getElementById('card-expiry').value;
                const cardCvv = document.getElementById('card-cvv').value;
                
                if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
                    showToast('Preencha todos os campos do cartão', 'error');
                    return;
                }
            }

            // Validate cash amount if selected
            if (selectedMethod.value === 'cash') {
                const cashAmount = parseFloat(document.getElementById('cash-amount').value);
                const orderTotal = parseFloat(document.querySelector('.total-value').textContent.replace('R$ ', '').replace(',', '.'));
                
                if (isNaN(cashAmount) || cashAmount < orderTotal) {
                    showToast(`Informe um valor maior ou igual a R$ ${orderTotal.toFixed(2).replace('.', ',')}`, 'error');
                    return;
                }
            }

            // Proceed to confirmation
            window.location.href = 'confirmation.html';
        });
    }
updateCartBadge();
});

// Update cart badge count
function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = count > 0 ? count : '';
    }
}

// Global functions
function showToast(message, type = 'success') {
    if (document.getElementById('toast-container')) {
        const existingToasts = document.querySelectorAll('.toast-message');
        existingToasts.forEach(toast => toast.remove());
    } else {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed bottom-4 right-4 space-y-2 z-50';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-message px-6 py-3 rounded-lg shadow-lg text-white ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } animate-fade-in`;
    toast.textContent = message;
    
    document.getElementById('toast-container').appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('animate-fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Cart functions
function addToCart(item) {
    const existingItem = cartItems.find(i => i.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({...item, quantity: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    showToast(`${item.name} adicionado ao carrinho!`);
    updateCartBadge();
    if (window.location.pathname.includes('cart.html') || 
        window.location.pathname.includes('checkout.html')) {
        updateCartUI();
    }
}

function getCartTotal() {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}
function removeFromCart(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartUI();
    showToast('Item removido do carrinho', 'error');
}

function updateQuantity(itemId, newQuantity) {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        if (newQuantity < 1) {
            removeFromCart(itemId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cartItems));
            updateCartUI();
        }
    }
}

function updateCartUI() {
    if (window.location.pathname.includes('cart.html')) {
        renderCartItems();
    }
}
// Handle login/signup form validation
function validateForm(formType, email, password, name = '', confirmPassword = '') {
    if (!email || !password) {
        showToast('Por favor, preencha todos os campos', 'error');
        return false;
    }

    if (formType === 'signup') {
        if (!name) {
            showToast('Por favor, informe seu nome completo', 'error');
            return false;
        }
        if (password !== confirmPassword) {
            showToast('As senhas não coincidem', 'error');
            return false;
        }
        if (password.length < 6) {
            showToast('A senha deve ter pelo menos 6 caracteres', 'error');
            return false;
        }
    }

    return true;
}
const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} fade-in`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
// Document ready
document.addEventListener('DOMContentLoaded', () => {
    // Add to cart buttons - dynamic listener for existing and future elements
    document.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart')) {
            const button = e.target.closest('.add-to-cart');
            const card = button.closest('.bg-white');
            const img = card.querySelector('.bg-gray-100');
            
            const item = {
                id: button.dataset.id,
                name: button.dataset.name,
                price: parseFloat(button.dataset.price),
                image: img.style.backgroundImage || '',
                description: card.querySelector('p.text-gray-600')?.textContent || ''
            };
            addToCart(item);
        }
    });

    // Handle cart interactions - dynamic listener
    document.addEventListener('click', (e) => {
        if (e.target.closest('.increase-quantity')) {
            const button = e.target.closest('.increase-quantity');
            const itemId = button.dataset.id;
            const item = cartItems.find(i => i.id === itemId);
            if (item) updateQuantity(itemId, item.quantity + 1);
        }

        if (e.target.closest('.decrease-quantity')) {
            const button = e.target.closest('.decrease-quantity');
            const itemId = button.dataset.id;
            const item = cartItems.find(i => i.id === itemId);
            if (item) updateQuantity(itemId, item.quantity - 1);
        }

        if (e.target.closest('.remove-item')) {
            const button = e.target.closest('.remove-item');
            removeFromCart(button.dataset.id);
        }
    });

    // Render cart items if on cart page
    if (window.location.pathname.includes('cart.html')) {
        renderCartItems();
        updateOrderSummary();
    }

    // Accessibility: Add aria-labels to icons
    document.querySelectorAll('[data-feather]').forEach(icon => {
        const iconName = icon.getAttribute('data-feather');
        icon.setAttribute('aria-label', iconName);
    });
});

// Update order summary with current cart totals
function updateOrderSummary() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 8.00;
    const total = subtotal + deliveryFee;

    if (document.querySelector('.order-summary')) {
        document.querySelector('.subtotal-value').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        document.querySelector('.delivery-value').textContent = `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`;
        document.querySelector('.total-value').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}
function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;

    container.innerHTML = '';

    if (cartItems.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <i data-feather="shopping-cart" class="w-12 h-12 mx-auto text-gray-400 mb-4"></i>
                <p class="text-gray-600">Seu carrinho está vazio</p>
            </div>
        `;
        feather.replace();
        return;
    }

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'p-4 border-b border-gray-200 flex flex-col sm:flex-row';
        itemElement.innerHTML = `
            <div class="w-full sm:w-24 h-24 bg-gray-100 rounded-lg mb-4 sm:mb-0"></div>
            <div class="sm:ml-4 flex-grow">
                <div class="flex justify-between">
                    <h3 class="font-bold text-lg">${item.name}</h3>
                    <span class="font-bold text-gray-800">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                </div>
                <p class="text-gray-600 mb-2">Quantidade: ${item.quantity}</p>
                
                <div class="flex items-center justify-between mt-2">
                    <div class="flex items-center border border-gray-300 rounded-lg">
                        <button class="px-3 py-1 text-gray-600 hover:bg-gray-100 decrease-quantity" data-id="${item.id}">
                            <i data-feather="minus" width="16"></i>
                        </button>
                        <span class="px-3 quantity-display">${item.quantity}</span>
                        <button class="px-3 py-1 text-gray-600 hover:bg-gray-100 increase-quantity" data-id="${item.id}">
                            <i data-feather="plus" width="16"></i>
                        </button>
                    </div>
                    
                    <button class="text-red-500 hover:text-red-700 flex items-center remove-item" data-id="${item.id}">
                        <i data-feather="trash-2" width="16" class="mr-1"></i>
                        Remover
                    </button>
                </div>
            </div>
        `;
        container.appendChild(itemElement);
    });

    // Add event listeners for cart interactions
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = button.dataset.id;
            const item = cartItems.find(i => i.id === itemId);
            if (item) {
                updateQuantity(itemId, item.quantity - 1);
            }
        });
    });

    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = button.dataset.id;
            const item = cartItems.find(i => i.id === itemId);
            if (item) {
                updateQuantity(itemId, item.quantity + 1);
            }
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            removeFromCart(button.dataset.id);
        });
    });

    feather.replace();
}
