import type { PortableTextComponents } from "@portabletext/react";

// Renders the "Align Left" / "Align Right" / "Justify" block styles
// set in the Sanity Studio rich text toolbar.
export const portableTextComponents: PortableTextComponents = {
  block: {
    alignLeft: ({ children }) => <p style={{ textAlign: "left" }}>{children}</p>,
    alignRight: ({ children }) => <p style={{ textAlign: "right" }}>{children}</p>,
    justify: ({ children }) => <p style={{ textAlign: "justify" }}>{children}</p>,
  },
};
