"""
Create logo variants with lighter gold font color.
The original logo text is already gold (~RGB 160, 120-140, 40-80).
This script creates lighter variations.
"""

from PIL import Image
import os

def lighten_gold(img_path, output_path, brightness_factor, saturation_adjust=0):
    """
    Lighten the gold text in the logo.
    brightness_factor: 1.0 = no change, 1.3 = 30% brighter
    saturation_adjust: 0 = no change, positive = add to blue channel for more pastel
    """
    img = Image.open(img_path).convert('RGBA')
    pixels = img.load()
    width, height = img.size

    adjusted = 0

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]

            # Skip transparent pixels
            if a < 50:
                continue

            # Detect gold text pixels (the dominant color in the logo)
            # Gold has high R, medium G, low B
            if r > 100 and g > 60 and b < 150 and (r - b) > 50:
                # Brighten the pixel
                new_r = min(255, int(r * brightness_factor))
                new_g = min(255, int(g * brightness_factor))
                new_b = min(255, int(b * brightness_factor + saturation_adjust))

                pixels[x, y] = (new_r, new_g, new_b, a)
                adjusted += 1

    img.save(output_path)
    print(f"Created {output_path}: adjusted {adjusted} pixels")
    return adjusted

def shift_to_target_gold(img_path, output_path, target_gold):
    """
    Shift the gold text toward a target gold color.
    Preserves tonal variation while changing the base hue.
    """
    img = Image.open(img_path).convert('RGBA')
    pixels = img.load()
    width, height = img.size

    adjusted = 0

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]

            # Skip transparent pixels
            if a < 50:
                continue

            # Detect gold text pixels
            if r > 100 and g > 60 and b < 150 and (r - b) > 50:
                # Calculate luminance of original pixel
                lum = (r + g + b) / 3 / 255  # 0-1

                # Blend toward target, preserving some luminance variation
                blend = 0.7  # How much to shift toward target
                new_r = int(r * (1 - blend) + target_gold[0] * blend * (0.8 + 0.4 * lum))
                new_g = int(g * (1 - blend) + target_gold[1] * blend * (0.8 + 0.4 * lum))
                new_b = int(b * (1 - blend) + target_gold[2] * blend * (0.8 + 0.4 * lum))

                pixels[x, y] = (min(255, new_r), min(255, new_g), min(255, new_b), a)
                adjusted += 1

    img.save(output_path)
    print(f"Created {output_path}: adjusted {adjusted} pixels")
    return adjusted

def main():
    logo_dir = "c:/Projects/design-portfolio/public/images/logo"
    source = os.path.join(logo_dir, "ellie-piper-nav-no-blobs.png")

    # Lightening variants
    print("Creating brightened variants...")
    lighten_gold(source, os.path.join(logo_dir, "ellie-piper-nav-gold-light.png"), 1.35, 20)
    lighten_gold(source, os.path.join(logo_dir, "ellie-piper-nav-gold-bright.png"), 1.5, 30)

    # Target color variants
    print("\nCreating color-shifted variants...")
    # Champagne gold - lighter, more cream
    shift_to_target_gold(source, os.path.join(logo_dir, "ellie-piper-nav-gold-champagne.png"), (220, 195, 145))
    # Pale/cream gold - very light
    shift_to_target_gold(source, os.path.join(logo_dir, "ellie-piper-nav-gold-pale.png"), (235, 215, 175))

    # Also create circle variants
    circle_source = os.path.join(logo_dir, "ellie-piper-circle-no-blobs.png")
    if os.path.exists(circle_source):
        print("\nCreating circle variants...")
        lighten_gold(circle_source, os.path.join(logo_dir, "ellie-piper-circle-gold-light.png"), 1.35, 20)
        lighten_gold(circle_source, os.path.join(logo_dir, "ellie-piper-circle-gold-bright.png"), 1.5, 30)
        shift_to_target_gold(circle_source, os.path.join(logo_dir, "ellie-piper-circle-gold-champagne.png"), (220, 195, 145))
        shift_to_target_gold(circle_source, os.path.join(logo_dir, "ellie-piper-circle-gold-pale.png"), (235, 215, 175))

if __name__ == "__main__":
    main()
