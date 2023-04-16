export async function fetchComments() {
  try {
    // const response = await fetch('/fetch-comments');
    const response = await fetch('/fetch-comments?' + new Date().getTime());
    const comments = await response.json();

    // Get the last 5 comments and reverse the order
    const recentComments = comments.slice(-5).reverse();

    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';

    recentComments.forEach((comment) => {
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('comment');

      const commentText = document.createElement('p');
      commentText.textContent = comment.comment;
      commentDiv.appendChild(commentText);

      const commentInfo = document.createElement('div');
      commentInfo.classList.add('comment-info');

      const commentId = document.createElement('span');
      commentId.classList.add('comment-id');
      commentId.textContent = `ID: ${comment.id}`;
      commentInfo.appendChild(commentId);

      const commentDate = document.createElement('span');
      commentDate.classList.add('comment-date');
      commentDate.textContent = new Date(comment.time).toLocaleDateString();
      commentInfo.appendChild(commentDate);

      commentDiv.appendChild(commentInfo);
      commentsList.appendChild(commentDiv);
    });

  } catch (err) {
    console.error('Error fetching comments:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchComments();
});