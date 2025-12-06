import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import { useEffect } from "react";

interface Props {
  content: string;
  setContent: (value: string) => void;
}

function TipTapEditor({ content, setContent }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    editorProps: {
      attributes: {
        class: 'tiptap-content outline-none p-4 min-h-[200px] border border-gray-300 rounded-lg focus:border-black'
      }
    },
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <MenuBar editor={editor} />

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}

export default TipTapEditor