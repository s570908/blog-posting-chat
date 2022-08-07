import { ChangeEvent, useCallback, useRef } from 'react';
import axios from 'axios';

function App() {
  const inputFileElement = useRef<HTMLInputElement>(null);

  const onClick = useCallback(() => {
    inputFileElement.current?.click();
  }, []);

  const onUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    const formData = new FormData();
    [...files].forEach((file) => formData.append('file', file));

    try {
      const { data } = await axios.post<string[]>(
        'http://localhost:4000/file/upload',
        formData
      );

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const onDownload = useCallback(async () => {
    const response = await axios.get('http://localhost:4000/file/download', {
      responseType: 'blob',
    });
    console.log(response.headers);
    const fileName =
      response.headers['content-disposition'].split('filename=')[1];

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, []);

  return (
    <>
      <button onClick={onClick}>파일 업로드</button>
      <input
        type="file"
        multiple
        hidden
        ref={inputFileElement}
        onChange={onUpload}
      />
      <button onClick={onDownload}>파일 다운로드</button>

      {/* <a href="http://localhost:4000/file/download">
        <button>파일 다운로드</button>
      </a> */}

      <a href="http://localhost:4000/file/downloads3">
        <button>파일 다운로드 S3</button>
      </a>
    </>
  );
}

export default App;
