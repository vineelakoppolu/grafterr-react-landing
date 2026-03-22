export default function ProductCard({ product }) {
  return (
    <article className={`product-card ${product.variant}`} data-card>
      <h3 className="product-card-title">{product.title}</h3>
      <div className="product-card-visual">
        <div className="product-device">
          <img src={product.image} alt={product.alt} />
        </div>
      </div>
    </article>
  )
}
