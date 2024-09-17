export function downloadArchive(response, name = 'archive.zip') {
  const url = window.URL.createObjectURL(
    new Blob([response], {
      type: 'application/zip',
    }),
  );
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function downloadFile(
  response,
  name = 'archive.txt',
  formatFile = 'txt',
) {
  const url =
    formatFile === 'zip'
      ? window.URL.createObjectURL(
          new Blob([response], {
            type: 'application/zip',
          }),
        )
      : window.URL.createObjectURL(new Blob([response]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export default {};
