"""
Analyze the colors present in the logo to understand text pixel values
"""

from PIL import Image
from collections import Counter

def analyze_colors(img_path):
    img = Image.open(img_path).convert('RGBA')
    pixels = img.load()
    width, height = img.size

    color_counts = Counter()

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a > 50:  # Only non-transparent pixels
                # Group similar colors
                r_group = (r // 20) * 20
                g_group = (g // 20) * 20
                b_group = (b // 20) * 20
                color_counts[(r_group, g_group, b_group)] += 1

    print(f"Top 20 colors in {img_path}:")
    for color, count in color_counts.most_common(20):
        r, g, b = color
        print(f"  RGB({r:3d}, {g:3d}, {b:3d}): {count:6d} pixels")

if __name__ == "__main__":
    analyze_colors("c:/Projects/design-portfolio/public/images/logo/ellie-piper-nav-no-blobs.png")
