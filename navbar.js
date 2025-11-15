
class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .floating-buttons {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 100;
        }
        .floating-button {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #f59e0b;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
        }
        .floating-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }
        .floating-button i {
          width: 24px;
          height: 24px;
        }
        .tooltip {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: #333;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .floating-button:hover .tooltip {
          opacity: 1;
          visibility: visible;
          top: -35px;
        }
</style>
      <div class="floating-buttons">
        <a href="login.html" class="floating-button" aria-label="Login">
          <i data-feather="user"></i>
          <span class="tooltip">Login/Cadastro</span>
        </a>
        <a href="index.html" class="floating-button" aria-label="Início">
          <i data-feather="home"></i>
          <span class="tooltip">Início</span>
        </a>
<a href="menu.html" class="floating-button" aria-label="Cardápio">
          <i data-feather="book-open"></i>
          <span class="tooltip">Cardápio</span>
        </a>
      <a href="cart.html" class="floating-button relative" aria-label="Carrinho">
          <i data-feather="shopping-cart"></i>
          <span class="tooltip">Carrinho</span>
          <span class="cart-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"></span>
        </a>
</div>
`;
    feather.replace();
  }
}

customElements.define('custom-navbar', CustomNavbar);
