# -*- coding: utf-8 -*-
"""
Apply Deep Navy Background Uncle Logo as Official Icons & Favicon
"""
import os
from PIL import Image

src_img_path = r"C:/Users/the18/.gemini/antigravity-ide/brain/aab99ef2-6fee-4c34-8a64-b2bea60ad202/uncle_bg_navy_1790143112060.jpg"
beige_path = r"C:/Users/the18/.gemini/antigravity-ide/brain/aab99ef2-6fee-4c34-8a64-b2bea60ad202/uncle_bg_beige_1790143134765.jpg"
green_path = r"C:/Users/the18/.gemini/antigravity-ide/brain/aab99ef2-6fee-4c34-8a64-b2bea60ad202/uncle_bg_green_1790143157632.jpg"
project_root = r"C:\Users\the18\OneDrive\바탕 화면\Mysite"

def main():
    img = Image.open(src_img_path).convert("RGBA")
    
    # 1:1 square crop
    w, h = img.size
    min_dim = min(w, h)
    left = (w - min_dim) // 2
    top = (h - min_dim) // 2
    img_sq = img.crop((left, top, left + min_dim, top + min_dim))

    # 1. High-res 512x512 PNG
    icon_512 = img_sq.resize((512, 512), Image.Resampling.LANCZOS)
    icon_512.save(os.path.join(project_root, "src", "app", "icon.png"), "PNG")
    icon_512.save(os.path.join(project_root, "public", "images", "logo.png"), "PNG")
    icon_512.save(os.path.join(project_root, "public", "images", "uncle-logo.png"), "PNG")

    # 2. Apple Touch Icon (180x180)
    icon_180 = img_sq.resize((180, 180), Image.Resampling.LANCZOS)
    icon_180.save(os.path.join(project_root, "src", "app", "apple-icon.png"), "PNG")
    icon_180.save(os.path.join(project_root, "public", "apple-touch-icon.png"), "PNG")

    # 3. Multi-layer Favicon.ico (16, 32, 48)
    icon_48 = img_sq.resize((48, 48), Image.Resampling.LANCZOS)
    icon_32 = img_sq.resize((32, 32), Image.Resampling.LANCZOS)
    icon_16 = img_sq.resize((16, 16), Image.Resampling.LANCZOS)

    favicon_path_app = os.path.join(project_root, "src", "app", "favicon.ico")
    favicon_path_pub = os.path.join(project_root, "public", "favicon.ico")

    icon_48.save(
        favicon_path_app,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[icon_32, icon_16]
    )
    icon_48.save(
        favicon_path_pub,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[icon_32, icon_16]
    )

    # Save beige and green alternatives as well
    Image.open(beige_path).convert("RGBA").resize((512, 512), Image.Resampling.LANCZOS).save(
        os.path.join(project_root, "public", "images", "uncle-logo-beige.png"), "PNG"
    )
    Image.open(green_path).convert("RGBA").resize((512, 512), Image.Resampling.LANCZOS).save(
        os.path.join(project_root, "public", "images", "uncle-logo-green.png"), "PNG"
    )

    print("Successfully processed Deep Navy Uncle Logo into official icons & favicons!")

if __name__ == "__main__":
    main()
