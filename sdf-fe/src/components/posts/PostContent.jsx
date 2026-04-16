import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LastPostTime from "../LastPostTime";

function PostContent({ post, headingLevel = 4, onReply, className = '' }) {
    const HeadingTag = `h${headingLevel}`;
    const date = new Date(post.created_at);
    
    const datestamp =
        date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }) +
        " " +
        date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });

    return (
        <div className={`post ${className}`}>

            {/* HEADER */}
            <div className="post-header">

                {/* TITLE ROW */}
                {post.post_title && (
                    <div className="post-title">
                        <span className="post-timestamp">
                            <LastPostTime timeOfLastPost={post.created_at} />
                        </span>

                        <HeadingTag>{post.post_title}</HeadingTag>
                                           
                    </div>
                )}

                {/* META + ACTIONS */}
                <div className="post-meta">
                    <div className="post-meta-left">
                        <span className="username">{post.username}</span>

                        <span className="posting-time-stamp">
                            {datestamp}
                        </span>
                    </div>

                    {onReply && (
                        <button
                            className="reply-btn"
                            onClick={() => onReply(post)}
                        >
                            Reply
                        </button>
                    )}
                </div>
            </div>

            {/* BODY */}
            <div className="post-body">                
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {post.post_body}
                </ReactMarkdown>
            </div>
        </div>
    );
}

export default PostContent;