
# 📚 Features:
## 1/ Automatically spin the react icon with a customized hook to reuse the logic.

### `useRotation<T>(options)`

A generic hook that provides rotation functionality for any HTML element.

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `speed` | `number` | `120` | Rotation speed in degrees per second |
| `initialDirection` | `1 \| -1` | `1` | Initial rotation direction (1 = clockwise, -1 = counter-clockwise) |
| `elementRef` | `React.RefObject<T \| null>` | **Required** | React ref to the element to rotate |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `elementRef` | `React.RefObject<T \| null>` | The ref to attach to your element |
| `rotationDirection` | `1 \| -1` | Current rotation direction |
| `toggleDirection` | `() => void` | Function to toggle rotation direction |
| `setDirection` | `(direction: 1 \| -1) => void` | Function to set specific direction |
| `isAnimating` | `boolean` | Whether animation is currently running |
| `startAnimation` | `() => void` | Function to start animation |
| `stopAnimation` | `() => void` | Function to stop animation |
| `currentRotation` | `number` | Current rotation angle in degrees |

## ⚡ Performance & Architecture

### `requestAnimationFrame` vs Pure CSS: Complete Comparison

We chose `requestAnimationFrame` over pure CSS animations for several critical reasons. Here's a detailed comparison:

## 🎯 **requestAnimationFrame**

### ✅ **Pros**

| Aspect | Benefit | Explanation | Example |
|--------|---------|-------------|---------|
| **Direction Control** | Instant, smooth direction changes | No animation restart when changing direction | Click to reverse rotation seamlessly |
| **Precision** | Frame-rate independent | Adapts to any display refresh rate | Works on 60Hz, 144Hz, 240Hz displays |
| **Control** | Full programmatic control | Start, stop, pause, resume, speed changes | `startAnimation()`, `stopAnimation()`, `setSpeed()` |
| **Smoothness** | No animation restarts | Continuous rotation without interruption | Smooth direction changes |
| **Timing** | Browser-optimized | Syncs with display refresh rate | Automatically pauses when tab is hidden |
| **Debugging** | Easy to debug | Full control over animation state | Can log rotation values, pause for inspection |

### ❌ **Cons**

| Issue | Problem | Impact | Workaround |
|-------|---------|--------|------------|
| **Complexity** | More code required | Higher initial setup | Use our pre-built hook |
| **JavaScript Dependency** | Requires JS to be enabled | Won't work if JS is disabled | Graceful degradation needed |
| **Bundle Size** | Adds to JS bundle |
| **CPU Usage** | Continuous JS execution | Higher CPU usage than CSS | Optimized with `requestAnimationFrame` |

## 🎨 **Pure CSS Animations**

### ✅ **Pros**

| Aspect | Benefit | Explanation | Example |
|--------|---------|-------------|---------|
| **Performance** | Hardware accelerated | GPU-optimized rendering | `transform: rotate()` uses GPU |
| **Simplicity** | Easy to implement | Just CSS, no JavaScript | `animation: spin 3s linear infinite` |
| **No JS Dependency** | Works without JavaScript | Functions even if JS is disabled | Graceful degradation |
| **Bundle Size** | No JS overhead | Pure CSS solution | Zero JavaScript impact |
| **Browser Optimization** | Browser-optimized | Native browser handling | Automatic optimization |

### ❌ **Cons**

| Issue | Problem | Impact | Why It Matters |
|-------|---------|--------|----------------|
| **Direction Changes** | Animation restarts abruptly | Jarring user experience | User clicks → animation jumps to start |
| **Limited Control** | Hard to control programmatically | Difficult to implement complex interactions | Can't easily pause/resume/speed up |
| **Frame Rate** | Fixed to CSS timing | Doesn't adapt to display refresh rate | 60fps on 144Hz display looks choppy |
| **Memory** | CSS animation objects | Higher memory overhead | ~2-5KB per animation |
| **Debugging** | Hard to debug | Limited visibility into animation state | Can't easily inspect rotation values |
| **State Management** | No state awareness | Can't track current rotation angle | Hard to sync with other components |
| **Complex Interactions** | Limited interaction support | Hard to implement click-to-reverse | Requires complex CSS variable manipulation |

## 🎛️ Configuration Options

### Speed Values

| Speed | Visual Result | Use Case |
|-------|---------------|----------|
| `30` | Very slow (1 rotation every 12 seconds) | Subtle loading indicator |
| `60` | Slow (1 rotation every 6 seconds) | Background animation |
| `120` | Medium (1 rotation every 3 seconds) | Default, good for most cases |
| `360` | Fast (1 rotation per second) | Active loading spinner |
| `720` | Very fast (2 rotations per second) | High-energy animations |

### Direction Values

| Value | Direction | Description |
|-------|-----------|-------------|
| `1` | Clockwise | Standard rotation direction |
| `-1` | Counter-clockwise | Reverse rotation direction |
