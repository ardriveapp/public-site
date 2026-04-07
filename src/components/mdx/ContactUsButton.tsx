"use client";

import { ContactUsTrigger } from "@/components/contact/ContactUsTrigger";
import { ReactNode, isValidElement } from "react";

interface ContactUsButtonProps {
  children: ReactNode;
  ariaLabel?: string;
}

// Unwrap paragraph tags that MDX adds, extracting just the text content
function unwrapParagraph(children: ReactNode): ReactNode {
  if (typeof children === "string" || typeof children === "number") {
    return children;
  }
  
  if (isValidElement(children)) {
    // If it's a paragraph, extract its children
    if (children.type === "p") {
      const props = children.props as { children?: ReactNode };
      return unwrapParagraph(props.children);
    }
    // If it has children, recurse
    const props = children.props as { children?: ReactNode };
    if (props?.children) {
      return unwrapParagraph(props.children);
    }
  }
  
  // If it's an array, process each item
  if (Array.isArray(children)) {
    return children.map((child, i) => (
      <span key={i}>{unwrapParagraph(child)}</span>
    ));
  }
  
  return children;
}

export function ContactUsButton({ 
  children, 
  ariaLabel 
}: ContactUsButtonProps) {
  const unwrappedChildren = unwrapParagraph(children);
  
  return (
    <div className="not-prose">
      <ContactUsTrigger
        className="inline-flex items-center justify-center rounded-full bg-[#23232D] px-6 h-9 text-sm font-semibold leading-none text-[#F0F0F0] hover:opacity-90 transition-opacity"
        ariaLabel={ariaLabel}
      >
        {unwrappedChildren}
      </ContactUsTrigger>
    </div>
  );
}
