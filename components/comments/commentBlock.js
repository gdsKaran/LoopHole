import { CommentDeleteFunc, storeComments } from "@/actions/auth";
import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState, useRef } from "react";

export default function CommentBlock({ postId, comments, currentUser }) {
  const formRef = useRef(null);
  const textareaRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleReplySubmit = async (replyText, parentCommentId = null) => {
    const formData = new FormData();
    formData.append("text", replyText);
    formData.append("id", postId);
    formData.append("parentCommentId", parentCommentId);

    try {
      await storeComments(formData);
    } catch (error) {
      console.error("Failed to submit reply:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await CommentDeleteFunc(currentUser, postId, commentId);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  function CommentReply({ comment, onReply, onDelete, currentUser }) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const replyTextRef = useRef(null);

    const dateObject = new Date(comment.created_at);

    let hours = dateObject.getHours();
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 24-hour to 12-hour, 0 becomes 12

    const formattedTime = `${hours}:${minutes} ${ampm}`;

    console.log(formattedTime);

    const toggleReplyForm = () => {
      setShowReplyForm((prev) => !prev);
    };

    const handleReplySubmit = async (event) => {
      event.preventDefault();
      const replyText = replyTextRef.current.value.trim();
      if (!replyText) return;

      await onReply(replyText, comment.id);
      replyTextRef.current.value = "";
      setShowReplyForm(false);
    };

    return (
      <div className="border border-gray-200 rounded-lg p-2 bg-gray-50 relative">
        <h4 className="text-sm font-semibold text-gray-700">
          {comment.user_name}
        </h4>
        <p class="text-gray-400 text-xs">{comment.created_at.slice(0, 10)}</p>
        <p class="text-gray-400 text-xs">{formattedTime}</p>
        <p className="mt-1 text-sm text-gray-600">{comment.content}</p>
        {comment.user_id === currentUser && (
          <button
            onClick={() => onDelete(comment.id)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
            aria-label="Delete comment"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        )}
        <button
          className="text-blue-500 text-sm mt-2"
          onClick={toggleReplyForm}
        >
          Reply
        </button>

        {showReplyForm && (
          <form onSubmit={handleReplySubmit} className="mt-2">
            <input
              ref={replyTextRef}
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
              placeholder="Write a reply..."
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white py-1 px-4 rounded"
            >
              Submit
            </button>
          </form>
        )}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 mt-4 border-l-2 pl-4">
            {comment.replies.map((reply) => (
              <CommentReply
                key={reply.id}
                comment={reply}
                onReply={onReply}
                onDelete={onDelete}
                currentUser={currentUser}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const commentText = textareaRef.current.value.trim();
    if (!commentText) return;

    await handleReplySubmit(commentText);
    textareaRef.current.value = "";
    setIsCollapsed(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Comment submission form */}
      <div className="bg-white shadow-md p-6 top-0 z-10">
        <form
          ref={formRef}
          onSubmit={handleCommentSubmit}
          className="max-w-2xl mx-auto"
        >
          <textarea
            ref={textareaRef}
            className={`w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 transition-all duration-300 ${
              isCollapsed ? "h-10" : "h-24"
            }`}
            rows={isCollapsed ? 1 : 4}
            placeholder="Add a comment..."
            name="text"
            onFocus={() => setIsCollapsed(false)}
          />
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PaperAirplaneIcon className="h-5 w-5 mr-2 transform rotate-45" />
              Post Comment
            </button>
          </div>
        </form>
      </div>

      {/* Comments display */}
      <div className="p-6 max-w-2xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentReply
                key={comment.id}
                comment={comment}
                onReply={handleReplySubmit}
                onDelete={handleDelete}
                currentUser={currentUser}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
