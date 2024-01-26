import { writeFile } from "fs/promises";
import { join } from "path"

export default function ServerUploadPage() {

    async function upload(data: FormData) {
        'use server'
        const file: File | null = data.get('file') as unknown as File

        if (!file) {
            throw new Error('No file uploaded')
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const path = join('--path--', file.name)
        await writeFile(path, buffer)
        console.log(`open ${path} to see uploaded file`)

        return {success: true}

  }

    return (
        <main>
            <h1>Server Component</h1>
            <form action={upload}>
<input type="file" name="file" />
<input type="submit" value="Upload" />
            </form>
        </main>
    )
}