import PostContent from './PostContent';

/**
 * Displays the original thread starter post (OP).
 *
 * This is separated from replies because:
 * - It has different semantic meaning
 * - It may have different styling
 * - It is not part of the nested reply tree
 */
function OriginalPost({ thread, onReply }) {
    return (
        <PostContent
            post={thread}
            headingLevel={3}
            onReply={onReply}
            className="op"
        />
    );
}

export default OriginalPost;