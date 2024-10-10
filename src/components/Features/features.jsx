import './features.css'

export default function Features({picture, alt, title, description}) {
    return (
        <div className="feature-item">
          <img src={picture} alt={alt} class="feature-icon" />
          <h3 className="feature-item-title">{title}</h3>
          <p>{description}</p>
        </div>
    )
}