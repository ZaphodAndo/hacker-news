import React, { Component } from "react";
import type { Post } from "../../models/Post";
import "./Link.css";

type LinkProps = {
    post: Post;
    onClick: (story: Post) => void;
};

export class Link extends Component<LinkProps> {
    private _linkRef: React.RefObject<HTMLDivElement | null>;

    constructor(props: LinkProps) {
        super(props);
        this._linkRef = React.createRef();
    }

    public viewPost = () => {
        if (this._linkRef.current?.className !== "link active") {
            const element = document.getElementsByClassName("active");

            if (element[0] !== undefined) {
                element[0].classList.remove("active");
            }

            if (this._linkRef.current?.className) {
                this._linkRef.current.className = "link active";
            }
        }

        this.props.onClick(this.props.post);
    };

    public render() {
        return (
            <div className="link" onClick={this.viewPost} ref={this._linkRef}>
                <h1>{this.props.post.title}</h1>
                <p>
                    Posted by {this.props.post.user} {this.props.post.time_ago}
                </p>
            </div>
        );
    }
}
