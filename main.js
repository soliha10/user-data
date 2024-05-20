document.addEventListener('DOMContentLoaded', () => {
  const USERS_URL = "https://jsonplaceholder.typicode.com/users";
  const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
  const COMMENTS_URL = "https://jsonplaceholder.typicode.com/comments";
  
  const userTemplate = document.getElementById('user-template').content;
  const postTemplate = document.getElementById('post-template').content;
  const commentTemplate = document.getElementById('comment-template').content;
  
  const usersList = document.querySelector('.users-list');
  const postsList = document.querySelector('.posts-list');
  const commentsList = document.querySelector('.comments-list');

  fetch(USERS_URL)
      .then(response => response.json())
      .then(users => renderUsers(users));

  function renderUsers(users) {
      usersList.innerHTML = '';
      users.forEach(user => {
          const clone = userTemplate.cloneNode(true);
          clone.querySelector('.user-item').dataset.userId = user.id;
          clone.querySelector('.user-id').textContent = user.id;
          clone.querySelector('.user-name').textContent = user.username;
          clone.querySelector('.user-email').textContent = user.email;
          clone.querySelector('.address-data').textContent = `${user.address.street}, ${user.address.city}`;
          clone.querySelector('.user-phone a').textContent = user.phone;
          usersList.appendChild(clone);
      });
  }

  usersList.addEventListener('click', event => {
      if (event.target.matches('.view-posts-btn')) {
          const userId = event.target.closest('.user-item').dataset.userId;
          fetch(`${POSTS_URL}?userId=${userId}`)
              .then(response => response.json())
              .then(posts => renderPosts(posts));
      }
  });

  function renderPosts(posts) {
      postsList.innerHTML = '';
      posts.forEach(post => {
          const clone = postTemplate.cloneNode(true);
          clone.querySelector('.post-item').dataset.postId = post.id;
          clone.querySelector('.post-id').textContent = post.id;
          clone.querySelector('.post-body').textContent = post.body;
          postsList.appendChild(clone);
      });
  }

  postsList.addEventListener('click', event => {
      if (event.target.matches('.view-comments-btn')) {
          const postId = event.target.closest('.post-item').dataset.postId;
          fetch(`${COMMENTS_URL}?postId=${postId}`)
              .then(response => response.json())
              .then(comments => renderComments(comments));
      }
  });

  function renderComments(comments) {
      commentsList.innerHTML = '';
      comments.forEach(comment => {
          const clone = commentTemplate.cloneNode(true);
          clone.querySelector('.comment-id').textContent = comment.id;
          clone.querySelector('.comment-name').textContent = comment.name;
          clone.querySelector('.comment-body').textContent = comment.body;
          clone.querySelector('.comment-email').textContent = comment.email;
          commentsList.appendChild(clone);
      });
  }
});
