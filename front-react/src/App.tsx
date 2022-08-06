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
    </>
  );
}

export default App;
