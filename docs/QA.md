# Verification record

Date: November 10, 2026. All browser testing used the managed localhost preview at `http://127.0.0.1:4173/`, not direct file URLs.

## Command-line checks

- `npm run check`: passed JavaScript syntax checks and all 17 Node tests.
- `npm run build`: passed; static app created in `dist/`.
- No installation step or third-party runtime dependencies.

The Node suite covers schema/version/dimension validation, bounded layer counts, duplicate IDs, remote or executable image rejection, layer settings, safe file naming, pressure calculations, interpolation, and branching bounded undo/redo.

## Browser engine suite: 12/12 passed

Visited `/tests/browser.html` in Chromium. Verified real Canvas 2D output for round brush marks, alpha erasing, continuous interpolated strokes, mirror output, visibility, layer opacity, ordering, all four other presets, project pixel/metadata roundtrip, PNG signature, separate starter layers, and invalid imported raster dimensions.

## Actual application flows

Verified with visible UI and actual browser actions:

- Dragged a continuous brush stroke on the meadow and visibly erased a section back to the underlying artwork.
- Undo restored the change; redo reapplied it.
- Added and typed a layer name; changed its blend mode and opacity.
- Duplicated, reordered, and deleted a layer.
- Downloaded a `.mosslight` project containing five raster layers and the custom layer name.
- Downloaded a genuine PNG. File inspection confirmed 1200 × 900, 8-bit RGBA.
- Created a blank painting, then reopened the downloaded project with the replacement confirmation. Its name, five layers, and layer settings returned.
- Imported the exported PNG as an additional raster layer.
- Reached the 8-layer limit and verified Add and Duplicate were disabled.
- Restored the painting from browser local storage after reload.
- Fixed a discovered edge case: downloading a project now flushes pending autosave immediately, so an immediate reload cannot restore an older debounced snapshot. Repeated the add-to-8 → save → immediate reload sequence and verified all 8 layers returned.
- Canceled a replacement prompt and verified the current painting remained unchanged.
- Focused the canvas, moved the keyboard cursor with an arrow key, and placed a mark with Space. Undo removed it.
- Opened and closed Help. Exercised zoom and Fit.
- Returned the app to the original four-layer meadow study for delivery screenshots.

## Responsive and visual checks

- Desktop screenshot captured from the actual running app via the browser screenshot API.
- Narrow-screen screenshot captured from the actual app loaded inside a 390 × 844 iframe, not device emulation. Content width was 375 pixels after its scrollbar; `scrollWidth` equaled `clientWidth`, with no horizontal overflow.
- Scrolled the narrow viewport to inspect the complete brush and layer panels. Controls, names, palette, sliders, and layer actions remained within the viewport.
- SVG arrows replace missing-glyph arrow characters in key visible controls.
- Browser log inspection found no application-origin warnings or errors. Browser-extension metadata noise was unrelated to app code.

Screenshots: `docs/screenshots/desktop.jpg`, `docs/screenshots/narrow.jpg`. These are authentic browser captures, not generated UI artwork.

## Remaining limits

Physical pen hardware, touch devices, and pressure have not been tested. Narrow-width testing is not a physical mobile-browser test. This verification record describes the pre-publication local checks. GitHub Actions additionally runs the Node suite and static build for publication. Physical pen and touch caveats remain unchanged. Local storage capacity is browser-specific; the visible fallback tells the user to download a project. Multiple tabs share the same local autosave slot and are not a collaborative editing mode.
