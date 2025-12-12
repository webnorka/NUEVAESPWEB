import fs from "fs";
import path from "path";

export async function getManifestoContent() {
    const filePath = path.join(process.cwd(), "ideario", "MANIFIESTO.md");
    try {
        const content = await fs.promises.readFile(filePath, "utf8");
        return content;
    } catch (error) {
        console.error("Error reading manifesto:", error);
        return "Error cargando el manifiesto.";
    }
}
