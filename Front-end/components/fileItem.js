// components/fileItem.js
export function renderFileItem(file, onDelete) {
  const div = document.createElement('div');
  div.className = 'file-item';
  div.innerHTML = `
    <span class="filename">${file.name}</span>
    <div class="actions">
      <button class="download">⬇</button>
      <button class="delete">❌</button>
    </div>
  `;

  div.querySelector('.download').onclick = () => {
    const blob = new Blob([Uint8Array.from(file.data)], { type: file.type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  div.querySelector('.delete').onclick = onDelete;

  return div;
}
