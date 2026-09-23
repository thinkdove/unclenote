# -*- coding: utf-8 -*-
"""
Generate crystal-clear multi-size icons & favicon.ico for Uncle Note
Using PIL supersampling (1024x1024 -> resized with LANCZOS)
"""
import math
from PIL import Image, ImageDraw

def render_uncle_icon(size=1024):
    # Create RGBA canvas
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    scale = size / 512.0

    def s(val):
        return val * scale

    # 1. Background Rounded Squircle with warm terracotta gradient
    # Gradient rendering inside rounded rect
    bg_mask = Image.new('L', (size, size), 0)
    bg_mask_draw = ImageDraw.Draw(bg_mask)
    bg_mask_draw.rounded_rectangle(
        [s(20), s(20), s(492), s(492)],
        radius=s(120),
        fill=255
    )

    # Terracotta gradient: top-left (223, 89, 53) to bottom-right (175, 56, 25)
    grad_img = Image.new('RGBA', (size, size))
    for y in range(size):
        ratio = y / float(size)
        r = int(223 * (1 - ratio) + 175 * ratio)
        g = int(89 * (1 - ratio) + 56 * ratio)
        b = int(53 * (1 - ratio) + 25 * ratio)
        line_draw = ImageDraw.Draw(grad_img)
        line_draw.line([(0, y), (size, y)], fill=(r, g, b, 255))

    img.paste(grad_img, (0, 0), bg_mask)

    # Subtle inner white border
    draw.rounded_rectangle(
        [s(24), s(24), s(488), s(488)],
        radius=s(116),
        outline=(255, 255, 255, 50),
        width=int(s(4))
    )

    # 2. Ears
    draw.ellipse([s(82), s(238), s(134), s(306)], fill=(255, 235, 217, 255))
    draw.ellipse([s(378), s(238), s(430), s(306)], fill=(255, 235, 217, 255))
    draw.ellipse([s(94), s(252), s(122), s(292)], fill=(245, 207, 181, 255))
    draw.ellipse([s(390), s(252), s(418), s(292)], fill=(245, 207, 181, 255))

    # 3. Head / Face base
    draw.ellipse([s(108), s(130), s(404), s(414)], fill=(255, 235, 217, 255))

    # 4. Hair (neat modern parted hair, dark charcoal brown #2b2420)
    hair_color = (43, 36, 32, 255)
    # Hair silhouette using polygon & arcs
    hair_pts = [
        (s(115), s(250)),
        (s(110), s(180)),
        (s(160), s(115)),
        (s(256), s(105)),
        (s(352), s(115)),
        (s(402), s(180)),
        (s(397), s(250)),
        (s(380), s(205)),
        (s(330), s(185)),
        (s(280), s(190)),
        (s(220), s(160)),
        (s(165), s(195)),
        (s(135), s(225)),
    ]
    draw.polygon(hair_pts, fill=hair_color)

    # 5. Cheeks (peachy pink glow)
    draw.ellipse([s(141), s(312), s(189), s(360)], fill=(242, 125, 107, 130))
    draw.ellipse([s(323), s(312), s(371), s(360)], fill=(242, 125, 107, 130))

    # 6. Spectacles (Bold Friendly Glasses)
    glass_frame = (43, 36, 32, 255)
    lens_fill = (255, 255, 255, 200)

    # Lenses
    draw.ellipse([s(146), s(222), s(246), s(322)], fill=lens_fill, outline=glass_frame, width=int(s(16)))
    draw.ellipse([s(266), s(222), s(366), s(322)], fill=lens_fill, outline=glass_frame, width=int(s(16)))

    # Bridge
    draw.arc([s(242), s(262), s(270), s(282)], start=200, end=340, fill=glass_frame, width=int(s(14)))

    # Temples
    draw.line([s(146), s(272), s(114), s(268)], fill=glass_frame, width=int(s(12)))
    draw.line([s(366), s(272), s(398), s(268)], fill=glass_frame, width=int(s(12)))

    # 7. Smiling Eyes inside glasses (Crescent arcs)
    draw.arc([s(176), s(255), s(216), s(285)], start=190, end=350, fill=glass_frame, width=int(s(10)))
    draw.arc([s(296), s(255), s(336), s(285)], start=190, end=350, fill=glass_frame, width=int(s(10)))

    # Eyebrows
    draw.arc([s(170), s(195), s(222), s(215)], start=190, end=350, fill=glass_frame, width=int(s(9)))
    draw.arc([s(290), s(195), s(342), s(215)], start=190, end=350, fill=glass_frame, width=int(s(9)))

    # 8. Nose & Smile
    # Nose
    draw.arc([s(252), s(295), s(260), s(312)], start=270, end=90, fill=(213, 139, 118, 255), width=int(s(6)))
    # Warm friendly smile
    draw.arc([s(224), s(332), s(288), s(372)], start=10, end=170, fill=glass_frame, width=int(s(13)))

    # 9. Idea Sparkle (Gold star on top right)
    sparkle_color = (255, 211, 42, 255)
    cx, cy = s(390), s(115)
    r1, r2 = s(24), s(6)
    pts = []
    for i in range(8):
        angle = i * math.pi / 4.0
        r = r1 if i % 2 == 0 else r2
        pts.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
    draw.polygon(pts, fill=sparkle_color)
    draw.ellipse([s(410), s(90), s(418), s(98)], fill=sparkle_color)

    return img

if __name__ == '__main__':
    base_img = render_uncle_icon(1024)

    # 1. 512x512 high-res icon.png
    icon_512 = base_img.resize((512, 512), Image.Resampling.LANCZOS)
    icon_512.save('src/app/icon.png', 'PNG')
    icon_512.save('public/images/uncle-logo.png', 'PNG')

    # 2. 180x180 Apple touch icon
    icon_180 = base_img.resize((180, 180), Image.Resampling.LANCZOS)
    icon_180.save('src/app/apple-icon.png', 'PNG')
    icon_180.save('public/apple-touch-icon.png', 'PNG')

    # 3. Multi-layer favicon.ico (16, 32, 48, 64)
    icon_48 = base_img.resize((48, 48), Image.Resampling.LANCZOS)
    icon_32 = base_img.resize((32, 32), Image.Resampling.LANCZOS)
    icon_16 = base_img.resize((16, 16), Image.Resampling.LANCZOS)

    icon_48.save(
        'src/app/favicon.ico',
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[icon_32, icon_16]
    )
    icon_48.save(
        'public/favicon.ico',
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[icon_32, icon_16]
    )

    print("Successfully generated all icons and favicon.ico!")
