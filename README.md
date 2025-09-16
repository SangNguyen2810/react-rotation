
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
| **Timing** | Browser-optimized | Syncs with display refresh rate | Automatically pauses when tab is hidden |
| **Debugging** | Easy to debug | Full control over animation state | Can log rotation values, pause for inspection |

### ❌ **Cons**

| Issue | Problem | Impact | Workaround |
|-------|---------|--------|------------|
| **Complexity** | More code required | Higher initial setup | Use our pre-built hook |
| **JavaScript Dependency** | Requires JS to be enabled | Won't work if JS is disabled | Graceful degradation needed |
| **CPU Usage** | Continuous JS execution | Higher CPU usage than CSS | Optimized with `requestAnimationFrame` |

## 🎨 **Pure CSS Animations**

### ✅ **Pros**

| Aspect | Benefit | Explanation | Example |
|--------|---------|-------------|---------|
| **Performance** | Hardware accelerated | GPU-optimized rendering | `transform: rotate()` uses GPU |
| **Simplicity** | Easy to implement | Just CSS, no JavaScript | `animation: spin 3s linear infinite` |
| **No JS Dependency** | Works without JavaScript | Functions even if JS is disabled | Graceful degradation |
| **Browser Optimization** | Browser-optimized | Native browser handling | Automatic optimization |

### ❌ **Cons**

| Issue | Problem | Impact | Why It Matters |
|-------|---------|--------|----------------|
| **Direction Changes** | Animation restarts abruptly | Jarring user experience | User clicks → animation jumps to start |
| **Limited Control** | Hard to control programmatically | Difficult to implement complex interactions | Can't easily pause/resume/speed up |
| **State Management** | No state awareness | Can't track current rotation angle | Hard to sync with other components |
| **Complex Interactions** | Limited interaction support | Hard to implement click-to-reverse | Requires complex CSS variable manipulation |