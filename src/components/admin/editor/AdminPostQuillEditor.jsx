
    import React, { useMemo } from 'react';
    import ReactQuill, { Quill } from 'react-quill';
    import 'react-quill/dist/quill.snow.css';
    import '@/styles/quill-custom.css'; 
    import ImageResize from 'quill-image-resize-module-react';
    import { VideoBlot, ImageBlot } from '@/lib/quillCustomBlots.js';

    Quill.register('modules/imageResize', ImageResize);
    Quill.register(VideoBlot);
    Quill.register(ImageBlot);

    const AdminPostQuillEditor = ({ value, onChange, placeholder }) => {
      
      const modules = useMemo(() => ({
        toolbar: {
          container: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image', 'video'],
            ['table'], 
            ['clean'],
            ['adblock'] 
          ],
          handlers: {
            'adblock': function() {
              const range = this.quill.getSelection(true);
              this.quill.insertText(range.index, '\n[AD_BLOCK]\n', Quill.sources.USER);
              this.quill.setSelection(range.index + 12, Quill.sources.SILENT);
            }
          }
        },
        imageResize: {
          parchment: Quill.import('parchment'),
          modules: ['Resize', 'DisplaySize']
        },
        clipboard: {
          matchVisual: false,
        }
      }), []);

      const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
        'list', 'bullet', 'indent',
        'script', 'sub', 'super',
        'align', 'color', 'background',
        'link', 'image', 'video', 'width', 'height', 'style', 'alt', 'table',
        'adblock'
      ];
      
      return (
        <ReactQuill 
          theme="snow" 
          value={value} 
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder || "Comece a escrever seu incrível post aqui..."}
          className="bg-input border-border rounded-md"
        />
      );
    };

    export default AdminPostQuillEditor;
  