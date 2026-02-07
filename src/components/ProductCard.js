import React from 'react';

function ProductCard({ name, price, image, isUploaded }) {
  return (
    <div className="product-card soft-hover">
      {isUploaded && <div className="product-card__badge">New</div>}
      {image && (
        <div className="product-card__media">
          <img src={image} alt={name} className="product-card__image product-image" />
        </div>
      )}

      <div className="product-card__body">
        <h3 className="product-card__title">{name}</h3>
        <p className="product-card__price">₹{price}</p>

        <a
          href="https://wa.me/916260859941?text=Hello%20Dream%20Girl%20Boutique,%0A%0AI%20am%20interested%20in%20this%20product.%0A%0APlease%20share%20details."
          target="_blank"
          rel="noreferrer"
          className="product-card__btn"
        >
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
