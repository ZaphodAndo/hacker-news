import "./NoArticleView.css";

export function NoArticleView() {
    return (
        <div className="no-article-view">
            <span aria-hidden="true">📝</span>
            <p>No article selected.</p>
        </div>
    );
}
