# From Krita to Mosslight

Research checked on November 10, 2026. Mosslight is an original, deliberately small browser painting application, not a Krita port or compatibility layer. No Krita code, brand assets, brush packs, or artwork are included.

## What the reference teaches

- [Krita basic concepts](https://docs.krita.org/en/user_manual/getting_started/basic_concepts.html) frames digital painting around tools, brush behavior, and compositing independent layers. That led to Mosslight's separate brush controls and editable raster stack.
- [Freehand Brush Tool](https://docs.krita.org/en/reference_manual/tools/freehand_brush.html) emphasizes freehand painting, tablet input, brush presets, and stroke smoothing. Mosslight implements its own small Canvas 2D stamp/interpolation engine, five presets, optional size pressure, and simple smoothing.
- [Krita features](https://krita.org/en/features/) documents a much broader set of brush engines, layer types, drawing assistants, selection tools, and full color management. Mosslight keeps only a focused subset: continuous painting, an eraser, color sampling, mirror strokes, raster compositing, and portable local files.

## Intentional differences

The interface is an original quiet botanical studio with warm green panels, spare typography, a small brush library, nature-led palettes, and a procedurally drawn landscape. The reference's breadth is not replicated. Our smooth 1200 × 900 painting canvas is deliberately separate from the companion pixel editor's grid, sprite, and animation workflow.

Brushes are procedural Canvas 2D marks, not Krita engines. Soft wash is translucent radial stamping, not wet pigment simulation. Dry pastel and graphite use randomized dabs. Smoothing uses a short weighted lag. Pressure changes diameter only when the browser supplies pen events. Layers support normal, multiply, and screen compositing.

## Ownership and provenance

All app code, icons, UI, and the built-in meadow study were authored for this project. The landscape is drawn into three separate editable canvases, with a fourth blank layer for the user's marks. Screenshots are captured from the actual running application via localhost. The app has no external fonts, image assets, analytics, accounts, or network services.
