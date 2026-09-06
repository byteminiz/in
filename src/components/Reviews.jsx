import { Star, Quote } from 'lucide-react';
import { reviews } from '../data/menuData';
import './Reviews.css';

function StarRating({ rating }) {
  return (
    <div className="star-rating" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < rating ? '#f59e0b' : 'none'}
          stroke={i < rating ? '#f59e0b' : '#4b3520'}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, delay }) {
  return (
    <article
      className="review-card"
      style={{ animationDelay: `${delay}ms` }}
      aria-label={`Review by ${review.name}`}
    >
      <div className="review-top">
        <div className="reviewer-avatar" aria-hidden="true">
          {review.avatar}
        </div>
        <div className="reviewer-info">
          <span className="reviewer-name">{review.name}</span>
          <span className="review-date">{review.date}</span>
        </div>
        <Quote className="review-quote-icon" size={20} aria-hidden="true" />
      </div>
      <StarRating rating={review.rating} />
      <blockquote className="review-text">{review.text}</blockquote>
    </article>
  );
}

export default function Reviews() {
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section id="reviews" className="section reviews-section" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="reviews-header text-center">
          <span className="section-label">Testimonials</span>
          <h2 id="reviews-heading" className="section-title">
            What Our <span>Customers</span> Say
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto 1.5rem' }}>
            Real experiences from our happy customers. We take pride in every plate we serve!
          </p>

          <div className="reviews-overall">
            <div className="overall-rating">
              <span className="overall-score">{avgRating}</span>
              <div>
                <div className="overall-stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={18} fill="#f59e0b" stroke="#f59e0b" />
                  ))}
                </div>
                <span>Based on {reviews.length} reviews</span>
              </div>
            </div>
          </div>
        </div>

        <div className="reviews-grid">
          {reviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} delay={i * 80} />
          ))}
        </div>

        <div className="reviews-cta text-center">
          <p>Have something to share? Leave us a review on Google!</p>
          <a
            href="https://share.google/pM0N2NxdUBvi2mnkV"
            target="_blank"
            rel="noopener noreferrer"
            id="google-review-btn"
            className="btn btn-outline"
          >
            ⭐ Leave a Review
          </a>
        </div>
      </div>
    </section>
  );
}
