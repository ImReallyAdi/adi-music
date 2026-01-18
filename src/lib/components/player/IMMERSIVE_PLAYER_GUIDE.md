# Immersive Player - User Guide

## Getting Started

### Accessing the Immersive Player

1. **From Player Screen**: Click the fullscreen icon (⛶) in the player header
2. **Direct Navigation**: Visit `/immersive` route
3. **Keyboard**: Press `F` when in player (future enhancement)

## Controls Overview

### Primary Controls

**Centered Control Ring** (always accessible):
- **Previous** (◀) - Jump to previous track
- **Play/Pause** (⏻) - Toggle playback (largest button)
- **Next** (▶) - Jump to next track
- **Shuffle** - Toggle shuffle mode (left side)
- **Repeat** - Cycle through repeat modes (right side)

### Timeline

Located above main controls:
- Click/tap to seek to position
- Drag handle for precise seeking
- Shows current time and duration

### Volume Control

Below main controls (if enabled in settings):
- Decrease Volume (🔉)
- Volume Slider (visual feedback)
- Increase Volume (🔊)

## Keyboard Shortcuts

| Key | Action | When Active |
|-----|--------|-------------|
| **Space** | Play/Pause | Always |
| **→** | Skip ahead 5s | Always |
| **←** | Skip back 5s | Always |
| **N** | Next track | Always |
| **P** | Previous track | Always |
| **Esc** | Exit immersive mode | When focused |

## Interaction Modes

### Auto-Hide Controls

When playing:
- Controls automatically hide after 4 seconds of inactivity
- Controls remain visible when paused
- Any interaction shows controls again:
  - Mouse movement
  - Touch/tap
  - Keyboard press

### Always-Visible Elements

- Album artwork (centered, main focus)
- Track title and artist (below artwork)
- "Now Playing" indicator in header

## Visual Feedback

### State Indicators

- **Shuffle Active**: Button highlighted in primary color
- **Repeat Mode**:
  - Off: Default styling
  - All: Highlighted (repeat all tracks)
  - One: Highlighted with "1" indicator (repeat current track)

### Color Dynamics

- Background color automatically extracted from album artwork
- Creates harmonious visual experience that adapts per track
- Falls back to Material Red (#B3261E) for no-artwork tracks

## Touch Experience

### Gestures

- **Tap anywhere**: Show/hide controls
- **Tap buttons**: Trigger actions
- **Tap progress bar**: Seek to position
- **Drag slider**: Adjust volume (when visible)

### Touch Targets

All buttons are minimum 48px (56px on mobile) for comfortable thumb reach.

## Desktop Experience

### Mouse/Trackpad

- Hover over buttons for scale effect
- Click for actions
- Seek bar provides visual feedback
- Smooth scroll wheel volume adjustment (future)

### Window Management

- Full-screen recommended for immersive experience
- Responsive to any window size
- Optimal at 16:9 aspect ratios

## Mobile Experience

### Optimizations

- Portrait and landscape support
- Status bar adaptive (blends with design)
- Safe area support for notched devices
- Haptic feedback on button press (future)

### Thumb Zones

- Controls positioned in lower half for thumb reach
- Primary play button at thumb level
- Volume controls easily accessible

## Exiting Immersive Mode

- Click **Close** button (top-left X)
- Returns to main player interface
- Playback state preserved

## Accessibility

### Keyboard Navigation

- Tab through all controls
- Enter/Space activates buttons
- Arrow keys work with sliders
- Focus ring clearly visible

### Screen Reader Support

- All controls labeled with aria-label
- Region identified as music player
- Button purposes announced

### Motion Preferences

- Animations disabled if system prefers reduced motion
- All interactions still functional without animations

## Troubleshooting

### Controls Not Showing

**Issue**: Controls completely hidden during playback
- **Solution**: Tap anywhere on screen or move mouse

### Audio Not Playing

**Issue**: Silent even with volume slider at maximum
- **Solution**: Check device volume, app mute status

### Artwork Not Loading

**Issue**: Album artwork not appearing
- **Solution**: Ensure track has embedded artwork, refresh page

### Colors Not Changing

**Issue**: Background not reflecting album artwork
- **Solution**: Artwork extraction is automatic; changing tracks should update

## Tips & Tricks

1. **Keyboard Shortcuts**: Learn shortcuts for fastest navigation
2. **Swipe to Seek**: (Future) Fast-forward and rewind with gestures
3. **Album Context**: Notice how colors change with each album
4. **Lyrics Integration**: (Coming Soon) Double-tap artwork to show lyrics
5. **Fullscreen API**: (Future) True fullscreen mode available

## Preferences

The following settings affect immersive player:
- **Volume Slider**: Toggle on/off in app settings
- **Theme Color**: Player respects dynamic theming
- **Motion Preferences**: Animations adapt to system settings

## Performance Notes

- Smooth 60fps animations on modern devices
- Efficient color extraction minimizes battery drain
- Optimized for all screen sizes and device types

---

**Questions?** See [Immersive Player Technical Docs](./IMMERSIVE_PLAYER.md)
