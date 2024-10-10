import './features.css'

export default function Features({picture, alt, title, description}) {
    return (
        <div class="feature-item">
          <img src={picture} alt={alt} class="feature-icon" />
          <h3 class="feature-item-title">{title}</h3>
          <p>{description}</p>
        </div>
    )
}