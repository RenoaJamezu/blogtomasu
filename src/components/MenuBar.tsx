import { Editor } from '@tiptap/react';
import type { FC } from 'react';

interface Props {
  editor: Editor | null;
}

const MenuBar: FC<Props> = ({ editor }) => {
  if (!editor) return null;

  const buttons = [
    { name: 'Bold', action: () => editor.chain().focus().toggleBold().run(), isActive: () => editor.isActive('bold') },
    { name: 'Italic', action: () => editor.chain().focus().toggleItalic().run(), isActive: () => editor.isActive('italic') },
    { name: 'Strike', action: () => editor.chain().focus().toggleStrike().run(), isActive: () => editor.isActive('strike') },
    { name: 'H1', action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: () => editor.isActive('heading', { level: 1 }) },
    { name: 'H2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: () => editor.isActive('heading', { level: 2 }) },
    { name: 'Bullet List', action: () => editor.chain().focus().toggleBulletList().run(), isActive: () => editor.isActive('bulletList') },
    { name: 'Ordered List', action: () => editor.chain().focus().toggleOrderedList().run(), isActive: () => editor.isActive('orderedList') },
  ];

  return (
    <div className="flex gap-2 mb-2 flex-wrap">
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          type="button"
          onClick={btn.action}
          className={`px-3 py-1 rounded-md border transition-colors duration-150
            ${btn.isActive && btn.isActive() ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
        >
          {btn.name}
        </button>
      ))}
    </div>
  );
};

export default MenuBar;
