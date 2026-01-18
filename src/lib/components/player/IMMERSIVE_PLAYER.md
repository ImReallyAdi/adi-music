# Immersive Music Player - Design Documentation

## Overview

The Immersive Music Player is a premium, full-screen music playback experience designed for focused, distraction-free listening. It occupies the entire viewport with zero secondary UI elements, presenting a cinema-like experience for music consumption.

## Architecture

### Components

#### `ImmersivePlayer.svelte`
The main immersive player component with:
- Full-screen canvas with dynamic background
- Interactive controls that show/hide on user interaction
- Keyboard shortcuts for common operations
- Touch and mouse-friendly interactions
- Smooth animations and transitions

**Key Features:**
- Auto-hiding controls (after 4 seconds during playback)
- Responsive layout for all screen sizes
- Keyboard support (Space, Arrow keys, N, P)
- Dynamic color extraction from album artwork
- Hardware-accelerated animations

#### `ColorExtractor.svelte`
Extracts the dominant color from album artwork to create a dynamic, harmonious background.

**Process:**
1. Loads the artwork image
2. Renders to canvas at 100x100px for performance
3. Samples pixels to calculate dominant RGB values
4. Returns color as rgba string with transparency

#### `immersive-player.css`
Premium animations and transitions using CSS for performance:
- Entrance animations
- Artwork scale effects
- Button hover states
- Progress bar transitions
- Responsive motion preferences

## User Interactions

### Auto-Hide Controls
- Controls visible on initial load
- Auto-hide after 4 seconds during playback
- Show on any user interaction (mouse/touch/keyboard)
- Always visible when paused

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| Space | Play/Pause |
| ← Arrow | Seek back 5s |
| → Arrow | Seek forward 5s |
| N | Next track |
| P | Previous track |

### Touch Gestures
- **Tap**: Show controls
- **Tap play button**: Toggle play/pause
- **Horizontal swipe**: (Future) seek forward/back
- **Vertical swipe**: (Future) adjust volume

## Visual Design

### Color Palette
- **Background**: Black (#000000)
- **Primary**: Material Red (#B3261E)
- **Text**: Adaptive (light/dark based on album color)
- **Dynamic**: Extracted from current album artwork

### Layout Zones

```
┌─────────────────────────────────┐
│  Close  | Now Playing | Favorite  │ ← Controls (auto-hide)
├─────────────────────────────────┤
│                                 │
│         Album Artwork           │ ← Main focal point
│                                 │
├─────────────────────────────────┤
│    Track Title & Artist Info    │
├─────────────────────────────────┤
│        Timeline / Seek          │
├─────────────────────────────────┤
│  Shuffle ◀ ▶ ⏻ ▶  Repeat     │ ← Playback controls
├─────────────────────────────────┤
│  [Volume- | ========== | Volume+] │ ← Volume (optional)
└─────────────────────────────────┘
```

### Typography Hierarchy
1. **Track Title**: 3xl/4xl, bold, primary focus
2. **Artist Name**: lg/xl, secondary text
3. **Album Name**: sm, tertiary text
4. **Metadata**: label-md, subtle hints

## Performance Optimizations

### Hardware Acceleration
- Uses `will-change: transform` for animations
- All transforms use `translateZ(0)` for GPU rendering
- Animations use `cubic-bezier` for smooth 60fps

### Canvas Rendering
- Color extraction at 100x100px (minimal memory)
- Skips transparent pixels for accuracy
- Cached color values to reduce recomputation

### CSS Containment
- `contain: layout style paint` prevents layout thrashing
- Scoped animations reduce recalculation scope

## Accessibility

### ARIA Labels
- Player region identified as `role="region"`
- All controls have descriptive labels
- Focus indicators visible for keyboard navigation

### Motion Preferences
- Respects `prefers-reduced-motion` media query
- Disables animations for users with motion sensitivity

### Contrast
- Minimum AA contrast ratio (4.5:1) for all text
- Dynamic backgrounds ensure readable text
- High contrast mode support

## Responsive Design

### Desktop (1024px+)
- Generous button sizes (56px+)
- Optimal artwork size (max 384px)
- Full timeline visible
- Volume slider enabled

### Tablet (768px - 1024px)
- Adjusted layout with proper spacing
- Touch-friendly button targets (48px+)
- Responsive typography

### Mobile (< 768px)
- Vertical layout optimization
- Full viewport utilization
- Bottom-aligned controls for thumb reach
- Adaptive font sizes

## Integration

### Route
```
/immersive
```

### Access Point
- Button in main player header (fullscreen icon)
- Alternative: Direct URL navigation

### Exit
- Close button returns to library
- Back button or escape (future)

## State Management

Uses existing Svelte stores:
- `usePlayer()` - Playback state and controls
- `useMainStore()` - Volume slider preference

## Browser Support

- Modern browsers with:
  - CSS Grid & Flexbox
  - CSS Backdrop Filter
  - Canvas API
  - Web Audio API (existing)
  - ES2020+ JavaScript

## Future Enhancements

- [ ] Swipe gestures for seek/volume
- [ ] Fullscreen API integration
- [ ] Visualizer effects
- [ ] Lyric display
- [ ] Haptic feedback (mobile)
- [ ] Always-on-display mode
- [ ] Customizable button layouts
- [ ] Theme customization (dark/light/custom colors)

## Testing Considerations

- Test on various screen sizes
- Verify keyboard shortcuts
- Check color extraction accuracy
- Test auto-hide functionality
- Verify motion preferences respected
- Accessibility testing with screen readers
