"""Zmenší fotky z assets/originals do public/images a odstraní EXIF."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCES = {
    "spolecna.jpg": 1800,
    "martin.jpg": 1800,
    "kristy.jpg": 1800,
}


def main() -> None:
    source_dir = ROOT / "assets" / "originals"
    target_dir = ROOT / "public" / "images"
    target_dir.mkdir(parents=True, exist_ok=True)
    for name, max_edge in SOURCES.items():
        image = Image.open(source_dir / name).convert("RGB")
        image.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)
        target = target_dir / name
        image.save(target, "JPEG", quality=82, optimize=True, progressive=True)
        print(f"{name} {image.size[0]}x{image.size[1]} {target.stat().st_size} B")


if __name__ == "__main__":
    main()
