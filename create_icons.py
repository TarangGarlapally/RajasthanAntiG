from PIL import Image, ImageDraw
import os

# Create icons directory if it doesn't exist
os.makedirs('icons', exist_ok=True)

# Define sizes
sizes = [16, 32, 48, 128]

# Define gradient colors (Gemini-inspired)
colors = {
    'start': (66, 133, 244),    # Blue
    'middle': (155, 114, 242),  # Purple
    'end': (245, 56, 160)       # Pink
}

def create_gradient_icon(size):
    """Create a simple gradient icon with a diamond shape"""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Create gradient background
    for y in range(size):
        # Calculate color based on position
        ratio = y / size
        if ratio < 0.5:
            # Blue to Purple
            r = int(colors['start'][0] + (colors['middle'][0] - colors['start'][0]) * (ratio * 2))
            g = int(colors['start'][1] + (colors['middle'][1] - colors['start'][1]) * (ratio * 2))
            b = int(colors['start'][2] + (colors['middle'][2] - colors['start'][2]) * (ratio * 2))
        else:
            # Purple to Pink
            r = int(colors['middle'][0] + (colors['end'][0] - colors['middle'][0]) * ((ratio - 0.5) * 2))
            g = int(colors['middle'][1] + (colors['end'][1] - colors['middle'][1]) * ((ratio - 0.5) * 2))
            b = int(colors['middle'][2] + (colors['end'][2] - colors['middle'][2]) * ((ratio - 0.5) * 2))
        
        draw.line([(0, y), (size, y)], fill=(r, g, b, 255))
    
    # Draw diamond shape overlay
    center = size // 2
    diamond_size = int(size * 0.6)
    
    # Diamond points
    points = [
        (center, center - diamond_size // 2),  # Top
        (center + diamond_size // 2, center),  # Right
        (center, center + diamond_size // 2),  # Bottom
        (center - diamond_size // 2, center)   # Left
    ]
    
    # Draw white diamond with transparency
    draw.polygon(points, fill=(255, 255, 255, 200))
    
    # Draw smaller inner diamond
    inner_size = int(diamond_size * 0.5)
    inner_points = [
        (center, center - inner_size // 2),
        (center + inner_size // 2, center),
        (center, center + inner_size // 2),
        (center - inner_size // 2, center)
    ]
    draw.polygon(inner_points, fill=(66, 133, 244, 255))
    
    return img

# Generate all icon sizes
for size in sizes:
    icon = create_gradient_icon(size)
    icon.save(f'icons/icon{size}.png')
    print(f'Created icon{size}.png')

print('All icons created successfully!')
