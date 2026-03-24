import React, { useEffect, useRef, forwardRef, useMemo, useState } from 'react';
import { useEditor, EditorContent as TiptapEditorContent, EditorContentProps } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Heading from '@tiptap/extension-heading';

const CHARACTER_LIMIT_DESCRIPTION = 65535;

// EditorContent wrapper
const EditorContentWithKey = forwardRef<HTMLDivElement, Omit<EditorContentProps, 'innerRef'>>(
  (props, ref) => {
    const key = useMemo(() => Math.random().toString(36).substring(2), [props.editor]);
    return React.createElement(TiptapEditorContent, {
      key,
      innerRef: ref,
      ...props,
    });
  },
);
const EditorContent = React.memo(EditorContentWithKey);

// Enhanced Toolbar
const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const [heading, setHeading] = useState('paragraph');

  useEffect(() => {
    const currentHeading = getCurrentHeading();
    setHeading(currentHeading);
  }, [editor]);

  const getCurrentHeading = () => {
    if (editor.isActive('heading', { level: 1 })) return 'h1';
    if (editor.isActive('heading', { level: 2 })) return 'h2';
    if (editor.isActive('heading', { level: 3 })) return 'h3';
    return 'paragraph';
  };

  const handleHeadingChange = (e) => {
    const value = e.target.value;
    setHeading(value);
    if (value === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = parseInt(value[1]);
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  const buttonStyle = (isActive = false) => ({
    padding: '4px 8px',
    border: `1px solid ${isActive ? '#666' : '#ccc'}`,
    background: isActive ? '#e0e0e0' : 'white',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '14px',
  });

  const handleLinkClick = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl || 'https://');

    // Cancelled
    if (url === null) {
      return;
    }

    // Empty URL removes the link
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // Update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '8px',
        borderBottom: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
      }}
    >
      <select
        value={heading}
        onChange={handleHeadingChange}
        style={{
          fontSize: '14px',
          height: '32px',
          padding: '4px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      >
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="paragraph">Normal</option>
      </select>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        style={buttonStyle(editor.isActive('bold'))}
      >
        <b>B</b>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        style={buttonStyle(editor.isActive('italic'))}
      >
        <i>I</i>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        style={buttonStyle(editor.isActive('underline'))}
      >
        <u>U</u>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        style={buttonStyle(editor.isActive('bulletList'))}
      >
        • List
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        style={buttonStyle(editor.isActive('orderedList'))}
      >
        1. List
      </button>

      <button type="button" onClick={handleLinkClick} style={buttonStyle(editor.isActive('link'))}>
        🔗
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        style={buttonStyle()}
        disabled={!editor.can().undo()}
      >
        ↺
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        style={buttonStyle()}
        disabled={!editor.can().redo()}
      >
        ↻
      </button>
    </div>
  );
};

// RichTextEditor Main Component
const RichTextEditor = ({ value, onChange, error, helperText }) => {
  const editorRef = useRef(null);
  const isUpdatingRef = useRef(false);
  const lastHtmlRef = useRef(value);
  const [characterCount, setCharacterCount] = useState(0);

  // Add custom CSS for links
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .ProseMirror a {
        color: #2563eb;
        text-decoration: underline;
        cursor: pointer;
        position: relative;
      }
      .ProseMirror a:hover::after {
       
        font-size: 0.8em;
        color: #64748b;
      }
      .ProseMirror {
        outline: none;
        box-shadow: none;
        border: none;
        padding: 8px;
        min-height: 120px;
        font-size: 14px;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // const editor = useEditor({
  //   extensions: [
  //     StarterKit.configure({
  //       heading: false,
  //     }),
  //     Underline,
  //     Link.configure({
  //       openOnClick: false,
  //       HTMLAttributes: {
  //         target: '_blank',
  //         rel: 'noopener noreferrer'
  //       }
  //     }),
  //     Heading.configure({ levels: [1, 2, 3] }),
  //   ],
  //   content: value || '',
  //   editorProps: {
  //     attributes: {
  //       class: 'ProseMirror',
  //     },
  //     handleClickOn: (view, pos, node, nodePos, event, direct) => {
  //       // Handle link clicks
  //       if (node.type.name === 'text' && node.marks.some(mark => mark.type.name === 'link')) {
  //         const linkMark = node.marks.find(mark => mark.type.name === 'link');
  //         if (linkMark.attrs.href) {
  //           window.open(linkMark.attrs.href, '_blank');
  //           return true; // Prevent default behavior
  //         }
  //       }
  //       return false; // Let other clicks behave normally
  //     },
  //   },
  //   onUpdate: ({ editor }) => {
  //     const html = editor.getHTML();
  //     const text = editor.getText();
  //     lastHtmlRef.current = html;
  //     setCharacterCount(text.length);
  //     onChange(html);
  //   },
  // });
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false, // Disable default link click behavior
        HTMLAttributes: {
          class: 'clickable-link',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'ProseMirror',
      },
      handleDOMEvents: {
        click: (view, event) => {
          // Handle link clicks
          const pos = view.posAtCoords({ left: event.clientX, top: event.clientY });
          if (pos) {
            const node = view.state.doc.nodeAt(pos.pos);
            if (node) {
              const linkMark = node.marks?.find((mark) => mark.type.name === 'link');
              if (linkMark?.attrs.href) {
                window.open(linkMark.attrs.href, '_blank');
                return true; // Prevent default behavior
              }
            }
          }
          return false; // Let other clicks behave normally
        },
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = editor.getText();
      lastHtmlRef.current = html;
      setCharacterCount(text.length);
      onChange(html);
    },
  });

  // Add CSS for links
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .ProseMirror .clickable-link {
        color: #2563eb;
        text-decoration: underline;
        cursor: pointer;
        position: relative;
      }
      .ProseMirror .clickable-link:hover::after {
        
        font-size: 0.8em;
        color: #64748b;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  // Initialize character count
  useEffect(() => {
    if (editor) {
      setCharacterCount(editor.getText().length);
    }
  }, [editor]);

  // Sync external changes
  useEffect(() => {
    if (editor && value !== lastHtmlRef.current && !isUpdatingRef.current) {
      isUpdatingRef.current = true;
      editor.commands.setContent(value);
      lastHtmlRef.current = value;
      setCharacterCount(editor.getText().length);
      isUpdatingRef.current = false;
    }
  }, [value, editor]);

  return (
    <div ref={editorRef}>
      <div
        style={{
          border: `1px solid ${error ? 'red' : '#ccc'}`,
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {helperText && (
          <div style={{ fontSize: '12px', color: 'red', marginTop: '4px' }}>{helperText}</div>
        )}
        <div style={{ fontSize: '12px', color: '#666', marginLeft: 'auto' }}>
          {characterCount}/{CHARACTER_LIMIT_DESCRIPTION}
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
