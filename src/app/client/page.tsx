"use client";

import { useState, ChangeEvent, FormEvent } from "react";

function ClientUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [blurLevel, setBlurLevel] = useState<number>(0);
  const [grayscale, setGrayscale] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("blur", blurLevel.toString());
    formData.append("grayscale", grayscale.toString());

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" name="file" onChange={handleFileChange} />
        </div>
        <input
          type="number"
          name="blur"
          placeholder="Blur Level"
          value={blurLevel}
          onChange={(e) => setBlurLevel(parseInt(e.target.value))}
        />
        <div>
          <label>
            Grayscale:
            <input
              type="checkbox"
              name="grayscale"
              checked={grayscale}
              onChange={(e) => setGrayscale(e.target.checked)}
            />
          </label>
        </div>
        <button type="submit">Upload</button>
      </form>
    </>
  );
}

export default ClientUploadPage;
