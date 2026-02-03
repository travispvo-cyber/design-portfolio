"""
Clean logo v2 - Using manual region masking to remove confetti
while protecting all text areas including "PARTY BOUTIQUE"
"""

from PIL import Image
import os

def is_gold_pixel(r, g, b, a, threshold=50):
    """Check if a pixel is gold/yellow colored (confetti color)"""
    if a < 100:  # Skip transparent pixels
        return False
    # Gold is typically high R, medium-high G, low B
    return r > 180 and g > 100 and g < 220 and b < 100 and (r - b) > 80

def is_pink_blob(r, g, b, a, threshold=50):
    """Check if a pixel is pink/salmon colored (paint splash)"""
    if a < 100:
        return False
    # Pink/salmon: high R, medium G, medium-low B
    return r > 200 and 100 < g < 180 and 80 < b < 160

def clean_confetti_with_regions(img_path, output_path):
    """
    Remove confetti using region-based approach:
    - Top area: remove all gold/pink (heavy confetti)
    - Middle area (main text): very conservative, only tiny isolated dots
    - Bottom area (PARTY BOUTIQUE): protected, no removal
    - Right side of "piper": targeted removal of isolated dots only
    """
    img = Image.open(img_path).convert('RGBA')
    pixels = img.load()
    width, height = img.size

    removed = 0

    # Define regions (as percentages of image size)
    # The logo typically has:
    # - Top 15%: confetti area above text
    # - Middle 15-70%: main "ellie & piper" text
    # - Bottom 70-100%: "PARTY BOUTIQUE" subtitle

    top_cutoff = int(height * 0.12)  # Very top confetti area
    subtitle_start = int(height * 0.72)  # Where subtitle begins - PROTECTED

    # For horizontal regions, right side dots are roughly in the right 20%
    piper_right_area = int(width * 0.75)

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]

            # PROTECTED ZONE: Bottom area (subtitle "PARTY BOUTIQUE")
            if y > subtitle_start:
                continue  # Never touch this area

            # TOP ZONE: Remove gold/pink dots more aggressively
            if y < top_cutoff:
                if is_gold_pixel(r, g, b, a) or is_pink_blob(r, g, b, a):
                    pixels[x, y] = (0, 0, 0, 0)
                    removed += 1
                    continue

            # RIGHT MARGIN ZONE: Area to the right of "piper" - be aggressive
            # This area typically has confetti dots but no text
            if x > piper_right_area:
                if is_gold_pixel(r, g, b, a) or is_pink_blob(r, g, b, a):
                    pixels[x, y] = (0, 0, 0, 0)
                    removed += 1
                    continue

            # LEFT MARGIN ZONE: Area to the left of "ellie" - also aggressive
            left_margin = int(width * 0.15)
            if x < left_margin:
                if is_gold_pixel(r, g, b, a) or is_pink_blob(r, g, b, a):
                    pixels[x, y] = (0, 0, 0, 0)
                    removed += 1
                    continue

            # MIDDLE ZONE: Only remove very isolated gold dots
            # Use neighbor checking to ensure we're not removing text parts
            if is_gold_pixel(r, g, b, a):
                # Check if this is an isolated dot (not connected to text)
                neighbors_gold = 0
                neighbors_dark = 0  # Dark pixels = text

                for dx in [-2, -1, 0, 1, 2]:
                    for dy in [-2, -1, 0, 1, 2]:
                        nx, ny = x + dx, y + dy
                        if 0 <= nx < width and 0 <= ny < height:
                            nr, ng, nb, na = pixels[nx, ny]
                            if is_gold_pixel(nr, ng, nb, na):
                                neighbors_gold += 1
                            # Dark text pixel (charcoal colored)
                            if na > 100 and nr < 100 and ng < 100 and nb < 100:
                                neighbors_dark += 1

                # Only remove if:
                # 1. It's a small cluster (less than 15 gold neighbors)
                # 2. Not adjacent to dark text
                if neighbors_gold < 15 and neighbors_dark == 0:
                    pixels[x, y] = (0, 0, 0, 0)
                    removed += 1

    img.save(output_path)
    print(f"Cleaned {output_path}: removed {removed} pixels")
    return removed

def process_all_logos():
    """Process all logo variants to create -no-blobs versions"""
    logo_dir = "c:/Projects/design-portfolio/public/images/logo"

    # Variants to process (source -> output suffix)
    variants = [
        ("ellie-piper-transparent.png", "ellie-piper-transparent-no-blobs.png"),
        ("ellie-piper-nav.png", "ellie-piper-nav-no-blobs.png"),
        ("ellie-piper-circle.png", "ellie-piper-circle-no-blobs.png"),
        ("ellie-piper-circle-white.png", "ellie-piper-circle-white-no-blobs.png"),
        ("ellie-piper-circle-cream.png", "ellie-piper-circle-cream-no-blobs.png"),
        ("ellie-piper-circle-sm.png", "ellie-piper-circle-sm-no-blobs.png"),
    ]

    for source, output in variants:
        source_path = os.path.join(logo_dir, source)
        output_path = os.path.join(logo_dir, output)

        if os.path.exists(source_path):
            print(f"Processing {source}...")
            clean_confetti_with_regions(source_path, output_path)
        else:
            print(f"Skipping {source} - file not found")

if __name__ == "__main__":
    process_all_logos()
