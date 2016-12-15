import styles from './HowItWorks.less';

import React from 'react';

export default function HowItWorks() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h3 className={styles.title}>
          How it works
        </h3>
        <div className={styles.content}>
          <p>
            We evaluate your color combination using the&nbsp;
            <a
              className={styles.link}
              href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html"
              target="_blank"
              rel="noopener noreferrer"
              data-link-name="How it works - WCAG 2.0 guidelines for contrast accessibility"
            >
              WCAG 2.0 guidelines for contrast accessibility
            </a>.
          </p>
          <p>
            If your combination does not meet the guidelines, we find the
            closest accessible combination by modifying the color&nbsp;
            <a
              className={styles.link}
              href="https://en.wikipedia.org/wiki/HSL_and_HSV"
              target="_blank"
              rel="noopener noreferrer"
              data-link-name="How it works - lightness"
            >
              lightness
            </a>.
          </p>
          <p>
            We modify the lightness value only, in order to stay as true to
            the original color as possible.
          </p>
        </div>
      </div>
    </div>
  );
}
