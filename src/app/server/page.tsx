// import { writeFile } from "fs/promises";
import { join } from "path";
import os from "os";
import sharp from "sharp";

export default function ServerUploadPage() {
  async function upload(data: FormData) {
    "use server";
    try {
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      throw new Error("No file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const desktopPath = join(os.homedir(), "Desktop");
    const outputPath = join(desktopPath, "edited.jpeg");
    const sharpImage = await sharp(buffer).blur(15).toFile(outputPath);

      return { success: true }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main>
      <h1>Server Component</h1>
      <form action={upload}>
        <input type="file" name="file" />
        <input type="button" value="Upload" />
      </form>
    </main>
  );
}
