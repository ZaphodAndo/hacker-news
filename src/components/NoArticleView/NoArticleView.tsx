import "./NoArticleView.css";

export function NoArticleView() {
    return (
        <main className="no-article-view">
            <span aria-hidden="true">📝</span>
            <p>No article selected.</p>
        </main>
    );
}
