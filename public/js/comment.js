const addComment = async (event) => {
  event.preventDefault();
  const project_id = event.target.getAttribute("data-id");
  // Collect values from the login form
  const comment = document.getElementById("commentInput").value.trim();
  if (comment) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment, project_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document.getElementById("commentSubmit").addEventListener("click", addComment);
