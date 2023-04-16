

import { fetchComments } from "./displayComments.js";

document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.getElementById("comment-form");

  commentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const commentInput = document.getElementById("comment");
    const comment = commentInput.value;
    if (comment.trim() === "") return;

    try {
      const response = await fetch("/submit-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment,
          recaptcha: grecaptcha.getResponse(),
        }),
      });

      if (response.status === 429) {
        const error = await response.text();
        alert(error);
      } else if (response.status === 200) {
        commentInput.value = "";
        fetchComments();
      } else if (response.status === 400) {
        alert("Invalid reCAPTCHA. Please try again.");
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("An error occurred. Please try again.");
    }
  });
});
