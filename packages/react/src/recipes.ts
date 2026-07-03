export const finnUiRecipeCss = `
[data-finn-ui-box] {
  background: var(--finn-box-bg, initial);
  border-color: var(--finn-box-border-color, initial);
  border-radius: var(--finn-box-radius, initial);
  border-style: var(--finn-box-border-style, initial);
  border-width: var(--finn-box-border-width, initial);
  box-shadow: var(--finn-box-shadow, initial);
  box-sizing: border-box;
  color: var(--finn-box-color, inherit);
  margin-bottom: var(--finn-box-margin-bottom, initial);
  margin-left: var(--finn-box-margin-left, initial);
  margin-right: var(--finn-box-margin-right, initial);
  margin-top: var(--finn-box-margin-top, initial);
  padding-bottom: var(--finn-box-padding-bottom, initial);
  padding-left: var(--finn-box-padding-left, initial);
  padding-right: var(--finn-box-padding-right, initial);
  padding-top: var(--finn-box-padding-top, initial);
}

[data-finn-ui-stack] {
  align-items: var(--finn-stack-align, normal);
  display: flex;
  flex-direction: var(--finn-stack-direction);
  flex-wrap: var(--finn-stack-wrap, nowrap);
  gap: var(--finn-stack-gap);
  justify-content: var(--finn-stack-justify, normal);
}

[data-finn-ui-text] {
  color: var(--finn-text-color);
  font-family: var(--finn-font-family-sans);
  font-size: var(--finn-text-size);
  font-weight: var(--finn-text-weight);
  line-height: var(--finn-text-line-height);
  margin: 0;
  text-align: var(--finn-text-align, inherit);
}

[data-finn-ui-divider] {
  background: var(--finn-divider-color);
  border: 0;
  flex-shrink: 0;
}

[data-finn-ui-divider][data-orientation="horizontal"] {
  display: block;
  height: var(--finn-divider-size);
  margin-bottom: var(--finn-divider-spacing);
  margin-top: var(--finn-divider-spacing);
  width: 100%;
}

[data-finn-ui-divider][data-orientation="vertical"] {
  align-self: stretch;
  display: inline-block;
  margin-left: var(--finn-divider-spacing);
  margin-right: var(--finn-divider-spacing);
  min-height: 24px;
  width: var(--finn-divider-size);
}

[data-finn-ui-button] {
  align-items: center;
  appearance: none;
  background: var(--finn-button-bg);
  border-color: var(--finn-button-border-color);
  border-radius: var(--finn-button-radius);
  border-style: solid;
  border-width: var(--finn-button-border-width);
  box-sizing: border-box;
  color: var(--finn-button-color);
  cursor: pointer;
  display: inline-flex;
  font-family: var(--finn-font-family-sans);
  font-weight: var(--finn-font-weight-semibold);
  gap: var(--finn-spacing-sm);
  justify-content: center;
  line-height: 1;
  min-height: var(--finn-button-min-height);
  padding: var(--finn-button-padding);
  text-decoration: var(--finn-button-text-decoration, none);
  text-underline-offset: 3px;
  transition:
    background var(--finn-duration-fast) var(--finn-easing-standard),
    border-color var(--finn-duration-fast) var(--finn-easing-standard),
    box-shadow var(--finn-duration-fast) var(--finn-easing-standard),
    color var(--finn-duration-fast) var(--finn-easing-standard),
    transform var(--finn-duration-fast) var(--finn-easing-standard);
  user-select: none;
  width: var(--finn-button-width, auto);
}

[data-finn-ui-button]:where(:hover:not(:disabled)) {
  background: var(--finn-button-hover-bg);
  border-color: var(--finn-button-hover-border-color);
  box-shadow: var(--finn-button-hover-shadow, none);
  transform: translateY(-1px);
}

[data-finn-ui-button]:where(:active:not(:disabled)) {
  transform: translateY(0);
}

[data-finn-ui-button]:where(:focus-visible) {
  outline: 2px solid var(--finn-button-focus-color, var(--finn-color-primary));
  outline-offset: 2px;
}

[data-finn-ui-button]:where(:disabled) {
  cursor: not-allowed;
  opacity: var(--finn-opacity-disabled);
}

[data-finn-ui-button][data-variant="link"] {
  min-height: auto;
  padding: 0;
}

[data-finn-ui-button][data-variant="link"]:where(:hover:not(:disabled)) {
  box-shadow: none;
  transform: none;
}

[data-finn-ui-button-dot] {
  background: currentColor;
  border-radius: 999px;
  display: inline-block;
  height: 8px;
  opacity: 0.72;
  width: 8px;
}

[data-finn-ui-input-root] {
  display: flex;
  flex-direction: column;
  gap: var(--finn-spacing-xs);
  width: 100%;
}

[data-finn-ui-input-control] {
  align-items: center;
  background: var(--finn-input-bg);
  border-color: var(--finn-input-border-color);
  border-radius: var(--finn-input-radius);
  border-style: solid;
  border-width: var(--finn-input-border-width);
  box-sizing: border-box;
  color: var(--finn-input-color);
  display: flex;
  gap: var(--finn-spacing-sm);
  min-height: var(--finn-input-min-height);
  transition:
    background var(--finn-duration-fast) var(--finn-easing-standard),
    border-color var(--finn-duration-fast) var(--finn-easing-standard),
    box-shadow var(--finn-duration-fast) var(--finn-easing-standard);
  width: 100%;
}

[data-finn-ui-input-control]:where(:focus-within) {
  border-color: var(--finn-input-focus-color);
  box-shadow: 0 0 0 3px var(--finn-input-focus-ring);
}

[data-finn-ui-input-control][data-invalid="true"] {
  border-color: var(--finn-input-danger-color);
}

[data-finn-ui-input-control][data-invalid="true"]:where(:focus-within) {
  border-color: var(--finn-input-danger-color);
  box-shadow: 0 0 0 3px var(--finn-input-danger-ring);
}

[data-finn-ui-input-control][data-disabled="true"] {
  opacity: var(--finn-opacity-disabled);
}

[data-finn-ui-input-control][data-readonly="true"] {
  background: var(--finn-input-readonly-bg);
}

[data-finn-ui-input] {
  background: transparent;
  border: 0;
  box-sizing: border-box;
  color: inherit;
  flex: 1;
  font-family: var(--finn-font-family-sans);
  font-size: var(--finn-input-font-size);
  min-height: var(--finn-input-min-height);
  min-width: 0;
  outline: none;
  padding: var(--finn-input-padding);
  width: 100%;
}

[data-finn-ui-input]::placeholder {
  color: var(--finn-color-muted);
}

[data-finn-ui-input-icon] {
  color: var(--finn-input-icon-color);
  display: inline-flex;
}

[data-finn-ui-input-icon][data-side="left"] {
  padding-left: var(--finn-spacing-md);
}

[data-finn-ui-input-icon][data-side="right"] {
  padding-right: var(--finn-spacing-md);
}

[data-finn-ui-input-error] {
  color: var(--finn-color-danger);
  font-family: var(--finn-font-family-sans);
  font-size: var(--finn-font-size-sm);
  line-height: var(--finn-line-height-normal);
}

[data-finn-ui-card] {
  background: var(--finn-card-bg);
  border-color: var(--finn-card-border-color);
  border-radius: var(--finn-card-radius);
  border-style: var(--finn-card-border-style);
  border-width: var(--finn-card-border-width);
  box-shadow: var(--finn-card-shadow);
  box-sizing: border-box;
  color: var(--finn-card-color);
  padding: var(--finn-card-padding);
}
`;
