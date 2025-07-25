// components/dashboard.js
import { saveFile, getFiles, deleteFile } from '../utils/storage.js';
import { renderFileItem } from './fileItem.js';

export function initDashboard(container, user) {
  container.innerHTML = `
    <section class="dashboard">
      <header class="dash-header">
        <h2>Hello, ${user.username}</h2>
        <button id="logout">Logout</button>
      </header>

      <form id="upload-form">
        <input type="file" id="file-input" multiple />
        <button type="submit">Upload</button>
      </form>

      <div class="file-list" id="file-list"></div>
    </section>
  `;

  const logoutBtn = document.getElementById('logout');
  logoutBtn.onclick = () => {
    localStorage.removeItem('user');
    location.reload();
  };

  const uploadForm = document.getElementById('upload-form');
  const fileInput = document.getElementById('file-input');
  const fileList = document.getElementById('file-list');

  uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const files = Array.from(fileInput.files);
    files.forEach(file => {
      saveFile(file);
    });
    fileInput.value = '';
    refreshFiles();
  });

  function refreshFiles() {
    const files = getFiles();
    fileList.innerHTML = '';
    files.forEach(file => {
      const item = renderFileItem(file, () => {
        deleteFile(file.name);
        refreshFiles();
      });
      fileList.appendChild(item);
    });
  }

  refreshFiles();
}
