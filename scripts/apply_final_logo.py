# -*- coding: utf-8 -*-
"""
Process Final Refined Candidate 3-A into Official App Icons & Favicon
"""
import os
from PIL import Image

src_img_path = r"C:/Users/the18/.gemini/antigravity-ide/brain/aab99ef2-6fee-4c34-8a64-b2bea60ad202/uncle_refined_logo_1_1790142655199.jpg"
alt_img_path = r"C:/Users/the18/.gemini/antigravity-ide/brain/aab99ef2-6fee-4c34-8a64-b2bea60ad202/uncle_refined_logo_2_1790142675826.jpg"
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

    # Save 3-B as backup
    alt_img = Image.open(alt_img_path).convert("RGBA")
    alt_img.resize((512, 512), Image.Resampling.LANCZOS).save(
        os.path.join(project_root, "public", "images", "uncle-logo-variant3b.png"),
        "PNG"
    )

    print("Successfully processed Refined 3-A into official icons and favicons!")

if __name__ == "__main__":
    main()
